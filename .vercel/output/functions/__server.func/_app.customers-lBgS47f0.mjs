import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Pencil, h as Plus, o as Trash2, r as Users } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as matchesQuery, r as initials } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, _ as formatDate, d as canEditCustomer, m as canSoftDelete } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as EmptyState } from "./_ssr/empty-state-CLk7TO76.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as Input } from "./_ssr/input-C6m3RfnP.mjs";
import { t as SearchField } from "./_ssr/search-field-C6sRWTvk.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
import { t as Textarea } from "./_ssr/textarea-BvfSraM7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.customers-lBgS47f0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomersPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
	const nextCode = useStudio((s) => locId ? s.nextCustomerCode(locId) : "HV000001");
	const upsert = useStudio((s) => s.upsertCustomer);
	const deactivate = useStudio((s) => s.deactivateCustomer);
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		fullName: "",
		phone: "",
		birthDate: "",
		notes: ""
	});
	const rows = (0, import_react.useMemo)(() => customers.filter((c) => matchesQuery(`${c.code} ${c.fullName} ${c.phone} ${c.notes}`, q)), [customers, q]);
	function openCreate() {
		setEditing(null);
		setForm({
			fullName: "",
			phone: "",
			birthDate: "",
			notes: ""
		});
		setOpen(true);
	}
	function openEdit(c) {
		setEditing(c);
		setForm({
			fullName: c.fullName,
			phone: c.phone,
			birthDate: c.birthDate,
			notes: c.notes
		});
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Hội viên",
			description: `${customers.length} hội viên đang hoạt động · mã tiếp theo ${nextCode}`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: openCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Thêm hội viên"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: q,
				onChange: setQ,
				placeholder: "Tìm mã, tên, số điện thoại"
			})
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Users,
			title: "Không có hội viên",
			description: "Thêm hội viên mới hoặc đổi từ khóa tìm kiếm."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/60 text-left text-xs uppercase tracking-[0.12em] text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Hội viên"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Mã"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Điện thoại"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Ngày sinh"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Ghi chú"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium text-right",
							children: "Thao tác"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-9 items-center justify-center rounded-full bg-sage/20 text-xs font-medium text-olive",
									children: initials(c.fullName)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: c.fullName
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "muted",
								children: c.code
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: c.phone || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: formatDate(c.birthDate)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "max-w-48 truncate px-4 py-3 text-muted-foreground",
							children: c.notes || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-1",
								children: [canEditCustomer(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Sửa",
									onClick: () => openEdit(c),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								}) : null, canSoftDelete(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Vô hiệu hóa",
									onClick: () => setPendingDelete(c),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								}) : null]
							})
						})
					]
				}, c.id)) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:hidden",
			children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-card p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-full bg-sage/20 text-xs font-medium text-olive",
							children: initials(c.fullName)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: c.fullName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: c.code
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex",
						children: [canEditCustomer(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => openEdit(c),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}) : null, canSoftDelete(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => setPendingDelete(c),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						}) : null]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 grid gap-1 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Điện thoại"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.phone || "—" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Ngày sinh"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(c.birthDate) })]
					})]
				})]
			}, c.id))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Sửa hội viên" : "Thêm hội viên" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						!editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["Mã sẽ được cấp tự động: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: nextCode
							})]
						}) : null,
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
							label: "Số điện thoại",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.phone,
								onChange: (e) => setForm({
									...form,
									phone: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Ngày sinh",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: form.birthDate,
								onChange: (e) => setForm({
									...form,
									birthDate: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Ghi chú",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: form.notes,
								onChange: (e) => setForm({
									...form,
									notes: e.target.value
								})
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
						const res = upsert({
							id: editing?.id,
							...form
						});
						if (!res.ok) toast.error(res.message);
						else {
							toast.success(res.message);
							setOpen(false);
						}
					},
					children: "Lưu"
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: Boolean(pendingDelete),
			onOpenChange: (v) => !v && setPendingDelete(null),
			title: "Vô hiệu hóa hội viên?",
			description: `Hội viên ${pendingDelete?.fullName} sẽ không còn hiện trong danh sách, nhưng lịch sử giao dịch được giữ lại.`,
			confirmLabel: "Vô hiệu hóa",
			destructive: true,
			onConfirm: () => {
				if (!pendingDelete) return;
				const res = deactivate(pendingDelete.id);
				if (res.ok) toast.success(res.message);
				else toast.error(res.message);
				setPendingDelete(null);
			}
		})
	] });
}
//#endregion
export { CustomersPage as component };
