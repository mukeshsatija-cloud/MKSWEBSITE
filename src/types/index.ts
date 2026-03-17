// src/types/index.ts

export type Role = 'superadmin' | 'sales' | 'agent';

export interface UserProfile {
  id: string; // Auth0 ID
  role: Role;
  name: string;
  phone?: string;
  email: string;
  region?: string;
  createdAt: number;
}

export interface Publication {
  id: string;
  name: string;
  price: number;
  type: 'daily' | 'weekly' | 'magazine';
}

export interface Supply {
  id: string;
  agentId: string;
  publicationId: string;
  defaultQuantity: number;
}

export type RequestType = 'supply_change' | 'complaint' | 'variation_slip';
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface SupplyRequest {
  id: string;
  type: RequestType;
  status: RequestStatus;
  requestedBy: string; // userId
  targetAgent: string; // userId
  details: {
    date?: string; // Target date for change (YYYY-MM-DD)
    publicationId?: string;
    newQuantity?: number;
    complaintText?: string;
    // For variation slip
    weekStartDate?: string; 
    dailyVariations?: Record<string, number>; // { 'YYYY-MM-DD': diff_quantity }
  };
  createdAt: number;
}

export interface Notification {
  id: string;
  message: string;
  readStatus: boolean;
  createdAt: number;
  targetedForSuperadmin: boolean;
  targetUserId?: string; // if not superadmin
}

export interface CashDenomination {
  '500': number;
  '200': number;
  '100': number;
  '50': number;
  '20': number;
  '10': number;
  '5': number;
  '2': number;
  '1': number;
}

export interface CashCollection {
  id: string;
  agentId: string;
  salesExecId: string;
  amount: number;
  date: string; // YYYY-MM-DD
  notes?: string;
  denominationCount: CashDenomination;
  createdAt: number;
}
