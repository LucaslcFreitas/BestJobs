import './styles.sass';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'framer-motion';

type CardPropsContent3 = {
    title: string;
    description: string;
    icon: React.ReactNode;
    animationDelay?: number;
};

function CardContent3({
    title,
    description,
    icon,
    animationDelay = 0,
}: CardPropsContent3) {
    return (
        <motion.div
            className="card-content3"
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.3, delay: animationDelay }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="inner">
                <div className="front">
                    {icon}
                    <p className="title">{title}</p>
                    <p className="description-front">{description}</p>
                    <IoIosArrowDown />
                </div>
                <div className="back">
                    <p className="description-back">{description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default CardContent3;
export type { CardPropsContent3 };
