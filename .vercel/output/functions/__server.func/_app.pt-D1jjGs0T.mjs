import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Plus, w as Dumbbell } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { C as useStudio, _ as formatDate, a as PT_LOC_LABELS, b as formatVnd, o as PT_RATE_LABELS, u as canEditCatalog, x as isoDate } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as EmptyState } from "./_ssr/empty-state-CLk7TO76.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as Input } from "./_ssr/input-C6m3RfnP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
import { t as Textarea } from "./_ssr/textarea-BvfSraM7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.pt-D1jjGs0T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PtPage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
	const users = useStudio((s) => s.users.filter((u) => u.isActive));
	const rates = useStudio((s) => s.ptRates.filter((r) => r.locationId === locId && r.isActive));
	const sessions = useStudio((s) => s.ptSessions.filter((p) => p.locationId === locId));
	const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
	const record = useStudio((s) => s.recordPtSession);
	const upsertRate = useStudio((s) => s.upsertPtRate);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [rateOpen, setRateOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		customerId: customers[0]?.id ?? 0,
		trainerId: users.find((u) => u.role === "TEACHER")?.id ?? users[0]?.id ?? 0,
		ptRateId: rates[0]?.id ?? 0,
		sessionDate: isoDate(),
		durationHours: 1,
		includeNutrition: false,
		drinkId: drinks[0]?.id ?? 0,
		notes: ""
	});
	const [rateForm, setRateForm] = (0, import_react.useState)({
		name: "",
		locationType: "AT_GYM",
		rateType: "PER_SESSION",
		price: 22e4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Buổi PT",
			description: "Ghi nhận buổi tập với HLV và bảng giá.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [canEditCatalog(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => setRateOpen(true),
				children: "Thêm bảng giá"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Ghi buổi PT"]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
			children: rates.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-card p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: r.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							PT_LOC_LABELS[r.locationType],
							" · ",
							PT_RATE_LABELS[r.rateType]
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 tabular-nums text-olive",
						children: formatVnd(r.price)
					})
				]
			}, r.id))
		}),
		sessions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Dumbbell,
			title: "Chưa có buổi PT"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-2",
			children: sessions.slice().sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map((s) => {
				const c = customers.find((x) => x.id === s.customerId);
				const t = users.find((u) => u.id === s.trainerId);
				const r = rates.find((x) => x.id === s.ptRateId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: c?.fullName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							t?.fullName,
							" · ",
							r?.name,
							" · ",
							formatDate(s.sessionDate)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [s.includeNutrition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Kèm đồ uống" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums font-medium",
							children: formatVnd(s.totalAmount)
						})]
					})]
				}, s.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ghi buổi PT" }) }),
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
							label: "Huấn luyện viên",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: form.trainerId,
								onChange: (e) => setForm({
									...form,
									trainerId: Number(e.target.value)
								}),
								children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: u.id,
									children: u.fullName
								}, u.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Bảng giá",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: form.ptRateId,
								onChange: (e) => setForm({
									...form,
									ptRateId: Number(e.target.value)
								}),
								children: rates.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: r.id,
									children: [
										r.name,
										" · ",
										formatVnd(r.price)
									]
								}, r.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Ngày",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.sessionDate,
									onChange: (e) => setForm({
										...form,
										sessionDate: e.target.value
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Số giờ",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: "0.5",
									value: form.durationHours,
									onChange: (e) => setForm({
										...form,
										durationHours: Number(e.target.value)
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: form.includeNutrition,
								onChange: (e) => setForm({
									...form,
									includeNutrition: e.target.checked
								})
							}), "Kèm đồ uống dinh dưỡng"]
						}),
						form.includeNutrition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Đồ uống",
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
						}) : null,
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
						const res = record({
							...form,
							drinkId: form.includeNutrition ? form.drinkId : null
						});
						if (res.ok) {
							toast.success(res.message);
							setOpen(false);
						} else toast.error(res.message);
					},
					children: "Lưu buổi"
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: rateOpen,
			onOpenChange: setRateOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Thêm bảng giá PT" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tên",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: rateForm.name,
								onChange: (e) => setRateForm({
									...rateForm,
									name: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nơi tập",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: rateForm.locationType,
								onChange: (e) => setRateForm({
									...rateForm,
									locationType: e.target.value
								}),
								children: Object.entries(PT_LOC_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: v
								}, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Cách tính",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
								value: rateForm.rateType,
								onChange: (e) => setRateForm({
									...rateForm,
									rateType: e.target.value
								}),
								children: Object.entries(PT_RATE_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: v
								}, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Giá",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: rateForm.price,
								onChange: (e) => setRateForm({
									...rateForm,
									price: Number(e.target.value)
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setRateOpen(false),
					children: "Hủy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						const res = upsertRate(rateForm);
						if (res.ok) {
							toast.success(res.message);
							setRateOpen(false);
						} else toast.error(res.message);
					},
					children: "Lưu"
				})] })
			] })
		})
	] });
}
//#endregion
export { PtPage as component };
