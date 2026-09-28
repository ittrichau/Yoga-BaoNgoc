import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { T as CupSoda, g as Pencil, h as Plus, o as Trash2 } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as matchesQuery } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, b as formatVnd, m as canSoftDelete, u as canEditCatalog } from "./_ssr/store-pW1j3esF.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as EmptyState } from "./_ssr/empty-state-CLk7TO76.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as Input } from "./_ssr/input-C6m3RfnP.mjs";
import { t as SearchField } from "./_ssr/search-field-C6sRWTvk.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
import { t as Textarea } from "./_ssr/textarea-BvfSraM7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.drinks-TmUM0AiA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DrinksPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
	const ingredients = useStudio((s) => s.ingredients.filter((i) => i.locationId === locId && i.isActive));
	const recipes = useStudio((s) => s.drinkRecipes);
	const upsert = useStudio((s) => s.upsertDrink);
	const deactivate = useStudio((s) => s.deactivateDrink);
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		pricePerServing: 3e4,
		description: "",
		recipe: []
	});
	const rows = (0, import_react.useMemo)(() => drinks.filter((d) => matchesQuery(`${d.name} ${d.description}`, q)), [drinks, q]);
	function start(row) {
		setEditing(row ?? null);
		setForm(row ? {
			name: row.name,
			pricePerServing: row.pricePerServing,
			description: row.description,
			recipe: recipes.filter((r) => r.drinkId === row.id).map((r) => ({
				ingredientId: r.ingredientId,
				quantityPerServing: r.quantityPerServing
			}))
		} : {
			name: "",
			pricePerServing: 3e4,
			description: "",
			recipe: []
		});
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Đồ uống",
			description: "Công thức gắn với tồn kho nguyên liệu.",
			actions: canEditCatalog(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => start(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Thêm đồ uống"]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
			value: q,
			onChange: setQ,
			placeholder: "Tìm đồ uống",
			className: "mb-4"
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: CupSoda,
			title: "Chưa có đồ uống"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: rows.map((d) => {
				const rec = recipes.filter((r) => r.drinkId === d.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg",
								children: d.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm tabular-nums text-olive",
								children: formatVnd(d.pricePerServing)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex",
								children: [canEditCatalog(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => start(d),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								}) : null, canSoftDelete(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => setPending(d),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								}) : null]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: d.description || "Không có mô tả"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: rec.length ? rec.map((r) => {
								const ing = ingredients.find((i) => i.id === r.ingredientId);
								return ing ? `${ing.name} ${r.quantityPerServing} ${ing.unit}` : null;
							}).filter(Boolean).join(" · ") : "Chưa có công thức"
						})
					]
				}, d.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Sửa đồ uống" : "Thêm đồ uống" }) }),
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
							label: "Giá mỗi ly",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: form.pricePerServing,
								onChange: (e) => setForm({
									...form,
									pricePerServing: Number(e.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mô tả",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: form.description,
								onChange: (e) => setForm({
									...form,
									description: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-sm font-medium",
							children: "Công thức / ly"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: ingredients.map((ing) => {
								const rec = form.recipe.find((r) => r.ingredientId === ing.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 flex-1 truncate text-sm",
											children: ing.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											className: "h-9 w-24",
											value: rec?.quantityPerServing ?? 0,
											onChange: (e) => {
												const qty = Number(e.target.value);
												setForm((f) => ({
													...f,
													recipe: [...f.recipe.filter((r) => r.ingredientId !== ing.id), {
														ingredientId: ing.id,
														quantityPerServing: qty
													}]
												}));
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-12 text-xs text-muted-foreground",
											children: ing.unit
										})
									]
								}, ing.id);
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
			title: "Vô hiệu hóa đồ uống?",
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
export { DrinksPage as component };
