import '../styles/components/SwitchUserLogin.sass';

type SwitchUserLoginProps = {
    typeCandidate: boolean;
    setType: (type: boolean) => void;
};

function SwitchUserLogin({ typeCandidate, setType }: SwitchUserLoginProps) {
    return (
        <div className="switch-user-login">
            <div
                className={`switch-content ${
                    typeCandidate ? 'switch-user-checked' : ''
                }`}
                onClick={() => setType(true)}
            >
                <p>Sou Candidato</p>
            </div>
            <div
                className={`switch-content ${
                    !typeCandidate ? 'switch-user-checked' : ''
                }`}
                onClick={() => setType(false)}
            >
                <p>Sou Empresa</p>
            </div>
        </div>
    );
}

export default SwitchUserLogin;
