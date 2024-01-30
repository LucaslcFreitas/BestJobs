import './styles.sass';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigate } from 'react-router-dom';

function NotAuthorized() {
    const navigate = useNavigate();

    return (
        <div className="not-authorized">
            <h2>Acesso não autorizado</h2>
            <p>
                Você está vendo esta mensagem porque não foi autorizado a
                acessar esta página!
            </p>
            <div className="button-container">
                <ButtonPrimary
                    text="Ir para Home"
                    onClickButton={() => {
                        navigate('/');
                    }}
                />
            </div>
        </div>
    );
}

export default NotAuthorized;
