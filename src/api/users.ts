import { apiClient, handleRequestError } from "./client";

export const signup = async (
  email: string,
  password: string,
  name: string
): Promise<{ data: { error: string } }> => {
  const body = {
    email,
    password,
    name,
  };
  const response = await apiClient
    .post("/api/v1/users", body)
    .catch((error) => {
      return handleRequestError(error);
    });
  return { data: response.data };
};
