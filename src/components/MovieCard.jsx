// src/components/MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="w-full sm:w-48">
      <div className="rounded overflow-hidden shadow-md bg-gray-800 text-white hover:scale-105 transition-transform">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-2">
          <h3 className="text-md font-semibold truncate">{movie.title}</h3>
          <p className="text-yellow-400 text-sm">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
