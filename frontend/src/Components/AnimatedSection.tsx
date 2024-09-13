import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  initialX?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  initialX = 0,
}) => {
  const controls = useAnimation();

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: initialX }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onViewportEnter={() =>
        controls.start({
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: "easeInOut" },
        })
      }
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
