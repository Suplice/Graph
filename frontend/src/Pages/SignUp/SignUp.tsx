import React, { useState } from "react";
import InputField from "../../Components/InputField/InputField";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";
import { FaIdBadge } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import SocialAuthButtons from "../../Components/SignUp/SocialAuthButtons";
import { RegisterDTO } from "../../Dto/RegisterDTO";

const SignUp: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterDTO>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(process.env.REACT_APP_API_URL + "/register", {
        method: "POST",
        body: JSON.stringify(registerData),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

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
              <InputField
                className="flex flex-row border rounded-lg w-full bg-gray-200 pl-2 items-center mt-4 "
                placeholder="First Name"
                value={registerData.firstName}
                onChange={handleInputChange}
                type="text"
                icon={<FaUser size={20} />}
              ></InputField>

              <div className="mb-2 md:mb-1 w-full h-3">
                <p className="text-red-500 ml-1 text-sm text-wrap "></p>
              </div>
            </div>

            <div className="flex flex-col md:w-1/2 w-full md:mt-0 mt-2">
              <InputField
                className="flex flex-row border rounded-lg w-full bg-gray-200 pl-2 items-center mt-4 "
                placeholder="Last Name"
                value={registerData.lastName}
                onChange={handleInputChange}
                type="text"
                icon={<FaIdBadge size={20} />}
              ></InputField>

              <div className="mb-1 w-full h-3">
                <p className="text-red-500 ml-1 text-sm text-wrap "></p>
              </div>
            </div>
          </div>

          <InputField
            className="flex flex-row border rounded-lg mt-2 bg-gray-200 items-center pl-2 "
            placeholder="Email"
            type="email"
            value={registerData.email}
            onChange={handleInputChange}
            icon={<MdEmail size={23} />}
          />

          <div className="mb-2 w-full h-3">
            <p className="text-red-500 ml-1 text-sm text-wrap "></p>
          </div>

          <InputField
            className="flex flex-row border rounded-lg mt-2 bg-gray-200 items-center px-2 "
            placeholder="Password"
            type="password"
            value={registerData.password}
            onChange={handleInputChange}
            icon={<IoIosLock size={23} />}
          />

          <div className=" w-full flex flex-col mb-3 h-3 ">
            <p className="text-red-500 ml-1 text-sm w-3/5 text-wrap pr-2"></p>
          </div>

          <div className="flex justify-center mt-5 ">
            <button
              className="bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xl font-sans transition-colors duration-300 w-full"
              onClick={handleRegister}
            >
              Sign In
            </button>
          </div>
          <div className="flex items-center mt-7">
            <div className="flex-grow border-dotted border-black border"></div>
            <span className="px-4 text-sm text-gray-500">Or Register with</span>
            <div className="flex-grow border-dotted border-black border"></div>
          </div>

          <SocialAuthButtons />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
