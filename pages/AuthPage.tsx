import React, { useState } from 'react';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all">
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to <span className="text-green-600">SavePay</span></h1>
            <p className="text-gray-500">{isLoginView ? "Sign in to continue" : "Create an account to start saving"}</p>
        </div>
        
        {isLoginView ? <SignInForm /> : <SignUpForm />}
        
        <p className="text-center text-sm text-gray-600">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLoginView(!isLoginView)}
            className="font-semibold text-green-600 hover:text-green-700 ml-1 focus:outline-none"
          >
            {isLoginView ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;