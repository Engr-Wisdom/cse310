import React, { useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import { getPopularMovies } from "../services/movieService";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getPopularMovies();
    setMovies(data.results);
  };

  return (
    <MovieSection
      title="Popular Movies"
      movies={movies}
    />
  );
}