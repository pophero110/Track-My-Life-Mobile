import { apiClient, handleRequestError } from "./client";
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
export const createTrackerLog = async (
  trackerId: string,
  value: number
): Promise<{ data: { error: string } }> => {
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
      return handleRequestError(error);
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
): Promise<{ data: { error: string } }> => {
  const sessionToken = await getSessionToken();
  const response = await apiClient
    .delete(`${BASE_PATH}/${trackerId}/logs/${trackerLogId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
    .catch((error) => {
      return handleRequestError(error);
    });
  return { data: response.data };
};
