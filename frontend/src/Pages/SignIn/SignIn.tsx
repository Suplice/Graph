import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center my-14">
      <div className="w-[400px] h-[575px] backdrop-blur-xl  backdrop-brightness-90 rounded-2xl flex flex-col  items-center shadow-[0_0_10px_0_rgba(0,0,0,0.5),0_10px_20px_0_rgba(0,0,0,0.3)]">
        <div className="text-center p-2 flex flex-col items-center">
          <FiLogIn
            className="bg-white p-3 rounded-xl shadow-lg  shadow-zinc-600 center mx-auto my-5 "
            size={50}
          />
          <h1 className="font-bold text-2xl">Sign in with email</h1>
          <p className="text-gray-600 my-1 text-wrap w-3/4">
            improve your graphing experience for free!
          </p>
        </div>

        <div className="flex flex-col justify-center w-4/5">
          <div
            className={`flex flex-row border rounded-lg bg-gray-200 items-center p-2 mt-4 ${isEmailFocused ? "border-slate-400" : ""}`}
          >
            <MdEmail size={25} />
            <input
              className="outline-none bg-transparent ml-2 w-full focus:placeholder-slate-500 text-gray-700  font-serif "
              placeholder="Email"
              onFocus={() => {
                setIsEmailFocused(true);
              }}
              onBlur={() => {
                setIsEmailFocused(false);
              }}
            ></input>
          </div>
          <div className="mb-1 w-full h-6">
            <p className="text-red-500 ml-1 text-sm"></p>
          </div>
          <div
            className={`flex flex-row border rounded-lg bg-gray-200 items-center p-2  ${isPasswordFocused ? "border-slate-400" : ""}`}
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
          <div className="mb-3 w-full h-6 flex flex-row justify-between">
            <p className="text-red-500 ml-1 text-sm w-3/5 text-wrap pr-2"></p>
            <p className="w-2/5 text-left ml-auto hover:underline hover:cursor-pointer">
              Forgot Password?
            </p>
          </div>

          <div className="flex justify-center mt-3">
            <button className="bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xl font-sans transition-colors duration-300 w-full">
              Get Started
            </button>
          </div>
          <div className="flex items-center mt-7">
            <div className="flex-grow border-dotted border-black border"></div>
            <span className="px-4 text-sm text-gray-500">Or Sign with</span>
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

export default SignIn;
