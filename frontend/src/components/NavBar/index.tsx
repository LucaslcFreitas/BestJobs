import './styles.sass';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginLogout, useUser } from '../../redux/user/sliceUser';
import { MdWork } from 'react-icons/md';
import { IoExitOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import ButtonPrimary from '../ButtonPrimary';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const user = useSelector(useUser);

    console.log(user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleHome = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/signin');
    };

    const handleLogout = () => {
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
        <nav className="navbar" id="top">
            <div className="navbar-container">
                <div className="nav-title">
                    <h1 onClick={handleHome}>
                        Best <span>Jobs</span>
                    </h1>
                    <MdWork />
                </div>

                <div className="nav-links">
                    {!user.token ? (
                        <>
                            <Link className="nav-link" to="/signin">
                                Candidato
                            </Link>
                            <Link className="nav-link" to="/signin">
                                Empresa
                            </Link>
                        </>
                    ) : user.type === 'Candidate' ? (
                        <>
                            <Link className="nav-link" to="/candidate/profile">
                                Perfil
                            </Link>
                            <Link className="nav-link" to="/vacancie">
                                Encontrar Vagas
                            </Link>
                            <Link
                                className="nav-link"
                                to="/candidate/candidacy"
                            >
                                Minhas Candidaturas
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/vacancie/create">
                                Criar Vaga
                            </Link>
                            <Link
                                className="nav-link"
                                to="/company/myvacancies"
                            >
                                Minhas Vagas
                            </Link>
                        </>
                    )}
                </div>

                <div className="nav-user">
                    {user.token ? (
                        <>
                            <p>{user.name}</p>
                            <IoExitOutline onClick={handleLogout} />
                        </>
                    ) : (
                        <>
                            <ButtonPrimary
                                text="Entrar"
                                onClickButton={handleLogin}
                            />
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
