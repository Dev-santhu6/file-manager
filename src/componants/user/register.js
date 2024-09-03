import React, { useState } from 'react';
import './SignInSignUp.css';

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="container">
      <div className="form-container">
        <button className="toggle-button" onClick={handleToggleForm}>
          {isSignIn ? 'Switch to Sign Up' : 'Switch to Sign In'}
        </button>

        {isSignIn ? (
          <form className="form">
            <h2>Sign In</h2>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" required />
            <button type="submit">Sign In</button>
          </form>
        ) : (
          <form className="form">
            <h2>Sign Up</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" required />
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInSignUp;
