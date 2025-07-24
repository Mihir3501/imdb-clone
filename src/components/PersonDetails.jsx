import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPersonDetails } from '../services/movieService'; // Import from your API file
import Navbar from '../components/Navbar';

const PersonDetails = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const [personData, setPersonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPersonData = async () => {
      try {
        setLoading(true);
        const data = await fetchPersonDetails(personId);
        if (data) {
          setPersonData(data);
        } else {
          setError('Failed to load person details');
        }
      } catch (err) {
        setError('Failed to load person details');
      } finally {
        setLoading(false);
      }
    };

    loadPersonData();
  }, [personId]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const calculateAge = (birthday, deathday = null) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    const age = endDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = endDate.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
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

  if (error) {
    return (
      <>
        <Navbar />
        <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
          <h1 className="text-2xl mb-4 text-red-400">{error}</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition-colors"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  if (!personData) {
    return (
      <>
        <Navbar />
        <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
          <h1 className="text-2xl mb-4">Person not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition-colors"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  const { person, credits } = personData;
  const imageUrl = person.profile_path 
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : null;

  const age = calculateAge(person.birthday, person.deathday);
  const popularMovies = credits.cast
    ?.filter(movie => movie.poster_path) // Only movies with posters
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 12) || [];

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen text-white">
        {/* Hero Section */}
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Photo */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={person.name}
                    className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-64 h-96 bg-gray-700 rounded-lg shadow-2xl flex items-center justify-center">
                    <span className="text-gray-400 text-8xl">👤</span>
                  </div>
                )}
              </div>

              {/* Person Information */}
              <div className="flex-1 lg:pl-8">
                <div className="text-center lg:text-left">
                  {/* Name */}
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-yellow-400 leading-tight">
                    {person.name}
                  </h1>

                  {/* Known For Department */}
                  {person.known_for_department && (
                    <p className="text-xl text-gray-300 mb-6">
                      Known for {person.known_for_department}
                    </p>
                  )}

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {person.birthday && (
                      <div>
                        <h3 className="text-yellow-400 font-semibold text-lg mb-2">Born</h3>
                        <p className="text-white text-lg">
                          {new Date(person.birthday).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                          {age && <span className="text-gray-400"> (age {age})</span>}
                        </p>
                      </div>
                    )}
                    
                    {person.deathday && (
                      <div>
                        <h3 className="text-yellow-400 font-semibold text-lg mb-2">Died</h3>
                        <p className="text-white text-lg">
                          {new Date(person.deathday).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}

                    {person.place_of_birth && (
                      <div className={person.deathday ? "md:col-span-2" : ""}>
                        <h3 className="text-yellow-400 font-semibold text-lg mb-2">Place of Birth</h3>
                        <p className="text-white text-lg">{person.place_of_birth}</p>
                      </div>
                    )}
                  </div>

                  {/* Biography */}
                  {person.biography && (
                    <div className="max-w-4xl">
                      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Biography</h2>
                      <div className="text-gray-300 text-lg leading-relaxed">
                        {person.biography.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Known For Section */}
        {popularMovies.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">Known For</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {popularMovies.map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-200"
                >
                  <div className="relative overflow-hidden rounded-lg mb-3 shadow-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-white leading-tight group-hover:text-yellow-400 transition-colors">
                    {movie.title}
                  </h4>
                  {movie.character && (
                    <p className="text-gray-400 text-xs leading-tight">
                      as {movie.character}
                    </p>
                  )}
                  {movie.release_date && (
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Credits Section */}
        {credits.cast && credits.cast.length > 12 && (
          <div className="bg-gray-900 py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-yellow-400">Filmography</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {credits.cast
                  .sort((a, b) => {
                    if (!a.release_date && !b.release_date) return 0;
                    if (!a.release_date) return 1;
                    if (!b.release_date) return -1;
                    return new Date(b.release_date) - new Date(a.release_date);
                  })
                  .map((movie) => (
                    <div 
                      key={`${movie.id}-${movie.credit_id}`}
                      onClick={() => handleMovieClick(movie.id)}
                      className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors group"
                    >
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="w-12 h-18 object-cover rounded flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-18 bg-gray-600 rounded flex-shrink-0 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">🎬</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          {movie.title}
                        </h4>
                        {movie.character && (
                          <p className="text-gray-400 text-sm">as {movie.character}</p>
                        )}
                        {movie.release_date && (
                          <p className="text-gray-500 text-sm">
                            {new Date(movie.release_date).getFullYear()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

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

export default PersonDetails;