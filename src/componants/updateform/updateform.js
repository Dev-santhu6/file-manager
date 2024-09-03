// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';

// const UploadForm = ({ folderName }) => {
//   const [newName, setNewName] = useState('');
//   const [newDescription, setNewDescription] = useState('');
//   const [newLocation, setNewLocation] = useState('');
//   const [newMaterial, setNewMaterial] = useState('');
//   const [date, setDate] = useState('');
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   const [teamMembers, setTeamMembers] = useState('');
//   const [startMeterReading, setStartMeterReading] = useState('');
//   const [endMeterReading, setEndMeterReading] = useState('');
//   const [files, setFiles] = useState([]);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => setFiles(acceptedFiles),
//     multiple: true,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     files.forEach(file => formData.append('files', file));
//     formData.append('newName', newName);
//     formData.append('newDescription', newDescription);
//     formData.append('newLocation', newLocation);
//     formData.append('newMaterial', newMaterial);
//     formData.append('date', date);
//     formData.append('vehicleNumber', vehicleNumber);
//     formData.append('teamMembers', teamMembers.split(',').map(member => member.trim()));
//     formData.append('startMeterReading', startMeterReading);
//     formData.append('endMeterReading', endMeterReading);

//     try {
//       const response = await axios.put(`http://localhost:3001/api/update/${folderName}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert(response.data.message);
//     } catch (error) {
//       console.error('Error updating folder and details:', error);
//       alert('Failed to update folder and details');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', marginBottom: '20px' }}>
//         <input {...getInputProps()} />
//         <p>Drag & drop files here, or click to select files</p>
//       </div>
//       <input
//         type="text"
//         placeholder="New Name"
//         value={newName}
//         onChange={(e) => setNewName(e.target.value)}
//       />
//       <textarea
//         placeholder="New Description"
//         value={newDescription}
//         onChange={(e) => setNewDescription(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="New Location"
//         value={newLocation}
//         onChange={(e) => setNewLocation(e.target.value)}
//       />
//       <textarea
//         placeholder="New Material (JSON)"
//         value={newMaterial}
//         onChange={(e) => setNewMaterial(e.target.value)}
//       />
//       <input
//         type="date"
//         placeholder="Date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Vehicle Number"
//         value={vehicleNumber}
//         onChange={(e) => setVehicleNumber(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Team Members (comma separated)"
//         value={teamMembers}
//         onChange={(e) => setTeamMembers(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Start Meter Reading"
//         value={startMeterReading}
//         onChange={(e) => setStartMeterReading(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="End Meter Reading"
//         value={endMeterReading}
//         onChange={(e) => setEndMeterReading(e.target.value)}
//       />
//       <button type="submit">Update Folder</button>
//     </form>
//   );
// };

// export default UploadForm;



