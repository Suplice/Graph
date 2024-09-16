import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./Contact.css";

const Contact: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className="h-dvh flex flex-col items-center">
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
        <div className="my-10 md:my-14 lg:my-16 xl:my-20 flex flex-col md:flex-row gap-5 w-full md:w-4/5">
          <div className="w-full md:w-3/5 flex flex-row flex-wrap ">
            <div className="w-full md:w-1/2 px-1 lg:pr-4 xl:pr-10">
              <label className="font-semibold pl-2">First Name</label>
              <input
                type="text"
                className="w-full border-2 rounded-xl border-gray-300 p-2 lg:p-3 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500"
                placeholder="First Name"
              ></input>
            </div>

            <div className="w-full md:w-1/2 px-1 lg:pr-4 xl:pr-10 md:mt-0 mt-4">
              <label className="font-semibold pl-2">Last Name</label>
              <input
                type="text"
                className="w-full border-2 rounded-xl border-gray-300 p-2 lg:p-3 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500"
                placeholder="Last Name"
              ></input>
            </div>

            <div className="w-full px-1 lg:pr-4 mt-4 xl:pr-10">
              <label className="font-semibold pl-2">Email Addres</label>
              <input
                type="text"
                className="w-full border-2 rounded-xl border-gray-300 p-2 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500"
                placeholder="you@example.com"
              ></input>
            </div>

            <div className="w-full px-1 lg:pr-4 mt-4 xl:pr-10">
              <label className="font-semibold pl-2">Phone Number</label>
              <PhoneInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                defaultCountry="ua"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                className={`w-full border-2 rounded-xl border-gray-300 p-1 focus:outline-none bg-white ${isFocused ? "border-slate-500" : "border-gray-300"}`}
                inputClassName="customInput"
                countrySelectorStyleProps={{
                  buttonClassName: "countrySelectorButton",
                }}
              />
            </div>
          </div>
          <div className="md:w-2/5 w-full">aa</div>
        </div>
      </div>
    </>
  );
};
export default Contact;
