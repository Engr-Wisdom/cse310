import React, { useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import { getUpcomingMovies } from "../services/movieService";

export default function UpcomingMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getUpcomingMovies();
    setMovies(data.results);
  };

  return (
    <MovieSection
      title="Upcoming Movies"
      movies={movies}
    />
  );
}