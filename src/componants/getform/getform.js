
import React, { useState } from 'react';
import axios from 'axios';

const GetFolderForm = () => {
  const [folderName, setFolderName] = useState('');
  const [folderDetails, setFolderDetails] = useState(null);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}api/get/${folderName}`); // Adjust the URL as needed
      setFolderDetails(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setFolderDetails(null);
    }
  };

  return (
    <div className="container">
      <h2>Get Folder Details and Images</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="folderName">Folder Name:</label>
          <input
            type="text"
            id="folderName"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Get Details</button>
      </form>

      {error && <p className="error">{error}</p>}

      {folderDetails && (
        <div className="details">
          <h3>Folder Details</h3>
          <p><strong>Folder ID:</strong> {folderDetails.folderId}</p>
          <p><strong>Folder Name:</strong> {folderDetails.folderName}</p>

          <h4>Details File Content</h4>
          <pre className="details-content">{folderDetails.detailsFileContent}</pre>

          <h4>Images</h4>

{folderDetails.images.length ? (
  <ul className="image-list">
    {folderDetails.images.map((file) => (
      <li key={file.id} className="image-item">
        <p>{file.name}</p>
        
        
        <a href={`https://drive.google.com/file/d/${file.id}/view`} target="_blank" rel="noopener noreferrer">
          View
        </a>
      </li>
    ))}
  </ul>
) : (
  <p>No images found in this folder.</p>
)}

        </div>
      )}
    </div>
  );
};

export default GetFolderForm;
