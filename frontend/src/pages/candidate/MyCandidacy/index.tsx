import './styles.sass';
import { useEffect, useState } from 'react';
import MyCandidacyCard from '../../../components/candidate/myCandidacy/MyCandidacyCard';
import { MyCandidacyType } from '../../../shared/types/VacancieType';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '../../../redux/user/sliceUser';
import { startLoad, stopLoad } from '../../../redux/loader/sliceLoader';
import {
    showAlertConfirm,
    hideAlertConfirm,
} from '../../../redux/alert/sliceAlertConfirm';
import ModalDetailCandidacy from '../../../components/candidate/myCandidacy/ModalDetailCandidacy';
import api from '../../../services/api';
import endpoints from '../../../services/endpoints';
import {
    hideAlertInfo,
    showAlertInfo,
} from '../../../redux/alert/sliceAlertInfo';

const candidacyInitial: MyCandidacyType = {
    id: '',
    create_at: '',
    approved: false,
    finished: false,
    vacancie: {
        id: '',
        name_position: '',
        about: '',
        salary_expectation: 0,
        publication_date: '',
        publisehd: true,
        locality: '',
        sector: {
            id: '',
            name: '',
        },
        job_type: {
            id: '',
            name: '',
        },
        type_locality: {
            id: '',
            name: '',
        },
        Vacancie_skill: [],
        company: {
            name: '',
            description: '',
            number_of_employees: '',
            slogan: '',
        },
        Candidacy: 0,
    },
};

function MyCandidacy() {
    const user = useSelector(useUser);

    const dispatch = useDispatch();
    const [myCandidacy, setMyCandidacy] = useState<MyCandidacyType[]>();
    const [loading, setLoading] = useState(true);
    const [showDetail, setShowDetail] = useState(false);
    const [candidacyDetail, setCandidacyDetail] =
        useState<MyCandidacyType>(candidacyInitial);

    useEffect(() => {
        dispatch(startLoad());
        //timeout para fins visuais
        const timeout = setTimeout(() => {
            api.get(endpoints.GET_MY_CANDIDACY, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((response) => {
                    setMyCandidacy(response.data);
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

    const handleDesist = (candidacy: MyCandidacyType) => {
        dispatch(
            showAlertConfirm({
                title: 'Desistir da Vaga',
                info: 'Deseja realmente desistir desta vaga?',
                show: true,
                textButtonCancel: 'Não',
                textButtonConfirm: 'Sim',
                onConfirm: () => {
                    dispatch(hideAlertConfirm());
                    confirmDesist(candidacy);
                },
                onDismiss: () => dispatch(hideAlertConfirm()),
            })
        );
    };

    const confirmDesist = (candidacy: MyCandidacyType) => {
        dispatch(startLoad());
        api.delete(`${endpoints.DELETE_CANDIDACY}${candidacy.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then(() => {
                const candidacies = myCandidacy?.filter(
                    (item) => item.id != candidacy.id
                );
                setMyCandidacy(candidacies);
                dispatch(stopLoad());
            })
            .catch((error) => {
                console.log(error);
                dispatch(stopLoad());
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao excluir candidatura',
                        textButton: 'OK',
                        show: true,
                        onDismiss: () => dispatch(hideAlertInfo()),
                    })
                );
            });
    };

    const handleDetail = (candidacy: MyCandidacyType) => {
        setCandidacyDetail(candidacy);
        setShowDetail(true);
    };

    return (
        <section className="my-candidacy-container">
            <ModalDetailCandidacy
                show={showDetail}
                onDismiss={() => setShowDetail(false)}
                candidacy={candidacyDetail}
            />
            <header>
                <h1>Minhas Candidaturas</h1>
            </header>
            <div className="candidacy-list">
                {myCandidacy
                    ? myCandidacy.map((item) => (
                          <MyCandidacyCard
                              key={item.id}
                              candidacy={item}
                              onDetail={handleDetail}
                              onDesist={handleDesist}
                          />
                      ))
                    : !loading && (
                          <div className="no-data">
                              <p>Nenhuma candidatura encontrada.</p>
                          </div>
                      )}
            </div>
        </section>
    );
}

export default MyCandidacy;
