export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; details?: Record<string, string[]> };

export const handleApiError = (error: unknown): ApiResponse<never> => {
  if (error instanceof Error) {
    return { success: false, error: error.message };
  }

  return { success: false, error: "An unknown error occurred" };
};
