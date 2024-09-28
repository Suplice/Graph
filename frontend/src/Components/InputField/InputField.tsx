import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  className: string;
  placeholder: string;
  value: string;
  type: string;
  icon: React.ReactNode;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  className,
  placeholder,
  value,
  type,
  icon,
  name,
  onChange,
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isFocused, setFocus] = useState(false);

  return (
    <div className={className + `${isFocused ? "border-slate-400" : ""}`}>
      {icon}
      <input
        className="outline-none bg-transparent  w-full p-2  focus:placeholder-slate-500 font-serif text-gray-700 "
        placeholder={placeholder}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        autoComplete="off"
        name={name}
        type={type === "password" && isPasswordShown ? "text" : type}
        value={value}
        onChange={onChange}
      ></input>
      {type === "password" ? (
        <>
          {isPasswordShown ? (
            <FaEyeSlash
              size={25}
              onClick={() => {
                setIsPasswordShown(!isPasswordShown);
              }}
            />
          ) : (
            <FaEye
              size={25}
              onClick={() => {
                setIsPasswordShown(!isPasswordShown);
              }}
            />
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputField;
