import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Package, a as TriangleAlert, l as ShoppingBag, p as ScanLine, r as Users } from "./_libs/lucide-react.mjs";
import { C as useStudio, b as formatVnd, g as daysBetween, h as canViewAudit, x as isoDate, y as formatNumber } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { n as BirthdayNudge } from "./_ssr/app-shell-iJROr1Hn.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./_ssr/card-D1Zo7toT.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-qhIWdhUY.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const locationName = useStudio((s) => s.locations.find((l) => l.id === locId)?.name ?? "");
	const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
	const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
	const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId && p.isActive));
	const ingredients = useStudio((s) => s.ingredients.filter((i) => i.locationId === locId && i.isActive));
	const products = useStudio((s) => s.products.filter((p) => p.locationId === locId && p.isActive));
	const transactions = useStudio((s) => s.transactions.filter((t) => t.locationId === locId));
	const sessions = useStudio((s) => s.packageSessions);
	const users = useStudio((s) => s.users);
	const today = isoDate();
	const monthPrefix = today.slice(0, 7);
	const todayTx = transactions.filter((t) => t.createdAt.startsWith(today));
	const monthTx = transactions.filter((t) => t.createdAt.startsWith(monthPrefix));
	const todayCheckins = sessions.filter((s) => {
		return packages.find((p) => p.id === s.packageId) && s.checkinDate === today;
	}).length;
	const todayRevenue = todayTx.reduce((sum, t) => sum + t.amount, 0);
	const monthRevenue = monthTx.reduce((sum, t) => sum + t.amount, 0);
	const lowIngredients = ingredients.filter((i) => i.currentStock <= i.minStock);
	const lowProducts = products.filter((p) => p.currentStock <= p.minStock);
	const expiring = packages.map((p) => {
		const customer = customers.find((c) => c.id === p.customerId);
		const reasons = [];
		if (p.endDate) {
			const left = daysBetween(today, p.endDate);
			if (left < 0) reasons.push(`Đã hết hạn ${Math.abs(left)} ngày`);
			else if (left <= 7) reasons.push(`Còn ${left} ngày hết hạn`);
		}
		if (p.totalSessions > 0 && p.remainingSessions <= 3) reasons.push(`Chỉ còn ${p.remainingSessions}/${p.totalSessions} buổi`);
		return {
			p,
			customer,
			reasons
		};
	}).filter((x) => x.reasons.length > 0).slice(0, 8);
	const chart = Array.from({ length: 14 }, (_, i) => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - (13 - i));
		const key = isoDate(d);
		const amount = transactions.filter((t) => t.createdAt.startsWith(key)).reduce((sum, t) => sum + t.amount, 0);
		return {
			day: `${d.getDate()}/${d.getMonth() + 1}`,
			amount
		};
	});
	const fraud = canViewAudit(role) ? todayTx.filter((t) => t.kind === "drink" && t.amount === 0 && !t.packageItemId && !t.sessionCheckin).map((t) => {
		const c = customers.find((x) => x.id === t.customerId);
		return `Bán ${drinks.find((x) => x.id === t.drinkId)?.name ?? "đồ uống"} cho ${c?.fullName ?? "hội viên"} không có gói, không thu tiền.`;
	}) : [];
	const recent = [...transactions].sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).slice(0, 6);
	const stats = [
		{
			label: "Hội viên",
			value: formatNumber(customers.length),
			hint: "Đang hoạt động",
			icon: Users
		},
		{
			label: "Doanh thu hôm nay",
			value: formatVnd(todayRevenue),
			hint: `${todayTx.length} giao dịch`,
			icon: ShoppingBag
		},
		{
			label: "Doanh thu tháng",
			value: formatVnd(monthRevenue),
			hint: monthPrefix,
			icon: Package
		},
		{
			label: "Check-in hôm nay",
			value: formatNumber(todayCheckins),
			hint: `${drinks.length} đồ uống`,
			icon: ScanLine
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Trang chính",
			description: locationName,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "sage",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/checkin",
					children: "Check-in"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/sales",
					children: "Bán hàng"
				})
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BirthdayNudge, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex items-start justify-between p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
						children: s.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl font-medium tabular-nums tracking-tight",
						children: s.value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: s.hint
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 items-center justify-center rounded-lg bg-sage/20 text-olive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-4" })
				})]
			}) }, s.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-5 xl:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "xl:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Doanh thu 14 ngày" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: chart,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "rev",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "#8FAF9D",
										stopOpacity: .45
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "#8FAF9D",
										stopOpacity: .02
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "#E4DDD2",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "day",
									tick: {
										fill: "#6B756F",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "#6B756F",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false,
									tickFormatter: (v) => `${Math.round(Number(v) / 1e3)}k`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									formatter: (v) => formatVnd(Number(v ?? 0)),
									contentStyle: {
										borderRadius: 12,
										borderColor: "#E4DDD2",
										background: "#FFFCF8"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "amount",
									stroke: "#4F6B5C",
									strokeWidth: 2,
									fill: "url(#rev)"
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "xl:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Gói cần chú ý" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/packages",
							children: "Xem gói"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "grid gap-2",
					children: expiring.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Không có gói sắp hết hạn hoặc hết buổi."
					}) : expiring.map(({ p, customer, reasons }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-muted/60 px-3 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium",
									children: [
										customer?.fullName,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: ["· ", customer?.code]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "warning",
									children: "Cảnh báo"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-warning",
								children: reasons.join(" · ")
							})
						]
					}, p.id))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Tồn kho thấp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ingredients",
							children: "Nguyên liệu"
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "grid gap-2",
				children: lowIngredients.length + lowProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Tồn kho ổn định."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [lowIngredients.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "danger",
						children: [
							i.currentStock,
							" / ",
							i.minStock,
							" ",
							i.unit
						]
					})]
				}, `i-${i.id}`)), lowProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "danger",
						children: [
							p.currentStock,
							" / ",
							p.minStock
						]
					})]
				}, `p-${p.id}`))] })
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Hoạt động gần đây" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "grid gap-2",
				children: recent.map((t) => {
					const c = customers.find((x) => x.id === t.customerId);
					const staff = users.find((u) => u.id === t.createdBy);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 rounded-lg bg-muted/60 px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: c?.fullName ?? "Hội viên"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									staff?.fullName,
									" · ",
									t.notes || t.kind
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-sm",
							children: t.amount ? formatVnd(t.amount) : "Gói"
						})]
					}, t.id);
				})
			})] })]
		}),
		canViewAudit(role) && fraud.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-warning" }), " Cảnh báo gian lận"]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "grid gap-2",
				children: fraud.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-lg bg-warning/10 px-3 py-2 text-sm text-warning",
					children: msg
				}, msg))
			})]
		}) : null
	] });
}
//#endregion
export { DashboardPage as component };