// src/components/UpdateForm.js



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpdateFolderForm = () => {
//   const [folders, setFolders] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     location: '',
//     material: '',
//     date: '',
//     vehicleNumber: '',
//     teamMembers: '',
//     startMeterReading: '',
//     endMeterReading: '',
//   });
//   const [files, setFiles] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     const fetchFolders = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/getfolder');
//         setFolders(response.data.folders);
//       } catch (error) {
//         console.error('Error fetching folders:', error);
//       }
//     };
//     fetchFolders();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handleFolderSelection = async (e) => {
//     const folderName = e.target.value;
//     setSelectedFolder(folderName);

//     // Fetch existing folder details and pre-fill the form
//     try {
//       const response = await axios.get(`http://localhost:3001/api/get`);
//       const details = response.data.details;
//       setFormData({
//         name: details.name || '',
//         description: details.description || '',
//         location: details.location || '',
//         material: details.material.join(', ') || '',
//         date: details.date || '',
//         vehicleNumber: details.vehicleNumber || '',
//         teamMembers: details.teamMembers.join(', ') || '',
//         startMeterReading: details.startMeterReading || '',
//         endMeterReading: details.endMeterReading || '',
//       });
//     } catch (error) {
//       console.error('Error fetching folder details:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       const formDataObj = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === 'material' || key === 'teamMembers') {
//           formDataObj.append(key, JSON.stringify(value.split(',')));
//         } else {
//           formDataObj.append(key, value);
//         }
//       });

//       if (files) {
//         for (let i = 0; i < files.length; i++) {
//           formDataObj.append('files', files[i]);
//         }
//       }

//       const response = await axios.post(`http://localhost:3001/api/update/${selectedFolder}`, formDataObj, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setMessage({ type: 'success', text: response.data.message });

//       // Clear the form
//       setFormData({
//         name: '',
//         description: '',
//         location: '',
//         material: '',
//         date: '',
//         vehicleNumber: '',
//         teamMembers: '',
//         startMeterReading: '',
//         endMeterReading: '',
//       });
//       setFiles(null);
//       setSelectedFolder('');
//     } catch (error) {
//       console.error('Error updating folder:', error.response ? error.response.data : error.message);
//       setMessage({ type: 'error', text: 'Failed to update folder' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Update Folder Details</h2>
//       {message && <div className={`message ${message.type}`}>{message.text}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Select Folder to Update:</label>
//           <select value={selectedFolder} onChange={handleFolderSelection} required>
//             <option value="">--Select Folder--</option>
//             {folders.map((folder) => (
//               <option key={folder.id} value={folder.name}>
//                 {folder.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div>
//           <label>Location:</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Materials (comma-separated):</label>
//           <input
//             type="text"
//             name="material"
//             value={formData.material}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Vehicle Number:</label>
//           <input
//             type="text"
//             name="vehicleNumber"
//             value={formData.vehicleNumber}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Team Members (comma-separated):</label>
//           <input
//             type="text"
//             name="teamMembers"
//             value={formData.teamMembers}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Start Meter Reading:</label>
//           <input
//             type="number"
//             name="startMeterReading"
//             value={formData.startMeterReading}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>End Meter Reading:</label>
//           <input
//             type="number"
//             name="endMeterReading"
//             value={formData.endMeterReading}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Upload Files:</label>
//           <input type="file" multiple onChange={handleFileChange} />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Updating...' : 'Update Folder'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateFolderForm;





















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function UpdateForm({ folderName }) { // Assume folderName is passed as a prop
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [location, setLocation] = useState('');
//     const [material, setMaterial] = useState([{ mainType: '', subTypes: [], whyChoose: '', model: '' }]);
//     const [files, setFiles] = useState([]);
//     const [date, setDate] = useState('');
//     const [vehicleNumber, setVehicleNumber] = useState('');
//     const [selectedMembers, setSelectedMembers] = useState([]);
//     const [startMeterReading, setStartMeterReading] = useState('');
//     const [endMeterReading, setEndMeterReading] = useState('');
//     const [loading, setLoading] = useState(false);

//     const mainTypeOptions = ['item', 'DC Circuits', 'AC Circuits'];
//     const subTypeOptions = {
//         'item': ['Panel', 'Inverter'],
//         'DC Circuits': ['DC Combiner 1/1', 'DC Combiner 2/2', 'DC Combiner 4/4', 'DC SPD', 'DC ISOLATOR', 'Enclosor Box DC', 'DC Cable 4mm', 'MC4 Connector', 'PVC Pipe', 'Cable Tie', 'GI Clip', 'Valve Socket', 'Bend', 'L Bow 3/4"', 'PVC Joint 3/4"', 'T-Socket 3/4"', 'Earth wire 6mm'],
//         'AC Circuits': ['SubType 3A', 'SubType 3B', 'SubType 3C'],
//     };

//     const memberOptions = [
//         { name: 'Member 1', trick: 'Expert in React' },
//         { name: 'Member 2', trick: 'Skilled in Node.js' },
//         { name: 'Member 3', trick: 'Great with databases' },
//         { name: 'Member 4', trick: 'UI/UX designer' },
//     ];

//     useEffect(() => {
//         // Fetch existing data for the folder and pre-fill the form
//         async function fetchData() {
//             try {
//                 const response = await axios.get(`http://localhost:3001/api/getfolder/${folderName}`);
//                 const data = response.data;
//                 setName(data.name);
//                 setDescription(data.description);
//                 setLocation(data.location);
//                 setMaterial(data.material);
//                 setDate(data.date);
//                 setVehicleNumber(data.vehicleNumber);
//                 setSelectedMembers(data.teamMembers);
//                 setStartMeterReading(data.startMeterReading);
//                 setEndMeterReading(data.endMeterReading);
//             } catch (error) {
//                 console.error('Failed to fetch folder details:', error);
//             }
//         }
//         fetchData();
//     }, [folderName]);

//     const handleMaterialChange = (index, field, value) => {
//         const newMaterial = [...material];
//         newMaterial[index][field] = value;
//         setMaterial(newMaterial);
//     };

//     const handleFileChange = (e) => {
//         setFiles(e.target.files);
//     };

//     const addMaterialField = () => {
//         setMaterial([...material, { mainType: '', subTypes: [], whyChoose: '', model: '' }]);
//     };

//     const removeMaterialField = (index) => {
//         const newMaterial = material.filter((_, i) => i !== index);
//         setMaterial(newMaterial);
//     };

//     const handleMemberChange = (e) => {
//         const value = e.target.value;
//         setSelectedMembers((prevSelected) =>
//             prevSelected.includes(value)
//                 ? prevSelected.filter((member) => member !== value)
//                 : [...prevSelected, value]
//         );
//     };

//     const resetForm = () => {
//         setName('');
//         setDescription('');
//         setLocation('');
//         setMaterial([{ mainType: '', subTypes: [], whyChoose: '', model: '' }]);
//         setFiles([]);
//         setDate('');
//         setVehicleNumber('');
//         setSelectedMembers([]);
//         setStartMeterReading('');
//         setEndMeterReading('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('description', description);
//         formData.append('location', location);
//         formData.append('date', date);
//         formData.append('vehicleNumber', vehicleNumber);
//         formData.append('startMeterReading', startMeterReading);
//         formData.append('endMeterReading', endMeterReading);
//         formData.append('material', JSON.stringify(material));
//         selectedMembers.forEach((member, index) => {
//             formData.append(`teamMembers[${index}]`, member);
//         });
//         if (files.length > 0) {
//             Array.from(files).forEach((file) => {
//                 formData.append('files', file);
//             });
//         }

//         try {
//             const response = await axios.put(`http://localhost:3001/api/update/${folderName}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             toast.success('Update successful!');
//             console.log(response.data);
//             resetForm();
//         } catch (error) {
//             console.error('Update failed:', error.response ? error.response.data : error.message);
//             toast.error('Update failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="upload-form">
//             <form onSubmit={handleSubmit}>
//             <form onSubmit={handleSubmit}>
//     <div className="form-group">
//         <label htmlFor="name">Name:</label>
//         <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//         />
//     </div>

//     <div className="form-group">
//         <label htmlFor="description">Description:</label>
//         <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//         ></textarea>
//     </div>

//     <div className="form-group">
//         <label htmlFor="location">Location:</label>
//         <input
//             type="text"
//             id="location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             required
//         />
//     </div>

//     <div className="form-group">
//         <label htmlFor="date">Date:</label>
//         <input
//             type="date"
//             id="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//         />
//     </div>

//     <div className="form-group">
//         <label htmlFor="vehicleNumber">Vehicle Number:</label>
//         <input
//             type="text"
//             id="vehicleNumber"
//             value={vehicleNumber}
//             onChange={(e) => setVehicleNumber(e.target.value)}
//             required
//         />
//     </div>

//     <div className="form-group">
//         <label htmlFor="startMeterReading">Start Meter Reading:</label>
//         <input
//             type="number"
//             id="startMeterReading"
//             value={startMeterReading}
//             onChange={(e) => setStartMeterReading(e.target.value)}
//             required
//         />
//     </div>

//     <div className="form-group">
//         <label htmlFor="endMeterReading">End Meter Reading:</label>
//         <input
//             type="number"
//             id="endMeterReading"
//             value={endMeterReading}
//             onChange={(e) => setEndMeterReading(e.target.value)}
//             required
//         />
//     </div>

//     <div className="form-group">
//         <label>Materials:</label>
//         {material.map((mat, index) => (
//             <div key={index}>
//                 <select
//                     value={mat.mainType}
//                     onChange={(e) => handleMaterialChange(index, 'mainType', e.target.value)}
//                 >
//                     <option value="">Select Main Type</option>
//                     {mainTypeOptions.map((type) => (
//                         <option key={type} value={type}>
//                             {type}
//                         </option>
//                     ))}
//                 </select>

//                 {mat.mainType && (
//                     <select
//                         value={mat.subTypes}
//                         onChange={(e) => handleMaterialChange(index, 'subTypes', e.target.value)}
//                         multiple
//                     >
//                         {subTypeOptions[mat.mainType].map((subType) => (
//                             <option key={subType} value={subType}>
//                                 {subType}
//                             </option>
//                         ))}
//                     </select>
//                 )}

//                 <input
//                     type="text"
//                     placeholder="Why Choose"
//                     value={mat.whyChoose}
//                     onChange={(e) => handleMaterialChange(index, 'whyChoose', e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Model"
//                     value={mat.model}
//                     onChange={(e) => handleMaterialChange(index, 'model', e.target.value)}
//                 />
//                 <button type="button" onClick={() => removeMaterialField(index)}>Remove</button>
//             </div>
//         ))}
//         <button type="button" onClick={addMaterialField}>Add Material</button>
//     </div>

//     <div className="form-group">
//         <label htmlFor="teamMembers">Team Members:</label>
//         {memberOptions.map((member) => (
//             <div key={member.name}>
//                 <input
//                     type="checkbox"
//                     id={member.name}
//                     value={member.name}
//                     checked={selectedMembers.includes(member.name)}
//                     onChange={handleMemberChange}
//                 />
//                 <label htmlFor={member.name}>{member.name}</label>
//             </div>
//         ))}
//     </div>

//     <div className="form-group">
//         <label htmlFor="files">Upload Files:</label>
//         <input type="file" id="files" multiple onChange={handleFileChange} />
//     </div>

//     <button type="submit" disabled={loading}>
//         {loading ? 'Updating...' : 'Update'}
//     </button>
// </form>

//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Updating...' : 'Update'}
//                 </button>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default UpdateForm;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../updateform/updateform.css"


function UpdateForm({ folderName }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [material, setMaterial] = useState([{ mainType: '', subTypes: [], whyChoose: '', model: '' }]);
    const [files, setFiles] = useState([]);
    const [date, setDate] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [startMeterReading, setStartMeterReading] = useState('');
    const [endMeterReading, setEndMeterReading] = useState('');
    const [loading, setLoading] = useState(false);

    // Options for the main types and subtypes
    const mainTypeOptions = ['item', 'DC Circuits', 'AC Circuits'];
    const subTypeOptions = {
        'item': ['Panel', 'Inverter'],
        'DC Circuits': ['DC Combiner 1/1', 'DC Combiner 2/2', 'DC Combiner 4/4', 'DC SPD', 'DC ISOLATOR', 'Enclosor Box DC', 'DC Cable 4mm', 'MC4 Connector', 'PVC Pipe', 'Cable Tie', 'GI Clip', 'Valve Socket', 'Bend', 'L Bow 3/4"', 'PVC Joint 3/4"', 'T-Socket 3/4"', 'Earth wire 6mm'],
        'AC Circuits': ['RCCB', 'AC SPD', 'AC Isolator', 'Enclosure Box', 'Relay with Base', 'Buzzer-230V Single', 'AC Cable', 'AC Supply Cable', 'Bus Bar and Enclosure', '16mm Earth Rod', 'Earth Cable', 'Earth Cable Busbar', '2*2 Casing', 'PVC Pipe', 'Cable Tie', 'GI Clip', 'Valve Socket', 'Bend', 'L Bow', 'PVC Joint'],
'Solar. Mounting Structure': ['Rail 66 6.2m', 'Rail 66 4.5m', 'Adjustable Tile Hook', 'Y Clamp', 'S Clamp', 'Base Unit', 'T-Clamp 40-45', 'END Clamp h33', 'Self SCrew', 'Connector Clamp', 'Lock Nut', 'Aluminum L Bar']

    };

    // Options for team members
    const memberOptions = [
        { name: 'Member 1', trick: 'Expert in React' },
        { name: 'Member 2', trick: 'Skilled in Node.js' },
        { name: 'Member 3', trick: 'Great with databases' },
        { name: 'Member 4', trick: 'UI/UX designer' },
    ];

    useEffect(() => {
        // Fetch existing data for the folder and pre-fill the form
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3001/api/getfolder/${folderName}`);
                const data = response.data;
                setName(data.name);
                setDescription(data.description);
                setLocation(data.location);
                setMaterial(data.material || [{ mainType: '', subTypes: [], whyChoose: '', model: '' }]);
                setDate(data.date);
                setVehicleNumber(data.vehicleNumber);
                setSelectedMembers(data.teamMembers || []);
                setStartMeterReading(data.startMeterReading);
                setEndMeterReading(data.endMeterReading);
            } catch (error) {
                console.error('Failed to fetch folder details:', error);
            }
        }
        fetchData();
    }, [folderName]);

    const handleMaterialChange = (index, field, value) => {
        const newMaterial = [...material];
        newMaterial[index][field] = value;
        setMaterial(newMaterial);
    };

    const handleSubTypeChange = (index, subType) => {
        const newMaterial = [...material];
        if (newMaterial[index].subTypes.includes(subType)) {
            newMaterial[index].subTypes = newMaterial[index].subTypes.filter((type) => type !== subType);
        } else {
            newMaterial[index].subTypes.push(subType);
        }
        setMaterial(newMaterial);
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const addMaterialField = () => {
        setMaterial([...material, { mainType: '', subTypes: [], whyChoose: '', model: '' }]);
    };

    const removeMaterialField = (index) => {
        const newMaterial = material.filter((_, i) => i !== index);
        setMaterial(newMaterial);
    };

    const handleMemberChange = (e) => {
        const value = e.target.value;
        setSelectedMembers((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((member) => member !== value)
                : [...prevSelected, value]
        );
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setLocation('');
        setMaterial([{ mainType: '', subTypes: [], whyChoose: '', model: '' }]);
        setFiles([]);
        setDate('');
        setVehicleNumber('');
        setSelectedMembers([]);
        setStartMeterReading('');
        setEndMeterReading('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('date', date);
        formData.append('vehicleNumber', vehicleNumber);
        formData.append('startMeterReading', startMeterReading);
        formData.append('endMeterReading', endMeterReading);
        formData.append('material', JSON.stringify(material));
        selectedMembers.forEach((member, index) => {
            formData.append(`teamMembers[${index}]`, member);
        });
        if (files.length > 0) {
            Array.from(files).forEach((file) => {
                formData.append('files', file);
            });
        }

        try {
            const response = await axios.put(`http://localhost:3001/api/update/${folderName}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Update successful!');
            console.log(response.data);
            resetForm();
        } catch (error) {
            console.error('Update failed:', error.response ? error.response.data : error.message);
            toast.error('Update failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-form">
             {loading && (
                <div className="loader">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Materials:</label>
                    {material.map((mat, index) => (
                        <div key={index}>
                            <select
                                value={mat.mainType}
                                onChange={(e) => handleMaterialChange(index, 'mainType', e.target.value)}
                            >
                                <option value="">Select Main Type</option>
                                {mainTypeOptions.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>

                            {mat.mainType && (
                                <div>
                                    <label>Sub Types:</label>
                                    {subTypeOptions[mat.mainType].map((subType) => (
                                        <div key={subType}>
                                            <input
                                                type="checkbox"
                                                value={subType}
                                                checked={mat.subTypes.includes(subType)}
                                                onChange={() => handleSubTypeChange(index, subType)}
                                            />
                                            <label>{subType}</label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <input
                                type="text"
                                placeholder="Why Choose"
                                value={mat.whyChoose}
                                onChange={(e) => handleMaterialChange(index, 'whyChoose', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Model"
                                value={mat.model}
                                onChange={(e) => handleMaterialChange(index, 'model', e.target.value)}
                            />
                            <button type="button" onClick={() => removeMaterialField(index)}>
                                Remove Material
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addMaterialField}>
                        Add Material
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="vehicleNumber">Vehicle Number:</label>
                    <input
                        type="text"
                        id="vehicleNumber"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Team Members:</label>
                    {memberOptions.map((member) => (
                        <div key={member.name}>
                            <input
                                type="checkbox"
                                value={member.name}
                                checked={selectedMembers.includes(member.name)}
                                onChange={handleMemberChange}
                            />
                            <label>{member.name}</label>
                        </div>
                    ))}
                </div>
                <div className="form-group">
                    <label htmlFor="startMeterReading">Start Meter Reading:</label>
                    <input
                        type="number"
                        id="startMeterReading"
                        value={startMeterReading}
                        onChange={(e) => setStartMeterReading(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endMeterReading">End Meter Reading:</label>
                    <input
                        type="number"
                        id="endMeterReading"
                        value={endMeterReading}
                        onChange={(e) => setEndMeterReading(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="files">Upload Files:</label>
                    <input type="file" id="files" multiple onChange={handleFileChange} />
                </div>

                <button type="submit">Update</button>

            </form>

            <ToastContainer />
        </div>
    );
}

export default UpdateForm;
