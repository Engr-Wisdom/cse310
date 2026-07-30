import React, { useEffect, useState } from "react";

import MovieSection from "./MovieSection";
import { getTrendingMovies } from "../services/movieService";

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = async () => {
    try {
      const data = await getTrendingMovies();
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MovieSection
      title="Trending Movies"
      movies={movies}
    />
  );
}