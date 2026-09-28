import { addDays, isoDate, stamp } from "./format";
import type {
  AdjustmentType,
  AuditLog,
  Customer,
  Drink,
  DrinkRecipe,
  Ingredient,
  InventoryAdjustment,
  Location,
  Membership,
  PackageItem,
  PackageSession,
  PackageTemplate,
  Product,
  ProductStockAdjustment,
  PtRate,
  PtSession,
  Role,
  Transaction,
  User,
  UserLocation,
} from "./types";

export type StudioData = {
  users: User[];
  locations: Location[];
  userLocations: UserLocation[];
  customers: Customer[];
  drinks: Drink[];
  ingredients: Ingredient[];
  drinkRecipes: DrinkRecipe[];
  products: Product[];
  packages: Membership[];
  packageItems: PackageItem[];
  packageTemplates: PackageTemplate[];
  packageSessions: PackageSession[];
  transactions: Transaction[];
  inventoryAdjustments: InventoryAdjustment[];
  productStockAdjustments: ProductStockAdjustment[];
  ptRates: PtRate[];
  ptSessions: PtSession[];
  auditLogs: AuditLog[];
  counters: Record<string, number>;
};

function atHour(daysAgo: number, hour: number, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return stamp(d);
}

export function createSeed(): StudioData {
  const today = isoDate();
  const now = stamp();

  const locations: Location[] = [
    {
      id: 1,
      name: "Bảo Ngọc Nguyễn Trãi",
      address: "42 Nguyễn Trãi, Quận 1, TP.HCM",
      isActive: true,
      createdAt: atHour(120, 8),
    },
    {
      id: 2,
      name: "Bảo Ngọc Thảo Điền",
      address: "18 Quốc Hương, Thảo Điền, TP.HCM",
      isActive: true,
      createdAt: atHour(90, 8),
    },
  ];

  const users: User[] = [
    { id: 1, username: "admin", password: "admin123", fullName: "Nguyễn Bảo Ngọc", role: "ADMIN", isActive: true, createdAt: atHour(120, 8) },
    { id: 2, username: "owner", password: "owner123", fullName: "Trần Minh Châu", role: "OWNER", isActive: true, createdAt: atHour(100, 9) },
    { id: 3, username: "giangvien1", password: "123456", fullName: "Lê Thị Hương", role: "TEACHER", isActive: true, createdAt: atHour(80, 9) },
    { id: 4, username: "giangvien2", password: "123456", fullName: "Phạm Quốc Anh", role: "TEACHER", isActive: true, createdAt: atHour(70, 9) },
  ];

  const userLocations: UserLocation[] = [
    { userId: 1, locationId: 1 },
    { userId: 1, locationId: 2 },
    { userId: 2, locationId: 1 },
    { userId: 2, locationId: 2 },
    { userId: 3, locationId: 1 },
    { userId: 4, locationId: 2 },
  ];

  const loc1Customers: Array<[string, string, string, string, string]> = [
    ["HV000001", "Nguyễn Thị Lan", "0903123456", `${new Date().getFullYear() - 32}-${today.slice(5)}`, "Hội viên lâu năm, thích buổi sáng"],
    ["HV000002", "Trần Văn Minh", "0912345678", "1990-03-18", "Tập giảm mỡ, uống protein sau buổi"],
    ["HV000003", "Phạm Thị Hồng", "0987654321", "1988-11-02", "Yoga flow + pilates"],
    ["HV000004", "Lê Hoàng Nam", "0934567890", "1995-07-21", "PT 3 buổi/tuần"],
    ["HV000005", "Võ Thị Mai", "0978123456", "1992-01-09", "Gói combo, hay mang bạn"],
    ["HV000006", "Đặng Quốc Bảo", "0909090909", "1985-12-30", "Tập tối, chú ý đầu gối"],
    ["HV000007", "Hoàng Thị Yến", "0888123456", "1998-06-14", "Mới đăng ký tháng này"],
    ["HV000008", "Khách vãng lai", "", "", "Bán lẻ không gói"],
    ["HV000009", "Ngô Thanh Hà", "0945123789", "1993-09-22", "Sinh nhật hôm nay"],
    ["HV000010", "Lý Đức Thành", "0966789012", "1987-04-05", "Gói sắp hết buổi"],
  ];

  const loc2Customers: Array<[string, string, string, string, string]> = [
    ["HV000001", "Bùi Minh Tuấn", "0901112233", "1991-02-11", "Tập buổi trưa"],
    ["HV000002", "Đỗ Thị Ngọc", "0911223344", "1994-08-19", "Yêu cầu lớp nhỏ"],
    ["HV000003", "Mai Anh Thư", "0922334455", `${new Date().getFullYear() - 28}-${today.slice(5)}`, "Sinh nhật hôm nay"],
    ["HV000004", "Phan Văn Khoa", "0933445566", "1989-10-07", "PT tại nhà 1 buổi/tuần"],
    ["HV000005", "Khách vãng lai", "", "", "Bán lẻ không gói"],
    ["HV000006", "Trịnh Bảo Vy", "0955667788", "1996-05-25", "Combo giảm mỡ"],
  ];

  const customers: Customer[] = [];
  loc1Customers.forEach(([code, fullName, phone, birthDate, notes], i) => {
    customers.push({
      id: i + 1,
      locationId: 1,
      code,
      fullName,
      phone,
      birthDate,
      notes,
      isActive: true,
      createdBy: 1,
      createdAt: atHour(60 - i, 10),
    });
  });
  loc2Customers.forEach(([code, fullName, phone, birthDate, notes], i) => {
    customers.push({
      id: loc1Customers.length + i + 1,
      locationId: 2,
      code,
      fullName,
      phone,
      birthDate,
      notes,
      isActive: true,
      createdBy: 2,
      createdAt: atHour(40 - i, 10),
    });
  });

  const ingredientNames: Array<[string, Ingredient["unit"], number, number]> = [
    ["Bột Protein", "muỗng", 280, 50],
    ["Bột Matcha", "muỗng", 18, 30],
    ["Whey Cacao", "muỗng", 160, 40],
    ["Collagen", "nắp", 90, 20],
    ["Sữa hạnh nhân", "nắp", 140, 25],
    ["Mật ong", "nắp", 70, 15],
    ["Bột xanh detox", "gói", 8, 10],
  ];

  const ingredients: Ingredient[] = [];
  let iid = 1;
  for (const loc of [1, 2]) {
    for (const [name, unit, stock, min] of ingredientNames) {
      ingredients.push({
        id: iid++,
        locationId: loc,
        name,
        unit,
        currentStock: loc === 2 ? Math.round(stock * 0.8) : stock,
        minStock: min,
        isActive: true,
        createdBy: 1,
        createdAt: atHour(50, 9),
      });
    }
  }

  const drinkDefs: Array<[string, number, string]> = [
    ["Protein Shake", 35000, "Whey + sữa hạnh nhân"],
    ["Matcha Latte", 28000, "Matcha + sữa hạnh nhân"],
    ["Whey Cacao", 32000, "Cacao whey sau buổi tập"],
    ["Collagen Detox", 40000, "Collagen + mật ong"],
    ["Green Smoothie", 30000, "Bột xanh detox"],
  ];

  const drinks: Drink[] = [];
  let did = 1;
  for (const loc of [1, 2]) {
    for (const [name, price, description] of drinkDefs) {
      drinks.push({
        id: did++,
        locationId: loc,
        name,
        pricePerServing: price,
        description,
        isActive: true,
        createdBy: 1,
        createdAt: atHour(50, 9),
      });
    }
  }

  const drinkRecipes: DrinkRecipe[] = [];
  let rid = 1;
  const recipeMap: Array<[string, Array<[string, number]>]> = [
    ["Protein Shake", [["Bột Protein", 2], ["Sữa hạnh nhân", 2]]],
    ["Matcha Latte", [["Bột Matcha", 1], ["Sữa hạnh nhân", 2]]],
    ["Whey Cacao", [["Whey Cacao", 2], ["Sữa hạnh nhân", 2]]],
    ["Collagen Detox", [["Collagen", 1], ["Mật ong", 1]]],
    ["Green Smoothie", [["Bột xanh detox", 1], ["Mật ong", 1]]],
  ];
  for (const loc of [1, 2]) {
    for (const [drinkName, parts] of recipeMap) {
      const drink = drinks.find((d) => d.locationId === loc && d.name === drinkName)!;
      for (const [ingName, qty] of parts) {
        const ing = ingredients.find((i) => i.locationId === loc && i.name === ingName)!;
        drinkRecipes.push({ id: rid++, drinkId: drink.id, ingredientId: ing.id, quantityPerServing: qty });
      }
    }
  }

  const productDefs: Array<[string, Product["productType"], number, number, number, number]> = [
    ["Thảm tập yoga", "mat", 250000, 0, 42, 8],
    ["Áo tanktop nam", "clothing", 180000, 10, 24, 5],
    ["Áo tanktop nữ", "clothing", 175000, 10, 18, 5],
    ["Bình nước gym", "accessory", 120000, 0, 36, 6],
    ["Dây kháng lực", "other", 89000, 15, 4, 6],
    ["Khăn tập cotton", "accessory", 65000, 0, 40, 8],
  ];
  const products: Product[] = [];
  let pid = 1;
  for (const loc of [1, 2]) {
    for (const [name, type, price, sale, stock, min] of productDefs) {
      products.push({
        id: pid++,
        locationId: loc,
        name,
        productType: type,
        price,
        salePercent: sale,
        currentStock: loc === 2 ? stock - 4 : stock,
        minStock: min,
        isActive: true,
        createdBy: 1,
        createdAt: atHour(45, 11),
      });
    }
  }

  const templateDefs: Array<[string, PackageTemplate["packageType"], number, number, number, number]> = [
    ["Gói cơ bản 3 tháng", "BASIC", 90, 36, 36, 3200000],
    ["Gói cơ bản 6 tháng", "BASIC", 180, 72, 72, 5800000],
    ["Gói giảm mỡ 3 tháng", "FAT_LOSS", 90, 0, 90, 4200000],
    ["Gói combo giảm mỡ 6 tháng", "COMBO", 180, 72, 180, 8600000],
  ];
  const packageTemplates: PackageTemplate[] = [];
  let tid = 1;
  for (const loc of [1, 2]) {
    for (const [name, type, days, sess, drinksCount, amount] of templateDefs) {
      packageTemplates.push({
        id: tid++,
        locationId: loc,
        name,
        packageType: type,
        durationDays: days,
        totalSessions: sess,
        totalDrinks: drinksCount,
        totalAmount: amount,
        isActive: true,
        createdBy: 1,
        createdAt: atHour(40, 10),
      });
    }
  }

  const packages: Membership[] = [];
  const packageItems: PackageItem[] = [];
  let pkgId = 1;
  let itemId = 1;

  function addPackage(opts: {
    locationId: number;
    customerId: number;
    templateName: string;
    startOffsetDays: number;
    remainingSessions?: number;
    remainingDrinks?: number;
    createdBy?: number;
  }) {
    const tpl = packageTemplates.find((t) => t.locationId === opts.locationId && t.name === opts.templateName)!;
    const start = addDays(today, -opts.startOffsetDays);
    const end = addDays(start, tpl.durationDays);
    const remainingSessions =
      opts.remainingSessions ?? Math.max(0, tpl.totalSessions - Math.min(tpl.totalSessions, Math.floor(opts.startOffsetDays / 3)));
    const remainingDrinks =
      opts.remainingDrinks ?? Math.max(0, tpl.totalDrinks - Math.min(tpl.totalDrinks, Math.floor(opts.startOffsetDays / 2)));
    const drink = drinks.find((d) => d.locationId === opts.locationId && d.name === "Protein Shake")!;
    packages.push({
      id: pkgId,
      locationId: opts.locationId,
      customerId: opts.customerId,
      name: tpl.name,
      totalAmount: tpl.totalAmount,
      templateId: tpl.id,
      durationDays: tpl.durationDays,
      startDate: start,
      endDate: end,
      totalSessions: tpl.totalSessions,
      remainingSessions,
      isActive: true,
      createdBy: opts.createdBy ?? 1,
      createdAt: atHour(opts.startOffsetDays, 11),
    });
    if (tpl.totalDrinks > 0) {
      packageItems.push({
        id: itemId++,
        packageId: pkgId,
        drinkId: drink.id,
        productId: null,
        totalServings: tpl.totalDrinks,
        remainingServings: remainingDrinks,
      });
    }
    pkgId += 1;
  }

  addPackage({ locationId: 1, customerId: 1, templateName: "Gói combo giảm mỡ 6 tháng", startOffsetDays: 40 });
  addPackage({ locationId: 1, customerId: 2, templateName: "Gói giảm mỡ 3 tháng", startOffsetDays: 20 });
  addPackage({ locationId: 1, customerId: 3, templateName: "Gói cơ bản 3 tháng", startOffsetDays: 55 });
  addPackage({ locationId: 1, customerId: 4, templateName: "Gói cơ bản 6 tháng", startOffsetDays: 12 });
  addPackage({ locationId: 1, customerId: 5, templateName: "Gói combo giảm mỡ 6 tháng", startOffsetDays: 70 });
  addPackage({
    locationId: 1,
    customerId: 10,
    templateName: "Gói cơ bản 3 tháng",
    startOffsetDays: 85,
    remainingSessions: 2,
    remainingDrinks: 3,
  });
  addPackage({ locationId: 2, customerId: 11, templateName: "Gói cơ bản 3 tháng", startOffsetDays: 15 });
  addPackage({ locationId: 2, customerId: 12, templateName: "Gói giảm mỡ 3 tháng", startOffsetDays: 8 });
  addPackage({ locationId: 2, customerId: 16, templateName: "Gói combo giảm mỡ 6 tháng", startOffsetDays: 30 });

  // Force an expiring package (Lan's combo already ~50 days left; make Yến's new short leftover)
  const yen = customers.find((c) => c.fullName === "Hoàng Thị Yến")!;
  const tplBasic = packageTemplates.find((t) => t.locationId === 1 && t.name === "Gói cơ bản 3 tháng")!;
  packages.push({
    id: pkgId,
    locationId: 1,
    customerId: yen.id,
    name: tplBasic.name,
    totalAmount: tplBasic.totalAmount,
    templateId: tplBasic.id,
    durationDays: 90,
    startDate: addDays(today, -84),
    endDate: addDays(today, 6),
    totalSessions: 36,
    remainingSessions: 4,
    isActive: true,
    createdBy: 3,
    createdAt: atHour(84, 11),
  });
  packageItems.push({
    id: itemId++,
    packageId: pkgId,
    drinkId: drinks.find((d) => d.locationId === 1 && d.name === "Matcha Latte")!.id,
    productId: null,
    totalServings: 36,
    remainingServings: 5,
  });
  pkgId += 1;

  const ptRates: PtRate[] = [];
  let prid = 1;
  const rateDefs: Array<[string, PtRate["locationType"], PtRate["rateType"], number]> = [
    ["PT tại phòng · Theo buổi", "AT_GYM", "PER_SESSION", 220000],
    ["PT tại phòng · Theo giờ", "AT_GYM", "PER_HOUR", 260000],
    ["PT tại nhà · Theo giờ", "OUTSIDE", "PER_HOUR", 380000],
    ["PT nhóm 3 người · Theo buổi", "AT_GYM", "PER_SESSION", 360000],
  ];
  for (const loc of [1, 2]) {
    for (const [name, locType, rateType, price] of rateDefs) {
      ptRates.push({ id: prid++, locationId: loc, name, locationType: locType, rateType, price, isActive: true, createdAt: atHour(40, 12) });
    }
  }

  const transactions: Transaction[] = [];
  const packageSessions: PackageSession[] = [];
  const ptSessions: PtSession[] = [];
  let txId = 1;
  let sessId = 1;
  let ptsId = 1;

  function addSale(opts: {
    daysAgo: number;
    hour: number;
    locationId: number;
    customerId: number;
    drinkName?: string;
    productName?: string;
    amount: number;
    kind: Transaction["kind"];
    createdBy: number;
    notes?: string;
    packageItemId?: number;
    sessionCheckin?: boolean;
    quantity?: number;
  }) {
    const drink = opts.drinkName ? drinks.find((d) => d.locationId === opts.locationId && d.name === opts.drinkName) : undefined;
    const product = opts.productName ? products.find((p) => p.locationId === opts.locationId && p.name === opts.productName) : undefined;
    transactions.push({
      id: txId++,
      locationId: opts.locationId,
      customerId: opts.customerId,
      drinkId: drink?.id ?? null,
      productId: product?.id ?? null,
      packageItemId: opts.packageItemId ?? null,
      kind: opts.kind,
      servings: opts.kind === "product" ? 0 : 1,
      quantity: opts.quantity ?? 1,
      amount: opts.amount,
      notes: opts.notes ?? "",
      sessionCheckin: Boolean(opts.sessionCheckin),
      createdBy: opts.createdBy,
      createdAt: atHour(opts.daysAgo, opts.hour, (txId * 7) % 50),
    });
    return transactions[transactions.length - 1];
  }

  const loc1Pkg = packages.filter((p) => p.locationId === 1);
  for (let day = 13; day >= 0; day--) {
    const hour = day === 0 ? 7 : 8;
    const cust = loc1Pkg[day % loc1Pkg.length];
    if (!cust) continue;
    const item = packageItems.find((i) => i.packageId === cust.id);
    const tx = addSale({
      daysAgo: day,
      hour,
      locationId: 1,
      customerId: cust.customerId,
      drinkName: "Protein Shake",
      amount: 0,
      kind: "checkin",
      createdBy: day % 2 === 0 ? 3 : 1,
      notes: `Check-in buổi tập gói #${cust.id}`,
      packageItemId: item?.id,
      sessionCheckin: true,
    });
    packageSessions.push({
      id: sessId++,
      packageId: cust.id,
      checkinDate: addDays(today, -day),
      checkinTime: tx.createdAt,
      transactionId: tx.id,
      createdBy: tx.createdBy,
      createdAt: tx.createdAt,
    });
    if (day % 3 === 0) {
      addSale({
        daysAgo: day,
        hour: 11,
        locationId: 1,
        customerId: 8,
        productName: day % 6 === 0 ? "Bình nước gym" : "Khăn tập cotton",
        amount: day % 6 === 0 ? 120000 : 65000,
        kind: "product",
        createdBy: 3,
      });
    }
    if (day % 2 === 0) {
      addSale({
        daysAgo: day,
        hour: 17,
        locationId: 1,
        customerId: 2,
        drinkName: "Matcha Latte",
        amount: 28000,
        kind: "drink",
        createdBy: 3,
        notes: "Bán lẻ ngoài gói",
      });
    }
  }

  addSale({
    daysAgo: 0,
    hour: 9,
    locationId: 1,
    customerId: 4,
    drinkName: "Whey Cacao",
    amount: 0,
    kind: "drink",
    createdBy: 3,
    notes: "Trừ từ gói",
    packageItemId: packageItems.find((i) => i.packageId === packages.find((p) => p.customerId === 4)?.id)?.id,
  });
  addSale({
    daysAgo: 1,
    hour: 16,
    locationId: 1,
    customerId: 4,
    amount: 220000,
    kind: "pt",
    createdBy: 3,
    notes: "PT tại phòng",
  });

  ptSessions.push({
    id: ptsId++,
    locationId: 1,
    customerId: 4,
    trainerId: 3,
    ptRateId: ptRates.find((r) => r.locationId === 1 && r.rateType === "PER_SESSION")!.id,
    sessionDate: addDays(today, -1),
    durationHours: 1,
    includeNutrition: true,
    drinkId: drinks.find((d) => d.locationId === 1 && d.name === "Whey Cacao")!.id,
    ptAmount: 220000,
    drinkAmount: 0,
    totalAmount: 220000,
    notes: "Tập chân + protein",
    createdBy: 3,
    createdAt: atHour(1, 16),
  });

  for (let day = 6; day >= 0; day--) {
    const cust = packages.find((p) => p.locationId === 2);
    if (!cust) continue;
    const item = packageItems.find((i) => i.packageId === cust.id);
    const tx = addSale({
      daysAgo: day,
      hour: 9,
      locationId: 2,
      customerId: cust.customerId,
      drinkName: "Protein Shake",
      amount: 0,
      kind: "checkin",
      createdBy: 4,
      packageItemId: item?.id,
      sessionCheckin: true,
    });
    packageSessions.push({
      id: sessId++,
      packageId: cust.id,
      checkinDate: addDays(today, -day),
      checkinTime: tx.createdAt,
      transactionId: tx.id,
      createdBy: 4,
      createdAt: tx.createdAt,
    });
  }

  const inventoryAdjustments: InventoryAdjustment[] = [
    {
      id: 1,
      locationId: 1,
      ingredientId: ingredients.find((i) => i.locationId === 1 && i.name === "Bột Protein")!.id,
      adjustmentType: "add" as AdjustmentType,
      quantity: 80,
      reason: "Nhập hàng tuần",
      createdBy: 1,
      createdAt: atHour(4, 8),
    },
    {
      id: 2,
      locationId: 1,
      ingredientId: ingredients.find((i) => i.locationId === 1 && i.name === "Bột Matcha")!.id,
      adjustmentType: "count_correct",
      quantity: 18,
      reason: "Kiểm kê cuối tuần",
      createdBy: 1,
      createdAt: atHour(1, 18),
    },
  ];

  const productStockAdjustments: ProductStockAdjustment[] = [
    {
      id: 1,
      locationId: 1,
      productId: products.find((p) => p.locationId === 1 && p.name === "Thảm tập yoga")!.id,
      adjustmentType: "add",
      quantity: 20,
      reason: "Nhập lô mới",
      createdBy: 1,
      createdAt: atHour(10, 9),
    },
  ];

  const auditLogs: AuditLog[] = [
    { id: 1, locationId: 1, userId: 1, action: "LOGIN", entityType: "user", entityId: 1, details: "Đăng nhập hệ thống", createdAt: atHour(0, 6, 40) },
    { id: 2, locationId: 1, userId: 3, action: "CHECKIN", entityType: "package", entityId: packages[0]?.id ?? 1, details: "Check-in hội viên Nguyễn Thị Lan", createdAt: atHour(0, 7, 12) },
    { id: 3, locationId: 1, userId: 3, action: "SALE", entityType: "transaction", entityId: 1, details: "Bán khăn tập cho khách vãng lai", createdAt: atHour(0, 9, 5) },
    { id: 4, locationId: 1, userId: 1, action: "STOCK_ADJUST", entityType: "ingredient", entityId: 2, details: "Kiểm kê bột matcha còn 18 muỗng", createdAt: atHour(1, 18) },
    { id: 5, locationId: 1, userId: 2, action: "CREATE", entityType: "customer", entityId: 7, details: "Thêm hội viên Hoàng Thị Yến", createdAt: atHour(12, 11) },
    { id: 6, locationId: 2, userId: 4, action: "CHECKIN", entityType: "package", entityId: packages.find((p) => p.locationId === 2)?.id ?? 1, details: "Check-in cơ sở Thảo Điền", createdAt: atHour(0, 9, 20) },
    { id: 7, locationId: 1, userId: 1, action: "CREATE", entityType: "package", entityId: packages[0]?.id ?? 1, details: "Gán gói combo 6 tháng cho Nguyễn Thị Lan", createdAt: atHour(40, 11) },
  ];

  return {
    users,
    locations,
    userLocations,
    customers,
    drinks,
    ingredients,
    drinkRecipes,
    products,
    packages,
    packageItems,
    packageTemplates,
    packageSessions,
    transactions,
    inventoryAdjustments,
    productStockAdjustments,
    ptRates,
    ptSessions,
    auditLogs,
    counters: {
      users: users.length + 1,
      locations: locations.length + 1,
      customers: customers.length + 1,
      drinks: drinks.length + 1,
      ingredients: ingredients.length + 1,
      drinkRecipes: drinkRecipes.length + 1,
      products: products.length + 1,
      packages: packages.length + 1,
      packageItems: packageItems.length + 1,
      packageTemplates: packageTemplates.length + 1,
      packageSessions: packageSessions.length + 1,
      transactions: transactions.length + 1,
      inventoryAdjustments: inventoryAdjustments.length + 1,
      productStockAdjustments: productStockAdjustments.length + 1,
      ptRates: ptRates.length + 1,
      ptSessions: ptSessions.length + 1,
      auditLogs: auditLogs.length + 1,
    },
  };
}

export const DEMO_ACCOUNTS: Array<{ username: string; password: string; role: Role; name: string }> = [
  { username: "admin", password: "admin123", role: "ADMIN", name: "Nguyễn Bảo Ngọc" },
  { username: "owner", password: "owner123", role: "OWNER", name: "Trần Minh Châu" },
  { username: "giangvien1", password: "123456", role: "TEACHER", name: "Lê Thị Hương" },
];
