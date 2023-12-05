import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Signin.sass';

import InputText from '../components/InputText';
import SwitchUserLogin from '../components/SwitchUserLogin';
import ButtonPrimary from '../components/ButtonPrimary';

function Signin() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [isCandidate, setIsCandidate] = useState(true);

    const [inLogin, setInLogin] = useState(false);

    const handleLogin = (e: React.FormEvent | null) => {
        if (e) e.preventDefault();

        if (!inLogin) {
            setInLogin(true);
            setEmailError('');
            console.log('foi');

            setTimeout(() => {
                setInLogin(false);
            }, 5000);
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
                    <ButtonPrimary
                        text="Entrar"
                        onClickButton={() => handleLogin(null)}
                        disable={inLogin}
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
