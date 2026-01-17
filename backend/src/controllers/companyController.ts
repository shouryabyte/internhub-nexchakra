import { Request, Response } from 'express';
import Company from '../models/Company';
import { AuthRequest } from '../middlewares/auth';

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select('name logoUrl role location internshipType stipend careerUrl deadline isActive createdAt');
    console.log(`Returning ${companies.length} companies with full details`);
    res.json(companies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company || !company.isActive) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCompany = async (req: AuthRequest, res: Response) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCompany = async (req: AuthRequest, res: Response) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleCompanyStatus = async (req: AuthRequest, res: Response) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    company.isActive = !company.isActive;
    await company.save();
    res.json(company);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
