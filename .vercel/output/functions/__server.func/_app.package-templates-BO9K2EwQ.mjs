import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { b as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { E as ClipboardList, g as Pencil, h as Plus, o as Trash2 } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { C as useStudio, b as formatVnd, f as canManageTemplates, r as PACKAGE_TYPE_LABELS } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as EmptyState } from "./_ssr/empty-state-CLk7TO76.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as Input } from "./_ssr/input-C6m3RfnP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.package-templates-BO9K2EwQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TemplatesPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const rows = useStudio((s) => s.packageTemplates.filter((t) => t.locationId === locId && t.isActive));
	const upsert = useStudio((s) => s.upsertTemplate);
	const deactivate = useStudio((s) => s.deactivateTemplate);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		packageType: "BASIC",
		durationDays: 90,
		totalSessions: 36,
		totalDrinks: 36,
		totalAmount: 32e5
	});
	if (!canManageTemplates(role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	function start(row) {
		setEditing(row ?? null);
		setForm(row ? {
			name: row.name,
			packageType: row.packageType,
			durationDays: row.durationDays,
			totalSessions: row.totalSessions,
			totalDrinks: row.totalDrinks,
			totalAmount: row.totalAmount
		} : {
			name: "",
			packageType: "BASIC",
			durationDays: 90,
			totalSessions: 36,
			totalDrinks: 36,
			totalAmount: 32e5
		});
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Mẫu gói",
			description: "Mẫu dùng khi gán gói cho hội viên.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => start(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Thêm mẫu"]
			})
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: ClipboardList,
			title: "Chưa có mẫu gói"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-medium",
						children: t.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "mt-2",
						children: PACKAGE_TYPE_LABELS[t.packageType]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => start(t),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => setPending(t),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid grid-cols-2 gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Thời hạn"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [t.durationDays, " ngày"] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Buổi tập"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: t.totalSessions || "—" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Ly đồ uống"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: t.totalDrinks || "—" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Giá"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: formatVnd(t.totalAmount)
						})] })
					]
				})]
			}, t.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Sửa mẫu gói" : "Thêm mẫu gói" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tên mẫu",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Loại",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: form.packageType,
								onChange: (e) => setForm({
									...form,
									packageType: e.target.value
								}),
								children: Object.entries(PACKAGE_TYPE_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: v
								}, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Số ngày",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: form.durationDays,
										onChange: (e) => setForm({
											...form,
											durationDays: Number(e.target.value)
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Số buổi",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: form.totalSessions,
										onChange: (e) => setForm({
											...form,
											totalSessions: Number(e.target.value)
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Số ly",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: form.totalDrinks,
										onChange: (e) => setForm({
											...form,
											totalDrinks: Number(e.target.value)
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Giá (VND)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: form.totalAmount,
										onChange: (e) => setForm({
											...form,
											totalAmount: Number(e.target.value)
										})
									})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setOpen(false),
					children: "Hủy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						const res = upsert({
							id: editing?.id,
							...form
						});
						if (res.ok) {
							toast.success(res.message);
							setOpen(false);
						} else toast.error(res.message);
					},
					children: "Lưu"
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: Boolean(pending),
			onOpenChange: (v) => !v && setPending(null),
			title: "Vô hiệu hóa mẫu gói?",
			description: `${pending?.name} sẽ không còn hiện khi gán gói mới.`,
			confirmLabel: "Vô hiệu hóa",
			destructive: true,
			onConfirm: () => {
				if (!pending) return;
				const res = deactivate(pending.id);
				if (res.ok) toast.success(res.message);
				else toast.error(res.message);
				setPending(null);
			}
		})
	] });
}
//#endregion
export { TemplatesPage as component };
