"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUser } from "@/utils/backend-communication";

interface User {
  name: string;
  role: string;
  profileImage: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUser();

        const data = await response.json();
        console.log(data);
        if (data.success) {
          console.log(data.data);

          setUser(data.data); // Set user data in context
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
