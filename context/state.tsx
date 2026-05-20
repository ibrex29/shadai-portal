"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface AppState {
  isCheckboxChecked: boolean;
}

interface AppContextType {
  state: AppState;
  setIsCheckboxChecked: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppStateContext = createContext<AppContextType | undefined>(
  undefined,
);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const contextValue: AppContextType = {
    state: {
      isCheckboxChecked,
    },
    setIsCheckboxChecked,
    handleCheckboxChange,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}
