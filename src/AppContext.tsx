import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  isSectionsOpen: boolean;
  setSectionsOpen: (valid: boolean) => void;
  isFilterOpen: boolean;
  setFilterOpen: (valid: boolean) => void;
  isMenuOpen: boolean;
  setMenuOpen: (valid: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [isSectionsOpen, setSectionsOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isSectionsOpen,
        setSectionsOpen,
        isFilterOpen,
        setFilterOpen,
        isMenuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
