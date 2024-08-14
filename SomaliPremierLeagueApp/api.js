//api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchGameData = async (gameId) => {
  try {
    const response = await axios.get(`${API_URL}/game/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching game data:", error);
  }
};

export const updateGameScore = async (gameId, homeScore, awayScore) => {
  try {
    const response = await axios.put(`${API_URL}/game/${gameId}`, {
      homeScore,
      awayScore,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating game score:", error);
  }
};
