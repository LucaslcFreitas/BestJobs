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

type FormProfileCandidateAddAcademicProps = {
    title: string;
    show: boolean;
    onAddForm: (
        courseName: string,
        instituition: string,
        studyAreaId: string,
        startDate: string,
        endDate: string,
        conclued: boolean,
        description: string
    ) => void;
    changeVisible: (show: boolean) => void;
};

const auxInitialValuesStudyArea = [
    { label: 'Engenharia/Tecnoligia', value: 'Engenharia/Tecnoligia' },
    { label: 'Ciências Humanas', value: 'Ciências Humanas' },
    { label: 'Ciências Exatas', value: 'Ciências Exatas' },
];

function FormProfileCandidateAddAcademic({
    title,
    show,
    onAddForm,
    changeVisible,
}: FormProfileCandidateAddAcademicProps) {
    const [courseName, setCourseName] = useState('');
    const [instituition, setInstituition] = useState('');
    const [studyArea, setStudyArea] = useState(
        auxInitialValuesStudyArea[0].value
    );
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
    const [inProgress, setInProgress] = useState(false);
    const [conclued, setConclued] = useState(false);
    const [description, setDescription] = useState('');

    const handleAddAcademicGraduation = (e: React.FormEvent) => {
        e.preventDefault();
        onAddForm(
            courseName,
            instituition,
            studyArea,
            startDate,
            endDate,
            conclued,
            description
        );
    };

    const handleCancelAddGraduation = () => {
        changeVisible(false);
    };

    if (!show) {
        return <></>;
    }

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
                    value={studyArea}
                    onChange={setStudyArea}
                    options={auxInitialValuesStudyArea}
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
                        text="Adicionar"
                        onClickButton={() => handleAddAcademicGraduation}
                    />
                </div>
            </form>
        </div>
    );
}

export default FormProfileCandidateAddAcademic;
