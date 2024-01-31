import React, { useState, useEffect } from 'react';
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
import LoaderLocal from '../../../LoaderLocal';
import api from '../../../../services/api';
import endpoints from '../../../../services/endpoints';

type FormProfileCandidateAddExperienceProps = {
    title: string;
    onAddForm: (experience: ExperienceType) => void;
    changeVisible: (show: boolean) => void;
    addOperation?: boolean;
    closeOnAdd?: boolean;
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

function FormProfileCandidateAddExperience({
    title,
    onAddForm,
    changeVisible,
    addOperation = true,
    closeOnAdd = false,
    preId = '',
    prePosition = '',
    preCompanyName = '',
    preLocality = '',
    preTypeLocality = undefined,
    preJobType = undefined,
    preSector = undefined,
    preDescription = '',
    preStart = moment().format('YYYY-MM-DD'),
    preEnd = moment().format('YYYY-MM-DD'),
}: FormProfileCandidateAddExperienceProps) {
    const [id] = useState(preId);
    const [position, setPosition] = useState(prePosition);
    const [companyName, setCompanyName] = useState(preCompanyName);
    const [locality, setLocality] = useState(preLocality);
    const [typeLocality, setTypeLocality] = useState<LocalityType | undefined>(
        preTypeLocality
    );
    const [jobType, setJobType] = useState<JobType | undefined>(preJobType);
    const [sector, setSector] = useState<SectorType | undefined>(preSector);
    const [description, setDescription] = useState(preDescription);
    const [start, setStart] = useState(moment(preStart).format('YYYY-MM-DD'));
    const [end, setEnd] = useState(moment(preEnd).format('YYYY-MM-DD'));

    const [typeLocalitys, setTypeLocalitys] = useState<LocalityType[]>([]);
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);
    const [sectors, setSectors] = useState<SectorType[]>([]);

    //Load study area
    const [typeLocalityLoading, setTypeLocalityLoading] = useState(true);
    const [jobTypeLoading, setJobTypeLoading] = useState(true);
    const [sectorLoading, setSectorLoading] = useState(true);

    //Erros
    const [errorLoading, setErrorLoading] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        api.get(endpoints.GET_TYPE_LOCALITY)
            .then((response) => {
                setTypeLocalitys(response.data);
                if (typeLocality == undefined)
                    setTypeLocality(response.data[0]);
                setTypeLocalityLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorLoading('Falha ao carregar formulário');
                setTypeLocalityLoading(false);
            });
        api.get(endpoints.GET_JOB_TYPE)
            .then((response) => {
                setJobTypes(response.data);
                if (jobType == undefined) setJobType(response.data[0]);
                setJobTypeLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorLoading('Falha ao carregar formulário');
                setJobTypeLoading(false);
            });
        api.get(endpoints.GET_SECTOR)
            .then((response) => {
                setSectors(response.data);
                if (sector == undefined) setSector(response.data[0]);
                setSectorLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorLoading('Falha ao carregar formulário');
                setSectorLoading(false);
            });
    }, []);

    const handleAddAcademicGraduation = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (
            !position ||
            !companyName ||
            !locality ||
            !description ||
            !start ||
            !end
        ) {
            setErrorMsg('Preencha todos os campos');
            return;
        }

        if (!moment(start).isBefore(moment(end))) {
            setErrorMsg('Datas inválidas');
            return;
        }

        onAddForm({
            id,
            position,
            company_name: companyName,
            locality,
            type_locality: typeLocality!,
            job_type: jobType!,
            sector: sector!,
            description,
            start,
            end,
        });

        if (closeOnAdd) {
            changeVisible(false);
        }
    };

    const handleCancelAddGraduation = () => {
        changeVisible(false);
    };

    return (
        <div id="formAddExperience" className="form-add-experience">
            {typeLocalityLoading || jobTypeLoading || sectorLoading ? (
                <LoaderLocal
                    show={
                        typeLocalityLoading || jobTypeLoading || sectorLoading
                    }
                />
            ) : errorLoading === '' ? (
                <>
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
                                value={typeLocality!.id}
                                onChange={setTypeLocality}
                                options={typeLocalitys.map((typeLoc) => ({
                                    label: typeLoc.name,
                                    value: typeLoc.id,
                                }))}
                            />
                            <InputSelect
                                label="Tipo de trabalho"
                                value={jobType!.id}
                                onChange={setJobType}
                                options={jobTypes.map((jobTy) => ({
                                    label: jobTy.name,
                                    value: jobTy.id,
                                }))}
                            />
                            <InputSelect
                                label="Setor"
                                value={sector!.id}
                                onChange={setSector}
                                options={sectors.map((sec) => ({
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

export default FormProfileCandidateAddExperience;
