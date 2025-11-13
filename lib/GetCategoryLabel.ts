import { WarrantyCategory } from './types';

export const WARRANTY_CATEGORIES: { value: WarrantyCategory; label: string }[] =
  [
    { value: 'electronics', label: 'Electronics' },
    { value: 'appliance', label: 'Appliance' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'tools', label: 'Tools' },
    { value: 'other', label: 'Other' },
  ];

export const getCategoryLabel = (category: WarrantyCategory): string => {
  return (
    WARRANTY_CATEGORIES.find((c) => c.value === category)?.label || category
  );
};
