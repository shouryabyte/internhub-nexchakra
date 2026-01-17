import React, { useEffect, useState } from 'react';
import { Application } from '../types';
import { applicationAPI } from '../services/api';

const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await applicationAPI.getMyApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPLIED: 'bg-blue-100 text-blue-800',
      REJECTED: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          colors[status as keyof typeof colors]
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading your applications…</p>
      </div>
    );
  }

  const appliedCount = applications.filter(app => app.status === 'APPLIED').length;
  const pendingCount = applications.filter(app => app.status === 'PENDING').length;
  const rejectedCount = applications.filter(app => app.status === 'REJECTED').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">My Applications</h1>

        {applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded shadow">
              <div className="text-3xl font-bold text-blue-600">{appliedCount}</div>
              <div>Applied</div>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
              <div>Pending</div>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
              <div>Rejected</div>
            </div>
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white p-16 text-center rounded shadow">
            <p className="text-xl text-gray-500 mb-4">
              You haven’t applied to any internships yet.
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded font-semibold"
            >
              Browse Internships →
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const company =
                typeof app.companyId === 'string' ? null : app.companyId;

              if (!company) return null;

              return (
                <div
                  key={app._id}
                  className="bg-white p-6 rounded shadow"
                >
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{company.name}</h3>
                      <p className="text-gray-600">{company.role}</p>
                      <p className="text-sm text-gray-500">
                        Applied on{' '}
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  <div className="flex gap-6 text-sm text-gray-600">
                    <span>{company.location}</span>
                    <span>{company.internshipType}</span>
                    <span className="text-green-600 font-semibold">
                      {company.stipend}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
