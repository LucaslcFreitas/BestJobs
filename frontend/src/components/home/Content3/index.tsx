import './styles.sass';
import CardContent3, { CardPropsContent3 } from '../CardContent3';

//Cards icons
import { BsCashCoin } from 'react-icons/bs';
import { TbRosetteNumber1 } from 'react-icons/tb';
import { FaChartLine } from 'react-icons/fa6';

const dataCards: CardPropsContent3[] = [
    {
        title: 'Livre de Taxas',
        description:
            'Plataforma totalmente livre de cobranças, tanto para empresas quanto para candidatos',
        icon: <BsCashCoin />,
        animationDelay: 0.2,
    },
    {
        title: 'A nº 1 em Contratações',
        description:
            'Temos orgulho de ser a maior companhia de anuncios de vagas em todo Brasil',
        icon: <TbRosetteNumber1 />,
        animationDelay: 0.4,
    },
    {
        title: 'O céu é o Limite',
        description:
            'Impusionamos as vagas para que tenha o maior alcance possível',
        icon: <FaChartLine />,
        animationDelay: 0.6,
    },
];

function Content3() {
    return (
        <div className="content3">
            <div className="container">
                <h2>A plataforma ideal para sua empresa</h2>
                <div className="cards">
                    {dataCards.map((card, index) => (
                        <CardContent3 key={index} {...card} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Content3;
