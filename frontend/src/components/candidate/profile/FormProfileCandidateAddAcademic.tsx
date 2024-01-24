import React, { useState } from 'react';
import '../../../styles/components/candidate/profile/FormProfileCandidateAddAcademic.sass';
import moment from 'moment';
import InputText from '../../InputText';
import InputSelect from '../../InputSelect';
import InputTextArea from '../../InputTextArea';
import InputDate from '../../InputDate';
import InputCheckBox from '../../InputCheckBox';
import ButtonPrimary from '../../ButtonPrimary';
import ButtonSecondary from '../../ButtonSecondary';
import { AcademicGraduationType } from '../../../shared/types/AcademicGraduationType';

type FormProfileCandidateAddAcademicProps = {
    title: string;
    onAddForm: (academicData: AcademicGraduationType) => void;
    addOperation?: boolean;
    preId?: string;
    preCourseName?: string;
    preInstituition?: string;
    preStudyArea?: {
        id: string;
        name: string;
    };
    preStartDate?: string;
    preEndDate?: string;
    preInProgress?: boolean;
    preConclued?: boolean;
    preDescription?: string;
    changeVisible: (show: boolean) => void;
};

const auxInitialValuesStudyArea = [
    {
        id: '16a95e25-a6c7-44ed-b23c-fb6198b1bec6',
        name: 'Engenharia/Tecnoligia',
    },
    { id: '16a95e25-a6c7-44ed-b23c-fb6198b1bec7', name: 'Ciências Humanas' },
    { id: '16a95e25-a6c7-44ed-b23c-fb6198b1bec8', name: 'Ciências Exatas' },
];

function FormProfileCandidateAddAcademic({
    title,
    onAddForm,
    changeVisible,
    addOperation = true,
    preId = '',
    preCourseName = '',
    preInstituition = '',
    preStudyArea = auxInitialValuesStudyArea[0],
    preStartDate = moment().format('YYYY-MM-DD'),
    preEndDate = moment().format('YYYY-MM-DD'),
    preInProgress = false,
    preConclued = false,
    preDescription = '',
}: FormProfileCandidateAddAcademicProps) {
    const [id] = useState(preId);
    const [courseName, setCourseName] = useState(preCourseName);
    const [instituition, setInstituition] = useState(preInstituition);
    const [studyArea, setStudyArea] = useState(preStudyArea);
    const [startDate, setStartDate] = useState(
        moment(preStartDate).format('YYYY-MM-DD')
    );
    const [endDate, setEndDate] = useState(
        moment(preEndDate).format('YYYY-MM-DD')
    );
    const [inProgress, setInProgress] = useState(preInProgress);
    const [conclued, setConclued] = useState(preConclued);
    const [description, setDescription] = useState(preDescription);

    const handleAddAcademicGraduation = (e: React.FormEvent) => {
        e.preventDefault();
        onAddForm({
            id,
            course_name: courseName,
            instituition,
            study_area: studyArea,
            start_date: startDate,
            date_conclusion: inProgress ? '' : endDate,
            conclued,
            description,
        });
    };

    const handleCancelAddGraduation = () => {
        changeVisible(false);
    };

    return (
        <div
            id="formAddAcademic"
            className="form-profile-cadidate-add-academic"
        >
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
                    value={studyArea.id}
                    onChange={setStudyArea}
                    options={auxInitialValuesStudyArea.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                />
                <div className="form-profile-cadidate-add-academic-flex">
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
                <div className="form-profile-candidate-add-academic-buttons">
                    <ButtonSecondary
                        text="Cancelar"
                        onClickButton={handleCancelAddGraduation}
                        backgroundColor="#8B0000"
                    />
                    <ButtonPrimary
                        isSubmit={true}
                        text={addOperation ? 'Adicionar' : 'Salvar'}
                        onClickButton={() => handleAddAcademicGraduation}
                    />
                </div>
            </form>
        </div>
    );
}

export default FormProfileCandidateAddAcademic;
