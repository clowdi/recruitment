import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import './JobsPage.css';

const JobsPage = () => {
  const { jobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');

  // Get unique industries and locations for filters
  const industries = useMemo(() => {
    return [...new Set(jobs.map(job => job.industry))];
  }, [jobs]);

  const locations = useMemo(() => {
    return [...new Set(jobs.map(job => job.location))];
  }, [jobs]);

  // Filter jobs based on selected criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = !selectedIndustry || job.industry === selectedIndustry;
      const matchesLocation = !selectedLocation || job.location === selectedLocation;
      const matchesSalary = !minSalary || job.salaryMin >= parseInt(minSalary);
      
      return matchesSearch && matchesIndustry && matchesLocation && matchesSalary;
    });
  }, [jobs, searchTerm, selectedIndustry, selectedLocation, minSalary]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('');
    setSelectedLocation('');
    setMinSalary('');
  };

  return (
    <div className="jobs-page">
      <div className="jobs-container">
        <h1 className="page-title">Find Your Next Opportunity</h1>
        
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="search">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="industry">Industry</label>
              <select
                id="industry"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="filter-select"
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="location">Location</label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="filter-select"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="salary">Min. Salary</label>
              <select
                id="salary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                className="filter-select"
              >
                <option value="">Any Salary</option>
                <option value="50000">$50,000+</option>
                <option value="75000">$75,000+</option>
                <option value="100000">$100,000+</option>
                <option value="125000">$125,000+</option>
              </select>
            </div>
          </div>
          
          <button onClick={resetFilters} className="reset-button">
            Reset Filters
          </button>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>{filteredJobs.length} jobs found</p>
        </div>

        {/* Jobs List */}
        <div className="jobs-list">
          {filteredJobs.length === 0 ? (
            <div className="no-results">
              <p>No jobs found matching your criteria.</p>
              <button onClick={resetFilters} className="reset-button">
                Clear Filters
              </button>
            </div>
          ) : (
            filteredJobs.map(job => (
              <Link to={`/jobs/${job.id}`} key={job.id} className="job-card">
                <div className="job-card-header">
                  <h3 className="job-title">{job.title}</h3>
                  <span className="job-type">{job.type}</span>
                </div>
                <p className="job-company">{job.company}</p>
                <div className="job-details">
                  <span className="job-detail">
                    <span className="icon">📍</span>
                    {job.location}
                  </span>
                  <span className="job-detail">
                    <span className="icon">💼</span>
                    {job.industry}
                  </span>
                  <span className="job-detail">
                    <span className="icon">💰</span>
                    {job.salary}
                  </span>
                </div>
                <p className="job-description">{job.description.substring(0, 120)}...</p>
                <div className="job-footer">
                  <span className="job-posted">Posted: {job.postedDate}</span>
                  <span className="view-details">View Details →</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
