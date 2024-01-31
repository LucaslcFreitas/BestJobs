import './styles.sass';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OptionSelect } from '../../components/InputSelect';
import { useDispatch } from 'react-redux';
import { startLoad, stopLoad } from '../../redux/loader/sliceLoader';
import api from '../../services/api';
import endpoints from '../../services/endpoints';
import { userLogin } from '../../redux/user/sliceUser';
import { isEmail } from '../../utils/validateEmail';
import { isCPF, formatCPF } from '../../utils/validateCPF';

import FormTypeCandidate from '../../components/signup/FormTypeCandidate';
import FormTypeCompany from '../../components/signup/FormTypeCompany';

const numberOfEmployeersOptions: OptionSelect[] = [
    {
        value: '0 - 50 funcionarios',
        label: '0 - 50 funcionários',
    },
    {
        value: '51 - 100 funcionarios',
        label: '51 - 100 funcionários',
    },
    {
        value: '101 - 200 funcionarios',
        label: '101 - 200 funcionários',
    },
    {
        value: '201 - 500 funcionarios',
        label: '201 - 500 funcionários',
    },
    {
        value: '501 - 1000 funcionarios',
        label: '501 - 1000 funcionários',
    },
    {
        value: '1000+ funcionarios',
        label: '1000+ funcionários',
    },
];

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isCandidate, setIsCandidate] = useState(true);
    const [inSignup, setInSignup] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    //Candidate properties
    const [nameCD, setNameCD] = useState('');
    const [emailCD, setEmailCD] = useState('');
    const [cpfCD, setCpfCD] = useState('');
    const [passwordCD, setPasswordCD] = useState('');
    const [aboutMeCD, setAboutMeCD] = useState('');

    //Company properties
    const [nameCP, setNameCP] = useState('');
    const [sloganCP, setSloganCP] = useState('');
    const [numberOfEmployeersCP, setNumberOfEmployeersCP] = useState(
        numberOfEmployeersOptions[0].value
    );
    const [emailCP, setEmailCP] = useState('');
    const [passwordCP, setPasswordCP] = useState('');
    const [descriptionCP, setDescriptionCP] = useState('');

    const handleSubmit = (e: React.FormEvent | null) => {
        if (e) {
            e.preventDefault();
        }
        setErrorMsg('');
        if (!inSignup) {
            if (isCandidate) signupCandidate();
            else signupCompany();
        }
    };

    const signupCandidate = () => {
        if (!nameCD || !emailCD || !cpfCD || !passwordCD || !aboutMeCD) {
            setErrorMsg('Preencha todos os campos!');
            return;
        }

        if (!isEmail(emailCD)) {
            setErrorMsg('E-mail inválido');
            return;
        }

        if (!isCPF(cpfCD)) {
            setErrorMsg('CPF inválido');
            return;
        }

        setInSignup(true);
        dispatch(startLoad());

        //timeout para fins visuais
        setTimeout(() => {
            api.post(endpoints.SIGNUP_CANDIDATE, {
                name: nameCD,
                email: emailCD,
                cpf: formatCPF(cpfCD),
                password: passwordCD,
                about_me: aboutMeCD,
            })
                .then((response) => {
                    console.log(response);
                    dispatch(
                        userLogin({
                            token: response.data.token,
                            name: response.data.name,
                            email: response.data.email,
                            type: 'Candidate',
                        })
                    );
                    setInSignup(false);
                    dispatch(stopLoad());
                    navigate('/candidate/profile');
                })
                .catch((error) => {
                    console.log(error);
                    switch (error.response.data.error) {
                        case 'Failed to create user':
                            setErrorMsg('Falha ao criar usuário');
                            break;
                        case 'Missing parameters':
                            setErrorMsg('Preencha todos os campos');
                            break;
                        default:
                            setErrorMsg('Falha ao verificar usuário');
                            break;
                    }
                    setInSignup(false);
                    dispatch(stopLoad());
                });
        }, 2000);
    };

    const signupCompany = () => {
        if (
            !nameCP ||
            !sloganCP ||
            !numberOfEmployeersCP ||
            !emailCP ||
            !passwordCP ||
            !descriptionCP
        ) {
            setErrorMsg('Preencha todos os campos!');
            return;
        }

        if (!isEmail(emailCP)) {
            setErrorMsg('E-mail inválido');
            return;
        }

        setInSignup(true);
        dispatch(startLoad());
        setTimeout(() => {
            api.post(endpoints.SIGNUP_COMPANY, {
                name: nameCP,
                slogan: sloganCP,
                number_of_employees: numberOfEmployeersCP,
                email: emailCP,
                password: passwordCP,
                description: descriptionCP,
            })
                .then((response) => {
                    console.log(response);
                    dispatch(
                        userLogin({
                            token: response.data.token,
                            name: response.data.name,
                            email: response.data.email,
                            type: 'Company',
                        })
                    );
                    setInSignup(false);
                    dispatch(stopLoad());
                    navigate('/home');
                })
                .catch((error) => {
                    console.log(error);
                    switch (error.response.data.error) {
                        case 'Failed to create company':
                            setErrorMsg('Falha ao criar usuário');
                            break;
                        case 'Missing parameters':
                            setErrorMsg('Preencha todos os campos');
                            break;
                        default:
                            setErrorMsg('Falha ao verificar usuário');
                            break;
                    }
                    setInSignup(false);
                    dispatch(stopLoad());
                });
        }, 2000);
    };

    const handleChangeTypeUser = (type: boolean) => {
        if (!inSignup) {
            setErrorMsg('');
            setIsCandidate(type);
        }
    };

    return (
        <section className="signup-container">
            <h1>Best Jobs</h1>
            <div className="content">
                <div className="type-user">
                    <p
                        className={`${isCandidate ? 'type-checked' : ''}`}
                        onClick={() => handleChangeTypeUser(true)}
                    >
                        Sou Candidato
                    </p>
                    <p
                        className={`${!isCandidate ? 'type-checked' : ''}`}
                        onClick={() => handleChangeTypeUser(false)}
                    >
                        Sou Empresa
                    </p>
                </div>
                <h4>
                    Cadastre {isCandidate ? 'seu currículo' : 'sua empresa'}
                </h4>
                <div className="form">
                    {isCandidate ? (
                        <FormTypeCandidate
                            name={nameCD}
                            setName={setNameCD}
                            email={emailCD}
                            setEmail={setEmailCD}
                            cpf={cpfCD}
                            setCpf={setCpfCD}
                            password={passwordCD}
                            setPassword={setPasswordCD}
                            aboutMe={aboutMeCD}
                            setAboutMe={setAboutMeCD}
                            onSubmit={handleSubmit}
                            inSignup={inSignup}
                            errorMessage={errorMsg}
                        />
                    ) : (
                        <FormTypeCompany
                            name={nameCP}
                            setName={setNameCP}
                            slogan={sloganCP}
                            setSlogan={setSloganCP}
                            numberOfEmployeers={numberOfEmployeersCP}
                            setNumberOfEmployeers={setNumberOfEmployeersCP}
                            numberOfEmployeersOptions={
                                numberOfEmployeersOptions
                            }
                            email={emailCP}
                            setEmail={setEmailCP}
                            password={passwordCP}
                            setPassword={setPasswordCP}
                            description={descriptionCP}
                            setDescription={setDescriptionCP}
                            onSubmit={handleSubmit}
                            inSignup={inSignup}
                            errorMessage={errorMsg}
                        />
                    )}
                    <div className="to-signin">
                        <Link to={'/signin'}>Já tenho uma conta</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;
