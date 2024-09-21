/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyClxv31c2wC1dZsHpcZPxTHyPVfRRhiX0c",
  authDomain: "pollutiondetection-f7338.firebaseapp.com",
  projectId: "pollutiondetection-f7338",
  storageBucket: "pollutiondetection-f7338.appspot.com",
  messagingSenderId: "946946176537",
  appId: "1:946946176537:web:7e5a4dcc6ff05438b49c88",
};

const datbaseUrl =
  "https://pollutiondetection-f7338-default-rtdb.asia-southeast1.firebasedatabase.app";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Database = getDatabase(app, datbaseUrl);
