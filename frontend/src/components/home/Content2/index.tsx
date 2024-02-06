import './styles.sass';
import CardContent2, { CardPropsContent2 } from '../CardContent2';

import ImgBackground from '../../../assets/home-content2-img.png';

//CardIcons
import { BsWindowFullscreen } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';

const dataCards: CardPropsContent2[] = [
    {
        title: 'Plataforma de emprego gratuita',
        description:
            'Empresas de todo Brasil publicam suas vagas em nossa plataforma, para que você possa participar dos processos seletivos. Totalmente gratúito.',
        icon: <BsWindowFullscreen />,
    },
    {
        title: 'Vagas para todo tipo de perfil',
        description:
            'Não importa se é para seu primeiro emprego ou uma recolocação no mercado, nós temos a vaga ideal.',
        icon: <FaUsers />,
    },
    {
        title: 'Grandes empresas do mercado',
        description:
            'Nossa plataforma possui mais de 5.000 empresas cadastradas. Com certeza alguma delas possui seu estilo',
        icon: <BiWorld />,
    },
];

function Content2() {
    return (
        <div className="content2">
            <h2>O site mais completo de 2023</h2>
            <div className="content2-container">
                <div className="texts">
                    <h3>Te apoiamos em sua jornada</h3>
                    {dataCards.map((card, index) => (
                        <CardContent2
                            key={index}
                            title={card.title}
                            description={card.description}
                            icon={card.icon}
                        />
                    ))}
                </div>
                <div className="image">
                    <img src={ImgBackground} alt="O site mais completo" />
                </div>
            </div>
        </div>
    );
}

export default Content2;
