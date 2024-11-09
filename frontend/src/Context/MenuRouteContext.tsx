import React from "react";

interface MenuRouteContextType {
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
}

const MenuRouteContext = React.createContext<MenuRouteContextType | undefined>(
  undefined
);

export const MenuRouteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>("");

  return (
    <MenuRouteContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </MenuRouteContext.Provider>
  );
};

export const useMenuRoute = (): MenuRouteContextType => {
  const context = React.useContext(MenuRouteContext);

  if (context === undefined) {
    throw new Error("useMenuRoute must be used within a MenuRouteProvider");
  }

  return context;
};
