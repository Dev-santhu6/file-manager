// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "../updateform/updateform.css"


// function UpdateForm({ folderName }) {
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

//     // Options for the main types and subtypes
//     const mainTypeOptions = ['Main Items', 'DC Circuits', 'AC Circuits','Solar. Mounting Structure'];
//     const subTypeOptions = {
//         'Main Items': ['Panel', 'Inverter'],
//         'DC Circuits': ['DC Combiner 1/1', 'DC Combiner 2/2', 'DC Combiner 4/4', 'DC SPD', 'DC ISOLATOR', 'Enclosor Box DC', 'DC Cable 4mm', 'MC4 Connector', 'PVC Pipe', 'Cable Tie', 'GI Clip', 'Valve Socket', 'Bend', 'L Bow 3/4"', 'PVC Joint 3/4"', 'T-Socket 3/4"', 'Earth wire 6mm'],
//         'AC Circuits': ['RCCB', 'AC SPD', 'AC Isolator', 'Enclosure Box', 'Relay with Base', 'Buzzer-230V Single', 'AC Cable', 'AC Supply Cable', 'Bus Bar and Enclosure', '16mm Earth Rod', 'Earth Cable', 'Earth Cable Busbar', '2*2 Casing', 'PVC Pipe', 'Cable Tie', 'GI Clip', 'Valve Socket', 'Bend', 'L Bow', 'PVC Joint'],
//         'Solar. Mounting Structure': ['Rail 66 6.2m', 'Rail 66 4.5m', 'Adjustable Tile Hook', 'Y Clamp', 'S Clamp', 'Base Unit', 'T-Clamp 40-45', 'END Clamp h33', 'Self SCrew', 'Connector Clamp', 'Lock Nut', 'Aluminum L Bar']

//     };

//     // Options for team members
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
//                 setMaterial(data.material || [{ mainType: '', subTypes: [], whyChoose: '', model: '' }]);
//                 setDate(data.date);
//                 setVehicleNumber(data.vehicleNumber);
//                 setSelectedMembers(data.teamMembers || []);
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

//     const handleSubTypeChange = (index, subType) => {
//         const newMaterial = [...material];
//         if (newMaterial[index].subTypes.includes(subType)) {
//             newMaterial[index].subTypes = newMaterial[index].subTypes.filter((type) => type !== subType);
//         } else {
//             newMaterial[index].subTypes.push(subType);
//         }
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
//         <div className="update-form">
//              {loading && (
//                 <div className="loader">
//                     <div className="circle1"></div>
//                     <div className="circle2"></div>
//                     <div className="circle3"></div>
//                 </div>
//             )}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="name">Name:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="description">Description:</label>
//                     <textarea
//                         id="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                     ></textarea>
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="location">Location:</label>
//                     <input
//                         type="text"
//                         id="location"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Materials:</label>
//                     {material.map((mat, index) => (
//                         <div key={index}>
//                             <select
//                                 value={mat.mainType}
//                                 onChange={(e) => handleMaterialChange(index, 'mainType', e.target.value)}
//                             >
//                                 <option value="">Select Main Type</option>
//                                 {mainTypeOptions.map((type) => (
//                                     <option key={type} value={type}>
//                                         {type}
//                                     </option>
//                                 ))}
//                             </select>

                            // {mat.mainType &&(
                            //     <div>
                            //         <label>Sub Types:</label>
                            //         {subTypeOptions[mat.mainType].map((subType) => (
                            //             <div key={subType}>
                            //                 <input
                            //                     type="checkbox"
                            //                     value={subType}
                            //                     checked={mat.subTypes.includes(subType)}
                            //                     onChange={() => handleSubTypeChange(index, subType)}
                            //                 />
                            //                 <label>{subType}</label>
                            //             </div>
                            //         ))}
                            //     </div>
                            // )}

//                             <input
//                                 type="text"
//                                 placeholder="Why Choose"
//                                 value={mat.whyChoose}
//                                 onChange={(e) => handleMaterialChange(index, 'whyChoose', e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Model"
//                                 value={mat.model}
//                                 onChange={(e) => handleMaterialChange(index, 'model', e.target.value)}
//                             />
//                             <button type="button" onClick={() => removeMaterialField(index)}>
//                                 Remove Material
//                             </button>
//                         </div>
//                     ))}
//                     <button type="button" onClick={addMaterialField}>
//                         Add Material
//                     </button>
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="date">Date:</label>
//                     <input
//                         type="date"
//                         id="date"
//                         value={date}
//                         onChange={(e) => setDate(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="vehicleNumber">Vehicle Number:</label>
//                     <input
//                         type="text"
//                         id="vehicleNumber"
//                         value={vehicleNumber}
//                         onChange={(e) => setVehicleNumber(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Team Members:</label>
//                     {memberOptions.map((member) => (
//                         <div key={member.name}>
//                             <input
//                                 type="checkbox"
//                                 value={member.name}
//                                 checked={selectedMembers.includes(member.name)}
//                                 onChange={handleMemberChange}
//                             />
//                             <label>{member.name}</label>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="startMeterReading">Start Meter Reading:</label>
//                     <input
//                         type="number"
//                         id="startMeterReading"
//                         value={startMeterReading}
//                         onChange={(e) => setStartMeterReading(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="endMeterReading">End Meter Reading:</label>
//                     <input
//                         type="number"
//                         id="endMeterReading"
//                         value={endMeterReading}
//                         onChange={(e) => setEndMeterReading(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="files">Upload Files:</label>
//                     <input type="file" id="files" multiple onChange={handleFileChange} />
//                 </div>

