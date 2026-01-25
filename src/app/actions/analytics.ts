import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getApiUrl } from "../../config/env";

export function getAnonId(): string {
  let id = localStorage.getItem("anonId");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("anonId", id);
  }
  return id;
}

export async function logUserEvent(fromStations: string[], deviceInfo?: any) {
  try {
    await axios.post(getApiUrl("USER_EVENT"), {
      anonId: getAnonId(),
      fromStations,
      deviceInfo,
    });
  } catch (err) {
    console.warn("Failed to log user event", err);
  }
}

export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent, // browser + OS info
    deviceType: getDeviceTypeFromScreen(),
    language: navigator.language,
  };
}

export function getDeviceTypeFromScreen(): "mobile" | "tablet" | "desktop" {
  const width = Math.min(window.screen.width, window.screen.height);

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}
