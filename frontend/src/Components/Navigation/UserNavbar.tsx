import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { VscGraph, VscGraphLine } from "react-icons/vsc";
import {
  PiArrowsInLineVerticalLight,
  PiArrowsOutLineVerticalLight,
} from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
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

  return (
    <nav className="w-1/6 h-screen bg-[#eeecec] px-6 py-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-row gap-5 mb-3 px-4 mt-2 ">
          <VscGraphLine className="size-12 md:size-12 " />
          <p className="text-xl md:text-2xl lg:text-4xl font-semibold">
            Grapher
          </p>
        </div>

        <p className="mt-8 mb-1 font-semibold text-[#8C8C8C] text-lg">Menu</p>

        <ul className=" text-xl font-semibold space-y-2 text-[#797979]">
          <button
            onClick={() => setSelectedTab("Overview")}
            className="w-full text-left"
          >
            <li
              className={`${
                selectedTab === "Overview" ? "bg-[#d8d6d6] text-[#252525]" : ""
              } hover:bg-[#d8d6d6] p-2 px-3 w-full rounded-lg hover:text-[#252525] flex flex-row items-center`}
            >
              <RiHome6Line size={24} />
              <p className="ml-3">Overview</p>
            </li>
          </button>

          <button
            onClick={() => setSelectedTab("Dashboard")}
            className="w-full text-left"
          >
            <li
              className={`${
                selectedTab === "Dashboard" ? "bg-[#d8d6d6] text-[#252525]" : ""
              } hover:bg-[#d8d6d6] p-2 px-3 w-full rounded-lg hover:text-[#252525] flex flex-row items-center`}
            >
              <MdOutlineDashboard size={24} />
              <p className="ml-3">Dashboard</p>
            </li>
          </button>

          <button
            onClick={() => setSelectedTab("Plotter")}
            className="w-full text-left"
          >
            <li
              className={`${
                selectedTab === "Plotter" ? "bg-[#d8d6d6] text-[#252525]" : ""
              } hover:bg-[#d8d6d6] p-2 px-3 w-full rounded-lg hover:text-[#252525] flex flex-row items-center`}
            >
              <MdAutoGraph size={24} />
              <p className="ml-3">Plotter</p>
            </li>
          </button>

          <button
            onClick={() => setSelectedTab("Graph")}
            className="w-full text-left"
          >
            <li
              className={`${
                selectedTab === "Graph" ? "bg-[#d8d6d6] text-[#252525]" : ""
              } hover:bg-[#d8d6d6] p-2 px-3 w-full rounded-lg hover:text-[#252525] flex flex-row items-center`}
            >
              <VscGraph size={24} />
              <p className="ml-3">Graphs</p>
            </li>
          </button>
        </ul>
      </div>
      <div>
        <ul className=" text-xl font-semibold space-y-2 text-[#797979]">
          <button
            onClick={() => setSelectedTab("Settings")}
            className="w-full text-left"
          >
            <li
              className={`${
                selectedTab === "Settings" ? "bg-[#d8d6d6] text-[#252525]" : ""
              } hover:bg-[#d8d6d6] p-2 px-3 w-full rounded-lg hover:text-[#252525] flex flex-row items-center `}
            >
              <IoSettingsOutline size={24} />
              <p className="ml-3">Settings</p>
            </li>
          </button>
          <button
            onClick={() => setSelectedTab("Support")}
            className="w-full text-left"
          >
            <li
              className={`${
                selectedTab === "Support" ? "bg-[#d8d6d6] text-[#252525]" : ""
              } hover:bg-[#d8d6d6] p-2 px-3 w-full rounded-lg hover:text-[#252525] flex flex-row items-center`}
            >
              <MdOutlineContactSupport size={24} />
              <p className="ml-3">Support</p>
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
              className={`${
                selectedTab === "Logout" ? "bg-[#d8d6d6] text-[#252525]" : ""
              } hover:bg-[#d8d6d6] p-2 px-3 w-full rounded-lg hover:text-[#252525] flex flex-row items-center`}
            >
              <GoArrowLeft size={24} />
              <p className="ml-3">Logout</p>
            </li>
          </button>
        </ul>

        <button
          onClick={() => setIsUserMenuShown(!isUserMenuShown)}
          className="w-full"
        >
          <div className="flex flex-row h-16 w-full border-2 border-[#bbb9b9] p-5 pr-1 items-center rounded-lg justify-between mt-3 bg-[#f8f6f6]">
            <div className="w-1/6">
              <img
                src="/Images/facebook.png"
                alt="profile"
                className="w-8 h-8"
              />
            </div>

            <div className="flex flex-col w-4/6 pb-2 pl-1 text-left">
              {isLoading ? (
                <div className="flex justify-center items-center pt-2">
                  <CircularProgress
                    size={30}
                    color="primary"
                  ></CircularProgress>
                </div>
              ) : (
                <>
                  {" "}
                  <p className="text-lg font-medium">
                    {userName} {userSurname}
                  </p>
                  <p className="text-[12px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                    {userEmail}
                  </p>
                </>
              )}
            </div>

            <div className="w-1/6 flex items-center justify-center">
              {isUserMenuShown ? (
                <PiArrowsInLineVerticalLight />
              ) : (
                <PiArrowsOutLineVerticalLight />
              )}
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
