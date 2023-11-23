import '../styles/components/NavBar.sass';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginLogout, useUser } from '../redux/user/sliceUser';

function NavBar() {
    const user = useSelector(useUser);

    console.log(user);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            userLoginLogout({
                token: 'teste',
                name: 'teste',
                email: 'teste',
                type: 'candidacy',
            })
        );
    };

    return (
        <nav>
            <h1 onClick={handleClick}>Best Jobs</h1>
        </nav>
    );
}

export default NavBar;
