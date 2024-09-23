import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";
import { FaIdBadge } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [isFirstNameFocused, setIsFirstNameFocused] = useState<boolean>(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center my-14">
      <div className="w-[450px] pb-10 backdrop-blur-xl  backdrop-brightness-90 rounded-2xl flex flex-col  items-center shadow-[0_0_10px_0_rgba(0,0,0,0.5),0_10px_20px_0_rgba(0,0,0,0.3)]">
        <div className="text-center p-2 flex flex-col items-center mt-3">
          <GiArchiveRegister
            className="bg-white p-3 rounded-xl shadow-lg  shadow-zinc-600 center mx-auto my-5 "
            size={50}
          />
          <h1 className="font-bold text-3xl">Create an account</h1>
          <p className="text-gray-700 my-2 text-wrap w-3/4 text-md font-medium">
            Register now to unlock all features and enhance your graphing
            experience!
          </p>
        </div>

        <div className="flex flex-col justify-center w-4/5 ">
          <div className="flex md:flex-row w-full md:gap-5 flex-col mb-1 ">
            <div className="flex flex-col md:w-1/2 w-full">
              <div
                className={`flex flex-row border rounded-lg w-full bg-gray-200 items-center p-2 mt-4 ${isFirstNameFocused ? "border-slate-400" : ""}`}
              >
                <FaUser size={20} />
                <input
                  className="outline-none bg-transparent ml-2 w-full focus:placeholder-slate-500 text-gray-700  font-serif "
                  placeholder="First Name"
                  onFocus={() => {
                    setIsFirstNameFocused(true);
                  }}
                  onBlur={() => {
                    setIsFirstNameFocused(false);
                  }}
                ></input>
              </div>

              <div className="mb-2 md:mb-1 w-full h-3">
                <p className="text-red-500 ml-1 text-sm text-wrap "></p>
              </div>
            </div>

            <div className="flex flex-col md:w-1/2 w-full md:mt-0 mt-2">
              <div
                className={`flex flex-row border rounded-lg w-full bg-gray-200 items-center p-2 mt-0 md:mt-4 ${isLastNameFocused ? "border-slate-400" : ""}`}
              >
                <FaIdBadge size={20} />
                <input
                  className="outline-none bg-transparent ml-2 w-full focus:placeholder-slate-500 text-gray-700  font-serif "
                  placeholder="Second Name"
                  onFocus={() => {
                    setIsLastNameFocused(true);
                  }}
                  onBlur={() => {
                    setIsLastNameFocused(false);
                  }}
                ></input>
              </div>

              <div className="mb-1 w-full h-3">
                <p className="text-red-500 ml-1 text-sm text-wrap "></p>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-row border rounded-lg mt-2 bg-gray-200 items-center p-2  ${isEmailFocused ? "border-slate-400" : ""}`}
          >
            <MdEmail size={23} />
            <input
              className="outline-none bg-transparent mx-2 w-full  focus:placeholder-slate-500 font-serif "
              placeholder="Email"
              type="email"
              onFocus={() => {
                setIsEmailFocused(true);
              }}
              onBlur={() => {
                setIsEmailFocused(false);
              }}
            ></input>
          </div>
          <div className="mb-2 w-full h-3">
            <p className="text-red-500 ml-1 text-sm text-wrap "></p>
          </div>

          <div
            className={`flex flex-row border rounded-lg mt-2 bg-gray-200 items-center p-2  ${isPasswordFocused ? "border-slate-400" : ""}`}
          >
            <IoIosLock size={25} />
            <input
              className="outline-none bg-transparent mx-2 w-full  focus:placeholder-slate-500 font-serif "
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onFocus={() => {
                setIsPasswordFocused(true);
              }}
              onBlur={() => {
                setIsPasswordFocused(false);
              }}
            ></input>
            {showPassword ? (
              <FaEyeSlash
                size={25}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <FaEye
                size={25}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </div>
          <div className=" w-full flex flex-col mb-3 ">
            <div className="w-full h-4">
              <p className="text-red-500 ml-1 text-sm w-3/5 text-wrap pr-2"></p>
            </div>
          </div>

          <div className="flex justify-center mt-5 ">
            <button className="bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xl font-sans transition-colors duration-300 w-full">
              Sign In
            </button>
          </div>
          <div className="flex items-center mt-7">
            <div className="flex-grow border-dotted border-black border"></div>
            <span className="px-4 text-sm text-gray-500">Or Register with</span>
            <div className="flex-grow border-dotted border-black border"></div>
          </div>
          <div className="flex flex-row text-center gap-4 mt-7">
            <div className="flex-grow bg-slate-200 rounded-md p-2 flex justify-center shadow-md shadow-gray-500 hover:bg-slate-300 transition-colors hover:cursor-pointer">
              <img src="/Images/google.png" alt="Google" className="w-6"></img>
            </div>
            <div className="flex-grow bg-slate-200 rounded-md p-2 flex justify-center shadow-md shadow-gray-500 hover:bg-slate-300 transition-colors hover:cursor-pointer">
              <img
                src="/Images/facebook.png"
                alt="facebook"
                className="w-6"
              ></img>
            </div>
            <div className="flex-grow bg-slate-200 rounded-md p-2 flex justify-center shadow-md shadow-gray-500 hover:bg-slate-300 transition-colors hover:cursor-pointer">
              <img src="/Images/github.png" alt="github" className="w-6"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
