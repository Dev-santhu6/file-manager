

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UploadForm from './componants/uploadform/uploadform.js'; // Ensure correct path
import UpdateForm from './componants/updateform/updateform.js'; // Ensure correct path
import GetForm from './componants/getform/getform.js'; // Ensure correct path
import Login  from './componants/SignIn/Signin.jsx'; // Ensure correct path
import SignUp from './componants/SignUp/SignUp.jsx'; // Ensure correct path
import axios from 'axios';


import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showGetForm, setShowGetForm] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleToggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  const handleToggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleToggleGetForm = () => {
    setShowGetForm(!showGetForm);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      // Send request to server to clear the cookie
      await axios.post('http://localhost:3001/api/user/logout');
      
      // Clear local storage
      localStorage.clear();

      // Redirect to login page
      window.location.href = '/login'; // or '/home', depending on your routing
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <>
            <button onClick={handleToggleUploadForm} className="upload-button">
              {showUploadForm ? 'Close Upload Form' : 'Open Upload Form'}
            </button>
            <button onClick={handleToggleUpdateForm} className="upload-button">
              {showUpdateForm ? 'Close Update Form' : 'Open Update Form'}
            </button>
            <button onClick={handleToggleGetForm} className="upload-button">
              {showGetForm ? 'Close Get Form' : 'Open Get Form'}
            </button>

            {showUploadForm && <UploadForm />}
            {showUpdateForm && (
              <div>
                <div>
                  <label>Folder Name:</label>
                  <input
                    type="text"
                    value={folderName}
                    onChange={handleFolderNameChange}
                    placeholder="Enter folder name"
                  />
                </div>
                {folderName && <UpdateForm folderName={folderName} />}
              </div>
            )}
            {showGetForm && <GetForm />}

            <button onClick={handleLogout} className="upload-button">Logout</button>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
