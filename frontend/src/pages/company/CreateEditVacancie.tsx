import { useEffect, useState } from 'react';
import '../../styles/pages/company/CreateEditVacancie.sass';
import { useParams } from 'react-router-dom';
import {
    SectorType,
    JobType,
    LocalityType,
    SkillType,
} from '../../shared/types/VacancieType';
import InputText from '../../components/InputText';
import InputTextArea from '../../components/InputTextArea';
import InputSelect from '../../components/InputSelect';
import ButtonPrimary from '../../components/ButtonPrimary';
import SkillCard from '../../components/company/createEditVacancie/SkillCard';

const sectorsData: SectorType[] = [
    {
        id: 'd7e4d20f-4957-4486-b532-a6a3b5022f11',
        name: 'Administração',
    },
    {
        id: '0b76adb3-5bf9-487b-8104-1e7b55424268',
        name: 'Recursos Humanos',
    },
    {
        id: 'fa651483-b2ee-4665-9599-1758c6bf18f0',
        name: 'Financeiro',
    },
    {
        id: '3aaa7e2e-7826-4a25-825d-094be351ac49',
        name: 'Marketing e Vendas',
    },
    {
        id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
        name: 'Tecnologia da Informação',
    },
];

const jobTypeData: JobType[] = [
    {
        id: 'e538fddc-762a-448b-be71-28b3545cd12d',
        name: 'Tempo Integral',
    },
    {
        id: '74bafd17-09bf-4eb1-838e-8d1a200800c1',
        name: 'Estágio',
    },
    {
        id: 'b76bad37-b149-49d2-a01d-e2e47e98b802',
        name: 'Prestador de Serviços',
    },
];

const localityTypeData: LocalityType[] = [
    {
        id: '13e072dd-0248-43e2-9e93-1db8f4987250',
        name: 'Romoto',
    },
    {
        id: 'db113946-2467-4c27-aece-6a24f9631271',
        name: 'Presencial',
    },
    {
        id: '9be69eac-a6e4-4fd8-962b-b32bdcdbd671',
        name: 'Híbrido',
    },
];

function CreateEditVacancie() {
    const { id } = useParams();

    //States
    //Form
    const [namePosition, setNamePosition] = useState('');
    const [locality, setLocality] = useState('');
    const [salaryExpectation, setSalaryExpectation] = useState(0);
    const [about, setAbout] = useState('');
    const [jobType, setJobType] = useState<JobType>();
    const [typeLocality, setTypeLocality] = useState<LocalityType>();
    const [sector, setSector] = useState<SectorType>();
    const [auxSkill, setAuxSkill] = useState<SkillType>();
    const [mySkills, setMySkills] = useState<SkillType[]>([]);
    //PreLoads
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);
    const [typeLocalitys, setTypeLocalitys] = useState<LocalityType[]>([]);
    const [sectors, setSectors] = useState<SectorType[]>([]);
    const [skills, setSkills] = useState<SkillType[]>([]);

    //Carregar dados API
    useEffect(() => {
        const tmpTimeout = setTimeout(() => {
            setSectors(sectorsData);
            setSector(sectorsData[0]);
            setJobTypes(jobTypeData);
            setJobType(jobTypeData[0]);
            setTypeLocalitys(localityTypeData);
            setTypeLocality(localityTypeData[0]);
        }, 3000);

        return () => {
            clearTimeout(tmpTimeout);
        };
    }, []);

    //Reset
    useEffect(() => {
        setMySkills([]);
    }, [skills]);

    //Buscar a vaga em caso de edit
    useEffect(() => {
        console.log('id:' + id);
    }, [id]);

    const handleCreateEditVacancie = () => {
        console.log('CreateEditVacancie');
    };

    const handleDeleteSkill = (skill: SkillType) => {
        console.log(skill.name);
    };

    return (
        <section className="create-vacancie-container">
            <header>
                <h1>{id ? 'Editar' : 'Criar'} Vaga</h1>
            </header>
            <form className="create-vacancie-form">
                <div className="create-vacancie-form-part">
                    <h3>Dados da Vaga</h3>
                    <div className="create-vacancie-input-container">
                        <InputText
                            label="Nome da Vaga"
                            type="text"
                            value={namePosition}
                            onChangeInput={setNamePosition}
                        />
                    </div>
                    <div className="create-vacancie-input-container">
                        <InputText
                            label="Local de Atuação"
                            type="text"
                            value={locality}
                            onChangeInput={setLocality}
                        />
                    </div>
                    <div className="create-vacancie-input-container">
                        <InputText
                            label="Expectativa Salarial"
                            type="number"
                            value={`${salaryExpectation}`}
                            onChangeInput={(value) =>
                                setSalaryExpectation(Number(value))
                            }
                        />
                    </div>
                    <div className="create-vacancie-input-container">
                        <InputTextArea
                            label="Descrição da Área"
                            value={about}
                            onChangeInput={setAbout}
                        />
                    </div>
                </div>
                <div className="create-vacancie-form-part">
                    <h3>Características da Vaga</h3>
                    <div className="create-vacancie-input-container">
                        <InputSelect
                            label="Tipo de Trabalho"
                            value={jobType?.id || ''}
                            options={jobTypes.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            onChange={setJobType}
                        />
                    </div>
                    <div className="create-vacancie-input-container">
                        <InputSelect
                            label="Modelo"
                            value={typeLocality?.id || ''}
                            options={typeLocalitys.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            onChange={setTypeLocality}
                        />
                    </div>
                    <div className="create-vacancie-input-container">
                        <InputSelect
                            label="Setor da Vaga"
                            value={sector?.id || ''}
                            options={sectors.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            onChange={setSector}
                        />
                    </div>
                    <div className="create-vacancie-input-container">
                        <InputSelect
                            label="Habilidades"
                            value={auxSkill?.id || ''}
                            options={skills.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            onChange={({ id, name }) =>
                                setAuxSkill({
                                    id: id,
                                    name: name,
                                    id_sector: '',
                                })
                            }
                        />
                    </div>
                    <div className="create-vacancie-skills">
                        <SkillCard
                            skill={{
                                id: '1',
                                name: 'Javascript',
                                id_sector: '1',
                            }}
                            onDelete={handleDeleteSkill}
                        />
                        <SkillCard
                            skill={{ id: '2', name: 'HTML', id_sector: '2' }}
                            onDelete={handleDeleteSkill}
                        />
                        <SkillCard
                            skill={{ id: '3', name: 'CSS', id_sector: '3' }}
                            onDelete={handleDeleteSkill}
                        />
                        <SkillCard
                            skill={{ id: '4', name: 'React', id_sector: '4' }}
                            onDelete={handleDeleteSkill}
                        />
                        <SkillCard
                            skill={{ id: '5', name: 'SQL', id_sector: '5' }}
                            onDelete={handleDeleteSkill}
                        />
                        <SkillCard
                            skill={{ id: '6', name: 'Node', id_sector: '6' }}
                            onDelete={handleDeleteSkill}
                        />
                    </div>
                    <div className="create-vacancie-button">
                        <div className="create-vacancie-button-container">
                            <ButtonPrimary
                                text={id ? 'Salvar' : 'Publicar'}
                                isSubmit
                                onClickButton={handleCreateEditVacancie}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default CreateEditVacancie;
