import '../styles/components/Footer.sass';
import { useDispatch } from 'react-redux';
import { userLoginLogout } from '../redux/user/sliceUser';

function Footer() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            userLoginLogout({
                token: null,
                name: null,
                email: null,
                type: null,
            })
        );
    };

    return (
        <footer>
            <h1 onClick={handleClick}>Best Jobs</h1>
        </footer>
    );
}

export default Footer;
