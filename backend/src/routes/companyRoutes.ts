import express from 'express';
import {
  getCompanies,
  getCompanyById,
  createCompany,
  deleteCompany,
  toggleCompanyStatus
} from '../controllers/companyController';
import { authenticate, requireAdmin } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.get('/', getCompanies);
router.get('/:id', getCompanyById);

// Admin routes
router.post('/', authenticate, requireAdmin, createCompany);
router.delete('/:id', authenticate, requireAdmin, deleteCompany);
router.patch('/:id/toggle', authenticate, requireAdmin, toggleCompanyStatus);

export default router;
