import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { b as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { k as ArrowUpRight } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { C as useStudio, b as formatVnd, f as canManageTemplates } from "./_ssr/store-pW1j3esF.mjs";
import { t as Button } from "./_ssr/button-BW4LFYAQ.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { n as CardContent, t as Card } from "./_ssr/card-D1Zo7toT.mjs";
import { t as ConfirmDialog } from "./_ssr/confirm-dialog-Aueq1jrA.mjs";
import { t as Field } from "./_ssr/field-C20ZZwRX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.package-upgrade-C1uxhr7_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UpgradePage() {
	const locId = useStudio((s) => s.sessionLocationId);
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
	const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId && p.isActive));
	const items = useStudio((s) => s.packageItems);
	const templates = useStudio((s) => s.packageTemplates.filter((t) => t.locationId === locId && t.isActive));
	const upgrade = useStudio((s) => s.upgradePackage);
	const [packageId, setPackageId] = (0, import_react.useState)(packages[0]?.id ?? 0);
	const [templateId, setTemplateId] = (0, import_react.useState)(templates[templates.length - 1]?.id ?? 0);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	if (!canManageTemplates(role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	const pkg = packages.find((p) => p.id === packageId);
	const tpl = templates.find((t) => t.id === templateId);
	const customer = customers.find((c) => c.id === pkg?.customerId);
	const drinksLeft = items.filter((i) => i.packageId === pkg?.id).reduce((s, i) => s + i.remainingServings, 0);
	const preview = (0, import_react.useMemo)(() => {
		if (!pkg || !tpl) return null;
		return {
			sessions: tpl.totalSessions + pkg.remainingSessions,
			drinks: tpl.totalDrinks + drinksLeft,
			pay: Math.max(0, tpl.totalAmount - pkg.totalAmount)
		};
	}, [
		pkg,
		tpl,
		drinksLeft
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Nâng cấp gói",
			description: "Cộng dồn buổi và ly còn lại sang mẫu gói cao hơn, vô hiệu hóa gói cũ."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Gói hiện tại",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
							value: packageId,
							onChange: (e) => setPackageId(Number(e.target.value)),
							children: packages.map((p) => {
								const c = customers.find((x) => x.id === p.customerId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: p.id,
									children: [
										c?.fullName,
										" · ",
										p.name
									]
								}, p.id);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Mẫu gói mới",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "h-10 rounded-md border border-input bg-card px-3 text-sm",
							value: templateId,
							onChange: (e) => setTemplateId(Number(e.target.value)),
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
					pkg && tpl && preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-muted/70 p-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Hội viên ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: customer?.fullName
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2",
								children: ["Buổi sau nâng cấp: ", preview.sessions]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Ly sau nâng cấp: ", preview.drinks] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-medium",
								children: ["Thu thêm: ", formatVnd(preview.pay)]
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => setConfirm(true),
						disabled: !pkg || !tpl,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" }), " Nâng cấp"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: confirm,
			onOpenChange: setConfirm,
			title: "Xác nhận nâng cấp gói?",
			description: "Gói cũ sẽ bị vô hiệu. Buổi và ly còn lại được cộng vào gói mới.",
			confirmLabel: "Nâng cấp",
			onConfirm: () => {
				const res = upgrade({
					packageId,
					templateId
				});
				if (res.ok) toast.success(res.message);
				else toast.error(res.message);
				setConfirm(false);
			}
		})
	] });
}
//#endregion
export { UpgradePage as component };
