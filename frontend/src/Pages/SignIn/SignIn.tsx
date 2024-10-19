import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { LoginDTO } from "../../Dto/loginDTO";
import InputField from "../../Components/InputField/InputField";
import SocialAuthButtons from "../../Components/SignUp/SocialAuthButtons";
import { CircularProgress } from "@mui/material";

const SignIn: React.FC = () => {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const [loginData, setLoginData] = useState<LoginDTO>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleBaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSigningIn(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

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
          <InputField
            direction="right"
            className="flex flex-row border rounded-lg mt-2 bg-gray-200 items-center pl-2 "
            placeholder="Email"
            type="email"
            value={loginData.email}
            onChange={handleInputChange}
            name="email"
            icon={<MdEmail size={23} />}
            validationFunctions={[]}
          />
          <div className="mb-1 w-full h-6">
            <p className="text-red-500 ml-1 text-sm"></p>
          </div>
          <InputField
            direction="right"
            className="flex flex-row border rounded-lg mt-2 bg-gray-200 items-center px-2 "
            placeholder="Password"
            type="password"
            value={loginData.password}
            onChange={handleInputChange}
            name="password"
            icon={<IoIosLock size={23} />}
            validationFunctions={[]}
          />
          <div className=" w-full flex flex-col mb-3 ">
            <div className="w-full h-4">
              <p className="text-red-500 ml-1 text-sm w-3/5 text-wrap pr-2"></p>
            </div>
            <div className="flex flex-row items-center mt-1">
              <input type="checkbox" className="ml-1"></input>
              <p className="ml-1">Remember me</p>
              <p className="w-2/5 text-left ml-auto hover:underline hover:cursor-pointer">
                Forgot Password?
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              disabled={isSigningIn}
              className="bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg h-11 text-xl font-sans transition-colors duration-300 w-full flex justify-center items-center"
              onClick={handleBaseLogin}
            >
              {isSigningIn ? (
                <CircularProgress size={30} color="inherit"></CircularProgress>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
          <div className="flex items-center mt-7">
            <div className="flex-grow border-dotted border-black border"></div>
            <span className="px-4 text-sm text-gray-500">Or Sign with</span>
            <div className="flex-grow border-dotted border-black border"></div>
          </div>
          <SocialAuthButtons />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
