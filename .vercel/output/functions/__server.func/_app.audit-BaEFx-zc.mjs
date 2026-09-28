import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { b as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as ScrollText } from "./_libs/lucide-react.mjs";
import { i as matchesQuery } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, h as canViewAudit, v as formatDateTime } from "./_ssr/store-pW1j3esF.mjs";
import { t as Badge } from "./_ssr/badge-AaoE7jSB.mjs";
import { t as EmptyState } from "./_ssr/empty-state-CLk7TO76.mjs";
import { t as PageHeader } from "./_ssr/page-header-CNSACoIl.mjs";
import { t as SearchField } from "./_ssr/search-field-C6sRWTvk.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, t as Dialog } from "./_ssr/dialog-DDp0CC-M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.audit-BaEFx-zc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuditPage() {
	const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
	const logs = useStudio((s) => s.auditLogs);
	const users = useStudio((s) => s.users);
	const locations = useStudio((s) => s.locations);
	const [q, setQ] = (0, import_react.useState)("");
	const [detail, setDetail] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => logs.filter((l) => {
		const user = users.find((u) => u.id === l.userId);
		return matchesQuery(`${l.action} ${l.entityType} ${l.details} ${user?.fullName ?? ""}`, q);
	}), [
		logs,
		users,
		q
	]);
	if (!canViewAudit(role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Nhật ký hệ thống",
			description: "Mọi thao tác quan trọng được ghi lại theo người dùng và cơ sở."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
			value: q,
			onChange: setQ,
			placeholder: "Lọc hành động, người dùng, nội dung",
			className: "mb-4"
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: ScrollText,
			title: "Không có nhật ký"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden grid-cols-[8rem_7rem_1fr_9rem] gap-3 bg-muted/60 px-4 py-3 text-xs uppercase tracking-[0.12em] text-muted-foreground md:grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Thời gian" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hành động" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chi tiết" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Người dùng" })
				]
			}), rows.slice(0, 80).map((l) => {
				const user = users.find((u) => u.id === l.userId);
				const loc = locations.find((x) => x.id === l.locationId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setDetail(l),
					className: "grid w-full gap-1 border-t border-border px-4 py-3 text-left text-sm hover:bg-muted/40 md:grid-cols-[8rem_7rem_1fr_9rem] md:items-center md:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground md:text-sm",
							children: formatDateTime(l.createdAt)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "muted",
							children: l.action
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: l.details
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: user?.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: loc?.name
						})
					]
				}, l.id);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(detail),
			onOpenChange: (v) => !v && setDetail(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Chi tiết nhật ký" }) }), detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Hành động",
						v: detail.action
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Đối tượng",
						v: `${detail.entityType} #${detail.entityId ?? "—"}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Nội dung",
						v: detail.details
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Người dùng",
						v: users.find((u) => u.id === detail.userId)?.fullName ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Cơ sở",
						v: locations.find((l) => l.id === detail.locationId)?.name ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Thời gian",
						v: formatDateTime(detail.createdAt)
					})
				]
			}) : null] })
		})
	] });
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right",
			children: v
		})]
	});
}
//#endregion
export { AuditPage as component };
