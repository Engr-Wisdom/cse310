import { useEffect, useState } from "react";
import { Movie } from "../types/movie";

export function useMovies(fetchFunction: () => Promise<Movie[]>) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchFunction();
      setMovies(data);
    } catch (err) {
      setError("Failed to load movies.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    reload: loadMovies,
  };
}