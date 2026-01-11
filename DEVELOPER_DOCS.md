# Developer Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Documentation](#component-documentation)
3. [State Management](#state-management)
4. [Routing](#routing)
5. [Styling Guidelines](#styling-guidelines)
6. [Best Practices](#best-practices)
7. [Adding New Features](#adding-new-features)
8. [Testing](#testing)

## Architecture Overview

The Clowdi Recruitment Website follows a modern React architecture with the following principles:

- **Component-Based Architecture**: UI is broken down into reusable, composable components
- **Context API for State**: Global state managed through React Context
- **Client-Side Routing**: React Router for seamless navigation
- **CSS Modules Pattern**: Component-scoped styling
- **Separation of Concerns**: Clear distinction between presentation and logic

### Technology Decisions

**Why React?**
- Large ecosystem and community support
- Virtual DOM for optimal performance
- Hooks for clean state management
- Component reusability

**Why Vite?**
- Lightning-fast HMR (Hot Module Replacement)
- Optimized build process
- ES modules support
- Better developer experience compared to webpack

**Why React Router?**
- Industry standard for React routing
- Declarative routing
- Nested routes support
- Dynamic routing capabilities

**Why Context API?**
- Built into React (no extra dependencies)
- Sufficient for this application's state complexity
- Easy to understand and maintain
- Avoids prop drilling

## Component Documentation

### Navigation Component
**Location**: `src/components/Navigation.jsx`

**Purpose**: Provides consistent navigation across all pages

**Props**: None (uses React Router's Link component)

**Key Features**:
- Sticky positioning for always-visible navigation
- Responsive design that adapts to mobile screens
- Active link styling
- Brand logo and tagline

**Usage**:
```jsx
import Navigation from './components/Navigation';

<Navigation />
```

### Page Components

#### LandingPage
**Location**: `src/pages/LandingPage.jsx`

**Purpose**: Main landing page with company information and mailing list subscription

**State**:
- `email`: Current email input value
- `subscribeMessage`: Feedback message after subscription

**Key Sections**:
1. Hero section with CTA
2. Features grid
3. Statistics display
4. Newsletter subscription form
5. Final CTA

**Notable Functions**:
- `handleSubscribe(e)`: Processes email subscription

#### JobsPage
**Location**: `src/pages/JobsPage.jsx`

**Purpose**: Displays filterable job listings

**State**:
- `searchTerm`: Search input value
- `selectedIndustry`: Selected industry filter
- `selectedLocation`: Selected location filter
- `minSalary`: Minimum salary filter

**Computed Values** (useMemo):
- `industries`: Unique list of industries from all jobs
- `locations`: Unique list of locations from all jobs
- `filteredJobs`: Jobs filtered by all criteria

**Performance Optimization**:
```jsx
const filteredJobs = useMemo(() => {
  // Filtering logic
}, [jobs, searchTerm, selectedIndustry, selectedLocation, minSalary]);
```

This ensures filtering only recalculates when dependencies change.

#### JobDetailsPage
**Location**: `src/pages/JobDetailsPage.jsx`

**Purpose**: Displays detailed information for a single job

**Route Parameters**:
- `id`: Job ID from URL

**Key Features**:
- Dynamic job loading based on URL parameter
- Back navigation button
- Formatted job information display
- Requirements list with checkmarks
- Apply button (demo)

**Error Handling**:
Shows "Job Not Found" message if job ID is invalid

#### AdminPage
**Location**: `src/pages/AdminPage.jsx`

**Purpose**: Admin interface for managing jobs

**State**:
- `showForm`: Boolean to toggle job form visibility
- `editingJob`: Currently edited job (null if creating new)
- `formData`: Object containing all form field values

**Key Functions**:

```jsx
handleSubmit(e)      // Processes form submission
handleEdit(job)      // Prepares form for editing
handleDelete(id)     // Removes a job
resetForm()          // Clears form and closes it
```

**Form Validation**:
All fields are required through HTML5 validation. Additional validation happens at the Context level.

## State Management

### JobContext
**Location**: `src/context/JobContext.jsx`

**Purpose**: Centralized state management for jobs and subscribers

**State Structure**:
```javascript
{
  jobs: [
    {
      id: number,
      title: string,
      company: string,
      location: string,
      industry: string,
      salary: string,        // Display format: "$80,000 - $110,000"
      salaryMin: number,     // For filtering: 80000
      salaryMax: number,     // For filtering: 110000
      type: string,          // "Full-time", "Part-time", etc.
      description: string,
      requirements: string[],
      postedDate: string     // ISO format: "2026-01-05"
    }
  ],
  subscribers: string[]  // Email addresses
}
```

**API Methods**:

```javascript
// Add a new job
addJob(jobData)

// Update an existing job
updateJob(jobId, updatedData)

// Delete a job
deleteJob(jobId)

// Add subscriber to mailing list
addSubscriber(email)  // Returns true if successful, false if duplicate
```

**Usage Example**:
```jsx
import { useJobs } from '../context/JobContext';

function MyComponent() {
  const { jobs, addJob, deleteJob } = useJobs();
  
  // Use jobs and methods
}
```

## Routing

**Location**: `src/App.jsx`

### Route Structure:

```
/                    → LandingPage
/jobs                → JobsPage
/jobs/:id            → JobDetailsPage
/admin               → AdminPage
```

### Adding a New Route:

1. Create your page component in `src/pages/`
2. Import it in `App.jsx`
3. Add a new Route:

```jsx
import MyNewPage from './pages/MyNewPage';

<Route path="/my-new-path" element={<MyNewPage />} />
```

4. Add navigation link where needed:

```jsx
<Link to="/my-new-path">My Page</Link>
```

## Styling Guidelines

### CSS Organization

Each component has its own CSS file:
- Component logic: `Component.jsx`
- Component styles: `Component.css`

### Naming Conventions

**Classes**: Use kebab-case with descriptive names
```css
.job-card
.admin-section
.newsletter-form
```

**BEM-like structure** for nested elements:
```css
.job-card
.job-card-header
.job-card-title
```

### Responsive Design

**Mobile-first approach**: Base styles for mobile, media queries for larger screens

```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (max-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

### Color Palette

Primary gradient:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Neutrals:
- Text: `#333`
- Light text: `#666`
- Background: `#f8f9fa`
- Borders: `#e0e0e0`

### Common Patterns

**Card component**:
```css
.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

**Button**:
```css
.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
}
```

## Best Practices

### React Patterns

**1. Use Functional Components**
```jsx
// ✅ Good
const MyComponent = () => {
  return <div>Content</div>;
};

// ❌ Avoid class components for new code
class MyComponent extends React.Component { }
```

**2. Destructure Props**
```jsx
// ✅ Good
const JobCard = ({ title, company, location }) => {
  return <div>{title} at {company}</div>;
};

// ❌ Less readable
const JobCard = (props) => {
  return <div>{props.title} at {props.company}</div>;
};
```

**3. Use Meaningful Variable Names**
```jsx
// ✅ Good
const [isFormVisible, setIsFormVisible] = useState(false);

// ❌ Too generic
const [show, setShow] = useState(false);
```

**4. Memoize Expensive Calculations**
```jsx
const filteredJobs = useMemo(() => {
  return jobs.filter(/* complex logic */);
}, [jobs, filterCriteria]);
```

**5. Extract Reusable Logic**
If code is used in multiple places, create a custom hook or utility function.

### Performance Tips

1. **Use useMemo for filters**: Prevents unnecessary recalculations
2. **Avoid inline function definitions**: In render-intensive components
3. **Lazy load routes**: For code splitting (future enhancement)
4. **Optimize images**: Use appropriate formats and sizes

### Security Considerations

**Current Implementation**:
- Client-side only (no authentication)
- Form validation through HTML5
- No sensitive data storage

**For Production**:
- Implement proper authentication for admin routes
- Add CSRF protection
- Sanitize user inputs
- Use HTTPS
- Implement rate limiting for forms
- Add backend API with proper validation

## Adding New Features

### Example: Adding a "Save Job" Feature

**1. Update Context** (`src/context/JobContext.jsx`):
```jsx
const [savedJobs, setSavedJobs] = useState([]);

const saveJob = (jobId) => {
  if (!savedJobs.includes(jobId)) {
    setSavedJobs([...savedJobs, jobId]);
  }
};

const unsaveJob = (jobId) => {
  setSavedJobs(savedJobs.filter(id => id !== jobId));
};

// Add to context value
const value = {
  // ... existing values
  savedJobs,
  saveJob,
  unsaveJob
};
```

**2. Update Component** (`src/pages/JobDetailsPage.jsx`):
```jsx
import { useJobs } from '../context/JobContext';

const JobDetailsPage = () => {
  const { savedJobs, saveJob, unsaveJob } = useJobs();
  const isSaved = savedJobs.includes(job.id);
  
  return (
    <button onClick={() => isSaved ? unsaveJob(job.id) : saveJob(job.id)}>
      {isSaved ? 'Unsave' : 'Save Job'}
    </button>
  );
};
```

**3. Create Saved Jobs Page** (`src/pages/SavedJobsPage.jsx`):
```jsx
const SavedJobsPage = () => {
  const { jobs, savedJobs } = useJobs();
  const savedJobsList = jobs.filter(job => savedJobs.includes(job.id));
  
  return (
    <div>
      <h1>Saved Jobs</h1>
      {savedJobsList.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
```

**4. Add Route**:
```jsx
<Route path="/saved" element={<SavedJobsPage />} />
```

## Testing

### Manual Testing Checklist

**Landing Page**:
- [ ] All sections render correctly
- [ ] Newsletter form accepts email
- [ ] Newsletter form shows success message
- [ ] Newsletter form prevents duplicate subscriptions
- [ ] All links navigate correctly
- [ ] Responsive design works on mobile

**Jobs Page**:
- [ ] All jobs display correctly
- [ ] Search filter works
- [ ] Industry filter works
- [ ] Location filter works
- [ ] Salary filter works
- [ ] Filters work in combination
- [ ] Reset filters button works
- [ ] Job cards link to details page

**Job Details Page**:
- [ ] Job information displays correctly
- [ ] Back button works
- [ ] Invalid job ID shows error message
- [ ] Apply button renders

**Admin Page**:
- [ ] Job list displays correctly
- [ ] Add job form opens/closes
- [ ] Add job form validation works
- [ ] New jobs appear in list
- [ ] Edit job form pre-fills data
- [ ] Edit job updates correctly
- [ ] Delete job works with confirmation
- [ ] Subscriber list displays

### Future: Automated Testing

For production applications, add:

**Unit Tests** (Jest + React Testing Library):
```jsx
import { render, screen } from '@testing-library/react';
import JobCard from './JobCard';

test('renders job title', () => {
  render(<JobCard job={mockJob} />);
  expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
});
```

**Integration Tests**:
Test component interactions and context

**E2E Tests** (Playwright/Cypress):
Test full user flows

## Maintenance

### Regular Tasks

1. **Update Dependencies**: Monthly
   ```bash
   npm outdated
   npm update
   ```

2. **Check for Security Vulnerabilities**:
   ```bash
   npm audit
   npm audit fix
   ```

3. **Code Quality**:
   ```bash
   npm run lint
   ```

4. **Build Verification**:
   ```bash
   npm run build
   npm run preview
   ```

### Common Modifications

**Add a new job field**:
1. Update JobContext initial data structure
2. Update AdminPage form
3. Update JobDetailsPage display
4. Update JobsPage card (if needed)

**Change theme**:
1. Find and replace color values in CSS files
2. Update gradients
3. Check contrast ratios for accessibility

**Add a new filter**:
1. Add state in JobsPage
2. Add UI element (input/select)
3. Update filteredJobs useMemo
4. Add reset logic

---

## Questions?

For additional help:
1. Check the main README.md
2. Review component comments
3. Inspect existing code for patterns
4. Open an issue on GitHub

Happy coding! 🚀