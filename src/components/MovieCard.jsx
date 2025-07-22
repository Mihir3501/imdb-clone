import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // Option 1: Using navigate function (if you prefer this approach)
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/movie/${movie.id}`);
  };

  // Option 2: Keep using Link (recommended approach)
  // return (
  //   <Link to={`/movie/${movie.id}`} className="w-full sm:w-48">
  //     <div className="rounded overflow-hidden shadow-md bg-gray-800 text-white hover:scale-105 transition-transform">
  //       <div className="relative">
  //         <img
  //           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
  //           alt={movie.title}
  //           className="w-full h-72 object-cover"
  //         />
  //         <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
  //           ⭐ {movie.vote_average.toFixed(1)}
  //         </div>
  //       </div>
  //       <div className="p-2">
  //         <h3 className="text-md font-semibold truncate">{movie.title}</h3>
  //         <p className="text-gray-400 text-sm">
  //           {new Date(movie.release_date).getFullYear()}
  //         </p>
  //       </div>
  //     </div>
  //   </Link>
  // );

  // Alternative: If you want to use navigate instead of Link, uncomment this:
  
  return (
    <div 
      onClick={handleClick}
      className="w-full sm:w-48 cursor-pointer"
    >
      <div className="rounded overflow-hidden shadow-md bg-gray-800 text-white hover:scale-105 transition-transform">
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-72 object-cover"
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-md font-semibold truncate">{movie.title}</h3>
          <p className="text-gray-400 text-sm">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default MovieCard;