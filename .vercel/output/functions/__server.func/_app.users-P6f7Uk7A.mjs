import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { b as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { D as Check, g as Pencil, h as Plus, i as UserRound, m as RotateCcw } from "./_libs/lucide-react.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "./_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as cn } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, p as canManageUsers, s as ROLE_LABELS } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as Input } from "./_ssr/input-C6m3RfnP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.users-P6f7Uk7A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("peer size-4 shrink-0 rounded-xs border border-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: "flex items-center justify-center text-current",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
function UsersPage() {
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const users = useStudio((s) => s.users);
	const locations = useStudio((s) => s.locations.filter((l) => l.isActive));
	const userLocations = useStudio((s) => s.userLocations);
	const upsert = useStudio((s) => s.upsertUser);
	const setActive = useStudio((s) => s.setUserActive);
	const resetDemo = useStudio((s) => s.resetDemo);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(null);
	const [resetOpen, setResetOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		username: "",
		password: "",
		fullName: "",
		role: "TEACHER",
		locationIds: []
	});
	if (!canManageUsers(role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	function start(user) {
		setEditing(user ?? null);
		setForm(user ? {
			username: user.username,
			password: "",
			fullName: user.fullName,
			role: user.role,
			locationIds: userLocations.filter((ul) => ul.userId === user.id).map((ul) => ul.locationId)
		} : {
			username: "",
			password: "",
			fullName: "",
			role: "TEACHER",
			locationIds: []
		});
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Người dùng",
			description: "Tài khoản giáo viên, chủ phòng và admin. Để trống cơ sở khi tạo mới sẽ gán tất cả cơ sở.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => setResetOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Khôi phục dữ liệu mẫu"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => start(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Thêm người dùng"]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: users.map((u) => {
				const locs = userLocations.filter((ul) => ul.userId === u.id).map((ul) => locations.find((l) => l.id === ul.locationId)?.name).filter(Boolean);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-full bg-sage/20 text-olive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: u.fullName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								u.username,
								" · ",
								locs.join(", ") || "Chưa gán cơ sở"
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: u.isActive ? "success" : "muted",
								children: ROLE_LABELS[u.role]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => start(u),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setPending(u),
								children: u.isActive ? "Khóa" : "Mở"
							})
						]
					})]
				}, u.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Sửa người dùng" : "Thêm người dùng" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Họ tên",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.fullName,
								onChange: (e) => setForm({
									...form,
									fullName: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tên đăng nhập",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.username,
								onChange: (e) => setForm({
									...form,
									username: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: editing ? "Mật khẩu mới (để trống nếu giữ nguyên)" : "Mật khẩu",
							required: !editing,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "password",
								value: form.password,
								onChange: (e) => setForm({
									...form,
									password: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Vai trò",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: form.role,
								onChange: (e) => setForm({
									...form,
									role: e.target.value
								}),
								children: Object.entries(ROLE_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: v
								}, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-sm font-medium",
							children: "Cơ sở (để trống = tất cả)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: locations.map((l) => {
								const checked = form.locationIds.includes(l.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked,
										onCheckedChange: (v) => setForm((f) => ({
											...f,
											locationIds: v ? [...f.locationIds, l.id] : f.locationIds.filter((id) => id !== l.id)
										}))
									}), l.name]
								}, l.id);
							})
						})] })
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
							...form,
							password: form.password || void 0
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
			title: pending?.isActive ? "Khóa tài khoản?" : "Mở lại tài khoản?",
			description: pending ? `${pending.fullName} (${pending.username})` : "",
			confirmLabel: pending?.isActive ? "Khóa" : "Mở lại",
			destructive: pending?.isActive,
			onConfirm: () => {
				if (!pending) return;
				const res = setActive(pending.id, !pending.isActive);
				if (res.ok) toast.success(res.message);
				else toast.error(res.message);
				setPending(null);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: resetOpen,
			onOpenChange: setResetOpen,
			title: "Khôi phục dữ liệu mẫu?",
			description: "Toàn bộ thay đổi local sẽ bị xóa và khôi phục studio demo Bảo Ngọc.",
			confirmLabel: "Khôi phục",
			destructive: true,
			onConfirm: () => {
				resetDemo();
				toast.success("Đã khôi phục dữ liệu mẫu. Đăng nhập lại để tiếp tục.");
				setResetOpen(false);
			}
		})
	] });
}
//#endregion
export { UsersPage as component };
