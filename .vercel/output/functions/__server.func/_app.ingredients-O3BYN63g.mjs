import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as SlidersHorizontal, g as Pencil, h as Plus, n as Warehouse, o as Trash2 } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as matchesQuery } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, c as UNIT_LABELS, l as canAdjustStock, m as canSoftDelete, t as ADJUST_LABELS, u as canEditCatalog, v as formatDateTime } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as EmptyState } from "./_ssr/empty-state-CLk7TO76.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as Input } from "./_ssr/input-C6m3RfnP.mjs";
import { t as SearchField } from "./_ssr/search-field-C6sRWTvk.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.ingredients-O3BYN63g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IngredientsPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const rowsAll = useStudio((s) => s.ingredients.filter((i) => i.locationId === locId && i.isActive));
	const history = useStudio((s) => s.inventoryAdjustments.filter((a) => a.locationId === locId));
	const users = useStudio((s) => s.users);
	const upsert = useStudio((s) => s.upsertIngredient);
	const deactivate = useStudio((s) => s.deactivateIngredient);
	const adjust = useStudio((s) => s.adjustIngredient);
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(null);
	const [adjusting, setAdjusting] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		unit: "muỗng",
		minStock: 10
	});
	const [adj, setAdj] = (0, import_react.useState)({
		type: "add",
		quantity: 10,
		reason: ""
	});
	const rows = (0, import_react.useMemo)(() => rowsAll.filter((i) => matchesQuery(i.name, q)), [rowsAll, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Nguyên liệu",
			description: "Tồn kho theo muỗng / nắp / gói. Chỉ Admin được điều chỉnh.",
			actions: canEditCatalog(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => {
					setEditing(null);
					setForm({
						name: "",
						unit: "muỗng",
						minStock: 10
					});
					setOpen(true);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Thêm nguyên liệu"]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
			value: q,
			onChange: setQ,
			placeholder: "Tìm nguyên liệu",
			className: "mb-4"
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Warehouse,
			title: "Chưa có nguyên liệu"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: rows.map((i) => {
				const low = i.currentStock <= i.minStock;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: i.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Tối thiểu ",
							i.minStock,
							" ",
							UNIT_LABELS[i.unit]
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: low ? "danger" : "success",
								children: [
									i.currentStock,
									" ",
									i.unit
								]
							}),
							canAdjustStock(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									setAdjusting(i);
									setAdj({
										type: "add",
										quantity: 10,
										reason: ""
									});
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }), " Điều chỉnh"]
							}) : null,
							canEditCatalog(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => {
									setEditing(i);
									setForm({
										name: i.name,
										unit: i.unit,
										minStock: i.minStock
									});
									setOpen(true);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}) : null,
							canSoftDelete(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setPending(i),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							}) : null
						]
					})]
				}, i.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-lg",
			children: "Lịch sử điều chỉnh"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid gap-2",
			children: history.slice(0, 8).map((h) => {
				const ing = rowsAll.find((i) => i.id === h.ingredientId);
				const user = users.find((u) => u.id === h.createdBy);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3 rounded-lg bg-card px-4 py-3 text-sm shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						ADJUST_LABELS[h.adjustmentType],
						" ",
						h.quantity,
						" · ",
						ing?.name,
						" · ",
						user?.fullName,
						h.reason ? ` · ${h.reason}` : ""
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: formatDateTime(h.createdAt)
					})]
				}, h.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Sửa nguyên liệu" : "Thêm nguyên liệu" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tên",
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
							label: "Đơn vị",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: form.unit,
								onChange: (e) => setForm({
									...form,
									unit: e.target.value
								}),
								children: Object.entries(UNIT_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: v
								}, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tồn tối thiểu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: form.minStock,
								onChange: (e) => setForm({
									...form,
									minStock: Number(e.target.value)
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
						if (res.ok) {
							toast.success(res.message);
							setOpen(false);
						} else toast.error(res.message);
					},
					children: "Lưu"
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(adjusting),
			onOpenChange: (v) => !v && setAdjusting(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Điều chỉnh ", adjusting?.name] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Loại",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: adj.type,
								onChange: (e) => setAdj({
									...adj,
									type: e.target.value
								}),
								children: Object.entries(ADJUST_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: v
								}, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: adj.type === "count_correct" ? "Số lượng thực tế" : "Số lượng",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: adj.quantity,
								onChange: (e) => setAdj({
									...adj,
									quantity: Number(e.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Lý do",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: adj.reason,
								onChange: (e) => setAdj({
									...adj,
									reason: e.target.value
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setAdjusting(null),
					children: "Hủy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (!adjusting) return;
						const res = adjust({
							ingredientId: adjusting.id,
							type: adj.type,
							quantity: adj.quantity,
							reason: adj.reason
						});
						if (res.ok) {
							toast.success(res.message);
							setAdjusting(null);
						} else toast.error(res.message);
					},
					children: "Lưu"
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: Boolean(pending),
			onOpenChange: (v) => !v && setPending(null),
			title: "Vô hiệu hóa nguyên liệu?",
			description: `${pending?.name} sẽ không còn dùng trong công thức mới.`,
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
export { IngredientsPage as component };
