import { createContext, useContext, useState } from 'react';

const JobContext = createContext();

// Custom hook to access job context
// eslint-disable-next-line react-refresh/only-export-components
export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  // Initialize with sample data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      industry: 'Technology',
      salary: '$120,000 - $160,000',
      salaryMin: 120000,
      salaryMax: 160000,
      type: 'Full-time',
      description: 'We are seeking a talented Senior Software Engineer to join our innovative team. You will be working on cutting-edge technologies and building scalable solutions.',
      requirements: [
        '5+ years of software development experience',
        'Strong knowledge of JavaScript/TypeScript',
        'Experience with React and Node.js',
        'Excellent problem-solving skills'
      ],
      postedDate: '2026-01-05'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      company: 'Brand Solutions',
      location: 'New York, NY',
      industry: 'Marketing',
      salary: '$80,000 - $110,000',
      salaryMin: 80000,
      salaryMax: 110000,
      type: 'Full-time',
      description: 'Looking for an experienced Marketing Manager to lead our marketing initiatives and drive growth strategies.',
      requirements: [
        '3+ years of marketing management experience',
        'Strong analytical and strategic thinking skills',
        'Experience with digital marketing platforms',
        'Excellent communication skills'
      ],
      postedDate: '2026-01-08'
    },
    {
      id: 3,
      title: 'Financial Analyst',
      company: 'Finance Pro',
      location: 'Chicago, IL',
      industry: 'Finance',
      salary: '$70,000 - $95,000',
      salaryMin: 70000,
      salaryMax: 95000,
      type: 'Full-time',
      description: 'Join our finance team as a Financial Analyst. You will be responsible for financial modeling, analysis, and reporting.',
      requirements: [
        'Bachelor\'s degree in Finance or related field',
        '2+ years of financial analysis experience',
        'Proficiency in Excel and financial software',
        'Strong attention to detail'
      ],
      postedDate: '2026-01-06'
    },
    {
      id: 4,
      title: 'Healthcare Consultant',
      company: 'HealthCare Partners',
      location: 'Boston, MA',
      industry: 'Healthcare',
      salary: '$90,000 - $120,000',
      salaryMin: 90000,
      salaryMax: 120000,
      type: 'Full-time',
      description: 'Seeking a Healthcare Consultant to provide strategic guidance to healthcare organizations.',
      requirements: [
        '4+ years of healthcare consulting experience',
        'Knowledge of healthcare regulations',
        'Strong project management skills',
        'Excellent client relationship skills'
      ],
      postedDate: '2026-01-07'
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'Data Insights Inc',
      location: 'Seattle, WA',
      industry: 'Technology',
      salary: '$110,000 - $150,000',
      salaryMin: 110000,
      salaryMax: 150000,
      type: 'Full-time',
      description: 'We are looking for a Data Scientist to analyze complex datasets and build predictive models.',
      requirements: [
        'MS/PhD in Data Science or related field',
        '3+ years of data science experience',
        'Proficiency in Python, R, and SQL',
        'Experience with machine learning frameworks'
      ],
      postedDate: '2026-01-09'
    },
    {
      id: 6,
      title: 'UX Designer',
      company: 'Creative Digital',
      location: 'Austin, TX',
      industry: 'Design',
      salary: '$75,000 - $100,000',
      salaryMin: 75000,
      salaryMax: 100000,
      type: 'Full-time',
      description: 'Join our design team to create intuitive and beautiful user experiences for our products.',
      requirements: [
        '3+ years of UX design experience',
        'Strong portfolio demonstrating UX work',
        'Proficiency in Figma, Sketch, or Adobe XD',
        'Understanding of user research methodologies'
      ],
      postedDate: '2026-01-10'
    }
  ]);

  const [subscribers, setSubscribers] = useState([]);

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now(),
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs([...jobs, newJob]);
  };

  const updateJob = (id, updatedJob) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updatedJob } : job));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const addSubscriber = (email) => {
    if (!subscribers.includes(email)) {
      setSubscribers([...subscribers, email]);
      return true;
    }
    return false;
  };

  const value = {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    subscribers,
    addSubscriber
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
