/** @format */

import { createContext, useState, ReactNode } from "react";

export const LiveDataContext = createContext({
  liveData: [] as LiveDataType[],
  setLiveData: (data: LiveDataType[]) => {},
  handleDelete: (index: number) => {},
});

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

const formatNumber = (num: number) => parseFloat(num.toFixed(2));

export const LiveDataProvider = ({ children }: LiveDataProviderProps) => {
  const [liveData, setLiveData] = useState<LiveDataType[]>([
    {
      latitude: 24.0,
      longitude: 74.0,
      pm25: formatNumber(30 + Math.random() * 20),
      co2: formatNumber(350 + Math.random() * 100),
      nh3: formatNumber(0.01 + Math.random() * 0.05),
      co: formatNumber(0.5 + Math.random() * 0.5),
      time: formatTime(new Date()),
    },
  ]);

  const handleDelete = (index: number) => {
    setLiveData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <LiveDataContext.Provider value={{ liveData, setLiveData, handleDelete }}>
      {children}
    </LiveDataContext.Provider>
  );
};
