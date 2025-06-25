export const HttpStatusCode = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
} as const;

export class APIError extends Error {
  statusCode: number;
  details?: unknown;
  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError";
    this.details = details;
  }
}
