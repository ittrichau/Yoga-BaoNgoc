import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { b as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as MapPin, g as Pencil, h as Plus } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { C as useStudio, p as canManageUsers } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as Input } from "./_ssr/input-C6m3RfnP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.locations-Co8MVuy1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LocationsPage() {
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const locations = useStudio((s) => s.locations);
	const upsert = useStudio((s) => s.upsertLocation);
	const setActive = useStudio((s) => s.setLocationActive);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		address: ""
	});
	if (!canManageUsers(role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	function start(loc) {
		setEditing(loc ?? null);
		setForm(loc ? {
			name: loc.name,
			address: loc.address
		} : {
			name: "",
			address: ""
		});
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Cơ sở",
			description: "Dữ liệu hội viên, kho và giao dịch luôn gắn với một cơ sở.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => start(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Thêm cơ sở"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-lg bg-sage/20 text-olive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: l.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: l.address || "Chưa có địa chỉ"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: l.isActive ? "success" : "muted",
							children: l.isActive ? "Hoạt động" : "Khóa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => start(l),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setPending(l),
							children: l.isActive ? "Khóa" : "Mở"
						})
					]
				})]
			}, l.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Sửa cơ sở" : "Thêm cơ sở" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tên cơ sở",
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Địa chỉ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.address,
							onChange: (e) => setForm({
								...form,
								address: e.target.value
							})
						})
					})]
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
			title: pending?.isActive ? "Khóa cơ sở?" : "Mở lại cơ sở?",
			description: pending?.name ?? "",
			confirmLabel: pending?.isActive ? "Khóa" : "Mở lại",
			destructive: pending?.isActive,
			onConfirm: () => {
				if (!pending) return;
				const res = setActive(pending.id, !pending.isActive);
				if (res.ok) toast.success(res.message);
				else toast.error(res.message);
				setPending(null);
			}
		})
	] });
}
//#endregion
export { LocationsPage as component };
