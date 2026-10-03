export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrgRole = "admin" | "developer";

export interface Organization {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrgMember {
  id: number;
  orgId: number;
  userId: number;
  role: OrgRole;
  createdAt: Date;
}

export interface Project {
  id: number;
  orgId: number;
  name: string;
  slug: string;
  dbSchema: string;
  projectUrl: string;
  anonKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}