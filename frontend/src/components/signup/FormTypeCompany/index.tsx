import './styles.sass';
import React from 'react';
import InputText from '../../InputText';
import InputTextArea from '../../InputTextArea';
import ButtonPrimary from '../../ButtonPrimary';
import InputSelect, { OptionSelect } from '../../InputSelect';

type FormTypeCompanyProps = {
    name: string;
    setName: (value: string) => void;
    slogan: string;
    setSlogan: (value: string) => void;
    numberOfEmployeers: string;
    setNumberOfEmployeers: (value: string) => void;
    numberOfEmployeersOptions: OptionSelect[];
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    onSubmit: (e: React.FormEvent | null) => void;
    errorMessage?: string | null;
    inSignup?: boolean;
};

function FormTypeCompany({
    name,
    setName,
    slogan,
    setSlogan,
    numberOfEmployeers,
    setNumberOfEmployeers,
    numberOfEmployeersOptions,
    email,
    setEmail,
    password,
    setPassword,
    description,
    setDescription,
    onSubmit,
    errorMessage = null,
    inSignup = false,
}: FormTypeCompanyProps) {
    return (
        <form onSubmit={onSubmit} className="signup-form-content">
            <InputText
                label="Nome da Empresa"
                value={name}
                onChangeInput={setName}
                type="text"
            />
            <InputText
                label="Slogan da Empresa"
                value={slogan}
                onChangeInput={setSlogan}
                type="text"
            />
            <InputSelect
                label="Número de Funcionários:"
                value={numberOfEmployeers}
                onChange={({ id, name }) => setNumberOfEmployeers(id)}
                options={numberOfEmployeersOptions}
            />
            <InputText
                label="E-mail"
                value={email}
                onChangeInput={setEmail}
                type="text"
            />
            <InputText
                label="Senha"
                value={password}
                onChangeInput={setPassword}
                type="password"
            />
            <InputTextArea
                label="Descrição da Empresa"
                value={description}
                onChangeInput={setDescription}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <ButtonPrimary
                text="Cadastrar"
                onClickButton={() => onSubmit(null)}
                disable={inSignup}
                isSubmit={true}
            />
        </form>
    );
}

export default FormTypeCompany;
