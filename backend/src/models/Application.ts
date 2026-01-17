import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  status: 'PENDING' | 'APPLIED' | 'REJECTED';
  appliedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'APPLIED', 'REJECTED'], 
    default: 'PENDING' 
  },
  appliedAt: { type: Date, default: Date.now }
});

ApplicationSchema.index({ userId: 1, companyId: 1 }, { unique: true });

export default mongoose.model<IApplication>('Application', ApplicationSchema);
