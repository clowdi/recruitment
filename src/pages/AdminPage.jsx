import { useState } from 'react';
import { useJobs } from '../context/JobContext';
import './AdminPage.css';

const AdminPage = () => {
  const { jobs, addJob, updateJob, deleteJob, subscribers } = useJobs();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    industry: '',
    salary: '',
    salaryMin: '',
    salaryMax: '',
    type: 'Full-time',
    description: '',
    requirements: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const jobData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(req => req.trim()),
      salaryMin: parseInt(formData.salaryMin) || 0,
      salaryMax: parseInt(formData.salaryMax) || 0
    };

    if (editingJob) {
      updateJob(editingJob.id, jobData);
    } else {
      addJob(jobData);
    }

    resetForm();
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      industry: job.industry,
      salary: job.salary,
      salaryMin: job.salaryMin.toString(),
      salaryMax: job.salaryMax.toString(),
      type: job.type,
      description: job.description,
      requirements: job.requirements.join('\n')
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      industry: '',
      salary: '',
      salaryMin: '',
      salaryMax: '',
      type: 'Full-time',
      description: '',
      requirements: ''
    });
    setEditingJob(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Manage job listings and view subscriber information</p>

        {/* Add/Edit Job Button */}
        <div className="admin-actions">
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="add-job-button"
          >
            {showForm ? 'Cancel' : '+ Add New Job'}
          </button>
        </div>

        {/* Job Form */}
        {showForm && (
          <div className="job-form-card">
            <h2>{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
            <form onSubmit={handleSubmit} className="job-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="title">Job Title *</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company *</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="industry">Industry *</label>
                  <input
                    id="industry"
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="salary">Salary Range (Display) *</label>
                  <input
                    id="salary"
                    type="text"
                    name="salary"
                    placeholder="e.g., $80,000 - $100,000"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Job Type *</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="salaryMin">Min Salary (numeric) *</label>
                  <input
                    id="salaryMin"
                    type="number"
                    name="salaryMin"
                    placeholder="80000"
                    value={formData.salaryMin}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="salaryMax">Max Salary (numeric) *</label>
                  <input
                    id="salaryMax"
                    type="number"
                    name="salaryMax"
                    placeholder="100000"
                    value={formData.salaryMax}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Job Description *</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="requirements">Requirements (one per line) *</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows="6"
                  placeholder="Enter each requirement on a new line"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  {editingJob ? 'Update Job' : 'Create Job'}
                </button>
                <button type="button" onClick={resetForm} className="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs List */}
        <div className="admin-section">
          <h2>Current Job Listings ({jobs.length})</h2>
          <div className="admin-jobs-list">
            {jobs.map(job => (
              <div key={job.id} className="admin-job-card">
                <div className="admin-job-header">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="job-meta">{job.company} • {job.location}</p>
                  </div>
                  <div className="admin-job-actions">
                    <button onClick={() => handleEdit(job)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(job.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="job-info">
                  <strong>Industry:</strong> {job.industry} • 
                  <strong> Salary:</strong> {job.salary} • 
                  <strong> Type:</strong> {job.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribers List */}
        <div className="admin-section">
          <h2>Mailing List Subscribers ({subscribers.length})</h2>
          {subscribers.length === 0 ? (
            <p className="no-data">No subscribers yet.</p>
          ) : (
            <div className="subscribers-list">
              {subscribers.map((email, index) => (
                <div key={index} className="subscriber-item">
                  <span>📧</span>
                  <span>{email}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
