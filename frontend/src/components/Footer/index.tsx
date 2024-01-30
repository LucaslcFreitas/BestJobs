import './styles.sass';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="main">
                    <div>
                        <p>
                            Best <span>Jobs</span>
                        </p>
                        <div>
                            <a href="https://www.facebook.com">
                                <FaFacebook style={{ color: '#3983ff' }} />
                            </a>
                            <a href="https://twitter.com">
                                <FaSquareXTwitter style={{ color: '#000' }} />
                            </a>
                            <a href="https://www.linkedin.com/">
                                <FaLinkedin style={{ color: '#087bb9' }} />
                            </a>
                            <a href="https://www.instagram.com/">
                                <FaInstagram style={{ color: '#bb3995' }} />
                            </a>
                            <a href="https://www.youtube.com">
                                <FaYoutube style={{ color: '#ff0808' }} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <p>Para Candidatos</p>
                        <Link to={'/candidate/profile#top'}>Perfil</Link>
                        <Link to={'/vacancie#top'}>Encontrar Vagas</Link>
                        <Link to={'/candidate/candidacy#top'}>
                            Minhas Candidaturas
                        </Link>
                    </div>
                    <div>
                        <p>Para Empresas</p>
                        <Link to={'/vacancie/create#top'}>Publicar Vagas</Link>
                        <Link to={'/company/myvacancies#top'}>
                            Minhas Vagas
                        </Link>
                    </div>
                </div>
                <p>&copy; Best Jobs - 2024 - Todos os Direitos Reservados</p>
            </div>
        </footer>
    );
}

export default Footer;
