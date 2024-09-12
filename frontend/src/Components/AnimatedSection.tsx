import React from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  initialX?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  initialX,
}) => {
  const controls = useAnimation();

  return (
    <motion.section
      className={className}
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onViewportEnter={() => controls.start({ opacity: 1, x: 0 })}
      onViewportLeave={() => controls.start({ opacity: 0, x: initialX })}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
