import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

interface ErrorMessageProps {
  isVisible: boolean;
  onClose: () => void;
  duration: number;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  isVisible,
  onClose,
  duration,
  message,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 mx-auto bg-red-500 text-white p-4 shadow-md text-center sm:w-[500px] rounded-md w-[250px]"
          style={{ marginTop: "20px" }}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-center">{message}</p>
            <button
              onClick={onClose}
              className="ml-4 text-white hover:text-red-200"
            >
              &times;
            </button>
          </div>
          {/* Time bar */}
          <div className="relative w-full h-1 mt-2 bg-red-300 rounded">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: 0 }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className="absolute top-0 left-0 h-full bg-red-700 rounded"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
