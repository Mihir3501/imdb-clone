import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  clearError,
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated 
} from '../../store/authSlice';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component mounts or mode changes
  useEffect(() => {
    dispatch(clearError());
  }, [isSignUp, dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      if (isSignUp) {
        // Sign up validation
        if (formData.password !== formData.confirmPassword) {
          dispatch(loginFailure('Passwords do not match'));
          return;
        }
        if (formData.password.length < 6) {
          dispatch(loginFailure('Password must be at least 6 characters'));
          return;
        }

        // Simulate account creation
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=f59e0b&color=000`,
          provider: 'email'
        };

        // In a real app, you'd make an API call here
        setTimeout(() => {
          dispatch(loginSuccess(newUser));
        }, 1000);

      } else {
        // Sign in logic
        if (!formData.email || !formData.password) {
          dispatch(loginFailure('Please fill in all fields'));
          return;
        }

        // Simulate login - in real app, you'd validate credentials
        const user = {
          id: Date.now(),
          name: formData.email.split('@')[0],
          email: formData.email,
          avatar: `https://ui-avatars.com/api/?name=${formData.email}&background=f59e0b&color=000`,
          provider: 'email'
        };

        setTimeout(() => {
          dispatch(loginSuccess(user));
        }, 1000);
      }
    } catch (err) {
      dispatch(loginFailure(err.message || 'Authentication failed'));
    }
  };

  const handleSocialLogin = (provider) => {
    dispatch(loginStart());
    
    // Simulate social login
    const user = {
      id: Date.now(),
      name: `User from ${provider}`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: `https://ui-avatars.com/api/?name=${provider}&background=f59e0b&color=000`,
      provider: provider.toLowerCase()
    };

    setTimeout(() => {
      dispatch(loginSuccess(user));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Sign In Form */}
          <div className="max-w-md">
            <h1 className="text-3xl font-normal mb-8 border-l-4 border-yellow-400 pl-4">
              {isSignUp ? 'Create Account' : 'Sign in'}
            </h1>
            
            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-600 text-white rounded text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              {/* Toggle between Sign In and Sign Up */}
              <div className="flex border-b border-gray-600">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-2 text-center transition-colors ${
                    !isSignUp 
                      ? 'border-b-2 border-yellow-400 text-yellow-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-2 text-center transition-colors ${
                    isSignUp 
                      ? 'border-b-2 border-yellow-400 text-yellow-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {isSignUp && (
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-600 text-white py-3 px-4 rounded focus:outline-none focus:border-yellow-400"
                    required
                  />
                )}
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-600 text-white py-3 px-4 rounded focus:outline-none focus:border-yellow-400"
                  required
                />
                
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-600 text-white py-3 px-4 rounded focus:outline-none focus:border-yellow-400"
                  required
                />
                
                {isSignUp && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-600 text-white py-3 px-4 rounded focus:outline-none focus:border-yellow-400"
                    required
                  />
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </button>
              </form>
              
              <div className="text-center text-gray-400 text-sm">
                or
              </div>
              
              {/* Social Sign In Options */}
              <div className="space-y-3">
                <button 
                  onClick={() => handleSocialLogin('IMDb')}
                  disabled={loading}
                  className="w-full bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white py-3 px-4 rounded flex items-center justify-center space-x-3 transition-colors disabled:opacity-50"
                >
                  <div className="bg-yellow-400 text-black font-bold px-2 py-1 text-xs rounded">
                    IMDb
                  </div>
                  <span>Sign in with IMDb</span>
                </button>
                
                <button 
                  onClick={() => handleSocialLogin('Amazon')}
                  disabled={loading}
                  className="w-full bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white py-3 px-4 rounded flex items-center justify-center space-x-3 transition-colors disabled:opacity-50"
                >
                  <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-sm">
                    a
                  </div>
                  <span>Sign in with Amazon</span>
                </button>
                
                <button 
                  onClick={() => handleSocialLogin('Google')}
                  disabled={loading}
                  className="w-full bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white py-3 px-4 rounded flex items-center justify-center space-x-3 transition-colors disabled:opacity-50"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-sm">G</span>
                  </div>
                  <span>Sign in with Google</span>
                </button>
                
                <button 
                  onClick={() => handleSocialLogin('Apple')}
                  disabled={loading}
                  className="w-full bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white py-3 px-4 rounded flex items-center justify-center space-x-3 transition-colors disabled:opacity-50"
                >
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-sm">🍎</span>
                  </div>
                  <span>Sign in with Apple</span>
                </button>
              </div>
            </div>
            
            {/* Terms */}
            <div className="mt-6 text-xs text-gray-400">
              By signing in, you agree to IMDb's{' '}
              <a href="#" className="text-blue-400 hover:underline">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>
              .
            </div>
          </div>
          
          {/* Right Side - Benefits */}
          <div className="lg:pl-12">
            <h2 className="text-2xl font-normal mb-8 text-white">
              It's so much better when you sign in
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Personalized recommendations</h3>
                <p className="text-gray-400">Titles tailored to your taste.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Your Watchlist</h3>
                <p className="text-gray-400">Track your future views and get reminders.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Your ratings</h3>
                <p className="text-gray-400">Rate and remember what you watch.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Contribute to IMDb</h3>
                <p className="text-gray-400">Add data that helps millions of fans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;  