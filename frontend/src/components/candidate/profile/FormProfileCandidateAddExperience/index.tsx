import React, { useState } from 'react';
import './styles.sass';
import moment from 'moment';
import InputText from '../../../InputText';
import InputSelect from '../../../InputSelect';
import InputTextArea from '../../../InputTextArea';
import InputDate from '../../../InputDate';
import ButtonPrimary from '../../../ButtonPrimary';
import ButtonSecondary from '../../../ButtonSecondary';
import {
    ExperienceType,
    LocalityType,
    JobType,
    SectorType,
} from '../../../../shared/types/ExperienceType';

type FormProfileCandidateAddExperienceProps = {
    title: string;
    onAddForm: (experience: ExperienceType) => void;
    changeVisible: (show: boolean) => void;
    addOperation?: boolean;
    preId?: string;
    prePosition?: string;
    preCompanyName?: string;
    preLocality?: string;
    preTypeLocality?: LocalityType;
    preJobType?: JobType;
    preSector?: SectorType;
    preDescription?: string;
    preStart?: string;
    preEnd?: string;
};

const auxInitialValuesSector = [
    { id: 'd7e4d20f-4957-4486-b532-a6a3b5022f11', name: 'Administração' },
    { id: '0b76adb3-5bf9-487b-8104-1e7b55424268', name: 'Recursos Humanos' },
    { id: 'fa651483-b2ee-4665-9599-1758c6bf18f0', name: 'Financeiro' },
    { id: '3aaa7e2e-7826-4a25-825d-094be351ac49', name: 'Marketing e Vendas' },
    { id: '1c7ec4bd-57af-4af3-a20d-1b2932783beb', name: 'Logística' },
    {
        id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
        name: 'Tecnologia da Informação',
    },
    {
        id: 'fda3495b-8095-4f95-9776-198029c15721',
        name: 'Atendimento ao Cliente',
    },
];

const auxInitialValuesTypeLocality = [
    { id: '13e072dd-0248-43e2-9e93-1db8f4987250', name: 'Romoto' },
    { id: 'db113946-2467-4c27-aece-6a24f9631271', name: 'Presencial' },
    { id: '9be69eac-a6e4-4fd8-962b-b32bdcdbd671', name: 'Híbrido' },
];

const auxInitialValuesJobType = [
    { id: 'e538fddc-762a-448b-be71-28b3545cd12d', name: 'Tempo Integral' },
    { id: '74bafd17-09bf-4eb1-838e-8d1a200800c1', name: 'Estágio' },
    {
        id: 'b76bad37-b149-49d2-a01d-e2e47e98b802',
        name: 'Prestador de Serviços',
    },
];

function FormProfileCandidateAddExperience({
    title,
    onAddForm,
    changeVisible,
    addOperation = true,
    preId = '',
    prePosition = '',
    preCompanyName = '',
    preLocality = '',
    preTypeLocality = auxInitialValuesTypeLocality[0],
    preJobType = auxInitialValuesJobType[0],
    preSector = auxInitialValuesSector[0],
    preDescription = '',
    preStart = moment().format('YYYY-MM-DD'),
    preEnd = moment().format('YYYY-MM-DD'),
}: FormProfileCandidateAddExperienceProps) {
    const [id] = useState(preId);
    const [position, setPosition] = useState(prePosition);
    const [companyName, setCompanyName] = useState(preCompanyName);
    const [locality, setLocality] = useState(preLocality);
    const [typeLocality, setTypeLocality] = useState(preTypeLocality);
    const [jobType, setJobType] = useState(preJobType);
    const [sector, setSector] = useState(preSector);
    const [description, setDescription] = useState(preDescription);
    const [start, setStart] = useState(moment(preStart).format('YYYY-MM-DD'));
    const [end, setEnd] = useState(moment(preEnd).format('YYYY-MM-DD'));

    const handleAddAcademicGraduation = (e: React.FormEvent) => {
        e.preventDefault();
        onAddForm({
            id,
            position,
            company_name: companyName,
            locality,
            type_locality: typeLocality,
            job_type: jobType,
            sector,
            description,
            start,
            end,
        });
    };

    const handleCancelAddGraduation = () => {
        changeVisible(false);
    };

    return (
        <div id="formAddExperience" className="form-add-experience">
            <h3>{title}</h3>
            <form onSubmit={handleAddAcademicGraduation}>
                <InputText
                    type="text"
                    label="Nome do cargo"
                    value={position}
                    onChangeInput={setPosition}
                />
                <InputText
                    type="text"
                    label="Nome da empresa"
                    value={companyName}
                    onChangeInput={setCompanyName}
                />

                <InputText
                    type="text"
                    label="Local"
                    value={locality}
                    onChangeInput={setLocality}
                />
                <div className="row-flex">
                    <InputSelect
                        label="Atuação"
                        value={typeLocality.id}
                        onChange={setTypeLocality}
                        options={auxInitialValuesTypeLocality.map(
                            (typeLoc) => ({
                                label: typeLoc.name,
                                value: typeLoc.id,
                            })
                        )}
                    />
                    <InputSelect
                        label="Tipo de trabalho"
                        value={jobType.id}
                        onChange={setJobType}
                        options={auxInitialValuesJobType.map((jobTy) => ({
                            label: jobTy.name,
                            value: jobTy.id,
                        }))}
                    />
                    <InputSelect
                        label="Setor"
                        value={sector.id}
                        onChange={setSector}
                        options={auxInitialValuesSector.map((sec) => ({
                            label: sec.name,
                            value: sec.id,
                        }))}
                    />
                </div>
                <div className="row-flex">
                    <InputDate
                        label="Data de início"
                        value={start}
                        onChangeInput={setStart}
                    />
                    <InputDate
                        label="Data de término"
                        value={end}
                        onChangeInput={setEnd}
                    />
                </div>
                <InputTextArea
                    label="Descrição"
                    value={description}
                    onChangeInput={setDescription}
                />
                <div className="buttons">
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

export default FormProfileCandidateAddExperience;
