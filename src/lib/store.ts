import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { addDays, isoDate, stamp } from "./format";
import { wrapWithLoading } from "./loading";
import { hasRole } from "./permissions";
import { createSeed, type StudioData } from "./seed";
import type {
  AdjustmentType,
  Customer,
  Drink,
  Ingredient,
  IngredientUnit,
  Location,
  Membership,
  PackageItem,
  PackageTemplate,
  PackageType,
  Product,
  ProductType,
  PtLocationType,
  PtRateType,
  Role,
  Transaction,
  User,
} from "./types";

export type CartLine = {
  key: string;
  kind: "drink" | "product";
  drinkId?: number;
  productId?: number;
  name: string;
  unitPrice: number;
  quantity: number;
  usePackageItemId?: number | null;
};

type Result = { ok: true; message: string; id?: number } | { ok: false; message: string };

type SessionSlice = {
  sessionUserId: number | null;
  sessionLocationId: number | null;
  login: (username: string, password: string) => Result;
  logout: () => void;
  selectLocation: (locationId: number) => Result;
  resetDemo: () => void;
};

type StudioActions = {
  nextId: (key: keyof StudioData["counters"]) => number;
  currentUser: () => User | undefined;
  currentLocation: () => Location | undefined;
  currentRole: () => Role | null;
  userLocationsFor: (userId: number) => Location[];
  audit: (action: string, entityType: string, entityId: number | null, details: string) => void;
  nextCustomerCode: (locationId: number) => string;

  upsertCustomer: (input: {
    id?: number;
    fullName: string;
    phone: string;
    birthDate: string;
    notes: string;
  }) => Result;
  deactivateCustomer: (id: number) => Result;

  checkin: (input: { customerId: number; packageId: number; drinkId?: number; notes?: string }) => Result;

  checkoutCart: (input: { customerId: number; lines: CartLine[]; notes?: string }) => Result;

  upsertDrink: (input: {
    id?: number;
    name: string;
    pricePerServing: number;
    description: string;
    recipe: Array<{ ingredientId: number; quantityPerServing: number }>;
  }) => Result;
  deactivateDrink: (id: number) => Result;

  upsertIngredient: (input: {
    id?: number;
    name: string;
    unit: IngredientUnit;
    minStock: number;
  }) => Result;
  deactivateIngredient: (id: number) => Result;
  adjustIngredient: (input: {
    ingredientId: number;
    type: AdjustmentType;
    quantity: number;
    reason: string;
  }) => Result;

  upsertProduct: (input: {
    id?: number;
    name: string;
    productType: ProductType;
    price: number;
    salePercent: number;
    minStock: number;
  }) => Result;
  deactivateProduct: (id: number) => Result;
  adjustProduct: (input: {
    productId: number;
    type: AdjustmentType;
    quantity: number;
    reason: string;
  }) => Result;

  upsertTemplate: (input: {
    id?: number;
    name: string;
    packageType: PackageType;
    durationDays: number;
    totalSessions: number;
    totalDrinks: number;
    totalAmount: number;
  }) => Result;
  deactivateTemplate: (id: number) => Result;

  assignPackage: (input: {
    customerId: number;
    templateId: number;
    startDate?: string;
    drinkId?: number;
  }) => Result;
  deactivatePackage: (id: number) => Result;
  upgradePackage: (input: { packageId: number; templateId: number; drinkId?: number }) => Result;

  upsertPtRate: (input: {
    id?: number;
    name: string;
    locationType: PtLocationType;
    rateType: PtRateType;
    price: number;
  }) => Result;
  recordPtSession: (input: {
    customerId: number;
    trainerId: number;
    ptRateId: number;
    sessionDate: string;
    durationHours: number;
    includeNutrition: boolean;
    drinkId?: number | null;
    notes?: string;
  }) => Result;

  upsertUser: (input: {
    id?: number;
    username: string;
    password?: string;
    fullName: string;
    role: Role;
    locationIds: number[];
  }) => Result;
  setUserActive: (id: number, isActive: boolean) => Result;

  upsertLocation: (input: { id?: number; name: string; address: string }) => Result;
  setLocationActive: (id: number, isActive: boolean) => Result;
};

export type StudioStore = StudioData & SessionSlice & StudioActions;

const STUDIO_MUTATIONS = [
  "login",
  "logout",
  "selectLocation",
  "resetDemo",
  "upsertCustomer",
  "deactivateCustomer",
  "checkin",
  "checkoutCart",
  "upsertDrink",
  "deactivateDrink",
  "upsertIngredient",
  "deactivateIngredient",
  "adjustIngredient",
  "upsertProduct",
  "deactivateProduct",
  "adjustProduct",
  "upsertTemplate",
  "deactivateTemplate",
  "assignPackage",
  "deactivatePackage",
  "upgradePackage",
  "upsertPtRate",
  "recordPtSession",
  "upsertUser",
  "setUserActive",
  "upsertLocation",
  "setLocationActive",
] as const;

function applyData(data: StudioData): StudioData {
  return structuredClone(data);
}

