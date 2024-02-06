import './styles.sass';
import ButtonPrimary from '../../ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUser } from '../../../redux/user/sliceUser';

function Content4() {
    const navigate = useNavigate();

    const user = useSelector(useUser);

    const handleButton = () => {
        if (!user.token) navigate('/signin');
        else if (user.type === 'Candidate') navigate('/candidate/candidacy');
        else navigate('/vacancie/create');
    };

    return (
        <div className="content4">
            <h2>Não perca tempo e conquiste seus objetivos!</h2>
            <div>
                <ButtonPrimary
                    text={
                        !user.token
                            ? 'Quero usar a Best Jobs'
                            : user.type === 'Candidate'
                            ? 'Encontrar Vagas'
                            : 'Criar Vaga'
                    }
                    onClickButton={handleButton}
                />
            </div>
        </div>
    );
}

export default Content4;
