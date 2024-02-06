import './styles.sass';
import LinkAction from '../../../components/LinkAction';
import ViewVacancieCard from '../../../components/company/viewVacancie/ViewVacancieCard';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VacancieWithCandidacyType } from '../../../shared/types/VacancieType';
import { useDispatch, useSelector } from 'react-redux';
import { startLoad, stopLoad } from '../../../redux/loader/sliceLoader';
import {
    showAlertConfirm,
    hideAlertConfirm,
} from '../../../redux/alert/sliceAlertConfirm';
import { CandidateType } from '../../../shared/types/CandidateType';
import AcademicGraduationCard from '../../../components/AcademicGraduationCard';
import ExperienceCard from '../../../components/ExperienceCard';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecondary from '../../../components/ButtonSecondary';
import { IoArrowBack } from 'react-icons/io5';
import IconButtonSmall from '../../../components/IconButtonSmall';
import api from '../../../services/api';
import endpoints from '../../../services/endpoints';
import { useUser } from '../../../redux/user/sliceUser';
import {
    hideAlertInfo,
    showAlertInfo,
} from '../../../redux/alert/sliceAlertInfo';

type InfoCandidate = {
    id: string;
    finished: boolean;
    approved: boolean;
    candidate: CandidateType;
};

function ViewVacancie() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(useUser);

    let { id } = useParams();

    const [vacancie, setVacancie] = useState<VacancieWithCandidacyType>();
    const [selectedCandidate, setSelectedCandidate] = useState<InfoCandidate>();

    //ToMediaQuery
    const [inViewCandidate, setInViewCandidate] = useState(false);

    useEffect(() => {
        document.title = 'Visualizar Vaga | Best Jobs';

        if (!id) {
            navigate('/');
        } else {
            dispatch(startLoad());
            //timeout para fins visuais
            const timeout = setTimeout(() => {
                api.get(`${endpoints.GET_COMPANY_VACANCIE}${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                    .then((response) => {
                        setVacancie(response.data);
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
        }
    }, []);

    const handleEditVacancie = () => {
        navigate(`/vacancie/edit/${id}`);
    };

    const handleCloseVacancie = () => {
        dispatch(
            showAlertConfirm({
                title: 'Encerrar Vaga',
                info: `Deseja realmente encerrar a vaga \"${
                    vacancie!.name_position
                }\"? Esta ação não pode ser revertida e todos os candidatos em análise serão marcados como Reprovado.`,
                show: true,
                textButtonCancel: 'Não',
                textButtonConfirm: 'Sim',
                onDismiss: () => dispatch(hideAlertConfirm()),
                onConfirm: () => {
                    dispatch(hideAlertConfirm());
                    closeVacancie();
                },
            })
        );
    };

    const closeVacancie = () => {
        dispatch(startLoad());
        api.put(
            `${endpoints.CLOSE_VACANCIE}${vacancie!.id}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then(() => {
                const candidacyEdited = vacancie!.Candidacy.map((item) => {
                    if (item.finished) {
                        return item;
                    }
                    return {
                        ...item,
                        finished: true,
                        approved: false,
                    };
                });
                const vacancieEdited: VacancieWithCandidacyType = {
                    ...vacancie!,
                    Candidacy: candidacyEdited,
                    publisehd: false,
                };
                setVacancie(vacancieEdited);
                setSelectedCandidate(undefined);
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

    const handleDeleteVacancie = () => {
        dispatch(
            showAlertConfirm({
                title: 'Confirmar Exclusão',
                info: 'Deseja realmente excluir esta vaga?',
                show: true,
                onDismiss: () => {
                    dispatch(hideAlertConfirm());
                },
                onConfirm: () => {
                    dispatch(hideAlertConfirm());
                    deleteVacancie();
                },
                textButtonCancel: 'Não',
                textButtonConfirm: 'Sim',
            })
        );
        console.log('Delete');
    };

    const deleteVacancie = () => {
        dispatch(startLoad());
        api.delete(`${endpoints.DELETE_VACANCIE}${vacancie!.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then(() => {
                dispatch(stopLoad());
                navigate('/company/myvacancies');
            })
            .catch((error) => {
                console.log(error);
                dispatch(stopLoad());
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao deletar vaga!',
                        textButton: 'OK',
                        show: true,
                        onDismiss: () => dispatch(hideAlertInfo()),
                    })
                );
            });
    };

    const handleApproveCandidate = (candidate: InfoCandidate) => {
        dispatch(startLoad());
        api.put(
            `${endpoints.APPROVE_CANDIDACY}${candidate.id}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then(() => {
                const editedCandidacies: InfoCandidate[] = vacancie
                    ? vacancie.Candidacy.map((item) => {
                          if (item.id === candidate.id) {
                              return {
                                  ...item,
                                  approved: true,
                                  finished: true,
                              };
                          }
                          return item;
                      })
                    : [];
                const editedVacancie: VacancieWithCandidacyType | undefined =
                    vacancie
                        ? {
                              ...vacancie,
                              Candidacy: editedCandidacies,
                          }
                        : undefined;
                setVacancie(editedVacancie);
                setSelectedCandidate({
                    ...candidate,
                    approved: true,
                    finished: true,
                });
                dispatch(stopLoad());
            })
            .catch((error) => {
                console.log(error);
                dispatch(stopLoad());
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao aprovar candidato!',
                        textButton: 'OK',
                        show: true,
                        onDismiss: () => dispatch(hideAlertInfo()),
                    })
                );
            });
    };

    const handleDisapproveCandidate = (candidate: InfoCandidate) => {
        dispatch(startLoad());
        api.put(
            `${endpoints.DISAPPROVE_CANDIDACY}${candidate.id}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then(() => {
                const editedCandidacies: InfoCandidate[] = vacancie
                    ? vacancie.Candidacy.map((item) => {
                          if (item.id === candidate.id) {
                              return {
                                  ...item,
                                  approved: false,
                                  finished: true,
                              };
                          }
                          return item;
                      })
                    : [];
                const editedVacancie: VacancieWithCandidacyType | undefined =
                    vacancie
                        ? {
                              ...vacancie,
                              Candidacy: editedCandidacies,
                          }
                        : undefined;
                setVacancie(editedVacancie);
                setSelectedCandidate({
                    ...candidate,
                    approved: false,
                    finished: true,
                });
                dispatch(stopLoad());
            })
            .catch((error) => {
                console.log(error);
                dispatch(stopLoad());
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao reprovar candidato!',
                        textButton: 'OK',
                        show: true,
                        onDismiss: () => dispatch(hideAlertInfo()),
                    })
                );
            });
    };

    return (
        <section className="view-vacancie-container">
            <div className="result">
                <header>
                    <h3 className="vacancie-name">{vacancie?.name_position}</h3>
                    <p className="vacancie-candidates">
                        {vacancie?.Candidacy.length} candidatos
                    </p>
                    {vacancie && vacancie.publisehd ? (
                        <div className="vacancie-buttons">
                            <LinkAction
                                text="Editar"
                                color="#3b3b3b"
                                colorHover="#6e6e6e"
                                onClick={handleEditVacancie}
                            />
                            <LinkAction
                                text="Encerrar"
                                color="#3b3b3b"
                                colorHover="#6e6e6e"
                                onClick={handleCloseVacancie}
                            />
                            <LinkAction
                                text="Excluir"
                                color="#DF0000"
                                colorHover="#AE0000"
                                onClick={handleDeleteVacancie}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </header>
                <div className="list-candidates">
                    {vacancie?.Candidacy.map((item, index) => (
                        <ViewVacancieCard
                            key={index}
                            title={item.candidate.name}
                            status={
                                !item.finished
                                    ? 'Em Análise'
                                    : item.approved
                                    ? 'Aprovado'
                                    : 'Reprovado'
                            }
                            onClick={() => {
                                setSelectedCandidate(item);
                                setInViewCandidate(true);
                            }}
                            separator
                            selected={
                                item.candidate.id ==
                                selectedCandidate?.candidate.id
                            }
                        />
                    ))}
                </div>
            </div>
            <div className={`content ${inViewCandidate ? 'content-view' : ''}`}>
                {selectedCandidate ? (
                    <>
                        <div className="vacancie-close">
                            <IconButtonSmall
                                backgroundColor="#f2f4fd"
                                color="#3b3b3b"
                                icon={<IoArrowBack />}
                                onClick={() => {
                                    setInViewCandidate(false);
                                }}
                            />
                        </div>
                        <div>
                            <div className="content-header">
                                <h2>{selectedCandidate.candidate.name}</h2>
                                <p>
                                    <b>Status:</b>{' '}
                                    {!selectedCandidate.finished
                                        ? 'Em Análise'
                                        : selectedCandidate.approved
                                        ? 'Aprovado'
                                        : 'Reprovado'}
                                </p>
                                <p>
                                    <b>CPF:</b>{' '}
                                    {selectedCandidate.candidate.cpf}
                                </p>
                                <p>
                                    <b>E-mail:</b>{' '}
                                    {selectedCandidate.candidate.email}
                                </p>
                            </div>
                            <hr />
                            <div>
                                <h3 className="section-titles">
                                    Sobre o Cadidato:
                                </h3>
                                <p className="about-vacancie">
                                    {selectedCandidate.candidate.about_me}
                                </p>
                            </div>
                            <hr />
                            <div>
                                <h3 className="section-titles">Experiência:</h3>
                                {selectedCandidate.candidate.Experience
                                    .length ? (
                                    selectedCandidate.candidate.Experience.map(
                                        (item, index, arrayExperience) => (
                                            <ExperienceCard
                                                key={item.id}
                                                experience={item}
                                                separator={
                                                    index + 1 <
                                                    arrayExperience.length
                                                }
                                            />
                                        )
                                    )
                                ) : (
                                    <p className="no-data">
                                        Nenhuma experiência registrada.
                                    </p>
                                )}
                            </div>
                            <hr />
                            <div>
                                <h3 className="section-titles">
                                    Formação Acadêmica:
                                </h3>
                                {selectedCandidate.candidate.Academic_graduation
                                    .length ? (
                                    selectedCandidate.candidate.Academic_graduation.map(
                                        (item, index, arrayGraduation) => (
                                            <AcademicGraduationCard
                                                key={item.id}
                                                academicGraduation={item}
                                                separator={
                                                    index + 1 <
                                                    arrayGraduation.length
                                                }
                                            />
                                        )
                                    )
                                ) : (
                                    <p className="no-data">
                                        Nenhuma formação acadêmica registrada.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="vacancie-footer">
                            <div className="footer-buttons">
                                <ButtonSecondary
                                    text="Reprovar"
                                    disable={selectedCandidate.finished}
                                    onClickButton={() => {
                                        handleDisapproveCandidate(
                                            selectedCandidate
                                        );
                                    }}
                                    backgroundColor="#EB0303"
                                    color="#fbfcff"
                                />
                            </div>
                            <div className="footer-buttons">
                                <ButtonPrimary
                                    text="Aprovar"
                                    disable={selectedCandidate.finished}
                                    onClickButton={() => {
                                        handleApproveCandidate(
                                            selectedCandidate
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="no-data-selected">
                        <h4>Nenhum candidato selecionado</h4>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ViewVacancie;
