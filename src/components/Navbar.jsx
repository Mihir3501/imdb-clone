import { useState, useEffect, useRef } from "react"
import { FaSearch, FaUser } from "react-icons/fa";
import { FiMenu, FiChevronDown, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, selectIsAuthenticated } from '../store/authSlice';
import { searchMovies } from '../services/movieService'; // Import your movie service

const Navbar = () => {
    const [search, setSearch] = useState("")
    const [searchType, setSearchType] = useState("all")
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [searchSuggestions, setSearchSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Redux selectors
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // Get watchlist count (you'll need to implement watchlistSlice selectors)
    const watchlistCount = useSelector(state => state.watchlist?.items?.length || 0);

    // Search suggestions effect
    useEffect(() => {
        const getSearchSuggestions = async () => {
            if (search.length < 2) {
                setSearchSuggestions([]);
                setShowSuggestions(false);
                return;
            }

            setSearchLoading(true);
            try {
                // Use your actual movie service
                const results = await searchMovies(search);

                // Transform the results to match your suggestion format
                const formattedSuggestions = results.slice(0, 5).map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
                    type: 'movie',
                    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : null,
                    rating: movie.vote_average
                }));

                setSearchSuggestions(formattedSuggestions);
                setShowSuggestions(true);

            } catch (error) {
                console.error('Search suggestions error:', error);
                setSearchSuggestions([]);
                setShowSuggestions(false);
            }
            setSearchLoading(false);
        };

        const debounceTimer = setTimeout(getSearchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [search]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            performSearch(search, searchType);
        }
    }

    const performSearch = (query, type = "all") => {
        const searchUrl = type === "all" ? `/search/${encodeURIComponent(query)}` : `/search/${encodeURIComponent(query)}?type=${type}`;
        navigate(searchUrl);
        setSearch("");
        setShowSuggestions(false);
        setSearchSuggestions([]);
    }

    const handleSuggestionClick = (suggestion) => {
        navigate(`/movie/${suggestion.id}`);
        setSearch("");
        setShowSuggestions(false);
        setSearchSuggestions([]);
    }

    const clearSearch = () => {
        setSearch("");
        setShowSuggestions(false);
        setSearchSuggestions([]);
    }

    const handleSignIn = () => {
        navigate('/signin');
    }

    const handleLogout = () => {
        dispatch(logout());
        setShowUserMenu(false);
        navigate('/');
    }

    const handleWatchlist = () => {
        if (isAuthenticated) {
            navigate('/watchlist');
        } else {
            navigate('/signin');
        }
    }

    return (
        <>
            <div className="w-full">
                <nav className="bg-black text-white px-4 flex py-2 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div
                            className="bg-yellow-400 text-black font-bold px-2 py-1 text-xl rounded cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            IMDb
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer">
                            <FiMenu className="text-white text-xl" />
                            <span className="text-sm text-white font-semibold">Menu</span>
                        </div>
                    </div>

                    {/* Search Form with Suggestions */}
                    <div className="relative flex-1 max-w-2xl mx-6">
                        <form
                            className="flex border border-gray-400 rounded overflow-hidden"
                            onSubmit={handleSearch}
                            ref={searchRef}
                        >
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search IMDb"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full px-3 py-1 text-black bg-white outline-none"
                                    autoComplete="off"
                                />

                                {/* Clear button */}
                                {search && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <FiX />
                                    </button>
                                )}
                            </div>

                            <select
                                className="bg-white text-black px-2 outline-none"
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="movie">Movies</option>
                                <option value="tv">TV Shows</option>
                            </select>

                            <button className="bg-white px-3 flex items-center" type="submit">
                                <FaSearch className="text-gray-700" />
                            </button>
                        </form>

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && (searchSuggestions.length > 0 || searchLoading) && (
                            <div
                                ref={suggestionsRef}
                                className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-50 max-h-96 overflow-y-auto"
                            >
                                {searchLoading ? (
                                    <div className="p-4 text-center text-gray-500">
                                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                                        <span className="ml-2">Searching...</span>
                                    </div>
                                ) : (
                                    searchSuggestions.map((suggestion) => (
                                        <div
                                            key={suggestion.id}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                        >
                                            {suggestion.poster ? (
                                                <img
                                                    src={suggestion.poster}
                                                    alt={suggestion.title}
                                                    className="w-12 h-16 object-cover rounded mr-3 flex-shrink-0"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-12 h-16 bg-gray-300 rounded mr-3 flex-shrink-0 flex items-center justify-center">
                                                    <span className="text-gray-500 text-xs">No Image</span>
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-black font-medium truncate">
                                                    {suggestion.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span>{suggestion.year}</span>
                                                    {suggestion.rating && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="flex items-center">
                                                                ⭐ {suggestion.rating.toFixed(1)}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}

                                {!searchLoading && searchSuggestions.length > 0 && (
                                    <div className="p-2 border-t border-gray-200 bg-gray-50">
                                        <button 
                                            onClick={() => performSearch(search, searchType)}
                                            className="w-full text-left px-2 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                        >
                                            See all results for "{search}"
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="hover:text-yellow-400">
                            IMDB <span className="text-blue-500">Pro</span>
                        </a>

                        {/* Watchlist */}
                        <button
                            onClick={handleWatchlist}
                            className="hover:text-yellow-400 flex gap-1 items-center relative"
                        >
                            <span className="text-xl">➕</span>
                            <span>Watchlist</span>
                            {isAuthenticated && watchlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                    {watchlistCount > 99 ? '99+' : watchlistCount}
                                </span>
                            )}
                        </button>

                        {/* Authentication Section */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                                >
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-6 h-6 rounded-full"
                                        />
                                    ) : (
                                        <FaUser className="w-4 h-4" />
                                    )}
                                    <span className="hidden sm:inline">{user?.name || 'User'}</span>
                                    <FiChevronDown className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                </button>

                                {/* User Dropdown Menu */}
                                {showUserMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                                        <div className="py-2">
                                            <div className="px-4 py-2 border-b border-gray-600">
                                                <p className="font-semibold">{user?.name}</p>
                                                <p className="text-sm text-gray-400">{user?.email}</p>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    navigate('/profile');
                                                    setShowUserMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                                            >
                                                Your Profile
                                            </button>

                                            <button
                                                onClick={() => {
                                                    navigate('/watchlist');
                                                    setShowUserMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                                            >
                                                Your Watchlist
                                                {watchlistCount > 0 && (
                                                    <span className="ml-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                                                        {watchlistCount}
                                                    </span>
                                                )}
                                            </button>

                                            <button
                                                onClick={() => {
                                                    navigate('/ratings');
                                                    setShowUserMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                                            >
                                                Your Ratings
                                            </button>

                                            <div className="border-t border-gray-600 mt-2 pt-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors text-red-400"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleSignIn}
                                className="hover:text-yellow-400 transition-colors"
                            >
                                Sign in
                            </button>
                        )}

                        <select className="text-white bg-black" id="">
                            <option value="">EN</option>
                            <option value="">HI</option>
                        </select>
                    </div>
                </nav>

                {/* Click outside to close user menu */}
                {showUserMenu && (
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                    />
                )}
            </div>
        </>
    )
}

export default Navbar