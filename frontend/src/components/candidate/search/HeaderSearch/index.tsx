import './styles.sass';
import InputSelect from '../../../InputSelect';
import {
    LocalityType,
    SectorType,
    JobType,
} from '../../../../shared/types/VacancieType';

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
}: HeaderSearchProps) {
    return (
        <header className="header-search">
            <div className="header-search-container">
                <div className="header-search-item">
                    <InputSelect
                        options={sectors.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))}
                        label="Setor"
                        value={sector.id}
                        onChange={onChangeSector}
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
                        onChange={onChangeJobType}
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
                        onChange={onChangeLocalityType}
                        light
                    />
                </div>
            </div>
        </header>
    );
}

export default HeaderSearch;
