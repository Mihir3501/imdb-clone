import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure } from './authSlice';

// Mock authentication service
const authService = {
  // Simulate login with different providers
  signInWithProvider: async (provider, userData = {}) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          name: userData.name || 'John Doe',
          email: userData.email || 'john@example.com',
          avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'John Doe')}&background=f59e0b&color=000000`,
          provider: provider,
          joinDate: new Date().toISOString(),
          preferences: {
            theme: 'dark',
            notifications: true,
          },
        };
        
        // 90% success rate for demo
        if (Math.random() > 0.1) {
          resolve(user);
        } else {
          reject(new Error('Authentication failed. Please try again.'));
        }
      }, 1500); // Simulate network delay
    });
  },

  // Create new account
  createAccount: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          name: userData.name || 'New User',
          email: userData.email || 'newuser@example.com',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'New User')}&background=f59e0b&color=000000`,
          provider: 'imdb',
          joinDate: new Date().toISOString(),
          preferences: {
            theme: 'dark',
            notifications: true,
          },
        };
        
        if (Math.random() > 0.05) {
          resolve(user);
        } else {
          reject(new Error('Account creation failed. Please try again.'));
        }
      }, 2000);
    });
  },
};

// Async thunk for login
export const loginWithProvider = createAsyncThunk(
  'auth/loginWithProvider',
  async ({ provider, userData }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      const user = await authService.signInWithProvider(provider, userData);
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for creating account
export const createAccount = createAsyncThunk(
  'auth/createAccount',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      const user = await authService.createAccount(userData);
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      const errorMessage = error.message || 'Account creation failed';
      dispatch(loginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export { authService };