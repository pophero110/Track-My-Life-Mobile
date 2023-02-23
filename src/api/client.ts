import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_DOMAIN =
  "https://ade7-2601-243-a00-19b0-f88b-7ec9-9c41-8642.ngrok.io";

export const apiClient = axios.create({
  baseURL: BACKEND_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

export const storeSessionToken = async (sessionToken: string) => {
  try {
    await AsyncStorage.setItem("sessionToken", sessionToken);
  } catch (error) {
    console.log("Error storing session token", error);
  }
};

export const getSessionToken = async () => {
  try {
    return await AsyncStorage.getItem("sessionToken");
  } catch (error) {
    console.log("Error getting session token", error);
  }
};
