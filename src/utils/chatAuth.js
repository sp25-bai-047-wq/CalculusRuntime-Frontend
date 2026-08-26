import { useAuth } from "../context/AuthContext";

export const CHAT_URL = process.env.REACT_APP_CHAT_URL || "http://127.0.0.1:8000";

export function useChatAuthHeaders() {
  const { user } = useAuth();

  return () => {
    if (!user?.accessToken) return { "Content-Type": "application/json" };
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };
  };
}
