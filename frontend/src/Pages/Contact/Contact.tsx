import React from "react";
import { RiWechatLine } from "react-icons/ri";
import { PiXLogoBold } from "react-icons/pi";
import { PiXLogoFill } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import "react-international-phone/style.css";
import "./Contact.css";
import ContactMenu from "../../Components/ContactPage/ContactMenu";

const Contact: React.FC = () => {
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
          <ContactMenu />
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
