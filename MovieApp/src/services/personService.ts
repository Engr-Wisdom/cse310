import { API_KEY, BASE_URL } from "../api/apiConfig";

export const getActorDetails = async (id: string) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}?api_key=${API_KEY}`
  );

  return await response.json();
};

export const getActorMovies = async (id: string) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`
  );

  return await response.json();
};