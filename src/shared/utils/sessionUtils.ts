import axios from "axios";
import { BACKEND_URL } from "../constants/constants";

  export const initializeSessionId = async () => {
    try {
        let sessionId = sessionStorage.getItem("sessionId");
        if (!sessionId) {
          const response = await axios.get(`${BACKEND_URL}`);
          const { sessionId, sessionExpiryTime } = response.data;
          if (sessionId) {
            sessionStorage.setItem("sessionId", sessionId);
            sessionStorage.setItem("sessionExpiryTime", sessionExpiryTime);
          } else {
            console.error("Failed to fetch session ID from backend.");
          }
        }
      } catch (error) {
        console.error("Error initializing session:", error);
      }
  };