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

export function handleRequestError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return { data: { error: error.response.data.error } };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log("request error", error.request);
    console.log("config", error.config);
    return { data: { error: "Network Error" } };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("axios error", error.config);
    console.log("Error", error.message);
    return { data: { error: "Network Error" } };
  }
}
