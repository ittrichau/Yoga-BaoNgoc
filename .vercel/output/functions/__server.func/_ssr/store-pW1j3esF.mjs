import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as wrapWithLoading } from "./loading-DOG8Qu5J.mjs";
import { i as create, n as createJSONStorage, r as persist, t as useShallow } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-pW1j3esF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var pad = (n) => String(n).padStart(2, "0");
function formatVnd(amount) {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
		maximumFractionDigits: 0
	}).format(amount);
}
function formatNumber(n) {
	return new Intl.NumberFormat("vi-VN").format(n);
}
function isoDate(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function stamp(d = /* @__PURE__ */ new Date()) {
	return `${isoDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function addDays(dateStr, days) {
	const d = parseDate(dateStr);
	d.setDate(d.getDate() + days);
	return isoDate(d);
}
function parseDate(dateStr) {
	const [y, m, day] = dateStr.slice(0, 10).split("-").map(Number);
	return new Date(y, (m || 1) - 1, day || 1);
}
function daysBetween(from, to) {
	const a = parseDate(from).getTime();
	const b = parseDate(to).getTime();
	return Math.round((b - a) / 864e5);
}
function formatDate(dateStr) {
	if (!dateStr) return "—";
	return parseDate(dateStr).toLocaleDateString("vi-VN");
}
function formatDateTime(dateStr) {
	if (!dateStr) return "—";
	const datePart = dateStr.slice(0, 10);
	const timePart = dateStr.slice(11, 16);
	return timePart ? `${formatDate(datePart)} ${timePart}` : formatDate(datePart);
}
var ROLE_LABELS = {
	ADMIN: "Admin",
	OWNER: "Chủ phòng",
	TEACHER: "Giáo viên"
};
var ROLE_RANK = {
	TEACHER: 1,
	OWNER: 2,
	ADMIN: 3
};
var PRODUCT_TYPE_LABELS = {
	mat: "Thảm tập",
	clothing: "Trang phục",
	accessory: "Phụ kiện",
	other: "Khác"
};
var PACKAGE_TYPE_LABELS = {
	BASIC: "Cơ bản",
	FAT_LOSS: "Giảm mỡ",
	COMBO: "Combo"
};
var UNIT_LABELS = {
	muỗng: "Muỗng",
	nắp: "Nắp",
	gói: "Gói"
};
var ADJUST_LABELS = {
	add: "Nhập thêm",
	remove: "Xuất bớt",
	count_correct: "Kiểm kê"
};
var PT_LOC_LABELS = {
	AT_GYM: "Tại phòng",
	OUTSIDE: "Bên ngoài"
};
var PT_RATE_LABELS = {
	PER_HOUR: "Theo giờ",
	PER_SESSION: "Theo buổi",
	PER_MONTH: "Theo tháng"
};
function hasRole(role, required) {
	if (!role) return false;
	return ROLE_RANK[role] >= ROLE_RANK[required];
}
function canEditCatalog(role) {
	return hasRole(role, "OWNER");
}
function canSoftDelete(role) {
	return hasRole(role, "ADMIN");
}
function canAdjustStock(role) {
	return hasRole(role, "ADMIN");
}
function canViewAudit(role) {
	return hasRole(role, "OWNER");
}
function canManageUsers(role) {
	return hasRole(role, "ADMIN");
}
function canEditCustomer(role) {
	return hasRole(role, "OWNER");
}
function canManageTemplates(role) {
	return hasRole(role, "OWNER");
}
function atHour(daysAgo, hour, minute = 0) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() - daysAgo);
	d.setHours(hour, minute, 0, 0);
	return stamp(d);
}
function createSeed() {
	const today = isoDate();
	stamp();
	const locations = [{
		id: 1,
		name: "Bảo Ngọc Nguyễn Trãi",
		address: "42 Nguyễn Trãi, Quận 1, TP.HCM",
		isActive: true,
		createdAt: atHour(120, 8)
	}, {
		id: 2,
		name: "Bảo Ngọc Thảo Điền",
		address: "18 Quốc Hương, Thảo Điền, TP.HCM",
		isActive: true,
		createdAt: atHour(90, 8)
	}];
	const users = [
		{
			id: 1,
			username: "admin",
			password: "admin123",
			fullName: "Nguyễn Bảo Ngọc",
			role: "ADMIN",
			isActive: true,
			createdAt: atHour(120, 8)
		},
		{
			id: 2,
			username: "owner",
			password: "owner123",
			fullName: "Trần Minh Châu",
			role: "OWNER",
			isActive: true,
			createdAt: atHour(100, 9)
		},
		{
			id: 3,
			username: "giangvien1",
			password: "123456",
			fullName: "Lê Thị Hương",
			role: "TEACHER",
			isActive: true,
			createdAt: atHour(80, 9)
		},
		{
			id: 4,
			username: "giangvien2",
			password: "123456",
			fullName: "Phạm Quốc Anh",
			role: "TEACHER",
			isActive: true,
			createdAt: atHour(70, 9)
		}
	];
	const userLocations = [
		{
			userId: 1,
			locationId: 1
		},
		{
			userId: 1,
			locationId: 2
		},
		{
			userId: 2,
			locationId: 1
		},
		{
			userId: 2,
			locationId: 2
		},
		{
			userId: 3,
			locationId: 1
		},
		{
			userId: 4,
			locationId: 2
		}
	];
	const loc1Customers = [
		[
			"HV000001",
			"Nguyễn Thị Lan",
			"0903123456",
			`${(/* @__PURE__ */ new Date()).getFullYear() - 32}-${today.slice(5)}`,
			"Hội viên lâu năm, thích buổi sáng"
		],
		[
			"HV000002",
			"Trần Văn Minh",
			"0912345678",
			"1990-03-18",
			"Tập giảm mỡ, uống protein sau buổi"
		],
		[
			"HV000003",
			"Phạm Thị Hồng",
			"0987654321",
			"1988-11-02",
			"Yoga flow + pilates"
		],
		[
			"HV000004",
			"Lê Hoàng Nam",
			"0934567890",
			"1995-07-21",
			"PT 3 buổi/tuần"
		],
		[
			"HV000005",
			"Võ Thị Mai",
			"0978123456",
			"1992-01-09",
			"Gói combo, hay mang bạn"
		],
		[
			"HV000006",
			"Đặng Quốc Bảo",
			"0909090909",
			"1985-12-30",
			"Tập tối, chú ý đầu gối"
		],
		[
			"HV000007",
			"Hoàng Thị Yến",
			"0888123456",
			"1998-06-14",
			"Mới đăng ký tháng này"
		],
		[
			"HV000008",
			"Khách vãng lai",
			"",
			"",
			"Bán lẻ không gói"
		],
		[
			"HV000009",
			"Ngô Thanh Hà",
			"0945123789",
			"1993-09-22",
			"Sinh nhật hôm nay"
		],
		[
			"HV000010",
			"Lý Đức Thành",
			"0966789012",
			"1987-04-05",
			"Gói sắp hết buổi"
		]
	];
	const loc2Customers = [
		[
			"HV000001",
			"Bùi Minh Tuấn",
			"0901112233",
			"1991-02-11",
			"Tập buổi trưa"
		],
		[
			"HV000002",
			"Đỗ Thị Ngọc",
			"0911223344",
			"1994-08-19",
			"Yêu cầu lớp nhỏ"
		],
		[
			"HV000003",
			"Mai Anh Thư",
			"0922334455",
			`${(/* @__PURE__ */ new Date()).getFullYear() - 28}-${today.slice(5)}`,
			"Sinh nhật hôm nay"
		],
		[
			"HV000004",
			"Phan Văn Khoa",
			"0933445566",
			"1989-10-07",
			"PT tại nhà 1 buổi/tuần"
		],
		[
			"HV000005",
			"Khách vãng lai",
			"",
			"",
			"Bán lẻ không gói"
		],
		[
			"HV000006",
			"Trịnh Bảo Vy",
			"0955667788",
			"1996-05-25",
			"Combo giảm mỡ"
		]
	];
	const customers = [];
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
			createdAt: atHour(60 - i, 10)
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
			createdAt: atHour(40 - i, 10)
		});
	});
	const ingredientNames = [
		[
			"Bột Protein",
			"muỗng",
			280,
			50
		],
		[
			"Bột Matcha",
			"muỗng",
			18,
			30
		],
		[
			"Whey Cacao",
			"muỗng",
			160,
			40
		],
		[
			"Collagen",
			"nắp",
			90,
			20
		],
		[
			"Sữa hạnh nhân",
			"nắp",
			140,
			25
		],
		[
			"Mật ong",
			"nắp",
			70,
			15
		],
		[
			"Bột xanh detox",
			"gói",
			8,
			10
		]
	];
	const ingredients = [];
	let iid = 1;
	for (const loc of [1, 2]) for (const [name, unit, stock, min] of ingredientNames) ingredients.push({
		id: iid++,
		locationId: loc,
		name,
		unit,
		currentStock: loc === 2 ? Math.round(stock * .8) : stock,
		minStock: min,
		isActive: true,
		createdBy: 1,
		createdAt: atHour(50, 9)
	});
	const drinkDefs = [
		[
			"Protein Shake",
			35e3,
			"Whey + sữa hạnh nhân"
		],
		[
			"Matcha Latte",
			28e3,
			"Matcha + sữa hạnh nhân"
		],
		[
			"Whey Cacao",
			32e3,
			"Cacao whey sau buổi tập"
		],
		[
			"Collagen Detox",
			4e4,
			"Collagen + mật ong"
		],
		[
			"Green Smoothie",
			3e4,
			"Bột xanh detox"
		]
	];
	const drinks = [];
	let did = 1;
	for (const loc of [1, 2]) for (const [name, price, description] of drinkDefs) drinks.push({
		id: did++,
		locationId: loc,
		name,
		pricePerServing: price,
		description,
		isActive: true,
		createdBy: 1,
		createdAt: atHour(50, 9)
	});
	const drinkRecipes = [];
	let rid = 1;
	const recipeMap = [
		["Protein Shake", [["Bột Protein", 2], ["Sữa hạnh nhân", 2]]],
		["Matcha Latte", [["Bột Matcha", 1], ["Sữa hạnh nhân", 2]]],
		["Whey Cacao", [["Whey Cacao", 2], ["Sữa hạnh nhân", 2]]],
		["Collagen Detox", [["Collagen", 1], ["Mật ong", 1]]],
		["Green Smoothie", [["Bột xanh detox", 1], ["Mật ong", 1]]]
	];
	for (const loc of [1, 2]) for (const [drinkName, parts] of recipeMap) {
		const drink = drinks.find((d) => d.locationId === loc && d.name === drinkName);
		for (const [ingName, qty] of parts) {
			const ing = ingredients.find((i) => i.locationId === loc && i.name === ingName);
			drinkRecipes.push({
				id: rid++,
				drinkId: drink.id,
				ingredientId: ing.id,
				quantityPerServing: qty
			});
		}
	}
	const productDefs = [
		[
			"Thảm tập yoga",
			"mat",
			25e4,
			0,
			42,
			8
		],
		[
			"Áo tanktop nam",
			"clothing",
			18e4,
			10,
			24,
			5
		],
		[
			"Áo tanktop nữ",
			"clothing",
			175e3,
			10,
			18,
			5
		],
		[
			"Bình nước gym",
			"accessory",
			12e4,
			0,
			36,
			6
		],
		[
			"Dây kháng lực",
			"other",
			89e3,
			15,
			4,
			6
		],
		[
			"Khăn tập cotton",
			"accessory",
			65e3,
			0,
			40,
			8
		]
	];
	const products = [];
	let pid = 1;
	for (const loc of [1, 2]) for (const [name, type, price, sale, stock, min] of productDefs) products.push({
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
		createdAt: atHour(45, 11)
	});
	const templateDefs = [
		[
			"Gói cơ bản 3 tháng",
			"BASIC",
			90,
			36,
			36,
			32e5
		],
		[
			"Gói cơ bản 6 tháng",
			"BASIC",
			180,
			72,
			72,
			58e5
		],
		[
			"Gói giảm mỡ 3 tháng",
			"FAT_LOSS",
			90,
			0,
			90,
			42e5
		],
		[
			"Gói combo giảm mỡ 6 tháng",
			"COMBO",
			180,
			72,
			180,
			86e5
		]
	];
	const packageTemplates = [];
	let tid = 1;
	for (const loc of [1, 2]) for (const [name, type, days, sess, drinksCount, amount] of templateDefs) packageTemplates.push({
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
		createdAt: atHour(40, 10)
	});
	const packages = [];
	const packageItems = [];
	let pkgId = 1;
	let itemId = 1;
	function addPackage(opts) {
		const tpl = packageTemplates.find((t) => t.locationId === opts.locationId && t.name === opts.templateName);
		const start = addDays(today, -opts.startOffsetDays);
		const end = addDays(start, tpl.durationDays);
		const remainingSessions = opts.remainingSessions ?? Math.max(0, tpl.totalSessions - Math.min(tpl.totalSessions, Math.floor(opts.startOffsetDays / 3)));
		const remainingDrinks = opts.remainingDrinks ?? Math.max(0, tpl.totalDrinks - Math.min(tpl.totalDrinks, Math.floor(opts.startOffsetDays / 2)));
		const drink = drinks.find((d) => d.locationId === opts.locationId && d.name === "Protein Shake");
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
			createdAt: atHour(opts.startOffsetDays, 11)
		});
		if (tpl.totalDrinks > 0) packageItems.push({
			id: itemId++,
			packageId: pkgId,
			drinkId: drink.id,
			productId: null,
			totalServings: tpl.totalDrinks,
			remainingServings: remainingDrinks
		});
		pkgId += 1;
	}
	addPackage({
		locationId: 1,
		customerId: 1,
		templateName: "Gói combo giảm mỡ 6 tháng",
		startOffsetDays: 40
	});
	addPackage({
		locationId: 1,
		customerId: 2,
		templateName: "Gói giảm mỡ 3 tháng",
		startOffsetDays: 20
	});
	addPackage({
		locationId: 1,
		customerId: 3,
		templateName: "Gói cơ bản 3 tháng",
		startOffsetDays: 55
	});
	addPackage({
		locationId: 1,
		customerId: 4,
		templateName: "Gói cơ bản 6 tháng",
		startOffsetDays: 12
	});
	addPackage({
		locationId: 1,
		customerId: 5,
		templateName: "Gói combo giảm mỡ 6 tháng",
		startOffsetDays: 70
	});
	addPackage({
		locationId: 1,
		customerId: 10,
		templateName: "Gói cơ bản 3 tháng",
		startOffsetDays: 85,
		remainingSessions: 2,
		remainingDrinks: 3
	});
	addPackage({
		locationId: 2,
		customerId: 11,
		templateName: "Gói cơ bản 3 tháng",
		startOffsetDays: 15
	});
	addPackage({
		locationId: 2,
		customerId: 12,
		templateName: "Gói giảm mỡ 3 tháng",
		startOffsetDays: 8
	});
	addPackage({
		locationId: 2,
		customerId: 16,
		templateName: "Gói combo giảm mỡ 6 tháng",
		startOffsetDays: 30
	});
	const yen = customers.find((c) => c.fullName === "Hoàng Thị Yến");
	const tplBasic = packageTemplates.find((t) => t.locationId === 1 && t.name === "Gói cơ bản 3 tháng");
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
		createdAt: atHour(84, 11)
	});
	packageItems.push({
		id: itemId++,
		packageId: pkgId,
		drinkId: drinks.find((d) => d.locationId === 1 && d.name === "Matcha Latte").id,
		productId: null,
		totalServings: 36,
		remainingServings: 5
	});
	pkgId += 1;
	const ptRates = [];
	let prid = 1;
	const rateDefs = [
		[
			"PT tại phòng · Theo buổi",
			"AT_GYM",
			"PER_SESSION",
			22e4
		],
		[
			"PT tại phòng · Theo giờ",
			"AT_GYM",
			"PER_HOUR",
			26e4
		],
		[
			"PT tại nhà · Theo giờ",
			"OUTSIDE",
			"PER_HOUR",
			38e4
		],
		[
			"PT nhóm 3 người · Theo buổi",
			"AT_GYM",
			"PER_SESSION",
			36e4
		]
	];
	for (const loc of [1, 2]) for (const [name, locType, rateType, price] of rateDefs) ptRates.push({
		id: prid++,
		locationId: loc,
		name,
		locationType: locType,
		rateType,
		price,
		isActive: true,
		createdAt: atHour(40, 12)
	});
	const transactions = [];
	const packageSessions = [];
	const ptSessions = [];
	let txId = 1;
	let sessId = 1;
	let ptsId = 1;
	function addSale(opts) {
		const drink = opts.drinkName ? drinks.find((d) => d.locationId === opts.locationId && d.name === opts.drinkName) : void 0;
		const product = opts.productName ? products.find((p) => p.locationId === opts.locationId && p.name === opts.productName) : void 0;
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
			createdAt: atHour(opts.daysAgo, opts.hour, txId * 7 % 50)
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
			sessionCheckin: true
		});
		packageSessions.push({
			id: sessId++,
			packageId: cust.id,
			checkinDate: addDays(today, -day),
			checkinTime: tx.createdAt,
			transactionId: tx.id,
			createdBy: tx.createdBy,
			createdAt: tx.createdAt
		});
		if (day % 3 === 0) addSale({
			daysAgo: day,
			hour: 11,
			locationId: 1,
			customerId: 8,
			productName: day % 6 === 0 ? "Bình nước gym" : "Khăn tập cotton",
			amount: day % 6 === 0 ? 12e4 : 65e3,
			kind: "product",
			createdBy: 3
		});
		if (day % 2 === 0) addSale({
			daysAgo: day,
			hour: 17,
			locationId: 1,
			customerId: 2,
			drinkName: "Matcha Latte",
			amount: 28e3,
			kind: "drink",
			createdBy: 3,
			notes: "Bán lẻ ngoài gói"
		});
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
		packageItemId: packageItems.find((i) => i.packageId === packages.find((p) => p.customerId === 4)?.id)?.id
	});
	addSale({
		daysAgo: 1,
		hour: 16,
		locationId: 1,
		customerId: 4,
		amount: 22e4,
		kind: "pt",
		createdBy: 3,
		notes: "PT tại phòng"
	});
	ptSessions.push({
		id: ptsId++,
		locationId: 1,
		customerId: 4,
		trainerId: 3,
		ptRateId: ptRates.find((r) => r.locationId === 1 && r.rateType === "PER_SESSION").id,
		sessionDate: addDays(today, -1),
		durationHours: 1,
		includeNutrition: true,
		drinkId: drinks.find((d) => d.locationId === 1 && d.name === "Whey Cacao").id,
		ptAmount: 22e4,
		drinkAmount: 0,
		totalAmount: 22e4,
		notes: "Tập chân + protein",
		createdBy: 3,
		createdAt: atHour(1, 16)
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
			sessionCheckin: true
		});
		packageSessions.push({
			id: sessId++,
			packageId: cust.id,
			checkinDate: addDays(today, -day),
			checkinTime: tx.createdAt,
			transactionId: tx.id,
			createdBy: 4,
			createdAt: tx.createdAt
		});
	}
	const inventoryAdjustments = [{
		id: 1,
		locationId: 1,
		ingredientId: ingredients.find((i) => i.locationId === 1 && i.name === "Bột Protein").id,
		adjustmentType: "add",
		quantity: 80,
		reason: "Nhập hàng tuần",
		createdBy: 1,
		createdAt: atHour(4, 8)
	}, {
		id: 2,
		locationId: 1,
		ingredientId: ingredients.find((i) => i.locationId === 1 && i.name === "Bột Matcha").id,
		adjustmentType: "count_correct",
		quantity: 18,
		reason: "Kiểm kê cuối tuần",
		createdBy: 1,
		createdAt: atHour(1, 18)
	}];
	const productStockAdjustments = [{
		id: 1,
		locationId: 1,
		productId: products.find((p) => p.locationId === 1 && p.name === "Thảm tập yoga").id,
		adjustmentType: "add",
		quantity: 20,
		reason: "Nhập lô mới",
		createdBy: 1,
		createdAt: atHour(10, 9)
	}];
	const auditLogs = [
		{
			id: 1,
			locationId: 1,
			userId: 1,
			action: "LOGIN",
			entityType: "user",
			entityId: 1,
			details: "Đăng nhập hệ thống",
			createdAt: atHour(0, 6, 40)
		},
		{
			id: 2,
			locationId: 1,
			userId: 3,
			action: "CHECKIN",
			entityType: "package",
			entityId: packages[0]?.id ?? 1,
			details: "Check-in hội viên Nguyễn Thị Lan",
			createdAt: atHour(0, 7, 12)
		},
		{
			id: 3,
			locationId: 1,
			userId: 3,
			action: "SALE",
			entityType: "transaction",
			entityId: 1,
			details: "Bán khăn tập cho khách vãng lai",
			createdAt: atHour(0, 9, 5)
		},
		{
			id: 4,
			locationId: 1,
			userId: 1,
			action: "STOCK_ADJUST",
			entityType: "ingredient",
			entityId: 2,
			details: "Kiểm kê bột matcha còn 18 muỗng",
			createdAt: atHour(1, 18)
		},
		{
			id: 5,
			locationId: 1,
			userId: 2,
			action: "CREATE",
			entityType: "customer",
			entityId: 7,
			details: "Thêm hội viên Hoàng Thị Yến",
			createdAt: atHour(12, 11)
		},
		{
			id: 6,
			locationId: 2,
			userId: 4,
			action: "CHECKIN",
			entityType: "package",
			entityId: packages.find((p) => p.locationId === 2)?.id ?? 1,
			details: "Check-in cơ sở Thảo Điền",
			createdAt: atHour(0, 9, 20)
		},
		{
			id: 7,
			locationId: 1,
			userId: 1,
			action: "CREATE",
			entityType: "package",
			entityId: packages[0]?.id ?? 1,
			details: "Gán gói combo 6 tháng cho Nguyễn Thị Lan",
			createdAt: atHour(40, 11)
		}
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
			auditLogs: auditLogs.length + 1
		}
	};
}
var DEMO_ACCOUNTS = [
	{
		username: "admin",
		password: "admin123",
		role: "ADMIN",
		name: "Nguyễn Bảo Ngọc"
	},
	{
		username: "owner",
		password: "owner123",
		role: "OWNER",
		name: "Trần Minh Châu"
	},
	{
		username: "giangvien1",
		password: "123456",
		role: "TEACHER",
		name: "Lê Thị Hương"
	}
];
var STUDIO_MUTATIONS = [
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
	"setLocationActive"
];
function applyData(data) {
	return structuredClone(data);
}
var useStudioStore = create()(persist((set, get) => {
	const api = {
		...createSeed(),
		sessionUserId: null,
		sessionLocationId: null,
		nextId: (key) => {
			const id = get().counters[key] ?? 1;
			set((s) => ({ counters: {
				...s.counters,
				[key]: id + 1
			} }));
			return id;
		},
		currentUser: () => get().users.find((u) => u.id === get().sessionUserId),
		currentLocation: () => get().locations.find((l) => l.id === get().sessionLocationId),
		currentRole: () => get().currentUser()?.role ?? null,
		userLocationsFor: (userId) => {
			const ids = get().userLocations.filter((ul) => ul.userId === userId).map((ul) => ul.locationId);
			return get().locations.filter((l) => l.isActive && ids.includes(l.id));
		},
		audit: (action, entityType, entityId, details) => {
			const log = {
				id: get().nextId("auditLogs"),
				locationId: get().sessionLocationId,
				userId: get().sessionUserId ?? 0,
				action,
				entityType,
				entityId,
				details,
				createdAt: stamp()
			};
			set((s) => ({ auditLogs: [log, ...s.auditLogs] }));
		},
		nextCustomerCode: (locationId) => {
			const existing = get().customers.filter((c) => c.locationId === locationId).map((c) => Number(c.code.replace(/\D/g, "")) || 0);
			const next = (existing.length ? Math.max(...existing) : 0) + 1;
			return `HV${String(next).padStart(6, "0")}`;
		},
		login: (username, password) => {
			const user = get().users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.isActive);
			if (!user || user.password !== password) return {
				ok: false,
				message: "Sai tên đăng nhập hoặc mật khẩu."
			};
			set({
				sessionUserId: user.id,
				sessionLocationId: null
			});
			get().audit("LOGIN", "user", user.id, `${user.fullName} đăng nhập`);
			return {
				ok: true,
				message: "Đăng nhập thành công."
			};
		},
		logout: () => {
			const user = get().currentUser();
			if (user) get().audit("LOGOUT", "user", user.id, `${user.fullName} đăng xuất`);
			set({
				sessionUserId: null,
				sessionLocationId: null
			});
		},
		selectLocation: (locationId) => {
			const userId = get().sessionUserId;
			if (!userId) return {
				ok: false,
				message: "Chưa đăng nhập."
			};
			const allowed = get().userLocations.some((ul) => ul.userId === userId && ul.locationId === locationId);
			const loc = get().locations.find((l) => l.id === locationId && l.isActive);
			if (!allowed || !loc) return {
				ok: false,
				message: "Bạn không được phân công cơ sở này."
			};
			set({ sessionLocationId: locationId });
			get().audit("SELECT_LOCATION", "location", locationId, `Chọn cơ sở ${loc.name}`);
			return {
				ok: true,
				message: `Đang làm việc tại ${loc.name}`
			};
		},
		resetDemo: () => {
			set({
				...applyData(createSeed()),
				sessionUserId: null,
				sessionLocationId: null
			});
		},
		upsertCustomer: (input) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			const name = input.fullName.trim();
			if (!name) return {
				ok: false,
				message: "Vui lòng nhập họ tên hội viên."
			};
			if (input.id) {
				if (!hasRole(user.role, "OWNER")) return {
					ok: false,
					message: "Giáo viên không được sửa hội viên."
				};
				set((s) => ({ customers: s.customers.map((c) => c.id === input.id ? {
					...c,
					fullName: name,
					phone: input.phone.trim(),
					birthDate: input.birthDate,
					notes: input.notes.trim()
				} : c) }));
				get().audit("UPDATE", "customer", input.id, `Cập nhật hội viên ${name}`);
				return {
					ok: true,
					message: "Đã cập nhật hội viên.",
					id: input.id
				};
			}
			const id = get().nextId("customers");
			const customer = {
				id,
				locationId: locId,
				code: get().nextCustomerCode(locId),
				fullName: name,
				phone: input.phone.trim(),
				birthDate: input.birthDate,
				notes: input.notes.trim(),
				isActive: true,
				createdBy: user.id,
				createdAt: stamp()
			};
			set((s) => ({ customers: [customer, ...s.customers] }));
			get().audit("CREATE", "customer", id, `Thêm hội viên ${customer.code} — ${name}`);
			return {
				ok: true,
				message: `Đã thêm hội viên ${customer.code}.`,
				id
			};
		},
		deactivateCustomer: (id) => {
			if (!hasRole(get().currentUser()?.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được vô hiệu hóa hội viên."
			};
			const customer = get().customers.find((c) => c.id === id);
			if (!customer) return {
				ok: false,
				message: "Không tìm thấy hội viên."
			};
			set((s) => ({ customers: s.customers.map((c) => c.id === id ? {
				...c,
				isActive: false
			} : c) }));
			get().audit("DEACTIVATE", "customer", id, `Vô hiệu hóa ${customer.code} — ${customer.fullName}`);
			return {
				ok: true,
				message: "Đã vô hiệu hóa hội viên."
			};
		},
		checkin: ({ customerId, packageId, drinkId, notes }) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			const customer = get().customers.find((c) => c.id === customerId && c.isActive);
			if (!customer) return {
				ok: false,
				message: "Không tìm thấy hội viên."
			};
			const pkg = get().packages.find((p) => p.id === packageId && p.customerId === customerId && p.isActive);
			if (!pkg) return {
				ok: false,
				message: "Gói không hợp lệ."
			};
			const today = isoDate();
			if (pkg.endDate && pkg.endDate < today) return {
				ok: false,
				message: `Gói đã hết hạn từ ${pkg.endDate}.`
			};
			if (pkg.totalSessions > 0 && pkg.remainingSessions <= 0) return {
				ok: false,
				message: "Gói đã hết buổi tập."
			};
			const item = get().packageItems.find((i) => i.packageId === pkg.id && i.remainingServings > 0 && (!drinkId || i.drinkId === drinkId)) ?? get().packageItems.find((i) => i.packageId === pkg.id && i.remainingServings > 0);
			if (!item) return {
				ok: false,
				message: "Gói đã hết suất đồ uống."
			};
			const usedDrinkId = drinkId ?? item.drinkId;
			if (!usedDrinkId) return {
				ok: false,
				message: "Gói chưa gắn đồ uống."
			};
			const deduct = deductIngredients(get, set, locId, usedDrinkId, 1);
			if (!deduct.ok) return deduct;
			set((s) => ({
				packageItems: s.packageItems.map((i) => i.id === item.id ? {
					...i,
					remainingServings: i.remainingServings - 1
				} : i),
				packages: s.packages.map((p) => p.id === pkg.id && pkg.totalSessions > 0 ? {
					...p,
					remainingSessions: p.remainingSessions - 1
				} : p)
			}));
			const txId = get().nextId("transactions");
			const sessId = get().nextId("packageSessions");
			const createdAt = stamp();
			const tx = {
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
				createdAt
			};
			set((s) => ({
				transactions: [tx, ...s.transactions],
				packageSessions: [{
					id: sessId,
					packageId: pkg.id,
					checkinDate: today,
					checkinTime: createdAt,
					transactionId: txId,
					createdBy: user.id,
					createdAt
				}, ...s.packageSessions]
			}));
			get().audit("CHECKIN", "package", pkg.id, `Check-in ${customer.code} — ${customer.fullName}`);
			return {
				ok: true,
				message: `Đã check-in ${customer.fullName}.`,
				id: txId
			};
		},
		checkoutCart: ({ customerId, lines, notes }) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			const customer = get().customers.find((c) => c.id === customerId && c.isActive && c.locationId === locId);
			if (!customer) return {
				ok: false,
				message: "Phải chọn hội viên trước khi bán. Không cho phép giao dịch ẩn danh."
			};
			if (!lines.length) return {
				ok: false,
				message: "Giỏ hàng trống."
			};
			for (const line of lines) if (line.kind === "drink") {
				const drink = get().drinks.find((d) => d.id === line.drinkId && d.isActive);
				if (!drink) return {
					ok: false,
					message: `Không tìm thấy đồ uống ${line.name}.`
				};
				if (line.usePackageItemId) {
					const item = get().packageItems.find((i) => i.id === line.usePackageItemId);
					if (!item || item.remainingServings < line.quantity) return {
						ok: false,
						message: `Gói không đủ suất cho ${line.name}.`
					};
				}
				const deduct = deductIngredients(get, set, locId, drink.id, line.quantity);
				if (!deduct.ok) return deduct;
			} else {
				const product = get().products.find((p) => p.id === line.productId && p.isActive);
				if (!product) return {
					ok: false,
					message: `Không tìm thấy sản phẩm ${line.name}.`
				};
				if (product.currentStock < line.quantity) return {
					ok: false,
					message: `${product.name} không đủ hàng (còn ${product.currentStock}).`
				};
			}
			const created = [];
			for (const line of lines) {
				const amount = line.usePackageItemId ? 0 : line.unitPrice * line.quantity;
				if (line.kind === "drink" && line.usePackageItemId) set((s) => ({ packageItems: s.packageItems.map((i) => i.id === line.usePackageItemId ? {
					...i,
					remainingServings: i.remainingServings - line.quantity
				} : i) }));
				if (line.kind === "product" && line.productId) {
					const productId = line.productId;
					const adjId = get().nextId("productStockAdjustments");
					set((s) => ({
						products: s.products.map((p) => p.id === productId ? {
							...p,
							currentStock: p.currentStock - line.quantity
						} : p),
						productStockAdjustments: [{
							id: adjId,
							locationId: locId,
							productId,
							adjustmentType: "remove",
							quantity: line.quantity,
							reason: `Bán hàng cho ${customer.code}`,
							createdBy: user.id,
							createdAt: stamp()
						}, ...s.productStockAdjustments]
					}));
				}
				const txId = get().nextId("transactions");
				created.push(txId);
				const tx = {
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
					createdAt: stamp()
				};
				set((s) => ({ transactions: [tx, ...s.transactions] }));
			}
			get().audit("SALE", "transaction", created[0] ?? null, `Thanh toán ${created.length} món cho ${customer.fullName}`);
			return {
				ok: true,
				message: `Đã thanh toán ${created.length} món.`,
				id: created[0]
			};
		},
		upsertDrink: (input) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			if (!hasRole(user.role, "OWNER")) return {
				ok: false,
				message: "Không đủ quyền sửa đồ uống."
			};
			if (!input.name.trim()) return {
				ok: false,
				message: "Vui lòng nhập tên đồ uống."
			};
			if (input.pricePerServing < 0) return {
				ok: false,
				message: "Giá không hợp lệ."
			};
			if (input.id) {
				set((s) => ({
					drinks: s.drinks.map((d) => d.id === input.id ? {
						...d,
						name: input.name.trim(),
						pricePerServing: input.pricePerServing,
						description: input.description.trim()
					} : d),
					drinkRecipes: [...s.drinkRecipes.filter((r) => r.drinkId !== input.id), ...input.recipe.filter((r) => r.quantityPerServing > 0).map((r) => ({
						id: s.counters.drinkRecipes++,
						drinkId: input.id,
						ingredientId: r.ingredientId,
						quantityPerServing: r.quantityPerServing
					}))]
				}));
				get().audit("UPDATE", "drink", input.id, `Cập nhật đồ uống ${input.name}`);
				return {
					ok: true,
					message: "Đã cập nhật đồ uống.",
					id: input.id
				};
			}
			const id = get().nextId("drinks");
			const drink = {
				id,
				locationId: locId,
				name: input.name.trim(),
				pricePerServing: input.pricePerServing,
				description: input.description.trim(),
				isActive: true,
				createdBy: user.id,
				createdAt: stamp()
			};
			const recipes = input.recipe.filter((r) => r.quantityPerServing > 0).map((r) => ({
				id: get().nextId("drinkRecipes"),
				drinkId: id,
				ingredientId: r.ingredientId,
				quantityPerServing: r.quantityPerServing
			}));
			set((s) => ({
				drinks: [drink, ...s.drinks],
				drinkRecipes: [...recipes, ...s.drinkRecipes]
			}));
			get().audit("CREATE", "drink", id, `Thêm đồ uống ${drink.name}`);
			return {
				ok: true,
				message: "Đã thêm đồ uống.",
				id
			};
		},
		deactivateDrink: (id) => {
			if (!hasRole(get().currentUser()?.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được vô hiệu hóa đồ uống."
			};
			const drink = get().drinks.find((d) => d.id === id);
			if (!drink) return {
				ok: false,
				message: "Không tìm thấy đồ uống."
			};
			set((s) => ({ drinks: s.drinks.map((d) => d.id === id ? {
				...d,
				isActive: false
			} : d) }));
			get().audit("DEACTIVATE", "drink", id, `Vô hiệu hóa ${drink.name}`);
			return {
				ok: true,
				message: "Đã vô hiệu hóa đồ uống."
			};
		},
		upsertIngredient: (input) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			if (!hasRole(user.role, "OWNER")) return {
				ok: false,
				message: "Không đủ quyền sửa nguyên liệu."
			};
			if (!input.name.trim()) return {
				ok: false,
				message: "Vui lòng nhập tên nguyên liệu."
			};
			if (input.id) {
				set((s) => ({ ingredients: s.ingredients.map((i) => i.id === input.id ? {
					...i,
					name: input.name.trim(),
					unit: input.unit,
					minStock: input.minStock
				} : i) }));
				get().audit("UPDATE", "ingredient", input.id, `Cập nhật nguyên liệu ${input.name}`);
				return {
					ok: true,
					message: "Đã cập nhật nguyên liệu.",
					id: input.id
				};
			}
			const id = get().nextId("ingredients");
			const row = {
				id,
				locationId: locId,
				name: input.name.trim(),
				unit: input.unit,
				currentStock: 0,
				minStock: input.minStock,
				isActive: true,
				createdBy: user.id,
				createdAt: stamp()
			};
			set((s) => ({ ingredients: [row, ...s.ingredients] }));
			get().audit("CREATE", "ingredient", id, `Thêm nguyên liệu ${row.name}`);
			return {
				ok: true,
				message: "Đã thêm nguyên liệu. Dùng điều chỉnh tồn để nhập kho.",
				id
			};
		},
		deactivateIngredient: (id) => {
			if (!hasRole(get().currentUser()?.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được vô hiệu hóa nguyên liệu."
			};
			const row = get().ingredients.find((i) => i.id === id);
			if (!row) return {
				ok: false,
				message: "Không tìm thấy nguyên liệu."
			};
			set((s) => ({ ingredients: s.ingredients.map((i) => i.id === id ? {
				...i,
				isActive: false
			} : i) }));
			get().audit("DEACTIVATE", "ingredient", id, `Vô hiệu hóa ${row.name}`);
			return {
				ok: true,
				message: "Đã vô hiệu hóa nguyên liệu."
			};
		},
		adjustIngredient: ({ ingredientId, type, quantity, reason }) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			if (!hasRole(user.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được điều chỉnh tồn kho."
			};
			const row = get().ingredients.find((i) => i.id === ingredientId);
			if (!row) return {
				ok: false,
				message: "Không tìm thấy nguyên liệu."
			};
			if (quantity <= 0) return {
				ok: false,
				message: "Số lượng phải lớn hơn 0."
			};
			let next = row.currentStock;
			if (type === "add") next += quantity;
			else if (type === "remove") next = Math.max(0, next - quantity);
			else next = quantity;
			const id = get().nextId("inventoryAdjustments");
			set((s) => ({
				ingredients: s.ingredients.map((i) => i.id === ingredientId ? {
					...i,
					currentStock: next
				} : i),
				inventoryAdjustments: [{
					id,
					locationId: locId,
					ingredientId,
					adjustmentType: type,
					quantity,
					reason: reason.trim(),
					createdBy: user.id,
					createdAt: stamp()
				}, ...s.inventoryAdjustments]
			}));
			get().audit("STOCK_ADJUST", "ingredient", ingredientId, `${type} ${quantity} ${row.unit} — ${row.name}`);
			return {
				ok: true,
				message: `Tồn ${row.name} còn ${next} ${row.unit}.`
			};
		},
		upsertProduct: (input) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			if (!hasRole(user.role, "OWNER")) return {
				ok: false,
				message: "Không đủ quyền sửa sản phẩm."
			};
			if (!input.name.trim()) return {
				ok: false,
				message: "Vui lòng nhập tên sản phẩm."
			};
			if (input.id) {
				set((s) => ({ products: s.products.map((p) => p.id === input.id ? {
					...p,
					name: input.name.trim(),
					productType: input.productType,
					price: input.price,
					salePercent: input.salePercent,
					minStock: input.minStock
				} : p) }));
				get().audit("UPDATE", "product", input.id, `Cập nhật sản phẩm ${input.name}`);
				return {
					ok: true,
					message: "Đã cập nhật sản phẩm.",
					id: input.id
				};
			}
			const id = get().nextId("products");
			const row = {
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
				createdAt: stamp()
			};
			set((s) => ({ products: [row, ...s.products] }));
			get().audit("CREATE", "product", id, `Thêm sản phẩm ${row.name}`);
			return {
				ok: true,
				message: "Đã thêm sản phẩm. Dùng điều chỉnh tồn để nhập kho.",
				id
			};
		},
		deactivateProduct: (id) => {
			if (!hasRole(get().currentUser()?.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được vô hiệu hóa sản phẩm."
			};
			const row = get().products.find((p) => p.id === id);
			if (!row) return {
				ok: false,
				message: "Không tìm thấy sản phẩm."
			};
			set((s) => ({ products: s.products.map((p) => p.id === id ? {
				...p,
				isActive: false
			} : p) }));
			get().audit("DEACTIVATE", "product", id, `Vô hiệu hóa ${row.name}`);
			return {
				ok: true,
				message: "Đã vô hiệu hóa sản phẩm."
			};
		},
		adjustProduct: ({ productId, type, quantity, reason }) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			if (!hasRole(user.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được điều chỉnh tồn kho."
			};
			const row = get().products.find((p) => p.id === productId);
			if (!row) return {
				ok: false,
				message: "Không tìm thấy sản phẩm."
			};
			if (quantity <= 0) return {
				ok: false,
				message: "Số lượng phải lớn hơn 0."
			};
			let next = row.currentStock;
			if (type === "add") next += quantity;
			else if (type === "remove") next = Math.max(0, next - quantity);
			else next = quantity;
			const id = get().nextId("productStockAdjustments");
			set((s) => ({
				products: s.products.map((p) => p.id === productId ? {
					...p,
					currentStock: next
				} : p),
				productStockAdjustments: [{
					id,
					locationId: locId,
					productId,
					adjustmentType: type,
					quantity,
					reason: reason.trim(),
					createdBy: user.id,
					createdAt: stamp()
				}, ...s.productStockAdjustments]
			}));
			get().audit("STOCK_ADJUST", "product", productId, `${type} ${quantity} — ${row.name}`);
			return {
				ok: true,
				message: `Tồn ${row.name} còn ${next}.`
			};
		},
		upsertTemplate: (input) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			if (!hasRole(user.role, "OWNER")) return {
				ok: false,
				message: "Không đủ quyền quản lý mẫu gói."
			};
			if (!input.name.trim()) return {
				ok: false,
				message: "Vui lòng nhập tên mẫu gói."
			};
			if (input.id) {
				set((s) => ({ packageTemplates: s.packageTemplates.map((t) => t.id === input.id ? {
					...t,
					name: input.name.trim(),
					packageType: input.packageType,
					durationDays: input.durationDays,
					totalSessions: input.totalSessions,
					totalDrinks: input.totalDrinks,
					totalAmount: input.totalAmount
				} : t) }));
				get().audit("UPDATE", "package_template", input.id, `Cập nhật mẫu gói ${input.name}`);
				return {
					ok: true,
					message: "Đã cập nhật mẫu gói.",
					id: input.id
				};
			}
			const id = get().nextId("packageTemplates");
			const row = {
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
				createdAt: stamp()
			};
			set((s) => ({ packageTemplates: [row, ...s.packageTemplates] }));
			get().audit("CREATE", "package_template", id, `Thêm mẫu gói ${row.name}`);
			return {
				ok: true,
				message: "Đã thêm mẫu gói.",
				id
			};
		},
		deactivateTemplate: (id) => {
			if (!hasRole(get().currentUser()?.role, "OWNER")) return {
				ok: false,
				message: "Không đủ quyền."
			};
			const row = get().packageTemplates.find((t) => t.id === id);
			if (!row) return {
				ok: false,
				message: "Không tìm thấy mẫu gói."
			};
			set((s) => ({ packageTemplates: s.packageTemplates.map((t) => t.id === id ? {
				...t,
				isActive: false
			} : t) }));
			get().audit("DEACTIVATE", "package_template", id, `Vô hiệu hóa ${row.name}`);
			return {
				ok: true,
				message: "Đã vô hiệu hóa mẫu gói."
			};
		},
		assignPackage: ({ customerId, templateId, startDate, drinkId }) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			const customer = get().customers.find((c) => c.id === customerId && c.locationId === locId && c.isActive);
			if (!customer) return {
				ok: false,
				message: "Không tìm thấy hội viên."
			};
			const tpl = get().packageTemplates.find((t) => t.id === templateId && t.isActive);
			if (!tpl) return {
				ok: false,
				message: "Không tìm thấy mẫu gói."
			};
			const start = startDate || isoDate();
			const end = tpl.durationDays > 0 ? addDays(start, tpl.durationDays) : null;
			const drink = get().drinks.find((d) => d.id === drinkId && d.locationId === locId && d.isActive) ?? get().drinks.find((d) => d.locationId === locId && d.isActive);
			const id = get().nextId("packages");
			const pkg = {
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
				createdAt: stamp()
			};
			const items = [];
			if (tpl.totalDrinks > 0 && drink) items.push({
				id: get().nextId("packageItems"),
				packageId: id,
				drinkId: drink.id,
				productId: null,
				totalServings: tpl.totalDrinks,
				remainingServings: tpl.totalDrinks
			});
			set((s) => ({
				packages: [pkg, ...s.packages],
				packageItems: [...items, ...s.packageItems]
			}));
			get().audit("CREATE", "package", id, `Gán ${tpl.name} cho ${customer.fullName}`);
			return {
				ok: true,
				message: `Đã gán ${tpl.name} cho ${customer.fullName}.`,
				id
			};
		},
		deactivatePackage: (id) => {
			if (!hasRole(get().currentUser()?.role, "OWNER")) return {
				ok: false,
				message: "Không đủ quyền vô hiệu hóa gói."
			};
			const pkg = get().packages.find((p) => p.id === id);
			if (!pkg) return {
				ok: false,
				message: "Không tìm thấy gói."
			};
			set((s) => ({ packages: s.packages.map((p) => p.id === id ? {
				...p,
				isActive: false
			} : p) }));
			get().audit("DEACTIVATE", "package", id, `Vô hiệu hóa gói ${pkg.name}`);
			return {
				ok: true,
				message: "Đã vô hiệu hóa gói."
			};
		},
		upgradePackage: ({ packageId, templateId, drinkId }) => {
			const user = get().currentUser();
			const locId = get().sessionLocationId;
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			if (!hasRole(user.role, "OWNER")) return {
				ok: false,
				message: "Chỉ chủ phòng được nâng cấp gói."
			};
			const oldPkg = get().packages.find((p) => p.id === packageId && p.isActive);
			if (!oldPkg) return {
				ok: false,
				message: "Không tìm thấy gói hiện tại."
			};
			const tpl = get().packageTemplates.find((t) => t.id === templateId && t.isActive);
			if (!tpl) return {
				ok: false,
				message: "Không tìm thấy mẫu gói mới."
			};
			if (tpl.totalAmount < oldPkg.totalAmount) return {
				ok: false,
				message: "Mẫu gói mới phải có giá trị cao hơn gói hiện tại."
			};
			const oldItems = get().packageItems.filter((i) => i.packageId === oldPkg.id);
			const remainingDrinks = oldItems.reduce((sum, i) => sum + i.remainingServings, 0);
			const drink = get().drinks.find((d) => d.id === drinkId && d.locationId === locId) ?? get().drinks.find((d) => d.id === oldItems[0]?.drinkId) ?? get().drinks.find((d) => d.locationId === locId && d.isActive);
			const start = isoDate();
			const id = get().nextId("packages");
			const pkg = {
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
				createdAt: stamp()
			};
			const item = drink ? {
				id: get().nextId("packageItems"),
				packageId: id,
				drinkId: drink.id,
				productId: null,
				totalServings: tpl.totalDrinks + remainingDrinks,
				remainingServings: tpl.totalDrinks + remainingDrinks
			} : null;
			set((s) => ({
				packages: [pkg, ...s.packages.map((p) => p.id === oldPkg.id ? {
					...p,
					isActive: false
				} : p)],
				packageItems: item ? [item, ...s.packageItems] : s.packageItems
			}));
			get().audit("UPGRADE", "package", id, `Nâng cấp gói #${oldPkg.id} → ${tpl.name}, cộng dồn ${oldPkg.remainingSessions} buổi / ${remainingDrinks} ly`);
			return {
				ok: true,
				message: `Đã nâng cấp lên ${tpl.name}.`,
				id
			};
		},
		upsertPtRate: (input) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			if (!hasRole(user.role, "OWNER")) return {
				ok: false,
				message: "Không đủ quyền sửa bảng giá PT."
			};
			if (!input.name.trim()) return {
				ok: false,
				message: "Vui lòng nhập tên bảng giá."
			};
			if (input.id) {
				set((s) => ({ ptRates: s.ptRates.map((r) => r.id === input.id ? {
					...r,
					name: input.name.trim(),
					locationType: input.locationType,
					rateType: input.rateType,
					price: input.price
				} : r) }));
				return {
					ok: true,
					message: "Đã cập nhật bảng giá PT.",
					id: input.id
				};
			}
			const id = get().nextId("ptRates");
			set((s) => ({ ptRates: [{
				id,
				locationId: locId,
				name: input.name.trim(),
				locationType: input.locationType,
				rateType: input.rateType,
				price: input.price,
				isActive: true,
				createdAt: stamp()
			}, ...s.ptRates] }));
			get().audit("CREATE", "pt_rate", id, `Thêm bảng giá ${input.name}`);
			return {
				ok: true,
				message: "Đã thêm bảng giá PT.",
				id
			};
		},
		recordPtSession: (input) => {
			const locId = get().sessionLocationId;
			const user = get().currentUser();
			if (!locId || !user) return {
				ok: false,
				message: "Chưa chọn cơ sở."
			};
			const customer = get().customers.find((c) => c.id === input.customerId && c.isActive);
			if (!customer) return {
				ok: false,
				message: "Không tìm thấy hội viên."
			};
			const rate = get().ptRates.find((r) => r.id === input.ptRateId && r.isActive);
			if (!rate) return {
				ok: false,
				message: "Không tìm thấy bảng giá PT."
			};
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
				ptSessions: [{
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
					createdAt
				}, ...s.ptSessions],
				transactions: [{
					id: txId,
					locationId: locId,
					customerId: input.customerId,
					drinkId: input.drinkId ?? null,
					productId: null,
					packageItemId: null,
					kind: "pt",
					servings: 0,
					quantity: 1,
					amount: ptAmount + drinkAmount,
					notes: input.notes?.trim() || `PT · ${rate.name}`,
					sessionCheckin: false,
					createdBy: user.id,
					createdAt
				}, ...s.transactions]
			}));
			get().audit("CREATE", "pt_session", id, `PT ${customer.fullName} · ${rate.name}`);
			return {
				ok: true,
				message: "Đã ghi nhận buổi PT.",
				id
			};
		},
		upsertUser: (input) => {
			if (!hasRole(get().currentUser()?.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được quản lý người dùng."
			};
			if (!input.username.trim() || !input.fullName.trim()) return {
				ok: false,
				message: "Vui lòng nhập tên đăng nhập và họ tên."
			};
			const locationIds = input.locationIds.length > 0 ? input.locationIds : get().locations.filter((l) => l.isActive).map((l) => l.id);
			if (input.id) {
				if (get().users.find((u) => u.username.toLowerCase() === input.username.trim().toLowerCase() && u.id !== input.id)) return {
					ok: false,
					message: "Tên đăng nhập đã tồn tại."
				};
				set((s) => ({
					users: s.users.map((u) => u.id === input.id ? {
						...u,
						username: input.username.trim(),
						fullName: input.fullName.trim(),
						role: input.role,
						password: input.password?.trim() ? input.password.trim() : u.password
					} : u),
					userLocations: [...s.userLocations.filter((ul) => ul.userId !== input.id), ...locationIds.map((locationId) => ({
						userId: input.id,
						locationId
					}))]
				}));
				get().audit("UPDATE", "user", input.id, `Cập nhật người dùng ${input.username}`);
				return {
					ok: true,
					message: "Đã cập nhật người dùng.",
					id: input.id
				};
			}
			if (!input.password?.trim()) return {
				ok: false,
				message: "Vui lòng nhập mật khẩu cho tài khoản mới."
			};
			if (get().users.some((u) => u.username.toLowerCase() === input.username.trim().toLowerCase())) return {
				ok: false,
				message: "Tên đăng nhập đã tồn tại."
			};
			const id = get().nextId("users");
			const row = {
				id,
				username: input.username.trim(),
				password: input.password.trim(),
				fullName: input.fullName.trim(),
				role: input.role,
				isActive: true,
				createdAt: stamp()
			};
			set((s) => ({
				users: [row, ...s.users],
				userLocations: [...s.userLocations, ...locationIds.map((locationId) => ({
					userId: id,
					locationId
				}))]
			}));
			get().audit("CREATE", "user", id, `Thêm người dùng ${row.username} (${row.role})`);
			return {
				ok: true,
				message: "Đã thêm người dùng.",
				id
			};
		},
		setUserActive: (id, isActive) => {
			const actor = get().currentUser();
			if (!hasRole(actor?.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được đổi trạng thái người dùng."
			};
			if (id === actor?.id) return {
				ok: false,
				message: "Không thể tự khóa tài khoản đang đăng nhập."
			};
			set((s) => ({ users: s.users.map((u) => u.id === id ? {
				...u,
				isActive
			} : u) }));
			get().audit(isActive ? "ACTIVATE" : "DEACTIVATE", "user", id, isActive ? "Mở lại tài khoản" : "Khóa tài khoản");
			return {
				ok: true,
				message: isActive ? "Đã mở lại tài khoản." : "Đã khóa tài khoản."
			};
		},
		upsertLocation: (input) => {
			if (!hasRole(get().currentUser()?.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được quản lý cơ sở."
			};
			if (!input.name.trim()) return {
				ok: false,
				message: "Vui lòng nhập tên cơ sở."
			};
			if (input.id) {
				set((s) => ({ locations: s.locations.map((l) => l.id === input.id ? {
					...l,
					name: input.name.trim(),
					address: input.address.trim()
				} : l) }));
				get().audit("UPDATE", "location", input.id, `Cập nhật cơ sở ${input.name}`);
				return {
					ok: true,
					message: "Đã cập nhật cơ sở.",
					id: input.id
				};
			}
			const id = get().nextId("locations");
			const loc = {
				id,
				name: input.name.trim(),
				address: input.address.trim(),
				isActive: true,
				createdAt: stamp()
			};
			const adminIds = get().users.filter((u) => u.role === "ADMIN").map((u) => u.id);
			set((s) => ({
				locations: [...s.locations, loc],
				userLocations: [...s.userLocations, ...adminIds.map((userId) => ({
					userId,
					locationId: id
				}))]
			}));
			get().audit("CREATE", "location", id, `Thêm cơ sở ${loc.name}`);
			return {
				ok: true,
				message: "Đã thêm cơ sở.",
				id
			};
		},
		setLocationActive: (id, isActive) => {
			if (!hasRole(get().currentUser()?.role, "ADMIN")) return {
				ok: false,
				message: "Chỉ Admin được đổi trạng thái cơ sở."
			};
			if (id === get().sessionLocationId && !isActive) return {
				ok: false,
				message: "Không thể khóa cơ sở đang làm việc."
			};
			set((s) => ({ locations: s.locations.map((l) => l.id === id ? {
				...l,
				isActive
			} : l) }));
			get().audit(isActive ? "ACTIVATE" : "DEACTIVATE", "location", id, isActive ? "Mở lại cơ sở" : "Khóa cơ sở");
			return {
				ok: true,
				message: isActive ? "Đã mở lại cơ sở." : "Đã khóa cơ sở."
			};
		}
	};
	return wrapWithLoading(api, STUDIO_MUTATIONS);
}, {
	name: "bao-ngoc-studio-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => {
		const { login, logout, selectLocation, resetDemo, nextId, currentUser, currentLocation, currentRole, userLocationsFor, audit, nextCustomerCode, upsertCustomer, deactivateCustomer, checkin, checkoutCart, upsertDrink, deactivateDrink, upsertIngredient, deactivateIngredient, adjustIngredient, upsertProduct, deactivateProduct, adjustProduct, upsertTemplate, deactivateTemplate, assignPackage, deactivatePackage, upgradePackage, upsertPtRate, recordPtSession, upsertUser, setUserActive, upsertLocation, setLocationActive, ...data } = state;
		return data;
	}
}));
function deductIngredients(get, set, locationId, drinkId, servings) {
	const recipes = get().drinkRecipes.filter((r) => r.drinkId === drinkId);
	for (const rec of recipes) {
		const ing = get().ingredients.find((i) => i.id === rec.ingredientId && i.isActive);
		if (!ing) continue;
		const need = rec.quantityPerServing * servings;
		if (ing.currentStock < need) return {
			ok: false,
			message: `Không đủ ${ing.name} (cần ${need} ${ing.unit}, còn ${ing.currentStock}).`
		};
	}
	if (recipes.length === 0) return {
		ok: true,
		message: ""
	};
	set((s) => ({ ingredients: s.ingredients.map((ing) => {
		const rec = recipes.find((r) => r.ingredientId === ing.id);
		if (!rec) return ing;
		return {
			...ing,
			currentStock: Math.max(0, ing.currentStock - rec.quantityPerServing * servings)
		};
	}) }));
	return {
		ok: true,
		message: ""
	};
}
function useStudio(selector) {
	return useStudioStore(useShallow(selector));
}
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const persistApi = useStudioStore.persist;
		const unsub = persistApi.onFinishHydration(() => setHydrated(true));
		persistApi.rehydrate();
		if (persistApi.hasHydrated()) setHydrated(true);
		return unsub;
	}, []);
	return hydrated;
}
//#endregion
export { useStudio as C, useHydrated as S, formatDate as _, PT_LOC_LABELS as a, formatVnd as b, UNIT_LABELS as c, canEditCustomer as d, canManageTemplates as f, daysBetween as g, canViewAudit as h, PRODUCT_TYPE_LABELS as i, canAdjustStock as l, canSoftDelete as m, DEMO_ACCOUNTS as n, PT_RATE_LABELS as o, canManageUsers as p, PACKAGE_TYPE_LABELS as r, ROLE_LABELS as s, ADJUST_LABELS as t, canEditCatalog as u, formatDateTime as v, isoDate as x, formatNumber as y };
