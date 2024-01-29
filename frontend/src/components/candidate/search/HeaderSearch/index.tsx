import './styles.sass';
import InputSelect from '../../../InputSelect';
import {
    LocalityType,
    SectorType,
    JobType,
} from '../../../../shared/types/VacancieType';
import IconButtonSmall from '../../../IconButtonSmall';
import { IoClose } from 'react-icons/io5';

type HeaderSearchProps = {
    sector: SectorType;
    sectors: SectorType[];
    onChangeSector: (newSector: SectorType) => void;
    jobType: JobType;
    jobTypes: JobType[];
    onChangeJobType: (newJobType: JobType) => void;
    localityType: LocalityType;
    localityTypes: LocalityType[];
    onChangeLocalityType: (newLocalityType: LocalityType) => void;
    inView?: boolean;
    closeInView?: (inView: boolean) => void;
};

function HeaderSearch({
    sector,
    sectors,
    onChangeSector,
    jobType,
    jobTypes,
    onChangeJobType,
    localityType,
    localityTypes,
    onChangeLocalityType,
    inView = false,
    closeInView = () => {},
}: HeaderSearchProps) {
    const handleChangeSector = (newSector: SectorType) => {
        onChangeSector(newSector);
        closeInView(false);
    };
    const handleChangeJobType = (newJobType: JobType) => {
        onChangeJobType(newJobType);
        closeInView(false);
    };
    const handleChangeLocalityType = (newLocalityType: LocalityType) => {
        onChangeLocalityType(newLocalityType);
        closeInView(false);
    };

    return (
        <header
            className={`header-search ${inView ? 'header-search-view' : ''}`}
        >
            <div className="header-search-container">
                <div className="header-search-close">
                    <IconButtonSmall
                        backgroundColor="#f2f4fd"
                        color="#3b3b3b"
                        icon={<IoClose />}
                        onClick={() => {
                            closeInView(false);
                        }}
                    />
                </div>
                <div className="header-search-item">
                    <InputSelect
                        options={sectors.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))}
                        label="Setor"
                        value={sector.id}
                        onChange={handleChangeSector}
                        light
                    />
                </div>
                <div className="header-search-item">
                    <InputSelect
                        options={jobTypes.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))}
                        label="Tipo de Trabalho"
                        value={jobType.id}
                        onChange={handleChangeJobType}
                        light
                    />
                </div>
                <div className="header-search-item">
                    <InputSelect
                        options={localityTypes.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))}
                        label="Modelo"
                        value={localityType.id}
                        onChange={handleChangeLocalityType}
                        light
                    />
                </div>
            </div>
        </header>
    );
}

export default HeaderSearch;
