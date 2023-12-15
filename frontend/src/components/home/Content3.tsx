import '../../styles/components/home/Content3.sass';
import CardContent3, { CardPropsContent3 } from './CardContent3';

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
    },
    {
        title: 'A nº 1 em Contratações',
        description:
            'Temos orgulho de ser a maior companhia de anuncios de vagas em todo Brasil',
        icon: <TbRosetteNumber1 />,
    },
    {
        title: 'O céu é o Limite',
        description:
            'Impusionamos as vagas para que tenha o maior alcance possível',
        icon: <FaChartLine />,
    },
];

function Content3() {
    return (
        <div className="content3">
            <div className="content3-container">
                <h1>A plataforma ideal para sua empresa</h1>
                <div className="content3-cards">
                    {dataCards.map((card, index) => (
                        <CardContent3
                            key={index}
                            title={card.title}
                            description={card.description}
                            icon={card.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Content3;
