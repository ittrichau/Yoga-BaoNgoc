import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as SlidersHorizontal, g as Pencil, h as Plus, o as Trash2, s as Sparkles } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as matchesQuery } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, b as formatVnd, i as PRODUCT_TYPE_LABELS, l as canAdjustStock, m as canSoftDelete, t as ADJUST_LABELS, u as canEditCatalog } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as EmptyState } from "./_ssr/empty-state-CLk7TO76.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as Input } from "./_ssr/input-C6m3RfnP.mjs";
import { t as SearchField } from "./_ssr/search-field-C6sRWTvk.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.products-JH_ai_UT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductsPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const products = useStudio((s) => s.products.filter((p) => p.locationId === locId && p.isActive));
	const upsert = useStudio((s) => s.upsertProduct);
	const deactivate = useStudio((s) => s.deactivateProduct);
	const adjust = useStudio((s) => s.adjustProduct);
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(null);
	const [adjusting, setAdjusting] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		productType: "other",
		price: 1e5,
		salePercent: 0,
		minStock: 5
	});
	const [adj, setAdj] = (0, import_react.useState)({
		type: "add",
		quantity: 5,
		reason: ""
	});
	const rows = (0, import_react.useMemo)(() => products.filter((p) => matchesQuery(`${p.name} ${PRODUCT_TYPE_LABELS[p.productType]}`, q)), [products, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Sản phẩm bán lẻ",
			description: "Thảm, trang phục, phụ kiện.",
			actions: canEditCatalog(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => {
					setEditing(null);
					setForm({
						name: "",
						productType: "other",
						price: 1e5,
						salePercent: 0,
						minStock: 5
					});
					setOpen(true);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Thêm sản phẩm"]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
			value: q,
			onChange: setQ,
			placeholder: "Tìm sản phẩm",
			className: "mb-4"
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Sparkles,
			title: "Chưa có sản phẩm"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: rows.map((p) => {
				const low = p.currentStock <= p.minStock;
				const price = Math.round(p.price * (1 - p.salePercent / 100));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "mt-2",
								variant: "muted",
								children: PRODUCT_TYPE_LABELS[p.productType]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex",
								children: [
									canAdjustStock(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => {
											setAdjusting(p);
											setAdj({
												type: "add",
												quantity: 5,
												reason: ""
											});
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" })
									}) : null,
									canEditCatalog(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => {
											setEditing(p);
											setForm({
												name: p.name,
												productType: p.productType,
												price: p.price,
												salePercent: p.salePercent,
												minStock: p.minStock
											});
											setOpen(true);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}) : null,
									canSoftDelete(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => setPending(p),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									}) : null
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm tabular-nums",
							children: [formatVnd(price), p.salePercent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-warning",
								children: [
									"-",
									p.salePercent,
									"%"
								]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm",
							children: [
								"Tồn ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: low ? "danger" : "success",
									children: p.currentStock
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 text-muted-foreground",
									children: ["min ", p.minStock]
								})
							]
						})
					]
				}, p.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Sửa sản phẩm" : "Thêm sản phẩm" }) }),
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
							label: "Loại",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: form.productType,
								onChange: (e) => setForm({
									...form,
									productType: e.target.value
								}),
								children: Object.entries(PRODUCT_TYPE_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: v
								}, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Giá",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.price,
									onChange: (e) => setForm({
										...form,
										price: Number(e.target.value)
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "% giảm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.salePercent,
									onChange: (e) => setForm({
										...form,
										salePercent: Number(e.target.value)
									})
								})
							})]
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
							label: "Số lượng",
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
							productId: adjusting.id,
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
			title: "Vô hiệu hóa sản phẩm?",
			description: `${pending?.name} sẽ không còn bán được.`,
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
export { ProductsPage as component };
