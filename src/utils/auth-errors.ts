import { AuthError, AuthApiError } from "@supabase/supabase-js";

export const getErrorMessage = (error: AuthError) => {
  if (error instanceof AuthApiError) {
    switch (error.status) {
      case 400:
        return "Invalid email or password format";
      case 422:
        return "Email already registered";
      case 429:
        return "Too many attempts. Please try again later";
      default:
        return error.message;
    }
  }
  return "An unexpected error occurred. Please try again";
};