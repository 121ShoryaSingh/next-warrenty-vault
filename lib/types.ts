export type ReceiptFile =
  | {
      success: true;
      key: string;
      error?: never;
    }
  | {
      success: false;
      error: string;
      key?: never;
    };

export type WarrantyCategory =
  | 'electronics'
  | 'appliance'
  | 'home-garden'
  | 'automotive'
  | 'furniture'
  | 'tools'
  | 'other';

export interface WarrantyItem {
  id: string;
  owner: string;
  title: string;
  category: WarrantyCategory;
  purchaseDate: string;
  warrantyExpiry: string;
  price: number;
  notes: string;
  recepts: ReceiptFile[];
  created_at: string;
  updated_at: string;
}

export interface CreateWarrantyInput {
  title: string;
  category: WarrantyCategory;
  purchase_date: string;
  warranty_expiry_date: string;
  price: number;
  notes?: string;
  receipt_files: ReceiptFile[];
}
