import { ROLE_RANK, type Role } from "./types";

export function hasRole(role: Role | null | undefined, required: Role) {
  if (!role) return false;
  return ROLE_RANK[role] >= ROLE_RANK[required];
}

export function canEditCatalog(role: Role | null | undefined) {
  return hasRole(role, "OWNER");
}

export function canSoftDelete(role: Role | null | undefined) {
  return hasRole(role, "ADMIN");
}

export function canAdjustStock(role: Role | null | undefined) {
  return hasRole(role, "ADMIN");
}

export function canViewAudit(role: Role | null | undefined) {
  return hasRole(role, "OWNER");
}

export function canManageUsers(role: Role | null | undefined) {
  return hasRole(role, "ADMIN");
}

export function canEditCustomer(role: Role | null | undefined) {
  return hasRole(role, "OWNER");
}

export function canEditTransaction(role: Role | null | undefined) {
  return hasRole(role, "OWNER");
}

export function canManageTemplates(role: Role | null | undefined) {
  return hasRole(role, "OWNER");
}
