import { differenceInDays } from 'date-fns';

export const getWarrantyStatus = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysRemaining = differenceInDays(expiry, today);

  if (daysRemaining < 0) {
    return { status: 'expired', daysRemaining };
  } else if (daysRemaining <= 30) {
    return { status: 'expiring', daysRemaining };
  } else {
    return { status: 'active', daysRemaining };
  }
};
