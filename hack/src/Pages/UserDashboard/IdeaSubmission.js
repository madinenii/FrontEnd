import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const IdeaSubmissionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ideaTitle: '',
    ideaDomain: '',
    ideaDescription: '',
    email: '',
    submissionUrl: ''
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/ideas/submit', formData); // Adjust endpoint as per your backend setup
      // If submission is successful, route to the team members addition page
      navigate('/teamMembersAddition');
    } catch (error) {
      console.error('Error submitting idea:', error);
    }
  };
 
  return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<h1 style={{ marginBottom: '20px' }}>Idea Submission</h1>
<form onSubmit={handleSubmit} style={{ width: '50%', maxWidth: '500px' }}>
<div style={{ marginBottom: '10px' }}>
<label style={{ marginRight: '10px' }}>Idea Title:</label>
<input type="text" name="ideaTitle" value={formData.ideaTitle} onChange={handleChange} required />
</div>
<div style={{ marginBottom: '10px' }}>
<label style={{ marginRight: '10px' }}>Domain:</label>
<select name="ideaDomain" value={formData.ideaDomain} onChange={handleChange}>
    <option value="">Select Domain</option>
    <option value="IOT">IOT</option>
    <option value="BIGDATA">BIGDATA</option>
    <option value="ML">ML</option>
            {/* Add options for domains */}
</select>
</div>
<div style={{ marginBottom: '10px' }}>
<label style={{ marginRight: '10px' }}>Idea Description:</label>
<textarea name="ideaDescription" value={formData.ideaDescription} onChange={handleChange} required />
</div>
<div style={{ marginBottom: '10px' }}>
<label style={{ marginRight: '10px' }}>Email:</label>
<input type="email" name="email" value={formData.email} onChange={handleChange} required />
</div>
<div style={{ marginBottom: '10px' }}>
<label style={{ marginRight: '10px' }}>URL:</label>
<input type="url" name="submissionUrl" value={formData.submissionUrl} onChange={handleChange} required />
</div>
<button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Submit</button>
</form>
</div>
  );
};
 
export default IdeaSubmissionPage;