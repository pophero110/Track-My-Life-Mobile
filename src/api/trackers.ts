import { apiClient } from "./client";
import { getSessionToken } from "./client";

const BASE_PATH = "/api/v1/trackers";

/**
 * Get all trackers for a user
 * @header {Authorization} Bearer sessionToken
 * if successful, the return will be:
 * @returns {object} - { data: { trackers: { id: string, name: string, description: string, userId: string, createdAt: string, updatedAt: string }[] } }
 * if unsuccessful, the return will be:
 * @returns {object} - { data: { error: string } }
 */

export const getTrackers = async () => {
  const sessionToken = await getSessionToken();
  const response = await apiClient.get(BASE_PATH).catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return { data: { error: error.response.data.error } };
      //TODO: refactor repeated code into a function
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("request error", error.request);
      return { data: { error: "Network Error" } };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("axios error", error.config);
      console.log("Error", error.message);
      return { data: { error: "Network Error" } };
    }
  });
  return { data: response.data };
};

/**
 * create a tracker
 * @header {Authorization} Bearer sessionToken - The session token of the user
 * @param {string} name - The name of the tracker
 * if successful, the return will be:
 * @returns {object} - { data: { tracker: { id: string, name: string, createdAt: string, updatedAt: string } }
 * if unsuccessful, the return will be:
 * @returns {object} - { data: { error: string } }
 */

export const createTracker = async (name: string) => {
  const sessionToken = await getSessionToken();
  const body = {
    name,
    type: "time",
  };
  const response = await apiClient
    .post(BASE_PATH, body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
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
  return { data: response.data };
};
