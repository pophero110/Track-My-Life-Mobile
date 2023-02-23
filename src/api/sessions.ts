import { apiClient } from "./client";
import { storeSessionToken } from "./client";
/**
 * Sign in a user and store the token in the keychain
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * if successful, the return will be:
 * @returns {object} - { data: { sessionToken: string, user: { name: string, email: string, trackers: string[] } } }
 * if unsuccessful, the return will be:
 * @returns {object} - { data: { error: string } }
 */
export const signin = async (email: string, password: string) => {
  const body = {
    email,
    password,
  };
  const response = await apiClient
    .post("/api/v1/sessions", body)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return { data: { error: error.response.data.error } };
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("request error", error.request);
        return { data: { error: "Network Error" } };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("axios error", error.config);
        return { data: { error: "Network Error" } };
      }
    });

  if (response.data.sessionToken) {
    await storeSessionToken(response.data.sessionToken);
  }
  return { data: response.data };
};
