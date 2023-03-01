import { apiClient, handleRequestError } from "./client";
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
export const signin = async (
  email: string,
  password: string
): Promise<{ data: { error: string } }> => {
  const body = {
    email,
    password,
  };
  const response = await apiClient
    .post("/api/v1/sessions", body)
    .catch((error) => {
      return handleRequestError(error);
    });

  if (response.data.sessionToken) {
    await storeSessionToken(response.data.sessionToken);
  }
  return { data: response.data };
};
