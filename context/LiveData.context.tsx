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

export const LiveDataProvider = ({ children }: LiveDataProviderProps) => {
  const [liveData, setLiveData] = useState<LiveDataType[]>([
    {
      latitude: 24.0,
      longitude: 74.0,
      pm25: 30 + Math.random() * 20,
      co2: 350 + Math.random() * 100,
      nh3: 0.01 + Math.random() * 0.05,
      co: 0.5 + Math.random() * 0.5,
      time: formatTime(new Date()),
    },
    {
      latitude: 24.5,
      longitude: 74.5,
      pm25: 25 + Math.random() * 30,
      co2: 300 + Math.random() * 150,
      nh3: 0.02 + Math.random() * 0.04,
      co: 0.4 + Math.random() * 0.6,
      time: formatTime(new Date()),
    },
    {
      latitude: 25.0,
      longitude: 75.0,
      pm25: 20 + Math.random() * 25,
      co2: 400 + Math.random() * 200,
      nh3: 0.03 + Math.random() * 0.03,
      co: 0.6 + Math.random() * 0.4,
      time: formatTime(new Date()),
    },
    {
      latitude: 25.5,
      longitude: 75.5,
      pm25: 40 + Math.random() * 15,
      co2: 350 + Math.random() * 150,
      nh3: 0.01 + Math.random() * 0.05,
      co: 0.3 + Math.random() * 0.7,
      time: formatTime(new Date()),
    },
    {
      latitude: 26.0,
      longitude: 76.0,
      pm25: 35 + Math.random() * 10,
      co2: 320 + Math.random() * 180,
      nh3: 0.02 + Math.random() * 0.04,
      co: 0.7 + Math.random() * 0.3,
      time: formatTime(new Date()),
    },
    {
      latitude: 24.0,
      longitude: 74.0,
      pm25: 30 + Math.random() * 20,
      co2: 350 + Math.random() * 100,
      nh3: 0.01 + Math.random() * 0.05,
      co: 0.5 + Math.random() * 0.5,
      time: formatTime(new Date()),
    },
    {
      latitude: 24.5,
      longitude: 74.5,
      pm25: 25 + Math.random() * 30,
      co2: 300 + Math.random() * 150,
      nh3: 0.02 + Math.random() * 0.04,
      co: 0.4 + Math.random() * 0.6,
      time: formatTime(new Date()),
    },
    {
      latitude: 25.0,
      longitude: 75.0,
      pm25: 20 + Math.random() * 25,
      co2: 400 + Math.random() * 200,
      nh3: 0.03 + Math.random() * 0.03,
      co: 0.6 + Math.random() * 0.4,
      time: formatTime(new Date()),
    },
    {
      latitude: 25.5,
      longitude: 75.5,
      pm25: 40 + Math.random() * 15,
      co2: 350 + Math.random() * 150,
      nh3: 0.01 + Math.random() * 0.05,
      co: 0.3 + Math.random() * 0.7,
      time: formatTime(new Date()),
    },
    {
      latitude: 26.0,
      longitude: 76.0,
      pm25: 35 + Math.random() * 10,
      co2: 320 + Math.random() * 180,
      nh3: 0.02 + Math.random() * 0.04,
      co: 0.7 + Math.random() * 0.3,
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
