import { API_KEY, BASE_URL } from "../api/apiConfig";

export const searchMovies = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  return await response.json();
};