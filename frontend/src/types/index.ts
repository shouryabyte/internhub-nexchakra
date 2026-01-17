export interface Company {
  _id: string;
  name: string;
  logoUrl: string;
  role: string;
  location: string;
  internshipType: 'Remote' | 'Onsite' | 'Hybrid';
  stipend: string;
  careerUrl: string;
  deadline: string;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface Application {
  _id: string;
  userId: string;
  companyId: Company | string;
  status: 'PENDING' | 'APPLIED' | 'REJECTED';
  appliedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
