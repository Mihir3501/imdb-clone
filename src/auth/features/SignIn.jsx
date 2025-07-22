import React, { useState } from 'react';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Sign In Form */}
          <div className="max-w-md">
            <h1 className="text-3xl font-normal mb-8 border-l-4 border-yellow-400 pl-4">
              Sign in
            </h1>
            
            <div className="space-y-4">
              {/* Create Account Button */}
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded text-lg transition-colors">
                Create an account
              </button>
              
              <div className="text-center text-gray-400 text-sm">
                or
              </div>
              
              {/* Sign In Options */}
              <div className="space-y-3">
                <button className="w-full bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white py-3 px-4 rounded flex items-center justify-center space-x-3 transition-colors">
                  <div className="bg-yellow-400 text-black font-bold px-2 py-1 text-xs rounded">
                    IMDb
                  </div>
                  <span>Sign in with IMDb</span>
                </button>
                
                <button className="w-full bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white py-3 px-4 rounded flex items-center justify-center space-x-3 transition-colors">
                  <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-sm">
                    a
                  </div>
                  <span>Sign in with Amazon</span>
                </button>
                
                <button className="w-full bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white py-3 px-4 rounded flex items-center justify-center space-x-3 transition-colors">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-sm">G</span>
                  </div>
                  <span>Sign in with Google</span>
                </button>
                
                <button className="w-full bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white py-3 px-4 rounded flex items-center justify-center space-x-3 transition-colors">
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