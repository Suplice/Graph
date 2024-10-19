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
    <div
      className={`absolute border p-2 text-sm bg-white shadow-md rounded-md z-10 w-fit`}
    >
      {validationResults.map((result, index) => (
        <div key={index} className="flex items-center w-fit h-8">
          {result.isValid ? (
            <FcCheckmark className="lg:min-w-6 lg:min-h-6 min-h-3 min-w-3" />
          ) : (
            <FcHighPriority className="lg:min-w-6 lg:min-h-6 min-h-3 min-w-3" />
          )}
          <p
            className={
              result.isValid ? "text-green-500 ml-2" : "text-red-500 ml-2"
            }
          >
            {result.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default InputValidationInfo;
