import { Response } from 'express';
import Application from '../models/Application';
import { AuthRequest } from '../middlewares/auth';
import Company from '../models/Company';

export const applyForInternship = async (req: AuthRequest, res: Response) => {
  try {
    const { companyId } = req.body;
    const userId = req.user!.userId;

    if (!companyId) {
      return res.status(400).json({ message: 'Company ID is required' });
    }

    const company = await Company.findById(companyId);
    if (!company || !company.isActive) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const existingApplication = await Application.findOne({ userId, companyId });
    if (existingApplication) {
      return res.status(400).json({ message: 'Application already exists' });
    }

    const application = new Application({
      userId,
      companyId,
      status: 'PENDING'
    });

    await application.save();
    await application.populate('companyId');

    res.status(201).json(application);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyApplications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const applications = await Application.find({ userId })
      .populate('companyId')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['PENDING', 'APPLIED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findById(id).populate('companyId');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Users can only update their own applications
    if (application.userId.toString() !== req.user!.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    application.status = status as 'PENDING' | 'APPLIED' | 'REJECTED';
    await application.save();

    res.json(application);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllApplications = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await Application.find()
      .populate('userId', 'email')
      .populate('companyId')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
