type ServerActionResult<T> = T | { error: string; details?: unknown };

export const handleServerAction = async <T>(
  serverAction: Promise<ServerActionResult<T>>,
): Promise<T> => {
  const result = await serverAction;

  if (result && typeof result === "object" && "error" in result) {
    throw new Error((result as { error: string }).error);
  }

  return result as T;
};
