import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-CNSACoIl.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-medium tracking-tight text-ink md:text-3xl",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: description
			}) : null]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: actions
		}) : null]
	});
}
//#endregion
export { PageHeader as t };
