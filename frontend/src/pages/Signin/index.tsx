import './styles.sass';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLoad, stopLoad } from '../../redux/loader/sliceLoader';

import InputText from '../../components/InputText';
import SwitchUserLogin from '../../components/SwitchUserLogin';
import ButtonPrimary from '../../components/ButtonPrimary';

function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [isCandidate, setIsCandidate] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const [inLogin, setInLogin] = useState(false);

    const handleLogin = (e: React.FormEvent | null) => {
        if (e) {
            e.preventDefault();
        }
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage('Preencha todos os campos!');
            return;
        }

        if (!inLogin) {
            setInLogin(true);
            dispatch(startLoad());
            setEmailError('');

            setTimeout(() => {
                setInLogin(false);
                dispatch(stopLoad());
                navigate('/home');
            }, 3000);
        }
    };

    return (
        <section className="signin-container">
            <h1>Best Jobs</h1>
            <div className="signin-content">
                <h3>É bom te ver de volta</h3>
                <form onSubmit={handleLogin}>
                    <InputText
                        type="text"
                        label="E-mail"
                        value={email}
                        onChangeInput={(value: string) => setEmail(value)}
                        error={emailError}
                    />
                    <InputText
                        type="password"
                        label="Senha"
                        value={password}
                        onChangeInput={(value: string) => setPassword(value)}
                    />
                    <SwitchUserLogin
                        typeCandidate={isCandidate}
                        setType={setIsCandidate}
                    />
                    {errorMessage && (
                        <p className="signup-error">{errorMessage}</p>
                    )}
                    <ButtonPrimary
                        text="Entrar"
                        onClickButton={() => handleLogin(null)}
                        disable={inLogin}
                        isSubmit={true}
                    />
                    <div className="signin-not-user">
                        <Link to={'/signup'}>Quero me cadastrar</Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Signin;
