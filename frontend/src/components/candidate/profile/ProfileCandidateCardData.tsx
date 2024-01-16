import { UserType } from '../../../shared/types/UserData';
import '../../../styles/components/candidate/profile/ProfileCandidateCardData.sass';
import InputText from '../../InputText';
import InputTextArea from '../../InputTextArea';

function ProfileCandidateCardData({ name, email, cpf, description }: UserType) {
    return (
        <div className="profile-candidate-card-data">
            <InputText
                label="Nome:"
                value={name}
                onChangeInput={() => {}}
                type="text"
                disable
            />
            <InputText
                label="E-mail:"
                value={email}
                onChangeInput={() => {}}
                type="text"
                disable
            />
            <InputText
                label="CPF:"
                value={cpf}
                onChangeInput={() => {}}
                type="text"
                disable
            />
            <InputTextArea
                label="Descrição:"
                value={description}
                onChangeInput={() => {}}
                disable
            />
        </div>
    );
}

export default ProfileCandidateCardData;
