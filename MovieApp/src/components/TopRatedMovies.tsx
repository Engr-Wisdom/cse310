import React, { useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import { getTopRatedMovies } from "../services/movieService";

export default function TopRatedMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getTopRatedMovies();
    setMovies(data.results);
  };

  return (
    <MovieSection
      title="Top Rated"
      movies={movies}
    />
  );
}