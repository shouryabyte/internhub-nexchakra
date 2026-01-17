import React from 'react';
import { Company } from '../types';
import { useAuth } from '../context/AuthContext';
import { useApplyFlow } from '../hooks/useApplyFlow';

interface CompanyCardProps {
  company: Company;
  applicationStatus?: 'PENDING' | 'APPLIED' | 'REJECTED';
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, applicationStatus }) => {
  const { user } = useAuth();
  const { handleApplyClick } = useApplyFlow();

  const getStatusBadge = () => {
    if (!applicationStatus) return null;
    const colors = {
      PENDING: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-md',
      APPLIED: 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md',
      REJECTED: 'bg-gradient-to-r from-red-400 to-rose-500 text-white shadow-md',
    };
    return (
      <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold ${colors[applicationStatus]}`}>
        {applicationStatus}
      </span>
    );
  };

  const getTypeColor = (type: string) => {
    const colors = {
      Remote: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-sm',
      Onsite: 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-sm',
      Hybrid: 'bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-sm',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-200 text-gray-700';
  };

  // Generate short Job ID from company _id
  const jobId = company._id.substring(company._id.length - 6).toUpperCase();

  return (
    <div className="group glass-effect rounded-2xl shadow-lg p-6 card-hover border border-white/50 relative overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-indigo-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/50 transition-all duration-500 pointer-events-none"></div>
      
      <div className="relative">
        {/* Header with Logo, Company Name, Role, and Status */}
        <div className="flex items-start justify-between mb-5 pb-5 border-b border-gray-200/60">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={company.logoUrl}
                alt={company.name}
                className="w-16 h-16 object-contain rounded-xl border-2 border-gray-200 p-2 bg-white shadow-sm group-hover:shadow-md transition-shadow"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
                }}
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">
                {company.name}
              </h3>
              <p className="text-gray-700 font-semibold mb-1">{company.role}</p>
              <p className="text-xs text-gray-500 font-mono">ID: {jobId}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      
      {/* Company Information */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{company.location}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">
            <strong>Deadline:</strong> {new Date(company.deadline).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getTypeColor(company.internshipType)}`}>
            {company.internshipType}
          </span>
          <span className="text-green-600 font-bold text-lg">{company.stipend}</span>
        </div>
      </div>

        {/* Career Link */}
        <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-indigo-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="text-xs font-semibold">Career Page</span>
            </div>
            <a
              href={company.careerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline font-bold truncate max-w-[200px] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              View Link →
            </a>
          </div>
        </div>

        {/* Apply Button */}
        {user ? (
          <div className="flex gap-2">
            <button
              onClick={async () => {
                if (applicationStatus !== 'APPLIED') {
                  await handleApplyClick(company);
                  // Refresh page to update status
                  window.location.reload();
                }
              }}
              className={`flex-1 px-4 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                applicationStatus === 'APPLIED'
                  ? 'bg-gray-200 text-gray-600 cursor-not-allowed shadow-sm'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
              }`}
              disabled={applicationStatus === 'APPLIED'}
            >
              {applicationStatus === 'APPLIED' ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Applied
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Apply Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
            <p className="text-sm text-gray-700 mb-2 font-medium">Please login to apply</p>
            <a
              href="/login"
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
            >
              Sign In →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
