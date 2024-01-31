import './styles.sass';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import InputText from '../../../InputText';
import InputSelect from '../../../InputSelect';
import InputTextArea from '../../../InputTextArea';
import InputDate from '../../../InputDate';
import InputCheckBox from '../../../InputCheckBox';
import ButtonPrimary from '../../../ButtonPrimary';
import ButtonSecondary from '../../../ButtonSecondary';
import LoaderLocal from '../../../LoaderLocal';
import { AcademicGraduationType } from '../../../../shared/types/AcademicGraduationType';
import api from '../../../../services/api';
import endpoints from '../../../../services/endpoints';
import { StudyAreaType } from '../../../../shared/types/AcademicGraduationType';

type FormProfileCandidateAddAcademicProps = {
    title: string;
    onAddForm: (academicData: AcademicGraduationType) => void;
    addOperation?: boolean;
    closeOnAdd?: boolean;
    preId?: string;
    preCourseName?: string;
    preInstituition?: string;
    preStudyArea?: StudyAreaType;
    preStartDate?: string;
    preEndDate?: string;
    preInProgress?: boolean;
    preConclued?: boolean;
    preDescription?: string;
    changeVisible: (show: boolean) => void;
};

function FormProfileCandidateAddAcademic({
    title,
    onAddForm,
    changeVisible,
    addOperation = true,
    closeOnAdd = false,
    preId = '',
    preCourseName = '',
    preInstituition = '',
    preStudyArea = undefined,
    preStartDate = moment().format('YYYY-MM-DD'),
    preEndDate = moment().format('YYYY-MM-DD'),
    preInProgress = false,
    preConclued = false,
    preDescription = '',
}: FormProfileCandidateAddAcademicProps) {
    const [id] = useState(preId);
    const [courseName, setCourseName] = useState(preCourseName);
    const [instituition, setInstituition] = useState(preInstituition);
    const [studyArea, setStudyArea] = useState<StudyAreaType | undefined>(
        preStudyArea
    );
    const [studyAreas, setStudyAreas] = useState<StudyAreaType[]>([]);
    const [startDate, setStartDate] = useState(
        moment(preStartDate).format('YYYY-MM-DD')
    );
    const [endDate, setEndDate] = useState(
        moment(preEndDate).format('YYYY-MM-DD')
    );
    const [inProgress, setInProgress] = useState(preInProgress);
    const [conclued, setConclued] = useState(preConclued);
    const [description, setDescription] = useState(preDescription);

    //Load study area
    const [studyLoading, setStudyLoading] = useState(true);

    //Erros
    const [errorLoading, setErrorLoading] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        api.get(endpoints.GET_STUDY_AREAS)
            .then((response) => {
                setStudyAreas(response.data);
                if (studyArea == undefined) setStudyArea(response.data[0]);
                setStudyLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorLoading('Falha ao carregar formulário');
                setStudyLoading(false);
            });
    }, []);

    //Criar maneira para validar as datas inseridas
    const handleAddAcademicGraduation = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (
            !courseName ||
            !instituition ||
            !startDate ||
            (!inProgress && !endDate) ||
            !description
        ) {
            setErrorMsg('Preencha todos os campos');
            return;
        }

        if (!inProgress && !moment(startDate).isBefore(moment(endDate))) {
            setErrorMsg('Datas inválidas');
            return;
        }

        onAddForm({
            id,
            course_name: courseName,
            instituition,
            study_area: studyArea!,
            start_date: startDate,
            date_conclusion: inProgress ? '' : endDate,
            conclued: inProgress ? false : conclued,
            description,
        });

        if (closeOnAdd) {
            changeVisible(false);
        }
    };

    const handleCancelAddGraduation = () => {
        changeVisible(false);
    };

    return (
        <div id="formAddAcademic" className="form-add-academic">
            {studyLoading ? (
                <LoaderLocal show={studyLoading} />
            ) : errorLoading === '' ? (
                <>
                    <h3>{title}</h3>
                    <form onSubmit={handleAddAcademicGraduation}>
                        <InputText
                            type="text"
                            label="Nome do curso"
                            value={courseName}
                            onChangeInput={setCourseName}
                        />
                        <InputText
                            type="text"
                            label="Nome da instituição"
                            value={instituition}
                            onChangeInput={setInstituition}
                        />
                        <InputSelect
                            label="Área de estudo"
                            value={studyArea!.id}
                            onChange={setStudyArea}
                            options={studyAreas.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                        />
                        <div className="row-flex">
                            <InputDate
                                label="Data de início"
                                value={startDate}
                                onChangeInput={setStartDate}
                            />
                            <InputDate
                                disabled={inProgress}
                                label="Data de término"
                                value={endDate}
                                onChangeInput={setEndDate}
                            />
                            <InputCheckBox
                                name="Ainda cursando"
                                isChecked={inProgress}
                                setChangeChecked={setInProgress}
                            />
                            <InputCheckBox
                                disableb={inProgress}
                                name="Concluido"
                                isChecked={conclued}
                                setChangeChecked={setConclued}
                            />
                        </div>
                        <InputTextArea
                            label="Descrição"
                            value={description}
                            onChangeInput={setDescription}
                        />
                        {errorMsg && <p className="error">{errorMsg}</p>}
                        <div className="buttons">
                            <ButtonSecondary
                                text="Cancelar"
                                onClickButton={handleCancelAddGraduation}
                                backgroundColor="#8B0000"
                            />
                            <ButtonPrimary
                                isSubmit={true}
                                text={addOperation ? 'Adicionar' : 'Salvar'}
                                onClickButton={() =>
                                    handleAddAcademicGraduation
                                }
                            />
                        </div>
                    </form>
                </>
            ) : (
                <div className="error-loading">
                    <p>{errorLoading}</p>
                    <div className="button-container">
                        <ButtonSecondary
                            text="Fechar"
                            onClickButton={handleCancelAddGraduation}
                            backgroundColor="#8B0000"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormProfileCandidateAddAcademic;
