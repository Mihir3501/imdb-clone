import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieVideos, fetchMovieCredits } from '../services/movieService';
import Navbar from '../components/Navbar';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        setLoading(true);

        const [movieData, videosData, creditsData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieVideos(id),
          fetchMovieCredits(id)
        ]);

        setMovie(movieData);
        setVideos(videosData);
        setCredits(creditsData);
      } catch (error) {
        console.error('Error loading movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovieData();
  }, [id]);

  const getTrailerUrl = () => {
    if (!videos.length) return null;

    const trailer = videos.find(video =>
      video.site === 'YouTube' &&
      (video.type === 'Trailer' && video.name.includes('Official'))
    ) || videos.find(video =>
      video.site === 'YouTube' && video.type === 'Trailer'
    ) || videos.find(video =>
      video.site === 'YouTube'
    );

    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-black min-h-screen text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar />
        <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
          <h1 className="text-2xl mb-4">Movie not found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </>
    );
  }

  const trailerUrl = getTrailerUrl();
  const director = credits?.crew?.find(person => person.job === 'Director');
  const writers = credits?.crew?.filter(person => person.job === 'Writer' || person.job === 'Screenplay') || [];
  const mainCast = credits?.cast?.slice(0, 8) || [];

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen text-white">
        {/* Hero Section */}
        <div className="relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: movie.backdrop_path
                ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                : 'linear-gradient(135deg, #1a1a1a, #2d2d2d)'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : '/api/placeholder/400/600'}
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Information */}
              <div className="flex-1 lg:pl-8">
                <div className="text-center lg:text-left">
                  {/* Title */}
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-yellow-400 leading-tight">
                    {movie.title}
                  </h1>

                  {/* Tagline */}
                  {movie.tagline && (
                    <p className="text-xl text-gray-300 italic mb-6 opacity-80">
                      "{movie.tagline}"
                    </p>
                  )}

                  {/* Movie Stats */}
                  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-6">
                    <div className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-bold text-lg">
                      ⭐ {movie.vote_average.toFixed(1)}/10
                    </div>
                    <span className="text-lg">{new Date(movie.release_date).getFullYear()}</span>
                    <span className="text-lg">{formatRuntime(movie.runtime)}</span>
                    <span className="border-2 border-gray-400 px-3 py-1 rounded text-sm font-semibold">
                      {movie.adult ? 'R' : 'PG-13'}
                    </span>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                    {trailerUrl && (
                      <a
                        href={trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-3 shadow-lg"
                      >
                        <span className="text-2xl">▶️</span>
                        Watch Trailer
                      </a>
                    )}
                    <button className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-3 shadow-lg">
                      <span className="text-xl">➕</span>
                      Watchlist
                    </button>
                  </div>

                  {/* Overview */}
                  <div className="max-w-4xl">
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">Overview</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {movie.overview || "No overview available."}
                    </p>
                  </div>

                  {/* Key Personnel */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {director && (
                      <div>
                        <h3 className="text-yellow-400 font-semibold text-lg mb-2">Director</h3>
                        <p className="text-white text-lg">{director.name}</p>
                      </div>
                    )}
                    {writers.length > 0 && (
                      <div>
                        <h3 className="text-yellow-400 font-semibold text-lg mb-2">
                          {writers.length > 1 ? 'Writers' : 'Writer'}
                        </h3>
                        <p className="text-white text-lg">
                          {writers.map(writer => writer.name).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {/* Cast Section - Updated to make clickable */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-yellow-400">Top Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {mainCast.map((actor) => (
              <div
                key={actor.id}
                className="text-center group cursor-pointer"
                onClick={() => navigate(`/person/${actor.id}`)}
              >
                <div className="relative overflow-hidden rounded-lg mb-3 transform group-hover:scale-105 transition-transform duration-200">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 text-3xl">👤</span>
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-sm mb-1 text-white leading-tight group-hover:text-yellow-400 transition-colors">
                  {actor.name}
                </h4>
                <p className="text-gray-400 text-xs leading-tight">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Movie Details Section */}
        <div className="bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">Movie Details</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-3">
                  <span className="text-gray-400 text-sm uppercase tracking-wide">Release Date</span>
                  <p className="text-white text-lg font-medium">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <span className="text-gray-400 text-sm uppercase tracking-wide">Runtime</span>
                  <p className="text-white text-lg font-medium">{formatRuntime(movie.runtime)}</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <span className="text-gray-400 text-sm uppercase tracking-wide">Status</span>
                  <p className="text-white text-lg font-medium">{movie.status}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-3">
                  <span className="text-gray-400 text-sm uppercase tracking-wide">Budget</span>
                  <p className="text-white text-lg font-medium">{formatCurrency(movie.budget)}</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <span className="text-gray-400 text-sm uppercase tracking-wide">Revenue</span>
                  <p className="text-white text-lg font-medium">{formatCurrency(movie.revenue)}</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <span className="text-gray-400 text-sm uppercase tracking-wide">Original Language</span>
                  <p className="text-white text-lg font-medium uppercase">{movie.original_language}</p>
                </div>
              </div>

              {movie.production_companies.length > 0 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm uppercase tracking-wide block mb-3">
                      Production Companies
                    </span>
                    <div className="space-y-2">
                      {movie.production_companies.slice(0, 4).map((company) => (
                        <div key={company.id} className="flex items-center gap-3">
                          {company.logo_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                              alt={company.name}
                              className="h-6 object-contain bg-white rounded px-1"
                            />
                          )}
                          <span className="text-white">{company.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 flex items-center gap-3 shadow-lg"
          >
            ← Back
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;