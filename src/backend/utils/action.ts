import { APIError } from "./errors";

export interface Context {
  userAuthData?: { email: string };
}

export const actionWrapper = <TParams, TResult>(
  _actionName: string,
  action: (context: Context, params: TParams) => Promise<TResult>,
) => {
  return async (
    params: TParams,
  ): Promise<TResult | { error: string; details?: unknown }> => {
    try {
      const context: Context = { userAuthData: { email: "test@example.com" } }; // Placeholder
      const data = await action(context, params);
      return data;
    } catch (error) {
      if (error instanceof APIError) {
        return {
          error: error.message,
          details: error.details ?? { statusCode: error.statusCode },
        };
      }
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "An unknown error occurred" };
    }
  };
};
