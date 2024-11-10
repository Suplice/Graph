import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { VscGraph, VscGraphLine } from "react-icons/vsc";
import {
  PiArrowsInLineVerticalLight,
  PiArrowsOutLineVerticalLight,
} from "react-icons/pi";
import {
  IoChevronBack,
  IoChevronForward,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  MdAutoGraph,
  MdOutlineContactSupport,
  MdOutlineDashboard,
} from "react-icons/md";
import { RiHome6Line } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { CircularProgress } from "@mui/material";
import { useMenuRoute } from "../../Context/MenuRouteContext";

const UserNavbar: React.FC = () => {
  const { selectedTab, setSelectedTab } = useMenuRoute();

  const { logout, isLoggedIn } = useAuth();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [userEmail, setUserEmail] = useState<string | null>("");
  const [userName, setUserName] = useState<string>("");
  const [userSurname, setUserSurname] = useState<string>("");
  const [isUserMenuShown, setIsUserMenuShown] = useState<boolean>(false);

  const { token, userId } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      if (!isLoggedIn) {
        setIsLoading(false);
        return;
      }

      await fetch(`${process.env.REACT_APP_API_URL}/auth/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserEmail(data.email);
          setUserName(data.firstName);
          setUserSurname(data.lastName);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    };

    fetchUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && !isExpanded) {
        setIsExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <nav
      className={`h-screen bg-[#eeecec] px-4 py-4 lg:px-6 lg:py-6 z-10  lg:relative flex flex-col justify-between transition-all duration-300 ease-linear overflow-auto
        ${isExpanded ? "w-64 fixed" : "w-20 lg:w-1/6 overflow-hidden "}`}
    >
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-2xl lg:hidden flex justify-self-end`}
        >
          <IoChevronForward
            className={`transform transition-all ease-linear ${isExpanded ? " rotate-180" : " "}`}
          />
        </button>
        <div className="flex flex-row items-center gap-4 px-1 mb-3 mt-2 justify-center">
          <VscGraphLine className="flex-shrink-0 size-10" />
          {isExpanded && (
            <p className="xl:text-4xl text-xl font-semibold">Grapher</p>
          )}
        </div>

        <p
          className={`lg:mt-8 mt-4 mb-1 font-semibold text-[#8C8C8C] text-lg `}
        >
          Menu
        </p>

        {/* Linki Menu */}
        <ul className="text-xl font-semibold space-y-2 text-[#797979]">
          <button
            onClick={() => setSelectedTab("Overview")}
            className="w-full text-left"
          >
            <li
              className={`p-2 px-3 w-full rounded-lg flex flex-row items-center ${selectedTab === "Overview" ? "bg-[#d8d6d6] text-[#252525]" : "hover:bg-[#d8d6d6] hover:text-[#252525]"}`}
            >
              <RiHome6Line size={24} />
              {isExpanded && <p className="ml-3 text-xl">Overview</p>}
            </li>
          </button>

          <button
            onClick={() => setSelectedTab("Plotter")}
            className="w-full text-left"
          >
            <li
              className={`p-2 px-3 w-full rounded-lg flex flex-row items-center ${selectedTab === "Plotter" ? "bg-[#d8d6d6] text-[#252525]" : "hover:bg-[#d8d6d6] hover:text-[#252525]"}`}
            >
              <MdAutoGraph size={24} />
              {isExpanded && <p className="ml-3 text-xl">Plotter</p>}
            </li>
          </button>

          <button
            onClick={() => setSelectedTab("Graph")}
            className="w-full text-left"
          >
            <li
              className={`p-2 px-3 w-full rounded-lg flex flex-row items-center ${selectedTab === "Graph" ? "bg-[#d8d6d6] text-[#252525]" : "hover:bg-[#d8d6d6] hover:text-[#252525]"}`}
            >
              <VscGraph size={24} />
              {isExpanded && <p className="ml-3 text-xl">Graphs</p>}
            </li>
          </button>
        </ul>
      </div>

      {/* Linki na Dole Menu */}
      <div>
        <ul className="text-xl font-semibold space-y-2 text-[#797979]">
          <button
            onClick={() => setSelectedTab("Settings")}
            className="w-full text-left"
          >
            <li
              className={`p-2 px-3 w-full rounded-lg flex flex-row items-center ${selectedTab === "Settings" ? "bg-[#d8d6d6] text-[#252525]" : "hover:bg-[#d8d6d6] hover:text-[#252525]"}`}
            >
              <IoSettingsOutline size={24} />
              {isExpanded && <p className="ml-3 text-xl">Settings</p>}
            </li>
          </button>

          <button
            onClick={() => setSelectedTab("Support")}
            className="w-full text-left"
          >
            <li
              className={`p-2 px-3 w-full rounded-lg flex flex-row items-center ${selectedTab === "Support" ? "bg-[#d8d6d6] text-[#252525]" : "hover:bg-[#d8d6d6] hover:text-[#252525]"}`}
            >
              <MdOutlineContactSupport size={24} />
              {isExpanded && <p className="ml-3 text-xl">Support</p>}
            </li>
          </button>

          <button
            onClick={() => {
              setSelectedTab("Logout");
              logout();
            }}
            className="w-full text-left"
          >
            <li
              className={`p-2 px-3 w-full rounded-lg flex flex-row items-center ${selectedTab === "Logout" ? "bg-[#d8d6d6] text-[#252525]" : "hover:bg-[#d8d6d6] hover:text-[#252525]"}`}
            >
              <GoArrowLeft size={24} />
              {isExpanded && <p className="ml-3 text-xl">Logout</p>}
            </li>
          </button>
        </ul>

        {/* Profil Użytkownika */}
        <button
          onClick={() => setIsUserMenuShown(!isUserMenuShown)}
          className="w-full mt-3"
        >
          <div className="flex items-center w-full p-2 border-2 border-[#bbb9b9] rounded-lg bg-[#f8f6f6]">
            <img
              src="/Images/facebook.png"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            {isExpanded && (
              <div className="flex flex-col ml-3 overflow-hidden text-left">
                {isLoading ? (
                  <div className="flex items-center justify-center pt-2">
                    <CircularProgress size={30} color="primary" />
                  </div>
                ) : (
                  <>
                    <p className="text-lg font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                      {userName} {userSurname}
                    </p>
                    <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                      {userEmail}
                    </p>
                  </>
                )}
              </div>
            )}
            {isExpanded && (
              <div className="ml-auto flex items-center justify-center">
                {isUserMenuShown ? (
                  <PiArrowsInLineVerticalLight />
                ) : (
                  <PiArrowsOutLineVerticalLight />
                )}
              </div>
            )}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
