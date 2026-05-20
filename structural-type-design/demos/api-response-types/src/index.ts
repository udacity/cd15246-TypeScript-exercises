/**
 * Demonstrates discriminated unions for API response handling.
 * Uses a `status` property as the discriminant.
 */

// Success response with data
interface SuccessResponse<T> {
  status: "success";
  data: T;
  timestamp: Date;
}

// Error response with message and optional code
interface ErrorResponse {
  status: "error";
  message: string;
  code: number;
}

// Loading state
interface LoadingResponse {
  status: "loading";
}

// Discriminated union of all possible API states
export type ApiResponse<T> =
  | SuccessResponse<T>
  | ErrorResponse
  | LoadingResponse;

/**
 * Handles an API response using type narrowing.
 * The status discriminant lets TypeScript narrow the type.
 */
export function handleResponse<T>(response: ApiResponse<T>): string {
  switch (response.status) {
    case "success":
      // TypeScript knows: response is SuccessResponse<T>
      return `Got data: ${JSON.stringify(response.data)}`;
    case "error":
      // TypeScript knows: response is ErrorResponse
      return `Error ${response.code}: ${response.message}`;
    case "loading":
      // TypeScript knows: response is LoadingResponse
      return "Loading...";
  }
}

/**
 * Maps an API result to a user-friendly message.
 * Demonstrates narrowing with if/else.
 */
export function getUserMessage<T>(
  response: ApiResponse<T>
): string {
  if (response.status === "success") {
    return `Data received at ${response.timestamp.toISOString()}`;
  } else if (response.status === "error") {
    return `Failed: ${response.message}`;
  }
  return "Please wait...";
}
