import './styles.sass';
import ButtonPrimary from '../../ButtonPrimary';
import { useNavigate } from 'react-router-dom';

function Content4() {
    const navigate = useNavigate();

    const handleButton = () => {
        navigate('/signin');
    };

    return (
        <div className="content4">
            <h1>Não perca tempo e conquiste seus objetivos!</h1>
            <div>
                <ButtonPrimary
                    text="Quero usar a Best Jobs"
                    onClickButton={handleButton}
                />
            </div>
        </div>
    );
}

export default Content4;
