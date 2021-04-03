type Status = 'active' | 'closed';

type Specialization = 'BUYER' | 'SELLER' | 'BOTH';

type MongoId = string;

export interface Activity {
  _id?: MongoId;
  title: string;
  date: string;
  description: string;
}

export interface Property {
  _id?: MongoId;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
  activities: Activity[];
  favourited: boolean;
  project?: MongoId;
}

export interface Project {
  _id: MongoId;
  title: string;
  description?: string;
  status: Status;
  tags?: string[];
  client?: MongoId;
}

export interface Account {
  _id: MongoId;
  username: string;
  password: string;
  accountType: 'admin' | 'agent';
  lastLogin?: Date;
}

export interface Admin extends Account {}

// interface NonAdminAccount extends Account {
//   firstName: string;
//   lastName: string;
//   bio: string;
//   yearCreated: number;
//   address: string;
//   phone: string;
//   email: string;
// }

export interface Agent extends Account {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  yearStarted: number;
  bio: string;
  licenseId: string;
  brokerage: string;
  brokerageAddress: string;
  brokeragePhone: string;
  specialization: Specialization;
  activated: boolean;
}

export interface Client {
  _id?: MongoId;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  description?:string;
  profileImg?:string;
  tags: string[];
  agent?: MongoId;
}

export type User = Agent | Admin | null;
