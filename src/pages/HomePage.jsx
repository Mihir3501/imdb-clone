import React, {useEffect, useState}from 'react'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard';

const HomePage = () => {
   const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchPopularMovies();
      setMovies(data);
      setLoading(false);
    };

    loadMovies();
  }, []);
  return (
    <>
    <div>
      <Navbar/>
</div>
 <div className="px-6 py-4 bg-black min-h-screen  text-white">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">Popular Movies</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default HomePage
