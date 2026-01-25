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

export async function logUserEvent(fromStations: string[]) {
  try {
    await axios.post(getApiUrl("USER_EVENT"), {
      anonId: getAnonId(),
      fromStations,
    });
    console.log("Logging stuff");
  } catch (err) {
    console.warn("Failed to log user event", err);
  }
}
