import { apiClient } from "./client";

export const signup = async (email: string, password: string, name: string) => {
  const body = {
    email,
    password,
    name,
  };
  const response = await apiClient
    .post("/api/v1/users", body)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("request error", error.request);
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("axios error", error.config);
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  console.log({ response });
  return response;
};
