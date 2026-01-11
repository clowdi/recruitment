# Clowdi Recruitment Website

A modern, full-featured recruitment website built with React and Vite. This platform enables job seekers to find opportunities and allows recruiters to manage job listings efficiently.

![Clowdi Logo](https://github.com/user-attachments/assets/fa110f4e-1141-4c2e-9631-7e3847ab6f6c)

## 🌟 Features

### For Job Seekers
- **Professional Landing Page**: Eye-catching hero section with company branding
- **Job Search & Filtering**: Advanced filtering by industry, location, and salary
- **Detailed Job Listings**: View comprehensive job information including requirements
- **Mailing List Subscription**: Stay updated with new opportunities

### For Recruiters
- **Admin Dashboard**: Easy-to-use backend for managing job listings
- **Job Management**: Create, edit, and delete job postings
- **Subscriber Management**: View mailing list subscribers
- **Real-time Updates**: Changes reflect immediately across the platform

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/clowdi/recruitment.git
cd recruitment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot-reload |
| `npm run build` | Build the production-ready application |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🏗️ Project Structure

```
recruitment/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navigation.jsx  # Main navigation bar
│   │   └── Navigation.css
│   ├── pages/             # Page components
│   │   ├── LandingPage.jsx      # Home page
│   │   ├── JobsPage.jsx         # Job listings with filters
│   │   ├── JobDetailsPage.jsx   # Individual job details
│   │   └── AdminPage.jsx        # Admin dashboard
│   ├── context/           # React Context for state management
│   │   └── JobContext.jsx       # Job and subscriber state
│   ├── App.jsx            # Main application component with routing
│   ├── main.jsx          # Application entry point
│   ├── index.css         # Global styles
│   └── App.css           # App-level styles
├── public/               # Static assets
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🎨 Technology Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.1.4
- **Styling**: CSS3 with modern features
- **State Management**: React Context API
- **Code Quality**: ESLint

## 💡 Usage Guide

### Navigation

The website has three main sections accessible from the navigation bar:

1. **Home**: Landing page with company information and features
2. **Jobs**: Browse and filter job listings
3. **Admin**: Manage job postings (recruiter interface)

### Job Search & Filtering

On the Jobs page, you can filter positions by:
- **Search**: Job title or company name
- **Industry**: Technology, Marketing, Finance, Healthcare, Design, etc.
- **Location**: Various cities across the US
- **Minimum Salary**: $50k, $75k, $100k, $125k+

Click on any job card to view detailed information including full description and requirements.

### Admin Dashboard

The Admin page provides tools for recruiters:

**Adding a Job:**
1. Click "+ Add New Job"
2. Fill in all required fields:
   - Job Title
   - Company
   - Location
   - Industry
   - Salary Range (display format)
   - Salary Min/Max (numeric values for filtering)
   - Job Type
   - Description
   - Requirements (one per line)
3. Click "Create Job"

**Editing a Job:**
1. Click "Edit" on any job card
2. Modify the fields
3. Click "Update Job"

**Deleting a Job:**
1. Click "Delete" on any job card
2. Confirm the deletion

### Mailing List

Users can subscribe to the mailing list from the landing page by entering their email address in the "Stay Updated" section.

## 🎯 Key Features Explained

### Smart Filtering System
The filtering system uses React's `useMemo` hook for optimal performance. Filters work in combination, allowing users to:
- Search by keywords while filtering by industry
- Combine location and salary requirements
- Reset all filters with a single click

### Responsive Design
The website is fully responsive and works seamlessly across:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

### State Management
The application uses React Context API for global state management:
- **Jobs State**: Manages all job listings
- **Subscribers State**: Tracks mailing list subscriptions
- **CRUD Operations**: Add, update, and delete jobs in real-time

## 🔧 Customization

### Changing Colors
The main color scheme uses a purple gradient (`#667eea` to `#764ba2`). To customize:

1. Update the gradient in CSS files:
```css
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

2. Search for `#667eea` and `#764ba2` across the project to update all occurrences.

### Adding New Industries
To add new industries, update the sample data in `src/context/JobContext.jsx`:

```javascript
{
  id: 7,
  title: 'Your Job Title',
  industry: 'Your New Industry',
  // ... other fields
}
```

### Modifying Sample Data
The initial job listings are defined in `src/context/JobContext.jsx`. You can:
- Add more sample jobs
- Modify existing job data
- Change the default empty state

## 📱 Screenshots

### Landing Page
![Landing Page](https://github.com/user-attachments/assets/fa110f4e-1141-4c2e-9631-7e3847ab6f6c)

### Jobs Listing with Filters
![Jobs Page](https://github.com/user-attachments/assets/5e1efdcb-5326-4713-84dc-c537c217b3d9)

### Job Details
![Job Details](https://github.com/user-attachments/assets/52826499-f7ec-42f0-bd2f-efebf77283c9)

### Admin Dashboard
![Admin Page](https://github.com/user-attachments/assets/4e6104cc-33f9-4c11-9f79-a1e75da33695)

### Add Job Form
![Add Job Form](https://github.com/user-attachments/assets/470a69da-3be2-463c-9b18-74ddd0dc58b2)

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options

The built application can be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **Any static hosting service**: Upload the `dist` folder

## 🤝 Contributing

This is a demo project built as a recruitment agency website. For contributions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for use and modification.

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill the process using port 5173
npx kill-port 5173
# Or specify a different port
npm run dev -- --port 3000
```

**Dependencies issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clean build and rebuild
rm -rf dist
npm run build
```

## 📞 Support

For questions or issues, please open an issue on the GitHub repository.

## 🎓 Learning Resources

This project demonstrates:
- React hooks (useState, useEffect, useMemo, useContext)
- React Router for navigation
- Context API for state management
- Modern CSS including Grid and Flexbox
- Responsive web design
- Form handling in React
- Component composition and reusability

Perfect for learning modern React development practices!

---

**Built with ❤️ for Clowdi Recruitment Solutions**
