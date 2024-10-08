import React from "react";

interface InputValidationInfoProps {
  direction: "left" | "right";
}

const InputValidationInfo: React.FC<InputValidationInfoProps> = ({
  direction,
}) => {
  return (
    <div
      className={`absolute border  p-2 text-sm bg-white shadow-md rounded-md z-10 w-fit
        
      `}
    >
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
      <p>dddddddddddddd</p>
    </div>
  );
};

export default InputValidationInfo;
