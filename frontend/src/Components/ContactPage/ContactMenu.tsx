import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";

const ContactMenu: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);

  const [messageData, setMessageData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMessageData({
      ...messageData,
      [name]: value,
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
    } catch (error) {}
  };

  return (
    <div className="w-full md:w-3/5 flex flex-row flex-wrap ">
      <div className="w-full md:w-1/2 px-1 lg:pr-4 xl:pr-10">
        <label className="font-semibold pl-2">First Name *</label>
        <input
          name="firstName"
          type="text"
          className="w-full border-2 rounded-xl border-gray-300 p-2 lg:p-3 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500"
          placeholder="First Name"
          onChange={handleInputChange}
        ></input>
        <p className="text-sm text-red-500 pl-2 ">error</p>
      </div>

      <div className="w-full md:w-1/2 px-1 lg:pr-4 xl:pr-10 md:mt-0 mt-2">
        <label className="font-semibold pl-2 h-5">Last Name</label>
        <input
          name="lastName"
          type="text"
          className="w-full border-2 rounded-xl border-gray-300 p-2 lg:p-3 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500"
          placeholder="Last Name"
          onChange={handleInputChange}
        ></input>
        <p className="text-sm text-red-500 pl-2 h-5">error</p>
      </div>

      <div className="w-full px-1 lg:pr-4 xl:pr-10">
        <label className="font-semibold pl-2">Email Addres *</label>
        <input
          name="email"
          type="text"
          className="w-full border-2 rounded-xl border-gray-300 p-2 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500"
          placeholder="you@example.com"
          onChange={handleInputChange}
        ></input>
        <p className="text-sm text-red-500 pl-2 h-5">error</p>
      </div>

      <div className="w-full px-1 lg:pr-4  xl:pr-10">
        <label className="font-semibold pl-2">Phone Number *</label>
        <PhoneInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          defaultCountry="pl"
          value={messageData.phoneNumber}
          name="phoneNumber"
          onChange={(phone) =>
            setMessageData({ ...messageData, phoneNumber: phone })
          }
          className={`w-full border-2 rounded-xl border-gray-300 p-1 focus:outline-none bg-white ${isFocused ? "border-slate-500" : "border-gray-300"}`}
          inputClassName="customInput"
          countrySelectorStyleProps={{
            buttonClassName: "countrySelectorButton",
          }}
        />
        <p className="text-sm text-red-500 pl-2 h-5">error</p>
      </div>

      <div className="w-full px-1 lg:pr-4  xl:pr-10 ">
        <label className="font-semibold pl-2">Message *</label>
        <textarea
          className="w-full border-2 rounded-xl border-gray-300 p-2 focus:outline-none focus:border-slate-400 focus:placeholder-slate-500 scrollbar-none resize-none"
          placeholder="Leave us a message..."
          rows={5}
          name="message"
          maxLength={200} // Set a maximum length for the message
          onChange={(e) => {
            setCharacterCount(e.target.value.length);
            handleInputChange(e);
          }}
        />
        <div className="flex flex-row">
          <p className="text-sm text-red-500 -translate-y-1 pl-2 h-5 w-1/2"></p>
          <p className="text-right -translate-y-1  font-normal text-sm md:text-base w-1/2">
            ({characterCount}/200)
          </p>
        </div>
      </div>

      <div className="w-full px-1 lg:pr-4 lg:mt-4 xl:pr-10 ">
        <button
          className="w-full bg-slate-900 text-white hover:bg-slate-800 duration-300 h-[60px]  transition-colors rounded-lg py-3 mt-5 font-sans text-md"
          onClick={handleSendMessage}
          disabled={isSending}
        >
          {isSending ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactMenu;
