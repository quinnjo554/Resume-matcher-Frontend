'use client'

import { useSession } from "next-auth/react";
import { createContext, useContext } from "react"
interface ContextProps {
  email: string;
  name: string;
  image: string;
}

const GlobalContext = createContext<ContextProps>({
  email: "",
  name: "",
  image: ""
})

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useSession();
  const value = {
    email: user?.user?.email ?? "",
    name: user?.user?.name ?? "",
    image: user?.user?.image ?? ""
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);
