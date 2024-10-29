import React from "react";
import { useAuth } from "../../Context/AuthContext";

interface UserNavbarProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const UserNavbar: React.FC<UserNavbarProps> = ({
  selectedTab,
  onTabChange,
}) => {
  const { logout } = useAuth();

  return (
    <nav className="w-1/5  border-zinc-900 border-2 rounded-lg h-[400px] bg-[#FFFDD0] p-10 m-8">
      <ul>
        <li>
          <button
            onClick={() => onTabChange("profile")}
            className={selectedTab === "profile" ? "active" : ""}
          >
            Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => onTabChange("settings")}
            className={selectedTab === "settings" ? "active" : ""}
          >
            Settings
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onTabChange("logout");
              logout();
            }}
            className={selectedTab === "logout" ? "active" : ""}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
