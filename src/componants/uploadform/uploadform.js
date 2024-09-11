
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './uploadform.css'; // Import the CSS file

function UploadForm() {
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
    const [loading, setLoading] = useState(false); // Loading state

    const mainTypeOptions = ['Main Items', 'DC Circuits', 'AC Circuits', 'Solar. Mounting Structure']; // Example main types
    const subTypeOptions = {
        'Main Items': ['Panel', 'Inverter'],
        'DC Circuits': ['DC Combiner 1/1', 'DC Combiner 2/2', 'DC Combiner 4/4', 'DC SPD', 'DC ISOLATOR', 'Enclosor Box DC', 'DC Cable 4mm', 'MC4 Connector', 'PVC Pipe', 'Cable Tie', 'GI Clip', 'Valve Socket', 'Bend', 'L Bow 3/4"', 'PVC Joint 3/4"', 'T-Socket 3/4"', 'Earth wire 6mm'],
        'AC Circuits': ['RCCB', 'AC SPD', 'AC Isolator', 'Enclosure Box', 'Relay with Base', 'Buzzer-230V Single', 'AC Cable', 'AC Supply Cable', 'Bus Bar and Enclosure', '16mm Earth Rod', 'Earth Cable', 'Earth Cable Busbar', '2*2 Casing', 'PVC Pipe', 'Cable Tie', 'GI Clip', 'Valve Socket', 'Bend', 'L Bow', 'PVC Joint'],
        'Solar. Mounting Structure': ['Rail 66 6.2m', 'Rail 66 4.5m', 'Adjustable Tile Hook', 'Y Clamp', 'S Clamp', 'Base Unit', 'T-Clamp 40-45', 'END Clamp h33', 'Self SCrew', 'Connector Clamp', 'Lock Nut', 'Aluminum L Bar']

    };

    // Example team members with tooltips
    // const memberOptions = [
    //     { name: 'Member 1', trick: 'Expert in React' },
    //     { name: 'Member 2', trick: 'Skilled in Node.js' },
    //     { name: 'Member 3', trick: 'Great with databases' },
    //     { name: 'Member 4', trick: 'UI/UX designer' },
    // ];

    const handleMaterialChange = (index, field, value) => {
        const newMaterial = [...material];
        newMaterial[index][field] = value;
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


    const BASE_URL = process.env.REACT_APP_API_URL;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('date', date);
        formData.append('vehicleNumber', vehicleNumber);
        formData.append('startMeterReading', startMeterReading);
        formData.append('endMeterReading', endMeterReading);

        // Add material details
        formData.append('material', JSON.stringify(material));

        // Add selected members
        selectedMembers.forEach((member, index) => {
            formData.append(`teamMembers[${index}]`, member);
        });

        // Add files
        if (files.length > 0) {
            Array.from(files).forEach((file) => {
                formData.append('files', file);
            });
        } else {
            toast.error('Please upload at least one file.');
            setLoading(false); // Hide loader
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Upload successful!');
            console.log(response.data);
            resetForm(); // Reset form after successful upload
        } catch (error) {
            console.error('Upload failed:', error.response ? error.response.data : error.message);
            toast.error('Upload failed. Please try again.');
        } finally {
            setLoading(false); // Hide loader
        }
    };


    return (
        <div className="upload-form">
            {loading && (
                <div className="loader">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>

                <div>
                    <label>Materials:</label>
                    {material.map((mat, index) => (
                        <div key={index} className="material-field">
                            <select
                                value={mat.mainType}
                                onChange={(e) => handleMaterialChange(index, 'mainType', e.target.value)}
                                required
                            >
                                <option value="">Select Main Type</option>
                                {mainTypeOptions.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>

                            {mat.mainType && (
                                <select
                                    multiple
                                    value={mat.subTypes}
                                    onChange={(e) =>
                                        handleMaterialChange(
                                            index,
                                            'subTypes',
                                            Array.from(e.target.selectedOptions, (option) => option.value)
                                        )
                                    }
                                    required
                                >
                                    {subTypeOptions[mat.mainType].map((subType) => (
                                        <option key={subType} value={subType}>{subType}</option>
                                    ))}
                                </select>
                            )}

                            <input
                                type="text"
                                placeholder="Model"
                                value={mat.whyChoose}
                                onChange={(e) => handleMaterialChange(index, 'whyChoose', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Quantity"
                                value={mat.model}
                                onChange={(e) => handleMaterialChange(index, 'model', e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => removeMaterialField(index)}>Remove Material</button>
                        </div>
                    ))}
                    <button type="button" onClick={addMaterialField}>Add Material</button>
                </div>

                <div>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <div>
                    <label>Vehicle Number:</label>
                    <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
                </div>

                <div>
                    <label>Team Members:</label>
                    <div className="team-member-checkboxes">
                        {/* {memberOptions.map((member) => (
                            <div key={member.name} className="team-member-checkbox">
                                <input
                                    type="checkbox"
                                    value={member.name}
                                    checked={selectedMembers.includes(member.name)}
                                    onChange={handleMemberChange}
                                />
                                <label title={member.trick}>{member.name}</label>
                            </div>
                        ))} */}
                      <div className="members-container">
    {['Sutharsan', 'Nilaxsan', 'Nitharsan', 'Lojan', 'Thanusan', 'Lavees', 'Dilaxsan', 'Abimansu', 'Tharunsan', 'Sujeevan', 'Piratheepan'].map((member) => (
      <div className="member-item" key={member}>
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
                    </div>
                </div>

                <div>
                    <label>Start Meter Reading:</label>
                    <input type="text" value={startMeterReading} onChange={(e) => setStartMeterReading(e.target.value)} required />
                </div>

                <div>
                    <label>End Meter Reading:</label>
                    <input type="text" value={endMeterReading} onChange={(e) => setEndMeterReading(e.target.value)} required />
                </div>

                <div>
                    <label>Files:</label>
                    <input type="file" multiple onChange={handleFileChange} />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Submit'}
                </button>

            </form>
            <ToastContainer />
        </div>
    );
}

export default UploadForm;
