import '../../../styles/components/candidate/profile/ProfileCandidateCardData.sass';
import InputText from '../../InputText';
import InputTextArea from '../../InputTextArea';

type ProfileCandidateCardDataProps = {
    name: string;
    email: string;
    cpf: string;
    description: string;
};

function ProfileCandidateCardData({
    name,
    email,
    cpf,
    description,
}: ProfileCandidateCardDataProps) {
    return (
        <div className="profile-candidate-card-data">
            <InputText
                label="Nome:"
                value={name}
                onChangeInput={() => {}}
                type="text"
                disable={true}
            />
            <InputText
                label="E-mail:"
                value={email}
                onChangeInput={() => {}}
                type="text"
                disable={true}
            />
            <InputText
                label="CPF:"
                value={cpf}
                onChangeInput={() => {}}
                type="text"
                disable={true}
            />
            <InputTextArea
                label="Descrição:"
                value={description}
                onChangeInput={() => {}}
                disable={true}
            />
        </div>
    );
}

export default ProfileCandidateCardData;
export type { ProfileCandidateCardDataProps };
