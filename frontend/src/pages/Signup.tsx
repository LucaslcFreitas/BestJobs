import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Signup.sass';
import { OptionSelect } from '../components/InputSelect';
import { useDispatch } from 'react-redux';
import { startLoad, stopLoad } from '../redux/loader/sliceLoader';

import FormTypeCandidate from '../components/signup/FormTypeCandidate';
import FormTypeCompany from '../components/signup/FormTypeCompany';

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

        setInSignup(true);
        dispatch(startLoad());
        setTimeout(() => {
            setInSignup(false);
            dispatch(stopLoad());
        }, 5000);
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

        setInSignup(true);
        dispatch(startLoad());
        setTimeout(() => {
            setInSignup(false);
            dispatch(stopLoad());
        }, 5000);
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
            <div className="signup-content">
                <div className="signup-type-user">
                    <p
                        className={`${
                            isCandidate ? 'signup-type-checked' : ''
                        }`}
                        onClick={() => handleChangeTypeUser(true)}
                    >
                        Sou Candidato
                    </p>
                    <p
                        className={`${
                            !isCandidate ? 'signup-type-checked' : ''
                        }`}
                        onClick={() => handleChangeTypeUser(false)}
                    >
                        Sou Empresa
                    </p>
                </div>
                <h4>
                    Cadastre {isCandidate ? 'seu currículo' : 'sua empresa'}
                </h4>
                <div className="signup-form">
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
                    <div className="signup-to-signin">
                        <Link to={'/signin'}>Já tenho uma conta</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;