export const useStudioStore = create<StudioStore>()(
  persist(
    (set, get) => {
      const seed = createSeed();
      const api: StudioStore = {
        ...seed,
        sessionUserId: null,
        sessionLocationId: null,

        nextId: (key) => {
          const id = get().counters[key] ?? 1;
          set((s) => ({ counters: { ...s.counters, [key]: id + 1 } }));
          return id;
        },

        currentUser: () => get().users.find((u) => u.id === get().sessionUserId),
        currentLocation: () => get().locations.find((l) => l.id === get().sessionLocationId),
        currentRole: () => get().currentUser()?.role ?? null,

        userLocationsFor: (userId) => {
          const ids = get()
            .userLocations.filter((ul) => ul.userId === userId)
            .map((ul) => ul.locationId);
          return get().locations.filter((l) => l.isActive && ids.includes(l.id));
        },

        audit: (action, entityType, entityId, details) => {
          const id = get().nextId("auditLogs");
          const log = {
            id,
            locationId: get().sessionLocationId,
            userId: get().sessionUserId ?? 0,
            action,
            entityType,
            entityId,
            details,
            createdAt: stamp(),
          };
          set((s) => ({ auditLogs: [log, ...s.auditLogs] }));
        },

        nextCustomerCode: (locationId) => {
          const existing = get()
            .customers.filter((c) => c.locationId === locationId)
            .map((c) => Number(c.code.replace(/\D/g, "")) || 0);
          const next = (existing.length ? Math.max(...existing) : 0) + 1;
          return `HV${String(next).padStart(6, "0")}`;
        },

        login: (username, password) => {
          const user = get().users.find(
            (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.isActive,
          );
          if (!user || user.password !== password) {
            return { ok: false, message: "Sai tên đăng nhập hoặc mật khẩu." };
          }
          set({ sessionUserId: user.id, sessionLocationId: null });
          get().audit("LOGIN", "user", user.id, `${user.fullName} đăng nhập`);
          return { ok: true, message: "Đăng nhập thành công." };
        },

        logout: () => {
          const user = get().currentUser();
          if (user) get().audit("LOGOUT", "user", user.id, `${user.fullName} đăng xuất`);
          set({ sessionUserId: null, sessionLocationId: null });
        },

        selectLocation: (locationId) => {
          const userId = get().sessionUserId;
          if (!userId) return { ok: false, message: "Chưa đăng nhập." };
          const allowed = get().userLocations.some((ul) => ul.userId === userId && ul.locationId === locationId);
          const loc = get().locations.find((l) => l.id === locationId && l.isActive);
          if (!allowed || !loc) return { ok: false, message: "Bạn không được phân công cơ sở này." };
          set({ sessionLocationId: locationId });
          get().audit("SELECT_LOCATION", "location", locationId, `Chọn cơ sở ${loc.name}`);
          return { ok: true, message: `Đang làm việc tại ${loc.name}` };
        },

        resetDemo: () => {
          const fresh = applyData(createSeed());
          set({ ...fresh, sessionUserId: null, sessionLocationId: null });
        },

        upsertCustomer: (input) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          const name = input.fullName.trim();
          if (!name) return { ok: false, message: "Vui lòng nhập họ tên hội viên." };
          if (input.id) {
            if (!hasRole(user.role, "OWNER")) return { ok: false, message: "Giáo viên không được sửa hội viên." };
            set((s) => ({
              customers: s.customers.map((c) =>
                c.id === input.id
                  ? { ...c, fullName: name, phone: input.phone.trim(), birthDate: input.birthDate, notes: input.notes.trim() }
                  : c,
              ),
            }));
            get().audit("UPDATE", "customer", input.id, `Cập nhật hội viên ${name}`);
            return { ok: true, message: "Đã cập nhật hội viên.", id: input.id };
          }
          const id = get().nextId("customers");
          const customer: Customer = {
            id,
            locationId: locId,
            code: get().nextCustomerCode(locId),
            fullName: name,
            phone: input.phone.trim(),
            birthDate: input.birthDate,
            notes: input.notes.trim(),
            isActive: true,
            createdBy: user.id,
            createdAt: stamp(),
          };
          set((s) => ({ customers: [customer, ...s.customers] }));
          get().audit("CREATE", "customer", id, `Thêm hội viên ${customer.code} — ${name}`);
          return { ok: true, message: `Đã thêm hội viên ${customer.code}.`, id };
        },

        deactivateCustomer: (id) => {
          const user = get().currentUser();
          if (!hasRole(user?.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được vô hiệu hóa hội viên." };
          const customer = get().customers.find((c) => c.id === id);
          if (!customer) return { ok: false, message: "Không tìm thấy hội viên." };
          set((s) => ({ customers: s.customers.map((c) => (c.id === id ? { ...c, isActive: false } : c)) }));
          get().audit("DEACTIVATE", "customer", id, `Vô hiệu hóa ${customer.code} — ${customer.fullName}`);
          return { ok: true, message: "Đã vô hiệu hóa hội viên." };
        },

        checkin: ({ customerId, packageId, drinkId, notes }) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          const customer = get().customers.find((c) => c.id === customerId && c.isActive);
          if (!customer) return { ok: false, message: "Không tìm thấy hội viên." };
          const pkg = get().packages.find((p) => p.id === packageId && p.customerId === customerId && p.isActive);
          if (!pkg) return { ok: false, message: "Gói không hợp lệ." };
          const today = isoDate();
          if (pkg.endDate && pkg.endDate < today) return { ok: false, message: `Gói đã hết hạn từ ${pkg.endDate}.` };
          if (pkg.totalSessions > 0 && pkg.remainingSessions <= 0) {
            return { ok: false, message: "Gói đã hết buổi tập." };
          }
          const item =
            get().packageItems.find(
              (i) => i.packageId === pkg.id && i.remainingServings > 0 && (!drinkId || i.drinkId === drinkId),
            ) ?? get().packageItems.find((i) => i.packageId === pkg.id && i.remainingServings > 0);
          if (!item) return { ok: false, message: "Gói đã hết suất đồ uống." };
          const usedDrinkId = drinkId ?? item.drinkId;
          if (!usedDrinkId) return { ok: false, message: "Gói chưa gắn đồ uống." };

          const deduct = deductIngredients(get, set, locId, usedDrinkId, 1);
          if (!deduct.ok) return deduct;

          set((s) => ({
            packageItems: s.packageItems.map((i) =>
              i.id === item.id ? { ...i, remainingServings: i.remainingServings - 1 } : i,
            ),
            packages: s.packages.map((p) =>
              p.id === pkg.id && pkg.totalSessions > 0 ? { ...p, remainingSessions: p.remainingSessions - 1 } : p,
            ),
          }));

          const txId = get().nextId("transactions");
          const sessId = get().nextId("packageSessions");
          const createdAt = stamp();
          const tx: Transaction = {
            id: txId,
            locationId: locId,
            customerId,
            drinkId: usedDrinkId,
            productId: null,
            packageItemId: item.id,
            kind: "checkin",
            servings: 1,
            quantity: 1,
            amount: 0,
            notes: notes?.trim() || `Check-in buổi tập gói #${pkg.id}`,
            sessionCheckin: true,
            createdBy: user.id,
            createdAt,
          };
          set((s) => ({
            transactions: [tx, ...s.transactions],
            packageSessions: [
              {
                id: sessId,
                packageId: pkg.id,
                checkinDate: today,
                checkinTime: createdAt,
                transactionId: txId,
                createdBy: user.id,
                createdAt,
              },
              ...s.packageSessions,
            ],
          }));
          get().audit("CHECKIN", "package", pkg.id, `Check-in ${customer.code} — ${customer.fullName}`);
          return { ok: true, message: `Đã check-in ${customer.fullName}.`, id: txId };
        },

        checkoutCart: ({ customerId, lines, notes }) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          const customer = get().customers.find((c) => c.id === customerId && c.isActive && c.locationId === locId);
          if (!customer) return { ok: false, message: "Phải chọn hội viên trước khi bán. Không cho phép giao dịch ẩn danh." };
          if (!lines.length) return { ok: false, message: "Giỏ hàng trống." };

          for (const line of lines) {
            if (line.kind === "drink") {
              const drink = get().drinks.find((d) => d.id === line.drinkId && d.isActive);
              if (!drink) return { ok: false, message: `Không tìm thấy đồ uống ${line.name}.` };
              if (line.usePackageItemId) {
                const item = get().packageItems.find((i) => i.id === line.usePackageItemId);
                if (!item || item.remainingServings < line.quantity) {
                  return { ok: false, message: `Gói không đủ suất cho ${line.name}.` };
                }
              }
              const deduct = deductIngredients(get, set, locId, drink.id, line.quantity);
              if (!deduct.ok) return deduct;
            } else {
              const product = get().products.find((p) => p.id === line.productId && p.isActive);
              if (!product) return { ok: false, message: `Không tìm thấy sản phẩm ${line.name}.` };
              if (product.currentStock < line.quantity) {
                return { ok: false, message: `${product.name} không đủ hàng (còn ${product.currentStock}).` };
              }
            }
          }

          const created: number[] = [];
          for (const line of lines) {
            const amount = line.usePackageItemId ? 0 : line.unitPrice * line.quantity;
            if (line.kind === "drink" && line.usePackageItemId) {
              set((s) => ({
                packageItems: s.packageItems.map((i) =>
                  i.id === line.usePackageItemId ? { ...i, remainingServings: i.remainingServings - line.quantity } : i,
                ),
              }));
            }
            if (line.kind === "product" && line.productId) {
              const productId = line.productId;
              const adjId = get().nextId("productStockAdjustments");
              set((s) => ({
                products: s.products.map((p) =>
                  p.id === productId ? { ...p, currentStock: p.currentStock - line.quantity } : p,
                ),
                productStockAdjustments: [
                  {
                    id: adjId,
                    locationId: locId,
                    productId,
                    adjustmentType: "remove" as const,
                    quantity: line.quantity,
                    reason: `Bán hàng cho ${customer.code}`,
                    createdBy: user.id,
                    createdAt: stamp(),
                  },
                  ...s.productStockAdjustments,
                ],
              }));
            }
            const txId = get().nextId("transactions");
            created.push(txId);
            const tx: Transaction = {
              id: txId,
              locationId: locId,
              customerId,
              drinkId: line.drinkId ?? null,
              productId: line.productId ?? null,
              packageItemId: line.usePackageItemId ?? null,
              kind: line.kind,
              servings: line.kind === "drink" ? line.quantity : 0,
              quantity: line.quantity,
              amount,
              notes: notes?.trim() || "",
              sessionCheckin: false,
              createdBy: user.id,
              createdAt: stamp(),
            };
            set((s) => ({ transactions: [tx, ...s.transactions] }));
          }
          get().audit("SALE", "transaction", created[0] ?? null, `Thanh toán ${created.length} món cho ${customer.fullName}`);
          return { ok: true, message: `Đã thanh toán ${created.length} món.`, id: created[0] };
        },

        upsertDrink: (input) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          if (!hasRole(user.role, "OWNER")) return { ok: false, message: "Không đủ quyền sửa đồ uống." };
          if (!input.name.trim()) return { ok: false, message: "Vui lòng nhập tên đồ uống." };
          if (input.pricePerServing < 0) return { ok: false, message: "Giá không hợp lệ." };
          if (input.id) {
            set((s) => ({
              drinks: s.drinks.map((d) =>
                d.id === input.id
                  ? { ...d, name: input.name.trim(), pricePerServing: input.pricePerServing, description: input.description.trim() }
                  : d,
              ),
              drinkRecipes: [
                ...s.drinkRecipes.filter((r) => r.drinkId !== input.id),
                ...input.recipe
                  .filter((r) => r.quantityPerServing > 0)
                  .map((r) => ({
                    id: s.counters.drinkRecipes++,
                    drinkId: input.id!,
                    ingredientId: r.ingredientId,
                    quantityPerServing: r.quantityPerServing,
                  })),
              ],
            }));
            get().audit("UPDATE", "drink", input.id, `Cập nhật đồ uống ${input.name}`);
            return { ok: true, message: "Đã cập nhật đồ uống.", id: input.id };
          }
          const id = get().nextId("drinks");
          const drink: Drink = {
            id,
            locationId: locId,
            name: input.name.trim(),
            pricePerServing: input.pricePerServing,
            description: input.description.trim(),
            isActive: true,
            createdBy: user.id,
            createdAt: stamp(),
          };
          const recipes = input.recipe
            .filter((r) => r.quantityPerServing > 0)
            .map((r) => ({
              id: get().nextId("drinkRecipes"),
              drinkId: id,
              ingredientId: r.ingredientId,
              quantityPerServing: r.quantityPerServing,
            }));
          set((s) => ({ drinks: [drink, ...s.drinks], drinkRecipes: [...recipes, ...s.drinkRecipes] }));
          get().audit("CREATE", "drink", id, `Thêm đồ uống ${drink.name}`);
          return { ok: true, message: "Đã thêm đồ uống.", id };
        },

        deactivateDrink: (id) => {
          const user = get().currentUser();
          if (!hasRole(user?.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được vô hiệu hóa đồ uống." };
          const drink = get().drinks.find((d) => d.id === id);
          if (!drink) return { ok: false, message: "Không tìm thấy đồ uống." };
          set((s) => ({ drinks: s.drinks.map((d) => (d.id === id ? { ...d, isActive: false } : d)) }));
          get().audit("DEACTIVATE", "drink", id, `Vô hiệu hóa ${drink.name}`);
          return { ok: true, message: "Đã vô hiệu hóa đồ uống." };
        },

        upsertIngredient: (input) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          if (!hasRole(user.role, "OWNER")) return { ok: false, message: "Không đủ quyền sửa nguyên liệu." };
          if (!input.name.trim()) return { ok: false, message: "Vui lòng nhập tên nguyên liệu." };
          if (input.id) {
            set((s) => ({
              ingredients: s.ingredients.map((i) =>
                i.id === input.id ? { ...i, name: input.name.trim(), unit: input.unit, minStock: input.minStock } : i,
              ),
            }));
            get().audit("UPDATE", "ingredient", input.id, `Cập nhật nguyên liệu ${input.name}`);
            return { ok: true, message: "Đã cập nhật nguyên liệu.", id: input.id };
          }
          const id = get().nextId("ingredients");
          const row: Ingredient = {
            id,
            locationId: locId,
            name: input.name.trim(),
            unit: input.unit,
            currentStock: 0,
            minStock: input.minStock,
            isActive: true,
            createdBy: user.id,
            createdAt: stamp(),
          };
          set((s) => ({ ingredients: [row, ...s.ingredients] }));
          get().audit("CREATE", "ingredient", id, `Thêm nguyên liệu ${row.name}`);
          return { ok: true, message: "Đã thêm nguyên liệu. Dùng điều chỉnh tồn để nhập kho.", id };
        },

        deactivateIngredient: (id) => {
          const user = get().currentUser();
          if (!hasRole(user?.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được vô hiệu hóa nguyên liệu." };
          const row = get().ingredients.find((i) => i.id === id);
          if (!row) return { ok: false, message: "Không tìm thấy nguyên liệu." };
          set((s) => ({ ingredients: s.ingredients.map((i) => (i.id === id ? { ...i, isActive: false } : i)) }));
          get().audit("DEACTIVATE", "ingredient", id, `Vô hiệu hóa ${row.name}`);
          return { ok: true, message: "Đã vô hiệu hóa nguyên liệu." };
        },

        adjustIngredient: ({ ingredientId, type, quantity, reason }) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          if (!hasRole(user.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được điều chỉnh tồn kho." };
          const row = get().ingredients.find((i) => i.id === ingredientId);
          if (!row) return { ok: false, message: "Không tìm thấy nguyên liệu." };
          if (quantity <= 0) return { ok: false, message: "Số lượng phải lớn hơn 0." };
          let next = row.currentStock;
          if (type === "add") next += quantity;
          else if (type === "remove") next = Math.max(0, next - quantity);
          else next = quantity;
          const id = get().nextId("inventoryAdjustments");
          set((s) => ({
            ingredients: s.ingredients.map((i) => (i.id === ingredientId ? { ...i, currentStock: next } : i)),
            inventoryAdjustments: [
              {
                id,
                locationId: locId,
                ingredientId,
                adjustmentType: type,
                quantity,
                reason: reason.trim(),
                createdBy: user.id,
                createdAt: stamp(),
              },
              ...s.inventoryAdjustments,
            ],
          }));
          get().audit("STOCK_ADJUST", "ingredient", ingredientId, `${type} ${quantity} ${row.unit} — ${row.name}`);
          return { ok: true, message: `Tồn ${row.name} còn ${next} ${row.unit}.` };
        },

        upsertProduct: (input) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          if (!hasRole(user.role, "OWNER")) return { ok: false, message: "Không đủ quyền sửa sản phẩm." };
          if (!input.name.trim()) return { ok: false, message: "Vui lòng nhập tên sản phẩm." };
          if (input.id) {
            set((s) => ({
              products: s.products.map((p) =>
                p.id === input.id
                  ? {
                      ...p,
                      name: input.name.trim(),
                      productType: input.productType,
                      price: input.price,
                      salePercent: input.salePercent,
                      minStock: input.minStock,
                    }
                  : p,
              ),
            }));
            get().audit("UPDATE", "product", input.id, `Cập nhật sản phẩm ${input.name}`);
            return { ok: true, message: "Đã cập nhật sản phẩm.", id: input.id };
          }
          const id = get().nextId("products");
          const row: Product = {
            id,
            locationId: locId,
            name: input.name.trim(),
            productType: input.productType,
            price: input.price,
            salePercent: input.salePercent,
            currentStock: 0,
            minStock: input.minStock,
            isActive: true,
            createdBy: user.id,
            createdAt: stamp(),
          };
          set((s) => ({ products: [row, ...s.products] }));
          get().audit("CREATE", "product", id, `Thêm sản phẩm ${row.name}`);
          return { ok: true, message: "Đã thêm sản phẩm. Dùng điều chỉnh tồn để nhập kho.", id };
        },

        deactivateProduct: (id) => {
          const user = get().currentUser();
          if (!hasRole(user?.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được vô hiệu hóa sản phẩm." };
          const row = get().products.find((p) => p.id === id);
          if (!row) return { ok: false, message: "Không tìm thấy sản phẩm." };
          set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, isActive: false } : p)) }));
          get().audit("DEACTIVATE", "product", id, `Vô hiệu hóa ${row.name}`);
          return { ok: true, message: "Đã vô hiệu hóa sản phẩm." };
        },

        adjustProduct: ({ productId, type, quantity, reason }) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          if (!hasRole(user.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được điều chỉnh tồn kho." };
          const row = get().products.find((p) => p.id === productId);
          if (!row) return { ok: false, message: "Không tìm thấy sản phẩm." };
          if (quantity <= 0) return { ok: false, message: "Số lượng phải lớn hơn 0." };
          let next = row.currentStock;
          if (type === "add") next += quantity;
          else if (type === "remove") next = Math.max(0, next - quantity);
          else next = quantity;
          const id = get().nextId("productStockAdjustments");
          set((s) => ({
            products: s.products.map((p) => (p.id === productId ? { ...p, currentStock: next } : p)),
            productStockAdjustments: [
              {
                id,
                locationId: locId,
                productId,
                adjustmentType: type,
                quantity,
                reason: reason.trim(),
                createdBy: user.id,
                createdAt: stamp(),
              },
              ...s.productStockAdjustments,
            ],
          }));
          get().audit("STOCK_ADJUST", "product", productId, `${type} ${quantity} — ${row.name}`);
          return { ok: true, message: `Tồn ${row.name} còn ${next}.` };
        },

        upsertTemplate: (input) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          if (!hasRole(user.role, "OWNER")) return { ok: false, message: "Không đủ quyền quản lý mẫu gói." };
          if (!input.name.trim()) return { ok: false, message: "Vui lòng nhập tên mẫu gói." };
          if (input.id) {
            set((s) => ({
              packageTemplates: s.packageTemplates.map((t) =>
                t.id === input.id
                  ? {
                      ...t,
                      name: input.name.trim(),
                      packageType: input.packageType,
                      durationDays: input.durationDays,
                      totalSessions: input.totalSessions,
                      totalDrinks: input.totalDrinks,
                      totalAmount: input.totalAmount,
                    }
                  : t,
              ),
            }));
            get().audit("UPDATE", "package_template", input.id, `Cập nhật mẫu gói ${input.name}`);
            return { ok: true, message: "Đã cập nhật mẫu gói.", id: input.id };
          }
          const id = get().nextId("packageTemplates");
          const row: PackageTemplate = {
            id,
            locationId: locId,
            name: input.name.trim(),
            packageType: input.packageType,
            durationDays: input.durationDays,
            totalSessions: input.totalSessions,
            totalDrinks: input.totalDrinks,
            totalAmount: input.totalAmount,
            isActive: true,
            createdBy: user.id,
            createdAt: stamp(),
          };
          set((s) => ({ packageTemplates: [row, ...s.packageTemplates] }));
          get().audit("CREATE", "package_template", id, `Thêm mẫu gói ${row.name}`);
          return { ok: true, message: "Đã thêm mẫu gói.", id };
        },

        deactivateTemplate: (id) => {
          const user = get().currentUser();
          if (!hasRole(user?.role, "OWNER")) return { ok: false, message: "Không đủ quyền." };
          const row = get().packageTemplates.find((t) => t.id === id);
          if (!row) return { ok: false, message: "Không tìm thấy mẫu gói." };
          set((s) => ({ packageTemplates: s.packageTemplates.map((t) => (t.id === id ? { ...t, isActive: false } : t)) }));
          get().audit("DEACTIVATE", "package_template", id, `Vô hiệu hóa ${row.name}`);
          return { ok: true, message: "Đã vô hiệu hóa mẫu gói." };
        },

        assignPackage: ({ customerId, templateId, startDate, drinkId }) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          const customer = get().customers.find((c) => c.id === customerId && c.locationId === locId && c.isActive);
          if (!customer) return { ok: false, message: "Không tìm thấy hội viên." };
          const tpl = get().packageTemplates.find((t) => t.id === templateId && t.isActive);
          if (!tpl) return { ok: false, message: "Không tìm thấy mẫu gói." };
          const start = startDate || isoDate();
          const end = tpl.durationDays > 0 ? addDays(start, tpl.durationDays) : null;
          const drink =
            get().drinks.find((d) => d.id === drinkId && d.locationId === locId && d.isActive) ??
            get().drinks.find((d) => d.locationId === locId && d.isActive);
          const id = get().nextId("packages");
          const pkg: Membership = {
            id,
            locationId: locId,
            customerId,
            name: tpl.name,
            totalAmount: tpl.totalAmount,
            templateId: tpl.id,
            durationDays: tpl.durationDays,
            startDate: start,
            endDate: end,
            totalSessions: tpl.totalSessions,
            remainingSessions: tpl.totalSessions,
            isActive: true,
            createdBy: user.id,
            createdAt: stamp(),
          };
          const items: PackageItem[] = [];
          if (tpl.totalDrinks > 0 && drink) {
            items.push({
              id: get().nextId("packageItems"),
              packageId: id,
              drinkId: drink.id,
              productId: null,
              totalServings: tpl.totalDrinks,
              remainingServings: tpl.totalDrinks,
            });
          }
          set((s) => ({ packages: [pkg, ...s.packages], packageItems: [...items, ...s.packageItems] }));
          get().audit("CREATE", "package", id, `Gán ${tpl.name} cho ${customer.fullName}`);
          return { ok: true, message: `Đã gán ${tpl.name} cho ${customer.fullName}.`, id };
        },

        deactivatePackage: (id) => {
          const user = get().currentUser();
          if (!hasRole(user?.role, "OWNER")) return { ok: false, message: "Không đủ quyền vô hiệu hóa gói." };
          const pkg = get().packages.find((p) => p.id === id);
          if (!pkg) return { ok: false, message: "Không tìm thấy gói." };
          set((s) => ({ packages: s.packages.map((p) => (p.id === id ? { ...p, isActive: false } : p)) }));
          get().audit("DEACTIVATE", "package", id, `Vô hiệu hóa gói ${pkg.name}`);
          return { ok: true, message: "Đã vô hiệu hóa gói." };
        },

        upgradePackage: ({ packageId, templateId, drinkId }) => {
          const user = get().currentUser();
          const locId = get().sessionLocationId;
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          if (!hasRole(user.role, "OWNER")) return { ok: false, message: "Chỉ chủ phòng được nâng cấp gói." };
          const oldPkg = get().packages.find((p) => p.id === packageId && p.isActive);
          if (!oldPkg) return { ok: false, message: "Không tìm thấy gói hiện tại." };
          const tpl = get().packageTemplates.find((t) => t.id === templateId && t.isActive);
          if (!tpl) return { ok: false, message: "Không tìm thấy mẫu gói mới." };
          if (tpl.totalAmount < oldPkg.totalAmount) {
            return { ok: false, message: "Mẫu gói mới phải có giá trị cao hơn gói hiện tại." };
          }
          const oldItems = get().packageItems.filter((i) => i.packageId === oldPkg.id);
          const remainingDrinks = oldItems.reduce((sum, i) => sum + i.remainingServings, 0);
          const drink =
            get().drinks.find((d) => d.id === drinkId && d.locationId === locId) ??
            get().drinks.find((d) => d.id === oldItems[0]?.drinkId) ??
            get().drinks.find((d) => d.locationId === locId && d.isActive);
          const start = isoDate();
          const id = get().nextId("packages");
          const pkg: Membership = {
            id,
            locationId: locId,
            customerId: oldPkg.customerId,
            name: tpl.name,
            totalAmount: tpl.totalAmount,
            templateId: tpl.id,
            durationDays: tpl.durationDays,
            startDate: start,
            endDate: tpl.durationDays ? addDays(start, tpl.durationDays) : null,
            totalSessions: tpl.totalSessions,
            remainingSessions: tpl.totalSessions + oldPkg.remainingSessions,
            isActive: true,
            createdBy: user.id,
            createdAt: stamp(),
          };
          const item = drink
            ? {
                id: get().nextId("packageItems"),
                packageId: id,
                drinkId: drink.id,
                productId: null,
                totalServings: tpl.totalDrinks + remainingDrinks,
                remainingServings: tpl.totalDrinks + remainingDrinks,
              }
            : null;
          set((s) => ({
            packages: [pkg, ...s.packages.map((p) => (p.id === oldPkg.id ? { ...p, isActive: false } : p))],
            packageItems: item ? [item, ...s.packageItems] : s.packageItems,
          }));
          get().audit(
            "UPGRADE",
            "package",
            id,
            `Nâng cấp gói #${oldPkg.id} → ${tpl.name}, cộng dồn ${oldPkg.remainingSessions} buổi / ${remainingDrinks} ly`,
          );
          return { ok: true, message: `Đã nâng cấp lên ${tpl.name}.`, id };
        },

        upsertPtRate: (input) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          if (!hasRole(user.role, "OWNER")) return { ok: false, message: "Không đủ quyền sửa bảng giá PT." };
          if (!input.name.trim()) return { ok: false, message: "Vui lòng nhập tên bảng giá." };
          if (input.id) {
            set((s) => ({
              ptRates: s.ptRates.map((r) =>
                r.id === input.id
                  ? {
                      ...r,
                      name: input.name.trim(),
                      locationType: input.locationType,
                      rateType: input.rateType,
                      price: input.price,
                    }
                  : r,
              ),
            }));
            return { ok: true, message: "Đã cập nhật bảng giá PT.", id: input.id };
          }
          const id = get().nextId("ptRates");
          set((s) => ({
            ptRates: [
              {
                id,
                locationId: locId,
                name: input.name.trim(),
                locationType: input.locationType,
                rateType: input.rateType,
                price: input.price,
                isActive: true,
                createdAt: stamp(),
              },
              ...s.ptRates,
            ],
          }));
          get().audit("CREATE", "pt_rate", id, `Thêm bảng giá ${input.name}`);
          return { ok: true, message: "Đã thêm bảng giá PT.", id };
        },

        recordPtSession: (input) => {
          const locId = get().sessionLocationId;
          const user = get().currentUser();
          if (!locId || !user) return { ok: false, message: "Chưa chọn cơ sở." };
          const customer = get().customers.find((c) => c.id === input.customerId && c.isActive);
          if (!customer) return { ok: false, message: "Không tìm thấy hội viên." };
          const rate = get().ptRates.find((r) => r.id === input.ptRateId && r.isActive);
          if (!rate) return { ok: false, message: "Không tìm thấy bảng giá PT." };
          const hours = input.durationHours || 1;
          const ptAmount = rate.rateType === "PER_HOUR" ? rate.price * hours : rate.price;
          let drinkAmount = 0;
          if (input.includeNutrition && input.drinkId) {
            const drink = get().drinks.find((d) => d.id === input.drinkId);
            drinkAmount = drink?.pricePerServing ?? 0;
            if (drink) {
              const deduct = deductIngredients(get, set, locId, drink.id, 1);
              if (!deduct.ok) return deduct;
            }
          }
          const id = get().nextId("ptSessions");
          const txId = get().nextId("transactions");
          const createdAt = stamp();
          set((s) => ({
            ptSessions: [
              {
                id,
                locationId: locId,
                customerId: input.customerId,
                trainerId: input.trainerId,
                ptRateId: input.ptRateId,
                sessionDate: input.sessionDate,
                durationHours: hours,
                includeNutrition: input.includeNutrition,
                drinkId: input.drinkId ?? null,
                ptAmount,
                drinkAmount,
                totalAmount: ptAmount + drinkAmount,
                notes: input.notes?.trim() || "",
                createdBy: user.id,
                createdAt,
              },
              ...s.ptSessions,
            ],
            transactions: [
              {
                id: txId,
                locationId: locId,
                customerId: input.customerId,
                drinkId: input.drinkId ?? null,
                productId: null,
                packageItemId: null,
                kind: "pt" as const,
                servings: 0,
                quantity: 1,
                amount: ptAmount + drinkAmount,
                notes: input.notes?.trim() || `PT · ${rate.name}`,
                sessionCheckin: false,
                createdBy: user.id,
                createdAt,
              },
              ...s.transactions,
            ],
          }));
          get().audit("CREATE", "pt_session", id, `PT ${customer.fullName} · ${rate.name}`);
          return { ok: true, message: "Đã ghi nhận buổi PT.", id };
        },

        upsertUser: (input) => {
          const actor = get().currentUser();
          if (!hasRole(actor?.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được quản lý người dùng." };
          if (!input.username.trim() || !input.fullName.trim()) {
            return { ok: false, message: "Vui lòng nhập tên đăng nhập và họ tên." };
          }
          const locationIds =
            input.locationIds.length > 0
              ? input.locationIds
              : get()
                  .locations.filter((l) => l.isActive)
                  .map((l) => l.id);
          if (input.id) {
            const exists = get().users.find(
              (u) => u.username.toLowerCase() === input.username.trim().toLowerCase() && u.id !== input.id,
            );
            if (exists) return { ok: false, message: "Tên đăng nhập đã tồn tại." };
            set((s) => ({
              users: s.users.map((u) =>
                u.id === input.id
                  ? {
                      ...u,
                      username: input.username.trim(),
                      fullName: input.fullName.trim(),
                      role: input.role,
                      password: input.password?.trim() ? input.password.trim() : u.password,
                    }
                  : u,
              ),
              userLocations: [
                ...s.userLocations.filter((ul) => ul.userId !== input.id),
                ...locationIds.map((locationId) => ({ userId: input.id!, locationId })),
              ],
            }));
            get().audit("UPDATE", "user", input.id, `Cập nhật người dùng ${input.username}`);
            return { ok: true, message: "Đã cập nhật người dùng.", id: input.id };
          }
          if (!input.password?.trim()) return { ok: false, message: "Vui lòng nhập mật khẩu cho tài khoản mới." };
          if (get().users.some((u) => u.username.toLowerCase() === input.username.trim().toLowerCase())) {
            return { ok: false, message: "Tên đăng nhập đã tồn tại." };
          }
          const id = get().nextId("users");
          const row: User = {
            id,
            username: input.username.trim(),
            password: input.password.trim(),
            fullName: input.fullName.trim(),
            role: input.role,
            isActive: true,
            createdAt: stamp(),
          };
          set((s) => ({
            users: [row, ...s.users],
            userLocations: [...s.userLocations, ...locationIds.map((locationId) => ({ userId: id, locationId }))],
          }));
          get().audit("CREATE", "user", id, `Thêm người dùng ${row.username} (${row.role})`);
          return { ok: true, message: "Đã thêm người dùng.", id };
        },

        setUserActive: (id, isActive) => {
          const actor = get().currentUser();
          if (!hasRole(actor?.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được đổi trạng thái người dùng." };
          if (id === actor?.id) return { ok: false, message: "Không thể tự khóa tài khoản đang đăng nhập." };
          set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, isActive } : u)) }));
          get().audit(isActive ? "ACTIVATE" : "DEACTIVATE", "user", id, isActive ? "Mở lại tài khoản" : "Khóa tài khoản");
          return { ok: true, message: isActive ? "Đã mở lại tài khoản." : "Đã khóa tài khoản." };
        },

        upsertLocation: (input) => {
          const actor = get().currentUser();
          if (!hasRole(actor?.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được quản lý cơ sở." };
          if (!input.name.trim()) return { ok: false, message: "Vui lòng nhập tên cơ sở." };
          if (input.id) {
            set((s) => ({
              locations: s.locations.map((l) =>
                l.id === input.id ? { ...l, name: input.name.trim(), address: input.address.trim() } : l,
              ),
            }));
            get().audit("UPDATE", "location", input.id, `Cập nhật cơ sở ${input.name}`);
            return { ok: true, message: "Đã cập nhật cơ sở.", id: input.id };
          }
          const id = get().nextId("locations");
          const loc: Location = {
            id,
            name: input.name.trim(),
            address: input.address.trim(),
            isActive: true,
            createdAt: stamp(),
          };
          const adminIds = get()
            .users.filter((u) => u.role === "ADMIN")
            .map((u) => u.id);
          set((s) => ({
            locations: [...s.locations, loc],
            userLocations: [...s.userLocations, ...adminIds.map((userId) => ({ userId, locationId: id }))],
          }));
          get().audit("CREATE", "location", id, `Thêm cơ sở ${loc.name}`);
          return { ok: true, message: "Đã thêm cơ sở.", id };
        },

        setLocationActive: (id, isActive) => {
          const actor = get().currentUser();
          if (!hasRole(actor?.role, "ADMIN")) return { ok: false, message: "Chỉ Admin được đổi trạng thái cơ sở." };
          if (id === get().sessionLocationId && !isActive) {
            return { ok: false, message: "Không thể khóa cơ sở đang làm việc." };
          }
          set((s) => ({ locations: s.locations.map((l) => (l.id === id ? { ...l, isActive } : l)) }));
          get().audit(isActive ? "ACTIVATE" : "DEACTIVATE", "location", id, isActive ? "Mở lại cơ sở" : "Khóa cơ sở");
          return { ok: true, message: isActive ? "Đã mở lại cơ sở." : "Đã khóa cơ sở." };
        },
      };
      return wrapWithLoading(api, STUDIO_MUTATIONS) as StudioStore;
    },
    {
      name: "bao-ngoc-studio-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => {
        const {
          login,
          logout,
          selectLocation,
          resetDemo,
          nextId,
          currentUser,
          currentLocation,
          currentRole,
          userLocationsFor,
          audit,
          nextCustomerCode,
          upsertCustomer,
          deactivateCustomer,
          checkin,
          checkoutCart,
          upsertDrink,
          deactivateDrink,
          upsertIngredient,
          deactivateIngredient,
          adjustIngredient,
          upsertProduct,
          deactivateProduct,
          adjustProduct,
          upsertTemplate,
          deactivateTemplate,
          assignPackage,
          deactivatePackage,
          upgradePackage,
          upsertPtRate,
          recordPtSession,
          upsertUser,
          setUserActive,
          upsertLocation,
          setLocationActive,
          ...data
        } = state;
        void login;
        return data;
      },
    },
  ),
);

