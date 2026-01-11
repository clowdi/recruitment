import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import './JobDetailsPage.css';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobs();
  
  const job = jobs.find(j => j.id === parseInt(id));

  if (!job) {
    return (
      <div className="job-details-page">
        <div className="container">
          <div className="not-found">
            <h2>Job Not Found</h2>
            <p>The job you're looking for doesn't exist or has been removed.</p>
            <Link to="/jobs" className="back-button">Back to Jobs</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-link">
          ← Back to Jobs
        </button>

        <div className="job-details-card">
          <div className="job-header">
            <div className="job-header-content">
              <h1 className="job-title">{job.title}</h1>
              <h2 className="job-company">{job.company}</h2>
            </div>
            <span className="job-type-badge">{job.type}</span>
          </div>

          <div className="job-meta">
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <div>
                <div className="meta-label">Location</div>
                <div className="meta-value">{job.location}</div>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">💼</span>
              <div>
                <div className="meta-label">Industry</div>
                <div className="meta-value">{job.industry}</div>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">💰</span>
              <div>
                <div className="meta-label">Salary</div>
                <div className="meta-value">{job.salary}</div>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <div>
                <div className="meta-label">Posted</div>
                <div className="meta-value">{job.postedDate}</div>
              </div>
            </div>
          </div>

          <div className="job-section">
            <h3>Job Description</h3>
            <p>{job.description}</p>
          </div>

          <div className="job-section">
            <h3>Requirements</h3>
            <ul className="requirements-list">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="apply-section">
            <button className="apply-button">
              Apply Now
            </button>
            <p className="apply-note">
              Note: This is a demo. In a production environment, this would link to an application form or external application system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
