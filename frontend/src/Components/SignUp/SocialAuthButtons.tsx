import React, { useState } from "react";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
  signInWithPopup,
} from "../../firebaseConfig";
import { toast } from "react-toastify";
import { RegisterDTO } from "../../Dto/RegisterDTO";

const SocialAuthButtons: React.FC = () => {
  const socialPlatforms = [
    { src: "/Images/google.png", alt: "Google", provider: googleProvider },
    {
      src: "/Images/facebook.png",
      alt: "Facebook",
      provider: facebookProvider,
    },
    { src: "/Images/github.png", alt: "Github", provider: githubProvider },
  ];

  const handleSocialLogin = async (provider: any) => {
    try {
      const result: any = await signInWithPopup(auth, provider);

      const userExists = checkIfUserExistsInDatabase(
        result.user.uid as string,
        (await result.user.getIdToken()) as string
      );

      if (!userExists) {
        handleCreateUserInDatabase(result);
      }
    } catch (error: any) {
      toast.error("An error occurred while logging in. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleCreateUserInDatabase = async (result: any) => {
    const token = await result.user.getIdToken();

    console.log("i will now change data in statistics!");

    const email = result._tokenResponse.email;
    const firstName = result._tokenResponse.displayName.split(" ")[0] as string;
    const lastName = (result._tokenResponse.displayName.split(" ")[1] as string)
      ? (result._tokenResponse.displayName.split(" ")[1] as string)
      : "";

    await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password: "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error creating user in database:", error);
      });
  };

  const checkIfUserExistsInDatabase = async (userId: string, token: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      return !!data;
    } catch (error) {
      console.error("Error checking if user exists in database:", error);
    }
  };

  return (
    <div className="flex flex-row text-center gap-4 mt-7">
      {socialPlatforms.map((platform, id) => (
        <div
          onClick={() => handleSocialLogin(platform.provider)}
          key={id}
          className="flex-grow bg-slate-200 rounded-md p-2 flex justify-center shadow-md shadow-gray-500 hover:bg-slate-300 transition-colors hover:cursor-pointer"
        >
          <img src={platform.src} alt={platform.alt} className="w-6" />
        </div>
      ))}
    </div>
  );
};

export default SocialAuthButtons;
