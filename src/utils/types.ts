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
  id: number;
  name: string;
  bio: string;
  yearCreated: number;
  address: string;
  phone: string;
  email: string;
}

export interface Agent extends Account {
  brokerage: string;
  specialization: Specialization;
}

export interface Client extends Account {
  agent?: Agent;
}

export type User = Agent | Client | null;
