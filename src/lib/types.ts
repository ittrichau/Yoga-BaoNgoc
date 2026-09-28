export type Role = "TEACHER" | "OWNER" | "ADMIN";

export type ProductType = "mat" | "clothing" | "accessory" | "other";
export type IngredientUnit = "muỗng" | "nắp" | "gói";
export type PackageType = "BASIC" | "FAT_LOSS" | "COMBO";
export type AdjustmentType = "add" | "remove" | "count_correct";
export type PtLocationType = "AT_GYM" | "OUTSIDE";
export type PtRateType = "PER_HOUR" | "PER_SESSION" | "PER_MONTH";
export type TxKind = "drink" | "product" | "package" | "checkin" | "pt";

export type Location = {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
  createdAt: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
  fullName: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
};

export type UserLocation = {
  userId: number;
  locationId: number;
};

export type Customer = {
  id: number;
  locationId: number;
  code: string;
  fullName: string;
  phone: string;
  birthDate: string;
  notes: string;
  isActive: boolean;
  createdBy: number;
  createdAt: string;
};

export type Drink = {
  id: number;
  locationId: number;
  name: string;
  pricePerServing: number;
  description: string;
  isActive: boolean;
  createdBy: number;
  createdAt: string;
};

export type Ingredient = {
  id: number;
  locationId: number;
  name: string;
  unit: IngredientUnit;
  currentStock: number;
  minStock: number;
  isActive: boolean;
  createdBy: number;
  createdAt: string;
};

export type DrinkRecipe = {
  id: number;
  drinkId: number;
  ingredientId: number;
  quantityPerServing: number;
};

export type Product = {
  id: number;
  locationId: number;
  name: string;
  productType: ProductType;
  price: number;
  salePercent: number;
  currentStock: number;
  minStock: number;
  isActive: boolean;
  createdBy: number;
  createdAt: string;
};

export type PackageTemplate = {
  id: number;
  locationId: number;
  name: string;
  packageType: PackageType;
  durationDays: number;
  totalSessions: number;
  totalDrinks: number;
  totalAmount: number;
  isActive: boolean;
  createdBy: number;
  createdAt: string;
};

export type Membership = {
  id: number;
  locationId: number;
  customerId: number;
  name: string;
  totalAmount: number;
  templateId: number | null;
  durationDays: number;
  startDate: string;
  endDate: string | null;
  totalSessions: number;
  remainingSessions: number;
  isActive: boolean;
  createdBy: number;
  createdAt: string;
};

export type PackageItem = {
  id: number;
  packageId: number;
  drinkId: number | null;
  productId: number | null;
  totalServings: number;
  remainingServings: number;
};

export type PackageSession = {
  id: number;
  packageId: number;
  checkinDate: string;
  checkinTime: string;
  transactionId: number | null;
  createdBy: number;
  createdAt: string;
};

export type Transaction = {
  id: number;
  locationId: number;
  customerId: number;
  drinkId: number | null;
  productId: number | null;
  packageItemId: number | null;
  kind: TxKind;
  servings: number;
  quantity: number;
  amount: number;
  notes: string;
  sessionCheckin: boolean;
  createdBy: number;
  createdAt: string;
};

export type InventoryAdjustment = {
  id: number;
  locationId: number;
  ingredientId: number;
  adjustmentType: AdjustmentType;
  quantity: number;
  reason: string;
  createdBy: number;
  createdAt: string;
};

export type ProductStockAdjustment = {
  id: number;
  locationId: number;
  productId: number;
  adjustmentType: AdjustmentType;
  quantity: number;
  reason: string;
  createdBy: number;
  createdAt: string;
};

export type PtRate = {
  id: number;
  locationId: number;
  name: string;
  locationType: PtLocationType;
  rateType: PtRateType;
  price: number;
  isActive: boolean;
  createdAt: string;
};

export type PtSession = {
  id: number;
  locationId: number;
  customerId: number;
  trainerId: number;
  ptRateId: number;
  sessionDate: string;
  durationHours: number;
  includeNutrition: boolean;
  drinkId: number | null;
  ptAmount: number;
  drinkAmount: number;
  totalAmount: number;
  notes: string;
  createdBy: number;
  createdAt: string;
};

export type AuditLog = {
  id: number;
  locationId: number | null;
  userId: number;
  action: string;
  entityType: string;
  entityId: number | null;
  details: string;
  createdAt: string;
};

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Admin",
  OWNER: "Chủ phòng",
  TEACHER: "Giáo viên",
};

export const ROLE_RANK: Record<Role, number> = {
  TEACHER: 1,
  OWNER: 2,
  ADMIN: 3,
};

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  mat: "Thảm tập",
  clothing: "Trang phục",
  accessory: "Phụ kiện",
  other: "Khác",
};

export const PACKAGE_TYPE_LABELS: Record<PackageType, string> = {
  BASIC: "Cơ bản",
  FAT_LOSS: "Giảm mỡ",
  COMBO: "Combo",
};

export const UNIT_LABELS: Record<IngredientUnit, string> = {
  muỗng: "Muỗng",
  nắp: "Nắp",
  gói: "Gói",
};

export const ADJUST_LABELS: Record<AdjustmentType, string> = {
  add: "Nhập thêm",
  remove: "Xuất bớt",
  count_correct: "Kiểm kê",
};

export const PT_LOC_LABELS: Record<PtLocationType, string> = {
  AT_GYM: "Tại phòng",
  OUTSIDE: "Bên ngoài",
};

export const PT_RATE_LABELS: Record<PtRateType, string> = {
  PER_HOUR: "Theo giờ",
  PER_SESSION: "Theo buổi",
  PER_MONTH: "Theo tháng",
};
