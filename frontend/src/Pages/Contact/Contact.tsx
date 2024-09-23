import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import { RiWechatLine } from "react-icons/ri";
import { PiXLogoBold } from "react-icons/pi";
import { PiXLogoFill } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import "react-international-phone/style.css";
import "./Contact.css";

const Contact: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  return (
    <>
      <div className=" flex flex-col items-center min-h-screen">
        <div className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium mt-10">
          Contact our team
        </div>
        <div className="text-center mt-2 lg:mt-6 mb-4 lg:mb-10 text-sm md:text-lg font-serif">
          <p>
            Got any questions about the product or scaling on our platform?
            We're here to help.
          </p>
          <p>
            Chat to our friendly team 24/7 and get onboard in less than 5
            minutes.
          </p>
        </div>
        <div className="my-10 md:my-14 lg:my-16 xl:my-20 flex flex-col md:flex-row gap-10  w-full md:w-3/4 ">
          <div className="w-full md:w-3/5 flex flex-row flex-wrap ">
            <div className="w-full md:w-1/2 px-1 lg:pr-4 xl:pr-10">
              <label className="font-semibold pl-2">First Name</label>
              <input
                type="text"
                className="w-full border-2 rounded-xl border-gray-300 p-2 lg:p-3 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500"
                placeholder="First Name"
              ></input>
              <p className="text-sm text-red-500 pl-2 ">error</p>
            </div>

            <div className="w-full md:w-1/2 px-1 lg:pr-4 xl:pr-10 md:mt-0 mt-2">
              <label className="font-semibold pl-2 h-5">Last Name</label>
              <input
                type="text"
                className="w-full border-2 rounded-xl border-gray-300 p-2 lg:p-3 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500"
                placeholder="Last Name"
              ></input>
              <p className="text-sm text-red-500 pl-2 h-5">error</p>
            </div>

            <div className="w-full px-1 lg:pr-4 xl:pr-10">
              <label className="font-semibold pl-2">Email Addres</label>
              <input
                type="text"
                className="w-full border-2 rounded-xl border-gray-300 p-2 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500"
                placeholder="you@example.com"
              ></input>
              <p className="text-sm text-red-500 pl-2 h-5">error</p>
            </div>

            <div className="w-full px-1 lg:pr-4  xl:pr-10">
              <label className="font-semibold pl-2">Phone Number</label>
              <PhoneInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                defaultCountry="pl"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                className={`w-full border-2 rounded-xl border-gray-300 p-1 focus:outline-none bg-white ${isFocused ? "border-slate-500" : "border-gray-300"}`}
                inputClassName="customInput"
                countrySelectorStyleProps={{
                  buttonClassName: "countrySelectorButton",
                }}
              />
              <p className="text-sm text-red-500 pl-2 h-5">error</p>
            </div>

            <div className="w-full px-1 lg:pr-4  xl:pr-10 ">
              <label className="font-semibold pl-2">Message</label>
              <textarea
                className="w-full border-2 rounded-xl border-gray-300 p-2 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500 scrollbar-none resize-none"
                placeholder="Leave us a message..."
                rows={5}
                maxLength={200} // Set a maximum length for the message
                onChange={(e) => setCharacterCount(e.target.value.length)}
              />
              <div className="flex flex-row">
                <p className="text-sm text-red-500 -translate-y-1 pl-2 h-5 w-1/2"></p>
                <p className="text-right -translate-y-1  font-normal text-sm md:text-base w-1/2">
                  ({characterCount}/200)
                </p>
              </div>
            </div>

            <div className="w-full px-1 lg:pr-4 lg:mt-4 xl:pr-10">
              <button className="w-full bg-slate-900 text-white hover:bg-slate-800 duration-300  transition-colors rounded-lg py-3 mt-5 font-sans text-md">
                Send Message
              </button>
            </div>
          </div>

          <div className="md:w-2/5 w-full ">
            <div className="w-full flex flex-col">
              <h1 className="text-3xl font-bold mb-2">Chat with us</h1>
              <p className="text-lg font-serif mb-3 ">
                Speak to our friendly team via live chat.
              </p>
              <div className="flex flex-row w-full gap-2 mb-2 hover:cursor-pointer">
                <RiWechatLine size={30} />
                <p className="text-xl font-medium"> Start a live chat</p>
              </div>
              <div className="flex flex-row w-full gap-2 mb-2">
                <a
                  href="mailto:mateuszsuplice@gmail.com"
                  className="flex gap-2"
                >
                  <IoIosSend size={30} />
                  <p className="text-xl font-medium">Shoot us an email</p>
                </a>
              </div>
              <div className="flex flex-row w-full gap-2">
                <a href="https://x.com" className="flex gap-2">
                  <PiXLogoBold size={30} />
                  <p className="text-xl font-medium">Message us on X</p>
                </a>
              </div>

              <div>
                <h1 className="text-3xl font-bold mt-10 mb-2">Find us here</h1>
                <p className="text-lg font-serif mb-3 ">Social media.</p>
                <div className="flex flex-row w-full gap-2 mb-2">
                  <a href="https://instagram.com" className="flex w-full gap-2">
                    <BsInstagram size={30} />
                    <p className="text-xl font-medium"> Instagram</p>
                  </a>
                </div>
                <div className="flex flex-row w-full gap-2 mb-2">
                  <a href="https://facebook.com" className="flex w-full gap-2">
                    <FaFacebook size={30} />
                    <p className="text-xl font-medium"> Facebook</p>
                  </a>
                </div>
                <div className="flex flex-row w-full gap-2">
                  <a href="https://x.com" className="flex w-full gap-2">
                    <PiXLogoFill size={30} />
                    <p className="text-xl font-medium"> Twitter</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
