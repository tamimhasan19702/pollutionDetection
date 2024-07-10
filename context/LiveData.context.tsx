/** @format */

import { createContext, useState, ReactNode } from "react";

export const LiveDataContext = createContext({});

interface LiveDataProviderProps {
  children: ReactNode;
}

export const LiveDataProvider = ({ children }: LiveDataProviderProps) => {
  const [liveData, setLiveData] = useState({});

  return (
    <LiveDataContext.Provider value={{ liveData, setLiveData }}>
      {children}
    </LiveDataContext.Provider>
  );
};
