import React from 'react';
import '../../styles/components/signup/FormTypeSignup.sass';
import InputText from '../InputText';
import InputTextArea from '../InputTextArea';
import ButtonPrimary from '../ButtonPrimary';

type FormTypeCandidateProps = {
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    cpf: string;
    setCpf: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    aboutMe: string;
    setAboutMe: (value: string) => void;
    onSubmit: (e: React.FormEvent | null) => void;
    errorMessage?: string | null;
    inSignup?: boolean;
};

function FormTypeCandidate({
    name,
    setName,
    email,
    setEmail,
    cpf,
    setCpf,
    password,
    setPassword,
    aboutMe,
    setAboutMe,
    onSubmit,
    errorMessage = null,
    inSignup = false,
}: FormTypeCandidateProps) {
    return (
        <form onSubmit={onSubmit} className="signup-form-content">
            <InputText
                label="Nome Completo"
                value={name}
                onChangeInput={setName}
                type="text"
            />
            <InputText
                label="E-mail"
                value={email}
                onChangeInput={setEmail}
                type="text"
            />
            <InputText
                label="CPF (somente números)"
                value={cpf}
                onChangeInput={setCpf}
                type="text"
                maxLength={11}
            />
            <InputText
                label="Senha"
                value={password}
                onChangeInput={setPassword}
                type="password"
            />
            <InputTextArea
                label="Sobre mim"
                value={aboutMe}
                onChangeInput={setAboutMe}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <ButtonPrimary
                text="Cadastrar"
                onClickButton={() => onSubmit(null)}
                disable={inSignup}
            />
        </form>
    );
}

export default FormTypeCandidate;
