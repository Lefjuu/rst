import { APIError, HttpStatusCode } from "../utils/errors";

// Placeholder for user authentication logic
export const getAuthenticatedUser = async (userAuthData: {
  email: string;
}): Promise<void> => {
  if (!userAuthData || !userAuthData.email) {
    throw new APIError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "An error authenticating request user",
    );
  }
  return Promise.resolve();
};
