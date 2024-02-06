import './styles.sass';
import { SkillType } from '../../../../shared/types/VacancieType';
import { IoClose } from 'react-icons/io5';

type SkillCardProps = {
    skill: SkillType;
    onDelete: (skill: SkillType) => void;
};

function SkillCard({ skill, onDelete }: SkillCardProps) {
    return (
        <div className="skill-card">
            <p>{skill.name}</p>
            <IoClose onClick={() => onDelete(skill)} />
        </div>
    );
}

export default SkillCard;
