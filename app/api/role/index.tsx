import { Role } from "@/constants/config";
import { fetchData } from "../call-methods";

export interface Role {
  id: string;
  createdAt: string;
  updatedAt: string;
  roleName: string;
  description: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
}

export const getRoles = async () => fetchData(Role.getAllRoles);
