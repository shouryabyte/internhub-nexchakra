import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  logoUrl: string;
  role: string;
  location: string;
  internshipType: 'Remote' | 'Onsite' | 'Hybrid';
  stipend: string;
  careerUrl: string;
  deadline: Date;
  isActive: boolean;
  createdAt: Date;
}

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  internshipType: { 
    type: String, 
    enum: ['Remote', 'Onsite', 'Hybrid'], 
    required: true 
  },
  stipend: { type: String, required: true },
  careerUrl: { type: String, required: true },
  deadline: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICompany>('Company', CompanySchema);
