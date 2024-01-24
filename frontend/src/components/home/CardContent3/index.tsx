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
        </motion.div>
    );
}

export default CardContent3;
export type { CardPropsContent3 };
