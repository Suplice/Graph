import React from "react";

const SocialAuthButtons: React.FC = () => {
  const socialPlatforms = [
    { src: "/Images/google.png", alt: "Google" },
    { src: "/Images/facebook.png", alt: "Facebook" },
    { src: "/Images/github.png", alt: "Github" },
  ];

  return (
    <div className="flex flex-row text-center gap-4 mt-7">
      {socialPlatforms.map((platform, id) => (
        <div className="flex-grow bg-slate-200 rounded-md p-2 flex justify-center shadow-md shadow-gray-500 hover:bg-slate-300 transition-colors hover:cursor-pointer">
          <img src={platform.src} alt={platform.alt} className="w-6" />
        </div>
      ))}
    </div>
  );
};

export default SocialAuthButtons;
