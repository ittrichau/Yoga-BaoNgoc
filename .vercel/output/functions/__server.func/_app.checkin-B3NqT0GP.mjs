import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { p as ScanLine } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as matchesQuery, r as initials } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, _ as formatDate, b as formatVnd, g as daysBetween, x as isoDate } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as EmptyState } from "./_ssr/empty-state-CLk7TO76.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as SearchField } from "./_ssr/search-field-C6sRWTvk.mjs";
import { n as CardContent, t as Card } from "./_ssr/card-D1Zo7toT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.checkin-B3NqT0GP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckinPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
	const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId && p.isActive));
	const items = useStudio((s) => s.packageItems);
	const drinks = useStudio((s) => s.drinks);
	const sessions = useStudio((s) => s.packageSessions);
	const checkin = useStudio((s) => s.checkin);
	const [q, setQ] = (0, import_react.useState)("");
	const [selectedId, setSelectedId] = (0, import_react.useState)(customers[0]?.id ?? null);
	const filtered = (0, import_react.useMemo)(() => customers.filter((c) => matchesQuery(`${c.code} ${c.fullName} ${c.phone}`, q)), [customers, q]);
	const selected = customers.find((c) => c.id === selectedId) ?? filtered[0];
	const today = isoDate();
	const customerPackages = packages.filter((p) => p.customerId === selected?.id);
	const todayCount = sessions.filter((s) => s.checkinDate === today).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Check-in buổi tập",
		description: `${todayCount} lượt check-in hôm nay tại cơ sở này.`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-4 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: q,
				onChange: setQ,
				placeholder: "Tìm mã, tên hoặc số điện thoại"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 max-h-[60vh] space-y-1 overflow-y-auto",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 py-8 text-center text-sm text-muted-foreground",
					children: "Không tìm thấy hội viên."
				}) : filtered.map((c) => {
					const active = selected?.id === c.id;
					const pkgCount = packages.filter((p) => p.customerId === c.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelectedId(c.id),
						className: `flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `flex size-9 items-center justify-center rounded-full text-xs font-medium ${active ? "bg-primary-foreground/15" : "bg-sage/20 text-olive"}`,
								children: initials(c.fullName)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-medium",
									children: c.fullName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `block text-xs ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`,
									children: [
										c.code,
										" · ",
										c.phone || "Không có SĐT"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: active ? "outline" : "muted",
								children: [pkgCount, " gói"]
							})
						]
					}, c.id);
				})
			})]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: !selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: ScanLine,
			title: "Chọn hội viên",
			description: "Tìm và chọn hội viên bên trái để check-in."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
						children: selected.code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-medium",
						children: selected.fullName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: selected.phone || "Chưa có số điện thoại"
					})
				]
			}) }), customerPackages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: ScanLine,
				title: "Chưa có gói tập",
				description: "Hội viên này chưa được gán gói. Vào mục Gói tập để gán mẫu gói."
			}) : customerPackages.map((pkg) => {
				const remainingDrinks = items.filter((i) => i.packageId === pkg.id).reduce((sum, i) => sum + i.remainingServings, 0);
				const expired = Boolean(pkg.endDate && pkg.endDate < today);
				const daysLeft = pkg.endDate ? daysBetween(today, pkg.endDate) : null;
				const drinkNames = items.filter((i) => i.packageId === pkg.id).map((i) => drinks.find((d) => d.id === i.drinkId)?.name).filter(Boolean).join(", ");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-medium",
								children: pkg.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									formatDate(pkg.startDate),
									" — ",
									formatDate(pkg.endDate),
									" · ",
									formatVnd(pkg.totalAmount)
								]
							})] }), expired ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "danger",
								children: "Hết hạn"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "success",
								children: "Đang dùng"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Buổi còn",
									value: pkg.totalSessions ? `${pkg.remainingSessions}/${pkg.totalSessions}` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Ly còn",
									value: String(remainingDrinks)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Hạn",
									value: daysLeft === null ? "—" : daysLeft < 0 ? "Hết hạn" : `${daysLeft} ngày`
								})
							]
						}),
						drinkNames ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: ["Đồ uống: ", drinkNames]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-4 w-full sm:w-auto",
							disabled: expired || pkg.totalSessions > 0 && pkg.remainingSessions <= 0 || remainingDrinks <= 0,
							onClick: () => {
								const res = checkin({
									customerId: selected.id,
									packageId: pkg.id
								});
								if (res.ok) toast.success(res.message);
								else toast.error(res.message);
							},
							children: "Check-in buổi tập"
						})
					]
				}) }, pkg.id);
			})]
		}) })]
	})] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-muted/70 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { CheckinPage as component };
