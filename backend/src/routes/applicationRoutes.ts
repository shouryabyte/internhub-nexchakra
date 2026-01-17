import express from 'express';
import {
  applyForInternship,
  getMyApplications,
  updateApplicationStatus,
  getAllApplications
} from '../controllers/applicationController';
import { authenticate, requireAdmin } from '../middlewares/auth';

const router = express.Router();

// User routes
router.post('/apply', authenticate, applyForInternship);
router.get('/my', authenticate, getMyApplications);
router.patch('/:id/status', authenticate, updateApplicationStatus);

// Admin routes
router.get('/admin/all', authenticate, requireAdmin, getAllApplications);

export default router;
