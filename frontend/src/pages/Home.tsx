import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Company } from '../types';
import { companyAPI } from '../services/api';
import CompanyCard from '../components/CompanyCard';
import { useAuth } from '../context/AuthContext';
import { applicationAPI } from '../services/api';
import { useApplyFlow } from '../hooks/useApplyFlow';

const Home: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Record<string, 'PENDING' | 'APPLIED' | 'REJECTED'>>({});
  const { user } = useAuth();
  const { handleApplyClick } = useApplyFlow();

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (user) {
      loadApplications();
    }
  }, [user]);

  const loadCompanies = async () => {
    try {
      const data = await companyAPI.getAll();
      setCompanies(data);
      if (data.length === 0) {
        console.warn('No companies found in database. Make sure to run: npm run seed in backend folder');
      }
    } catch (error: any) {
      console.error('Error loading companies:', error);
      // Show user-friendly error message
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Network Error: Backend server may not be running. Check if backend is running on port 5000');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async () => {
    try {
      const data = await applicationAPI.getMyApplications();
      const statusMap: Record<string, 'PENDING' | 'APPLIED' | 'REJECTED'> = {};
      data.forEach((app) => {
        const companyId = typeof app.companyId === 'string' ? app.companyId : app.companyId._id;
        statusMap[companyId] = app.status;
      });
      setApplications(statusMap);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl text-gray-600">Loading amazing opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 leading-tight">
              Find Your Dream
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                Internship
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto font-medium">
              Discover opportunities from <span className="font-bold text-white">{companies.length}+</span> top companies worldwide. 
              Your career journey starts here.
            </p>
            {!user && (
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/register"
                  className="group bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-indigo-300/50"
                >
                  Get Started
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  to="/login"
                  className="bg-indigo-700/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700/50 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-effect rounded-2xl shadow-xl p-8 text-center card-hover border border-white/50">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              {companies.length}
            </div>
            <div className="text-gray-700 font-semibold text-lg">Active Internships</div>
            <div className="mt-2 text-sm text-gray-500">Ready to apply now</div>
          </div>
          <div className="glass-effect rounded-2xl shadow-xl p-8 text-center card-hover border border-white/50">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              30+
            </div>
            <div className="text-gray-700 font-semibold text-lg">Top Companies</div>
            <div className="mt-2 text-sm text-gray-500">Fortune 500 & Tech Giants</div>
          </div>
          <div className="glass-effect rounded-2xl shadow-xl p-8 text-center card-hover border border-white/50">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-3">
              100%
            </div>
            <div className="text-gray-700 font-semibold text-lg">Real Opportunities</div>
            <div className="mt-2 text-sm text-gray-500">Verified career pages</div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Available <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Internships</span>
          </h2>
          <p className="text-gray-600 text-lg">Browse through curated opportunities from industry leaders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <div key={company._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <CompanyCard
                company={company}
                applicationStatus={applications[company._id]}
              />
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No internships available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for new opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
