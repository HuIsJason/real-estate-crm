type Status = 'ACTIVE' | 'INACTIVE' | 'CLOSED';

type Specialization = 'BUYER' | 'SELLER';

export interface Activity {
  id: number;
  date: Date;
  description: string;
  completed: boolean;
}

export interface Property {
  id: number;
  addressNumber: number;
  address: string;
  city: string;
  province: string;
  notes?: string[];
  activities?: Activity[];
}

export interface Project {
  id: number;
  title: string;
  status: Status;
  tasks?: Activity[];
  properties?: Property[];
}

interface Account {
  username: string;
  password: string;
  id: string;
  type: 'ADMIN' | 'CLIENT' | 'AGENT';
}

interface Admin extends Account {}

interface NonAdminAccount extends Account {
  firstName: string;
  lastName: string;
  bio: string;
  yearCreated: number;
  address: string;
  phone: string;
  email: string;
}

export interface Agent extends NonAdminAccount {
  licenseId: string;
  brokerage: string;
  brokerageAddress: string;
  brokeragePhone: string;
  specialization: Specialization;
  clients: Client[];
}

export interface Client extends NonAdminAccount {
  agent?: Agent;
}

export type User = Agent | Client | Admin | null;
