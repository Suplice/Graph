import React from "react";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
  signInWithPopup,
} from "../../firebaseConfig";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";

const SocialAuthButtons: React.FC = () => {
  const { setLoginState } = useAuth();

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
      const token = await result.user.getIdToken();
      const userId = result.user.uid;

      const userExists = await checkIfUserExistsInDatabase(userId, token);

      if (!userExists) {
        await handleCreateUserInDatabase(result);
      }

      setLoginState();
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
    const email = result._tokenResponse.email;
    const displayName = result._tokenResponse.displayName || "";
    const [firstName, lastName] = displayName.split(" ");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: firstName || "",
            lastName: lastName || "",
            email,
            password: "",
          }),
        }
      );

      const data = await response.json();
      console.log("User created in database:", data);
    } catch (error) {
      console.error("Error creating user in database:", error);
    }
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
      return false;
    }
  };

  return (
    <div className="flex flex-row text-center gap-4 mt-7">
      {socialPlatforms.map((platform, id) => (
        <div
          key={id}
          onClick={() => handleSocialLogin(platform.provider)}
          className="flex-grow bg-slate-200 rounded-md p-2 flex justify-center shadow-md shadow-gray-500 hover:bg-slate-300 transition-colors hover:cursor-pointer"
        >
          <img src={platform.src} alt={platform.alt} className="w-6" />
        </div>
      ))}
    </div>
  );
};

export default SocialAuthButtons;
