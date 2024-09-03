import React, { useState } from 'react';
import axios from 'axios';
import "../deleteform/deleteform.css"

const DeleteFolderForm = ({ handleFormSwitch }) => {
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleDeleteFolder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/delete-folder/${name}`);
      console.log(response.data);
      alert('Folder and details deleted successfully!');
    } catch (error) {
      console.error('Error deleting folder:', error);
      alert('Failed to delete folder');
    }
  };

  return (
    <div className='delete-folder-form '>
    <form onSubmit={handleDeleteFolder}>
      <div className="form-group">
        <label>Folder Name:</label>
        <input type="text" value={name} onChange={handleInputChange} required />
      </div>
      <button type="submit" className="btn">Delete Folder</button>
      <button type="button" onClick={() => handleFormSwitch('')} className="btn">Back</button>
    </form>
    </div>
  );
};

export default DeleteFolderForm;
