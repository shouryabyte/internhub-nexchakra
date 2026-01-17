import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from '../models/Company';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/internhub';

const companies = [
  {
    name: 'Google',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    role: 'Software Engineering Intern',
    location: 'Mountain View, CA',
    internshipType: 'Hybrid' as const,
    stipend: '$7,500 - $9,000/month',
    careerUrl: 'https://careers.google.com/jobs/results/',
    deadline: new Date('2024-12-31'),
    isActive: true
  },
  {
    name: 'Amazon',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    role: 'SDE Intern',
    location: 'Seattle, WA',
    internshipType: 'Hybrid' as const,
    stipend: '$6,500 - $8,000/month',
    careerUrl: 'https://www.amazon.jobs/en/jobs',
    deadline: new Date('2024-12-15'),
    isActive: true
  },
  {
    name: 'Microsoft',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg',
    role: 'Software Engineer Intern',
    location: 'Redmond, WA',
    internshipType: 'Hybrid' as const,
    stipend: '$7,000 - $8,500/month',
    careerUrl: 'https://careers.microsoft.com/us/en',
    deadline: new Date('2024-12-20'),
    isActive: true
  },
  {
    name: 'Adobe',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobe/adobe-original.svg',
    role: 'Product Development Intern',
    location: 'San Jose, CA',
    internshipType: 'Remote' as const,
    stipend: '$6,000 - $7,500/month',
    careerUrl: 'https://careers.adobe.com/us/en/search-results',
    deadline: new Date('2024-12-25'),
    isActive: true
  },
  {
    name: 'Atlassian',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/atlassian.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Remote' as const,
    stipend: '$6,500 - $8,000/month',
    careerUrl: 'https://www.atlassian.com/company/careers/all-jobs',
    deadline: new Date('2024-12-30'),
    isActive: true
  },
  {
    name: 'Meta',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/meta.svg',
    role: 'Software Engineer Intern',
    location: 'Menlo Park, CA',
    internshipType: 'Onsite' as const,
    stipend: '$8,000 - $10,000/month',
    careerUrl: 'https://www.metacareers.com/jobs/',
    deadline: new Date('2024-12-18'),
    isActive: true
  },
  {
    name: 'Apple',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
    role: 'Software Engineering Intern',
    location: 'Cupertino, CA',
    internshipType: 'Onsite' as const,
    stipend: '$7,000 - $9,000/month',
    careerUrl: 'https://jobs.apple.com/en-us/search',
    deadline: new Date('2024-12-22'),
    isActive: true
  },
  {
    name: 'Netflix',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/netflix.svg',
    role: 'Software Engineering Intern',
    location: 'Los Gatos, CA',
    internshipType: 'Hybrid' as const,
    stipend: '$8,500 - $10,500/month',
    careerUrl: 'https://jobs.netflix.com/search',
    deadline: new Date('2024-12-28'),
    isActive: true
  },
  {
    name: 'Stripe',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/stripe.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Remote' as const,
    stipend: '$7,500 - $9,500/month',
    careerUrl: 'https://stripe.com/jobs/search',
    deadline: new Date('2024-12-24'),
    isActive: true
  },
  {
    name: 'Salesforce',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Hybrid' as const,
    stipend: '$6,800 - $8,200/month',
    careerUrl: 'https://salesforce.wd1.myworkdayjobs.com/External_Career_Site',
    deadline: new Date('2024-12-26'),
    isActive: true
  },
  {
    name: 'IBM',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/ibm.svg',
    role: 'Software Developer Intern',
    location: 'Armonk, NY',
    internshipType: 'Remote' as const,
    stipend: '$5,500 - $7,000/month',
    careerUrl: 'https://www.ibm.com/careers/us-en/search/',
    deadline: new Date('2024-12-29'),
    isActive: true
  },
  {
    name: 'Oracle',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
    role: 'Software Development Intern',
    location: 'Austin, TX',
    internshipType: 'Hybrid' as const,
    stipend: '$6,000 - $7,500/month',
    careerUrl: 'https://careers.oracle.com/jobs/',
    deadline: new Date('2024-12-27'),
    isActive: true
  },
  {
    name: 'Uber',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/uber.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Hybrid' as const,
    stipend: '$7,200 - $8,800/month',
    careerUrl: 'https://www.uber.com/careers/list/',
    deadline: new Date('2024-12-21'),
    isActive: true
  },
  {
    name: 'Airbnb',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/airbnb.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Remote' as const,
    stipend: '$7,800 - $9,200/month',
    careerUrl: 'https://careers.airbnb.com/',
    deadline: new Date('2024-12-23'),
    isActive: true
  },
  {
    name: 'LinkedIn',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
    role: 'Software Engineering Intern',
    location: 'Sunnyvale, CA',
    internshipType: 'Hybrid' as const,
    stipend: '$7,000 - $8,500/month',
    careerUrl: 'https://www.linkedin.com/jobs/search/',
    deadline: new Date('2024-12-19'),
    isActive: true
  },
  {
    name: 'Twitter/X',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/x.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Remote' as const,
    stipend: '$7,500 - $9,000/month',
    careerUrl: 'https://careers.twitter.com/en/work-for-twitter.html',
    deadline: new Date('2024-12-17'),
    isActive: true
  },
  {
    name: 'Goldman Sachs',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/goldmansachs.svg',
    role: 'Technology Summer Analyst',
    location: 'New York, NY',
    internshipType: 'Onsite' as const,
    stipend: '$85,000/year equivalent',
    careerUrl: 'https://www.goldmansachs.com/careers/students/programs/americas/summer-analyst-program.html',
    deadline: new Date('2024-12-14'),
    isActive: true
  },
  {
    name: 'JPMorgan Chase',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/jpmorgan.svg',
    role: 'Software Engineer Intern',
    location: 'New York, NY',
    internshipType: 'Hybrid' as const,
    stipend: '$6,500 - $8,000/month',
    careerUrl: 'https://careers.jpmorgan.com/us/en/students',
    deadline: new Date('2024-12-16'),
    isActive: true
  },
  {
    name: 'Bloomberg',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/bloomberg.svg',
    role: 'Software Engineer Intern',
    location: 'New York, NY',
    internshipType: 'Onsite' as const,
    stipend: '$7,000 - $8,500/month',
    careerUrl: 'https://www.bloomberg.com/careers/',
    deadline: new Date('2024-12-13'),
    isActive: true
  },
  {
    name: 'Palantir',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/palantir.svg',
    role: 'Forward Deployed Software Engineer Intern',
    location: 'Denver, CO',
    internshipType: 'Onsite' as const,
    stipend: '$7,500 - $9,500/month',
    careerUrl: 'https://www.palantir.com/careers/',
    deadline: new Date('2024-12-12'),
    isActive: true
  },
  {
    name: 'Tesla',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/tesla.svg',
    role: 'Software Engineering Intern',
    location: 'Palo Alto, CA',
    internshipType: 'Onsite' as const,
    stipend: '$7,000 - $8,800/month',
    careerUrl: 'https://www.tesla.com/careers/search/jobs',
    deadline: new Date('2024-12-11'),
    isActive: true
  },
  {
    name: 'Nvidia',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nvidia/nvidia-original.svg',
    role: 'Software Engineering Intern',
    location: 'Santa Clara, CA',
    internshipType: 'Hybrid' as const,
    stipend: '$7,200 - $8,800/month',
    careerUrl: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite',
    deadline: new Date('2024-12-10'),
    isActive: true
  },
  {
    name: 'Intel',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intel/intel-original.svg',
    role: 'Software Development Intern',
    location: 'Santa Clara, CA',
    internshipType: 'Hybrid' as const,
    stipend: '$6,000 - $7,500/month',
    careerUrl: 'https://www.intel.com/content/www/us/en/jobs/jobs-at-intel.html',
    deadline: new Date('2024-12-09'),
    isActive: true
  },
  {
    name: 'Spotify',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/spotify.svg',
    role: 'Software Engineering Intern',
    location: 'New York, NY',
    internshipType: 'Remote' as const,
    stipend: '$7,000 - $8,500/month',
    careerUrl: 'https://www.lifeatspotify.com/jobs',
    deadline: new Date('2024-12-08'),
    isActive: true
  },
  {
    name: 'GitHub',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Remote' as const,
    stipend: '$7,500 - $9,000/month',
    careerUrl: 'https://github.com/careers',
    deadline: new Date('2024-12-07'),
    isActive: true
  },
  {
    name: 'Dropbox',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/dropbox.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Remote' as const,
    stipend: '$7,200 - $8,700/month',
    careerUrl: 'https://www.dropbox.com/jobs/all-jobs',
    deadline: new Date('2024-12-06'),
    isActive: true
  },
  {
    name: 'Snowflake',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/snowflake.svg',
    role: 'Software Engineering Intern',
    location: 'San Mateo, CA',
    internshipType: 'Hybrid' as const,
    stipend: '$7,500 - $9,200/month',
    careerUrl: 'https://careers.snowflake.com/us/en',
    deadline: new Date('2024-12-05'),
    isActive: true
  },
  {
    name: 'Databricks',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/databricks.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Remote' as const,
    stipend: '$7,800 - $9,500/month',
    careerUrl: 'https://www.databricks.com/company/careers/open-positions',
    deadline: new Date('2024-12-04'),
    isActive: true
  },
  {
    name: 'MongoDB',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    role: 'Software Engineering Intern',
    location: 'New York, NY',
    internshipType: 'Hybrid' as const,
    stipend: '$7,000 - $8,500/month',
    careerUrl: 'https://www.mongodb.com/careers',
    deadline: new Date('2024-12-03'),
    isActive: true
  },
  {
    name: 'Reddit',
    logoUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/reddit.svg',
    role: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    internshipType: 'Remote' as const,
    stipend: '$7,200 - $8,800/month',
    careerUrl: 'https://www.redditinc.com/careers',
    deadline: new Date('2024-12-02'),
    isActive: true
  }
];

async function seed() {
  try {
    // MongoDB connection options
    const mongooseOptions = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };
    
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    console.log('Connected to MongoDB');

    // Clear existing companies
    await Company.deleteMany({});
    console.log('Cleared existing companies');

    // Insert new companies
    await Company.insertMany(companies);
    console.log(`Successfully seeded ${companies.length} companies`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
