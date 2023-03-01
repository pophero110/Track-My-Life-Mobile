import { apiClient, handleRequestError } from "./client";
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
  const response = await apiClient
    .get(BASE_PATH, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
    .catch((error) => {
      return handleRequestError(error);
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
      return handleRequestError(error);
    });
  return { data: response.data };
};

/**
 * delete a tracker
 * @header {Authorization} Bearer sessionToken - The session token of the user
 * @param {string} id - The id of the tracker
 * if successful, the return will be:
 * @returns {object} - { data: {} }
 * if unsuccessful, the return will be:
 * @returns {object} - { data: { error: string } }
 */

export const deleteTracker = async (
  id: string
): Promise<{ data: { error: string } }> => {
  const sessionToken = await getSessionToken();
  const response = await apiClient
    .delete(`${BASE_PATH}/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
    .catch((error) => {
      return handleRequestError(error);
    });
  return { data: response.data };
};
