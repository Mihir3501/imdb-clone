import { createSlice } from '@reduxjs/toolkit';

// Load watchlist from localStorage
const loadWatchlistFromStorage = () => {
  try {
    const watchlist = localStorage.getItem('imdb_watchlist');
    return watchlist ? JSON.parse(watchlist) : [];
  } catch (error) {
    console.error('Error loading watchlist from storage:', error);
    return [];
  }
};

const initialState = {
  items: loadWatchlistFromStorage(),
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      const exists = state.items.find(item => item.id === movie.id);
      
      if (!exists) {
        state.items.push(movie);
        // Save to localStorage
        localStorage.setItem('imdb_watchlist', JSON.stringify(state.items));
      }
    },
    removeFromWatchlist: (state, action) => {
      const movieId = action.payload;
      state.items = state.items.filter(item => item.id !== movieId);
      // Save to localStorage
      localStorage.setItem('imdb_watchlist', JSON.stringify(state.items));
    },
    clearWatchlist: (state) => {
      state.items = [];
      localStorage.removeItem('imdb_watchlist');
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} = watchlistSlice.actions;

// Selectors
export const selectWatchlist = (state) => state.watchlist.items;
export const selectIsInWatchlist = (state, movieId) => 
  state.watchlist.items.some(item => item.id === movieId);

export default watchlistSlice.reducer;