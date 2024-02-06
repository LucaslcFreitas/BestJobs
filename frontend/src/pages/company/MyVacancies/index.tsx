import './styles.sass';
import { MdOutlineAdd } from 'react-icons/md';
import IconLink from '../../../components/IconLink';
import { VacancieWithCandidacyType } from '../../../shared/types/VacancieType';
import { useEffect, useState } from 'react';
import MyVacancieCard from '../../../components/company/myVacancie/MyVacancieCard';
import { useDispatch, useSelector } from 'react-redux';
import { startLoad, stopLoad } from '../../../redux/loader/sliceLoader';
import {
    showAlertConfirm,
    hideAlertConfirm,
} from '../../../redux/alert/sliceAlertConfirm';
import {
    showAlertInfo,
    hideAlertInfo,
} from '../../../redux/alert/sliceAlertInfo';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import endpoints from '../../../services/endpoints';
import { useUser } from '../../../redux/user/sliceUser';

function MyVacancies() {
    const user = useSelector(useUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [myVacancies, setMyVacancies] = useState<VacancieWithCandidacyType[]>(
        []
    );

    useEffect(() => {
        document.title = 'Minhas Vagas | Best Jobs';

        dispatch(startLoad());
        //timeout para fins visuais
        const timeout = setTimeout(() => {
            api.get(endpoints.GET_MY_VACANCIE, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((response) => {
                    setMyVacancies(response.data);
                    setLoading(false);
                    dispatch(stopLoad());
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(
                        showAlertInfo({
                            title: 'Error',
                            info: 'Falha ao buscar os dados!',
                            textButton: 'OK',
                            show: true,
                            onDismiss: () => dispatch(hideAlertInfo()),
                        })
                    );
                });
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const handleDetail = (vacancie: VacancieWithCandidacyType) => {
        navigate(`/vacancie/${vacancie.id}`);
    };

    const handleClose = (vacancie: VacancieWithCandidacyType) => {
        dispatch(
            showAlertConfirm({
                title: 'Encerrar Vaga',
                info: `Deseja realmente encerrar a vaga \"${vacancie.name_position}\"? Esta ação não pode ser revertida e todos os candidatos em análise serão marcados como Reprovado.`,
                show: true,
                textButtonCancel: 'Não',
                textButtonConfirm: 'Sim',
                onDismiss: () => dispatch(hideAlertConfirm()),
                onConfirm: () => {
                    dispatch(hideAlertConfirm());
                    closeVacancie(vacancie);
                },
            })
        );
    };

    const closeVacancie = (vacancie: VacancieWithCandidacyType) => {
        dispatch(startLoad());
        api.put(
            `${endpoints.CLOSE_VACANCIE}${vacancie.id}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then(() => {
                const vacancies = myVacancies?.map((item) => {
                    if (item.id === vacancie.id) {
                        return {
                            ...item,
                            publisehd: false,
                        };
                    }
                    return item;
                });
                setMyVacancies(vacancies);
                dispatch(stopLoad());
            })
            .catch((error) => {
                console.log(error);
                dispatch(stopLoad());
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao encerrar vaga!',
                        textButton: 'OK',
                        show: true,
                        onDismiss: () => dispatch(hideAlertInfo()),
                    })
                );
            });
    };

    return (
        <section className="my-vacancies-container">
            <header>
                <h1>Minhas Vagas</h1>
                <IconLink
                    color="#fbfcff"
                    backgroundColor="#68AA88"
                    icon={<MdOutlineAdd />}
                    to="/vacancie/create"
                />
            </header>
            <div className="vacancies-list">
                {myVacancies.length
                    ? myVacancies.map((item) => (
                          <MyVacancieCard
                              key={item.id}
                              vacancie={item}
                              onDetail={handleDetail}
                              onClose={handleClose}
                          />
                      ))
                    : !loading && (
                          <div className="no-data">
                              <p>Nenhuma vaga encontrada.</p>
                          </div>
                      )}
            </div>
        </section>
    );
}

export default MyVacancies;
