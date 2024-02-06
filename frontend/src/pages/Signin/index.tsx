import './styles.sass';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLoad, stopLoad } from '../../redux/loader/sliceLoader';
import { userLogin } from '../../redux/user/sliceUser';
import api from '../../services/api';
import endpoints from '../../services/endpoints';
import { isEmail } from '../../utils/validateEmail';

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

    useEffect(() => {
        document.title = 'Login | Best Jobs';
    }, []);

    const handleLogin = (e: React.FormEvent | null) => {
        if (e) {
            e.preventDefault();
        }
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage('Preencha todos os campos!');
            return;
        }

        if (!isEmail(email)) {
            setErrorMessage('E-mail inválido');
            return;
        }

        if (!inLogin) {
            setInLogin(true);
            dispatch(startLoad());
            setEmailError('');

            //timeout para fins visuais
            const timeout = setTimeout(() => {
                api.post(
                    isCandidate
                        ? endpoints.LOGIN_CANDIDATE
                        : endpoints.LOGIN_COMPANY,
                    {
                        email,
                        password,
                    }
                )
                    .then((response) => {
                        console.log(response);
                        dispatch(
                            userLogin({
                                token: response.data.token,
                                name: response.data.name,
                                email: response.data.email,
                                type:
                                    response.data.type === 'candidate'
                                        ? 'Candidate'
                                        : 'Company',
                            })
                        );
                        setInLogin(false);
                        dispatch(stopLoad());
                        navigate('/home');
                    })
                    .catch((error) => {
                        console.log(error);
                        switch (error.response.data.error) {
                            case 'Invalid credentials':
                                setErrorMessage('Credenciais inválidas');
                                break;
                            case 'User already exists':
                                setErrorMessage('Usuário inexistente');
                                break;
                            case 'Missing parameters':
                                setErrorMessage('Preencha todos os campos');
                                break;
                            default:
                                setErrorMessage('Falha ao verificar usuário');
                                break;
                        }
                        setInLogin(false);
                        dispatch(stopLoad());
                    });
            }, 1000);

            return () => {
                dispatch(stopLoad());
                clearTimeout(timeout);
            };
        }
    };

    return (
        <section className="signin-container">
            <h1>Best Jobs</h1>
            <div className="content">
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
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <ButtonPrimary
                        text="Entrar"
                        onClickButton={() => handleLogin(null)}
                        disable={inLogin}
                        isSubmit={true}
                    />
                    <div className="not-user">
                        <Link to={'/signup'}>Quero me cadastrar</Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Signin;
