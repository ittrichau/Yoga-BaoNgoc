import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as cn } from "./router-CyWOvyCW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empty-state-CLk7TO76.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ icon: Icon, title, description, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center justify-center gap-3 rounded-xl bg-card px-6 py-14 text-center shadow-[var(--shadow-border)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-12 items-center justify-center rounded-full bg-muted text-olive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-sm text-sm text-muted-foreground",
				children: description
			}) : null] }),
			action
		]
	});
}
//#endregion
export { EmptyState as t };