function deductIngredients(
  get: () => StudioStore,
  set: (fn: (s: StudioStore) => Partial<StudioStore>) => void,
  locationId: number,
  drinkId: number,
  servings: number,
): Result {
  const recipes = get().drinkRecipes.filter((r) => r.drinkId === drinkId);
  for (const rec of recipes) {
    const ing = get().ingredients.find((i) => i.id === rec.ingredientId && i.isActive);
    if (!ing) continue;
    const need = rec.quantityPerServing * servings;
    if (ing.currentStock < need) {
      return { ok: false, message: `Không đủ ${ing.name} (cần ${need} ${ing.unit}, còn ${ing.currentStock}).` };
    }
  }
  if (recipes.length === 0) return { ok: true, message: "" };
  set((s) => ({
    ingredients: s.ingredients.map((ing) => {
      const rec = recipes.find((r) => r.ingredientId === ing.id);
      if (!rec) return ing;
      return { ...ing, currentStock: Math.max(0, ing.currentStock - rec.quantityPerServing * servings) };
    }),
  }));
  void locationId;
  return { ok: true, message: "" };
}

export function useStudio<T>(selector: (state: StudioStore) => T): T {
  return useStudioStore(useShallow(selector));
}

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const persistApi = useStudioStore.persist;
    const unsub = persistApi.onFinishHydration(() => setHydrated(true));
    persistApi.rehydrate();
    if (persistApi.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);
  return hydrated;
}
