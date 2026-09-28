import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Package, h as Plus, o as Trash2 } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as matchesQuery } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, _ as formatDate, b as formatVnd, g as daysBetween, u as canEditCatalog, x as isoDate } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as EmptyState } from "./_ssr/empty-state-CLk7TO76.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as Input } from "./_ssr/input-C6m3RfnP.mjs";
import { t as SearchField } from "./_ssr/search-field-C6sRWTvk.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.packages-Cp4vKIS4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PackagesPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
	const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId));
	const items = useStudio((s) => s.packageItems);
	const templates = useStudio((s) => s.packageTemplates.filter((t) => t.locationId === locId && t.isActive));
	const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
	const assignPackage = useStudio((s) => s.assignPackage);
	const deactivatePackage = useStudio((s) => s.deactivatePackage);
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [pending, setPending] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		customerId: customers[0]?.id ?? 0,
		templateId: templates[0]?.id ?? 0,
		startDate: isoDate(),
		drinkId: drinks[0]?.id ?? 0
	});
	const rows = (0, import_react.useMemo)(() => {
		return packages.filter((p) => {
			const c = customers.find((x) => x.id === p.customerId);
			return matchesQuery(`${p.name} ${c?.fullName ?? ""} ${c?.code ?? ""}`, q);
		}).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
	}, [
		packages,
		customers,
		q
	]);
	const today = isoDate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Gói tập",
			description: "Gói trả trước đang gắn với hội viên tại cơ sở này.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Gán gói"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
			value: q,
			onChange: setQ,
			placeholder: "Tìm hội viên hoặc tên gói",
			className: "mb-4"
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Package,
			title: "Chưa có gói",
			description: "Gán mẫu gói cho hội viên để bắt đầu check-in."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: rows.map((p) => {
				const c = customers.find((x) => x.id === p.customerId);
				const drinksLeft = items.filter((i) => i.packageId === p.id).reduce((s, i) => s + i.remainingServings, 0);
				const daysLeft = p.endDate ? daysBetween(today, p.endDate) : null;
				const warn = !p.isActive || daysLeft !== null && daysLeft <= 7 || p.totalSessions > 0 && p.remainingSessions <= 3;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-medium",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								c?.code,
								" · ",
								c?.fullName
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [!p.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "muted",
								children: "Vô hiệu"
							}) : warn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "warning",
								children: "Sắp hết"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "success",
								children: "Đang dùng"
							}), canEditCatalog(role) && p.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setPending(p.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							}) : null]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "Hiệu lực",
								value: `${formatDate(p.startDate)} – ${formatDate(p.endDate)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "Buổi còn",
								value: p.totalSessions ? `${p.remainingSessions}/${p.totalSessions}` : "Không giới hạn"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "Ly còn",
								value: String(drinksLeft)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "Giá trị",
								value: formatVnd(p.totalAmount)
							})
						]
					})]
				}, p.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Gán gói từ mẫu" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Hội viên",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: form.customerId,
								onChange: (e) => setForm({
									...form,
									customerId: Number(e.target.value)
								}),
								children: customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: c.id,
									children: [
										c.code,
										" — ",
										c.fullName
									]
								}, c.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mẫu gói",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: form.templateId,
								onChange: (e) => setForm({
									...form,
									templateId: Number(e.target.value)
								}),
								children: templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: t.id,
									children: [
										t.name,
										" · ",
										formatVnd(t.totalAmount)
									]
								}, t.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Ngày bắt đầu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: form.startDate,
								onChange: (e) => setForm({
									...form,
									startDate: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Đồ uống trong gói",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: form.drinkId,
								onChange: (e) => setForm({
									...form,
									drinkId: Number(e.target.value)
								}),
								children: drinks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d.id,
									children: d.name
								}, d.id))
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setOpen(false),
					children: "Hủy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						const res = assignPackage(form);
						if (res.ok) {
							toast.success(res.message);
							setOpen(false);
						} else toast.error(res.message);
					},
					children: "Gán gói"
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: pending !== null,
			onOpenChange: (v) => !v && setPending(null),
			title: "Vô hiệu hóa gói?",
			description: "Gói sẽ không còn dùng để check-in. Lịch sử buổi tập được giữ.",
			confirmLabel: "Vô hiệu hóa",
			destructive: true,
			onConfirm: () => {
				if (pending == null) return;
				const res = deactivatePackage(pending);
				if (res.ok) toast.success(res.message);
				else toast.error(res.message);
				setPending(null);
			}
		})
	] });
}
function Meta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-muted/60 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.12em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium",
			children: value
		})]
	});
}
//#endregion
export { PackagesPage as component };
