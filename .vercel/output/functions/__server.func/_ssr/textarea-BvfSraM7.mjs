import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as cn } from "./router-CyWOvyCW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-BvfSraM7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	className: cn("flex min-h-24 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Textarea.displayName = "Textarea";
//#endregion
export { Textarea as t };
