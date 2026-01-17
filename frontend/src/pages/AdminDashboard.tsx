import React, { useEffect, useState } from 'react';
import { Application, User } from '../types';
import { applicationAPI } from '../services/api';

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await applicationAPI.getAll();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading admin dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const user =
                typeof app.userId !== 'string'
                  ? (app.userId as User)
                  : null;

              const company =
                typeof app.companyId !== 'string'
                  ? app.companyId
                  : null;

              return (
                <tr key={app._id} className="border-t">
                  <td className="p-3">{user ? user.email : 'N/A'}</td>
                  <td className="p-3">{company ? company.name : 'N/A'}</td>
                  <td className="p-3">{app.status}</td>
                  <td className="p-3">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
