import { motion } from "framer-motion";
import React from "react";
import { FcCheckmark } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";

interface InputValidationInfoProps {
  validationResults: { message: string; isValid: boolean }[];
}

const InputValidationInfo: React.FC<InputValidationInfoProps> = ({
  validationResults,
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.01 }}
      className="absolute lg:w-[360px] w-[250px]  px-4 py-2 text-sm shadow-lg z-10 bg-gradient-to-r from-blue-100 via-stone-300 to-blue-100 rounded-3xl 
  transition-all duration-300 hover:shadow-2xl hover:from-blue-200 hover:to-blue-200  "
    >
      {validationResults.map((result, index) => (
        <div key={index} className="flex items-center h-8 my-1 ">
          {result.isValid ? (
            <FcCheckmark className="min-w-5 min-h-5" />
          ) : (
            <FcHighPriority className="min-w-5 min-h-5" />
          )}
          <p
            className={
              result.isValid
                ? "text-green-900 ml-2 font-semibold leading-tight"
                : "ml-2 font-semibold leading-tight "
            }
          >
            {result.message}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

export default InputValidationInfo;
