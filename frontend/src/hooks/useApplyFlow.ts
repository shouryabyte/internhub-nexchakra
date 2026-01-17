import { useEffect, useState } from 'react';
import { Company } from '../types';
import { applicationAPI } from '../services/api';

const PENDING_APPLY_KEY = 'pendingApply';
const DISMISSED_POPUPS_KEY = 'dismissedPopups';

export const useApplyFlow = () => {
  const [pendingCompany, setPendingCompany] = useState<Company | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    checkForPendingApply();
  }, []);

  const checkForPendingApply = () => {
    const pendingApplyStr = localStorage.getItem(PENDING_APPLY_KEY);
    if (pendingApplyStr) {
      const company: Company = JSON.parse(pendingApplyStr);
      const dismissedPopups = JSON.parse(localStorage.getItem(DISMISSED_POPUPS_KEY) || '[]');
      
      if (!dismissedPopups.includes(company._id)) {
        setPendingCompany(company);
        setShowPopup(true);
      }
    }
  };

  const handleApplyClick = async (company: Company) => {
    try {
      // Create PENDING application immediately for tracking
      await applicationAPI.apply(company._id);
      // Store company ID for popup on return
      localStorage.setItem(PENDING_APPLY_KEY, JSON.stringify(company));
      // Open external career URL
      window.open(company.careerUrl, '_blank');
    } catch (error: any) {
      // If application already exists, just save company and redirect
      if (error.response?.status !== 400 || !error.response?.data?.message?.includes('already exists')) {
        console.error('Error creating application:', error);
      }
      localStorage.setItem(PENDING_APPLY_KEY, JSON.stringify(company));
      window.open(company.careerUrl, '_blank');
    }
  };

  const handleConfirmApply = async () => {
    if (!pendingCompany) return;

    try {
      // Get existing applications to find the one for this company
      const apps = await applicationAPI.getMyApplications();
      const existingApp = apps.find((app) => {
        const companyId = typeof app.companyId === 'string' ? app.companyId : app.companyId._id;
        return companyId === pendingCompany._id;
      });

      if (existingApp) {
        // Update existing application status to APPLIED
        await applicationAPI.updateStatus(existingApp._id, 'APPLIED');
      } else {
        // If for some reason application doesn't exist, create it as APPLIED
        const app = await applicationAPI.apply(pendingCompany._id);
        await applicationAPI.updateStatus(app._id, 'APPLIED');
      }

      // Mark this popup as dismissed
      const dismissedPopups = JSON.parse(localStorage.getItem(DISMISSED_POPUPS_KEY) || '[]');
      dismissedPopups.push(pendingCompany._id);
      localStorage.setItem(DISMISSED_POPUPS_KEY, JSON.stringify(dismissedPopups));
      localStorage.removeItem(PENDING_APPLY_KEY);
      setShowPopup(false);
      setPendingCompany(null);
      window.location.reload();
    } catch (err: any) {
      console.error('Error confirming apply:', err);
      alert(err.response?.data?.message || 'Failed to confirm application');
    }
  };

  const handleDismissPopup = () => {
    if (!pendingCompany) return;
    const dismissedPopups = JSON.parse(localStorage.getItem(DISMISSED_POPUPS_KEY) || '[]');
    dismissedPopups.push(pendingCompany._id);
    localStorage.setItem(DISMISSED_POPUPS_KEY, JSON.stringify(dismissedPopups));
    localStorage.removeItem(PENDING_APPLY_KEY);
    setShowPopup(false);
    setPendingCompany(null);
  };

  return {
    pendingCompany,
    showPopup,
    handleApplyClick,
    handleConfirmApply,
    handleDismissPopup,
  };
};
