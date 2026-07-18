import { motion } from "motion/react";

const ScrollReveal = ({
    children,
    direction = "up",
    delay = 0
}) => {

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 80 : 0,
            x: direction === "left" ? -80 : direction === "right" ? 80 : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: .8,
                delay
            }
        }
    }

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: .25 }}
        >
            {children}
        </motion.div>
    )
}

export default ScrollReveal