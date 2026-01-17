import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Company } from '../types';
import { companyAPI } from '../services/api';
import CompanyCard from '../components/CompanyCard';
import { useAuth } from '../context/AuthContext';
import { applicationAPI } from '../services/api';

const Home: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Record<string, 'PENDING' | 'APPLIED' | 'REJECTED'>>({});
  const { user } = useAuth();

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
    } catch (error: any) {
      console.error('Error loading companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async () => {
    try {
      const data = await applicationAPI.getMyApplications();
      const statusMap: Record<string, 'PENDING' | 'APPLIED' | 'REJECTED'> = {};

      data.forEach((app) => {
        const companyId =
          typeof app.companyId === 'string'
            ? app.companyId
            : app.companyId._id;
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
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Find Your Dream Internship
          </h1>
          <p className="text-xl md:text-2xl mb-10">
            Discover opportunities from {companies.length}+ companies
          </p>

          {!user && (
            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white px-8 py-4 rounded-xl font-bold"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
              applicationStatus={applications[company._id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
