import { apiClient } from "./apiClient";

export interface MessageResponse {
    message: string;
    timestamp: string;
}

export const fetchMessage = () => {
  return apiClient.get<MessageResponse>("/api/message");
};
