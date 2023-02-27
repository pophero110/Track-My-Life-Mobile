import { apiClient } from "./client";
import { getSessionToken } from "./client";

const BASE_PATH = "/api/v1/trackers";
/**
 * Create a new tracker log
 * @header {Authorization} Bearer sessionToken - The session token of the user
 * @param {string} trackerId - The id of the tracker
 * @param {string} value - The value of the tracker log
 * if successful, the return will be:
 * @return {object} - { data: {} } }
 * if unsuccessful, the return will be:
 * @returns {object} - { data: { error: string } }
 */
export const createTrackerLog = async (trackerId: string, value: number) => {
  const sessionToken = await getSessionToken();
  const body = {
    value,
  };
  const response = await apiClient
    .post(BASE_PATH + `/${trackerId}/logs`, body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
    .catch((error) => {
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
        console.log("config", error.config);
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
 * Delete a tracker log
 * @header {Authorization} Bearer sessionToken - The session token of the user
 * @param {string} trackerLogId - The id of the tracker log
 * if successful, the return will be:
 * @return {object} - { data: {} } }
 * if unsuccessful, the return will be:
 * @returns {object} - { data: { error: string } }
 */

export const deleteTrackerLog = async (
  trackerId: string,
  trackerLogId: string
) => {
  const sessionToken = await getSessionToken();
  const response = await apiClient
    .delete(`${BASE_PATH}/${trackerId}/logs/${trackerLogId}`, {
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
        console.log("config", error.config);
        return { data: { error: "Network Error" } };
      }
    });
  return { data: response.data };
};
