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
  time: string;
}

const formatTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  // @ts-ignore
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;

  // Format date
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();

  let strDate = `${month}/${day}/${year}`;

  return `${strDate} - ${strTime}`;
};

export const LiveDataProvider = ({ children }: LiveDataProviderProps) => {
  const [liveData, setLiveData] = useState<LiveDataType[]>([
    {
      latitude: 24.0,
      longitude: 74.0,
      pm25: 35,
      co2: 400,
      nh3: 0.02,
      co: 0.8,
      time: formatTime(new Date()), // Use the formatTime function
    },
    {
      latitude: 24.5,
      longitude: 74.5,
      pm25: 40,
      co2: 410,
      nh3: 0.03,
      co: 0.9,
      time: formatTime(new Date()), // Use the formatTime function
    },
    {
      latitude: 25.0,
      longitude: 75.0,
      pm25: 30,
      co2: 420,
      nh3: 0.01,
      co: 0.7,
      time: formatTime(new Date()), // Use the formatTime function
    },
    {
      latitude: 25.5,
      longitude: 75.5,
      pm25: 25,
      co2: 430,
      nh3: 0.04,
      co: 0.6,
      time: formatTime(new Date()), // Use the formatTime function
    },
    {
      latitude: 26.0,
      longitude: 76.0,
      pm25: 45,
      co2: 440,
      nh3: 0.05,
      co: 1.0,
      time: formatTime(new Date()), // Use the formatTime function
    },
  ]);

  return (
    <LiveDataContext.Provider value={{ liveData, setLiveData }}>
      {children}
    </LiveDataContext.Provider>
  );
};
