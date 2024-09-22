/** @format */

import { createContext, useState, useEffect, ReactNode } from "react";
import { Database } from "@/firebase.config";
import { ref, set, remove } from "firebase/database";

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
  mq7: number;
  mq135: number;
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
  const [liveData, setLiveData] = useState<LiveDataType[]>([]);

  const handleDelete = (index: number) => {
    setLiveData((prevData) => prevData.filter((_, i) => i !== index));

    const dbRef = ref(Database, `locationData/${index}`);
    remove(dbRef);
  };

  useEffect(() => {
    const dbRef = ref(Database, "locationData");
    set(dbRef, liveData);
  }, [liveData]);

  return (
    <LiveDataContext.Provider value={{ liveData, setLiveData, handleDelete }}>
      {children}
    </LiveDataContext.Provider>
  );
};
