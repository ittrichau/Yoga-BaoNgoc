import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Plus, l as ShoppingBag, o as Trash2, v as Minus } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as matchesQuery, n as cn } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, b as formatVnd, i as PRODUCT_TYPE_LABELS, v as formatDateTime, x as isoDate } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as SearchField } from "./_ssr/search-field-C6sRWTvk.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./_ssr/card-D1Zo7toT.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "./_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.sales-DSG4zo1m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-4 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function salePrice(price, salePercent) {
	return Math.round(price * (1 - salePercent / 100));
}
function SalesPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
	const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
	const products = useStudio((s) => s.products.filter((p) => p.locationId === locId && p.isActive));
	const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId && p.isActive));
	const items = useStudio((s) => s.packageItems);
	const txs = useStudio((s) => s.transactions.filter((t) => t.locationId === locId));
	const users = useStudio((s) => s.users);
	const checkout = useStudio((s) => s.checkoutCart);
	const [customerId, setCustomerId] = (0, import_react.useState)(customers.find((c) => c.fullName === "Khách vãng lai")?.id ?? customers[0]?.id ?? null);
	const [q, setQ] = (0, import_react.useState)("");
	const [cart, setCart] = (0, import_react.useState)([]);
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	const [usePackage, setUsePackage] = (0, import_react.useState)(true);
	const [removeKey, setRemoveKey] = (0, import_react.useState)(null);
	const customer = customers.find((c) => c.id === customerId);
	const customerPkgs = packages.filter((p) => p.customerId === customerId);
	const pkgItem = items.find((i) => customerPkgs.some((p) => p.id === i.packageId && p.isActive) && i.remainingServings > 0);
	const filteredDrinks = drinks.filter((d) => matchesQuery(d.name, q));
	const filteredProducts = products.filter((p) => matchesQuery(`${p.name} ${PRODUCT_TYPE_LABELS[p.productType]}`, q));
	const today = isoDate();
	const todayTx = (0, import_react.useMemo)(() => txs.filter((t) => t.createdAt.startsWith(today)).slice(0, 12), [txs, today]);
	const total = cart.reduce((sum, l) => sum + (l.usePackageItemId ? 0 : l.unitPrice * l.quantity), 0);
	function addDrink(id) {
		const drink = drinks.find((d) => d.id === id);
		if (!drink) return;
		const useItem = usePackage ? pkgItem : null;
		setCart((prev) => {
			const key = `drink-${id}-${useItem?.id ?? "cash"}`;
			if (prev.find((l) => l.key === key)) return prev.map((l) => l.key === key ? {
				...l,
				quantity: l.quantity + 1
			} : l);
			return [...prev, {
				key,
				kind: "drink",
				drinkId: id,
				name: drink.name + (useItem ? " (gói)" : ""),
				unitPrice: drink.pricePerServing,
				quantity: 1,
				usePackageItemId: useItem?.id ?? null
			}];
		});
	}
	function addProduct(id) {
		const product = products.find((p) => p.id === id);
		if (!product) return;
		const price = salePrice(product.price, product.salePercent);
		setCart((prev) => {
			const key = `product-${id}`;
			if (prev.find((l) => l.key === key)) return prev.map((l) => l.key === key ? {
				...l,
				quantity: l.quantity + 1
			} : l);
			return [...prev, {
				key,
				kind: "product",
				productId: id,
				name: product.name,
				unitPrice: price,
				quantity: 1
			}];
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Bán hàng",
			description: "Chọn hội viên, thêm món vào giỏ, thanh toán một lần."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.8fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium",
						children: "Hội viên"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-1.5 h-10 w-full rounded-md border border-input bg-card px-3 text-sm",
						value: customerId ?? "",
						onChange: (e) => setCustomerId(Number(e.target.value)),
						children: customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: c.id,
							children: [
								c.code,
								" — ",
								c.fullName
							]
						}, c.id))
					}),
					pkgItem ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 flex items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: usePackage,
								onChange: (e) => setUsePackage(e.target.checked)
							}),
							"Trừ từ gói (còn ",
							pkgItem.remainingServings,
							" ly)"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Hội viên chưa có suất đồ uống trong gói — tính tiền mặt."
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "drinks",
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "drinks",
							children: "Đồ uống"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "products",
							children: "Sản phẩm"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
							value: q,
							onChange: setQ,
							placeholder: "Tìm món",
							className: "sm:max-w-64"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "drinks",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: filteredDrinks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => addDrink(d.id),
								className: "rounded-xl bg-card p-4 text-left shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: d.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: d.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm tabular-nums text-olive",
										children: formatVnd(d.pricePerServing)
									})
								]
							}, d.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "products",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => addProduct(p.id),
								className: "rounded-xl bg-card p-4 text-left shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "muted",
											children: PRODUCT_TYPE_LABELS[p.productType]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm tabular-nums text-olive",
										children: [formatVnd(salePrice(p.price, p.salePercent)), p.salePercent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-2 text-warning",
											children: [
												"-",
												p.salePercent,
												"%"
											]
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: ["Tồn ", p.currentStock]
									})
								]
							}, p.id))
						})
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Giỏ hàng" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
					cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-center text-sm text-muted-foreground",
						children: "Chưa có món."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: cart.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-lg bg-muted/60 px-2 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: line.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tabular-nums text-muted-foreground",
									children: line.usePackageItemId ? "Trừ gói" : formatVnd(line.unitPrice)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "size-8",
										onClick: () => setCart((p) => p.map((l) => l.key === line.key ? {
											...l,
											quantity: Math.max(1, l.quantity - 1)
										} : l)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-5 text-center text-sm tabular-nums",
										children: line.quantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "size-8",
										onClick: () => setCart((p) => p.map((l) => l.key === line.key ? {
											...l,
											quantity: l.quantity + 1
										} : l)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "size-8",
										onClick: () => setRemoveKey(line.key),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})
								]
							})]
						}, line.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "Thanh toán"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl tabular-nums",
							children: formatVnd(total)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-4 w-full",
						disabled: !customer || cart.length === 0,
						onClick: () => setConfirmOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), " Thanh toán"]
					})
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Giao dịch hôm nay" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "grid gap-2",
					children: todayTx.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Chưa có giao dịch."
					}) : todayTx.map((t) => {
						const c = customers.find((x) => x.id === t.customerId);
						const staff = users.find((u) => u.id === t.createdBy);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: c?.fullName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: [
										staff?.fullName,
										" · ",
										formatDateTime(t.createdAt)
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: t.amount ? formatVnd(t.amount) : "Gói"
							})]
						}, t.id);
					})
				})] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: confirmOpen,
			onOpenChange: setConfirmOpen,
			title: "Xác nhận thanh toán",
			description: `Thu ${formatVnd(total)} cho ${customer?.fullName ?? "hội viên"} · ${cart.length} món.`,
			confirmLabel: "Thanh toán",
			onConfirm: () => {
				if (!customerId) return;
				const res = checkout({
					customerId,
					lines: cart
				});
				if (res.ok) {
					toast.success(res.message);
					setCart([]);
				} else toast.error(res.message);
				setConfirmOpen(false);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: Boolean(removeKey),
			onOpenChange: (v) => !v && setRemoveKey(null),
			title: "Xóa món khỏi giỏ?",
			description: "Món này sẽ bị gỡ khỏi giỏ hàng hiện tại.",
			confirmLabel: "Xóa món",
			destructive: true,
			onConfirm: () => {
				setCart((p) => p.filter((l) => l.key !== removeKey));
				setRemoveKey(null);
			}
		})
	] });
}
//#endregion
export { SalesPage as component };
