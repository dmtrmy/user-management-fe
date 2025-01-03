import React, { createContext, useState, useContext } from "react";
import type { UserContextData } from '@/types/user';

interface UserData {
  name?: string;
  email?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
}

interface UserContextProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({});

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};