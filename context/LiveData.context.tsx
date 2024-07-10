/** @format */

import { createContext, useState, ReactNode } from "react";

export const LiveDataContext = createContext({});

interface LiveDataProviderProps {
  children: ReactNode;
}

export interface LiveDataType {
  latitude: number;
  longitude: number;
  pm25: number;
  co2: number;
  nh3: number;
  co: number;
}

export const LiveDataProvider = ({ children }: LiveDataProviderProps) => {
  const [liveData, setLiveData] = useState([
    {
      latitude: 24.0,
      longitude: 74.0,
      pm25: 35,
      co2: 400,
      nh3: 0.02,
      co: 0.8,
    },
    {
      latitude: 24.5,
      longitude: 74.5,
      pm25: 40,
      co2: 410,
      nh3: 0.03,
      co: 0.9,
    },
    {
      latitude: 25.0,
      longitude: 75.0,
      pm25: 30,
      co2: 420,
      nh3: 0.01,
      co: 0.7,
    },
    {
      latitude: 25.5,
      longitude: 75.5,
      pm25: 25,
      co2: 430,
      nh3: 0.04,
      co: 0.6,
    },
    {
      latitude: 26.0,
      longitude: 76.0,
      pm25: 45,
      co2: 440,
      nh3: 0.05,
      co: 1.0,
    },
  ]);

  return (
    <LiveDataContext.Provider value={{ liveData, setLiveData }}>
      {children}
    </LiveDataContext.Provider>
  );
};