//                 <button type="submit">Update</button>

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
    const mainTypeOptions = ['Main Items', 'DC Circuits', 'AC Circuits', 'Solar. Mounting Structure', 'Others'];
    const subTypeOptions = {
        'Main Items': ['Panel', 'Inverter'],
        'DC Circuits': ['DC Combiner 1/1', 'DC Combiner 2/2', 'DC Combiner 4/4', 'DC SPD', 'DC ISOLATOR', 'Enclosor Box DC', 'DC Cable 4mm', 'MC4 Connector', 'PVC Pipe', 'Cable Tie', 'GI Clip', 'Valve Socket', 'Bend', 'L Bow 3/4"', 'PVC Joint 3/4"', 'T-Socket 3/4"', 'Earth wire 6mm'],
        'AC Circuits': ['RCCB', 'AC SPD', 'AC Isolator', 'Enclosure Box', 'Relay with Base', 'Buzzer-230V Single', 'AC Cable', 'AC Supply Cable', 'Bus Bar and Enclosure', '16mm Earth Rod', 'Earth Cable', 'Earth Cable Busbar', '2*2 Casing', 'PVC Pipe', 'Cable Tie', 'GI Clip', 'Valve Socket', 'Bend', 'L Bow', 'PVC Joint'],
        'Solar. Mounting Structure': ['Rail 66 6.2m', 'Rail 66 4.5m', 'Adjustable Tile Hook', 'Y Clamp', 'S Clamp', 'Base Unit', 'T-Clamp 40-45', 'END Clamp h33', 'Self SCrew', 'Connector Clamp', 'Lock Nut', 'Aluminum L Bar']
    };

    // Options for team members
    // const memberOptions = [
    //     { name: 'Member 1', trick: 'Expert in React' },
    //     { name: 'Member 2', trick: 'Skilled in Node.js' },
    //     { name: 'Member 3', trick: 'Great with databases' },
    //     { name: 'Member 4', trick: 'UI/UX designer' },
    // ];
    const BASE_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Fetch existing data for the folder and pre-fill the form
        async function fetchData() {
            try {
                const response = await axios.get(`${BASE_URL}api/getfolder/${folderName}`);
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
    }, [folderName,BASE_URL]);

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

    const handleCustomSubTypeChange = (index, value) => {
        const newMaterial = [...material];
        newMaterial[index].subTypes = [value];
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
            const response = await axios.put(`${BASE_URL}api/update/${folderName}`, formData, {
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

                            {mat.mainType && mat.mainType !== 'Others' && (
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

                            {mat.mainType === 'Others' && (
                                <div>
                                    <label>Custom Sub Type:</label>
                                    <input
                                        type="text"
                                        value={mat.subTypes[0] || ''}
                                        onChange={(e) => handleCustomSubTypeChange(index, e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label>Why Choose This Material?</label>
                                <input
                                    type="text"
                                    value={mat.whyChoose}
                                    onChange={(e) => handleMaterialChange(index, 'whyChoose', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Model Number:</label>
                                <input
                                    type="text"
                                    value={mat.model}
                                    onChange={(e) => handleMaterialChange(index, 'model', e.target.value)}
                                />
                            </div>

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
                    <label htmlFor="files">Files:</label>
                    <input type="file" id="files" multiple onChange={handleFileChange} />
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

                {/* <div className="form-group">
                    <label htmlFor="teamMembers">Team Members:</label>
                    {memberOptions.map((member) => (
                        <div key={member.name}>
                            <input
                                type="checkbox"
                                id={member.name}
                                value={member.name}
                                checked={selectedMembers.includes(member.name)}
                                onChange={handleMemberChange}
                            />
                            <label htmlFor={member.name}>{member.name} </label>
                        </div>
                    ))}
                </div> */}

<div className="form-group">
                    <label>Team Members:</label>
                    {['Member 1', 'Member 2', 'Member 3','Member 4'].map((member) => (
                        <div key={member}>
                            <input
                                type="checkbox"
                                value={member}
                                checked={selectedMembers.includes(member)}
                                onChange={handleMemberChange}
                            />
                            <label>{member}</label>
                        </div>
                    ))}
                </div>

                <div className="form-group">
                    <label htmlFor="startMeterReading">Start Meter Reading:</label>
                    <input
                        type="text"
                        id="startMeterReading"
                        value={startMeterReading}
                        onChange={(e) => setStartMeterReading(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endMeterReading">End Meter Reading:</label>
                    <input
                        type="text"
                        id="endMeterReading"
                        value={endMeterReading}
                        onChange={(e) => setEndMeterReading(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateForm;
