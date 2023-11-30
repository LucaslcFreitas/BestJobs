import '../../styles/components/home/CardContent3.sass';
import { IoIosArrowDown } from 'react-icons/io';

type CardPropsContent3 = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

function CardContent3({ title, description, icon }: CardPropsContent3) {
    return (
        <div className="card-content3">
            <div className="content3-inner">
                <div className="content3-front">
                    {icon}
                    <p className="content3-title">{title}</p>
                    <IoIosArrowDown />
                </div>
                <div className="content3-back">
                    <p className="content3-title">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default CardContent3;
export type { CardPropsContent3 };
