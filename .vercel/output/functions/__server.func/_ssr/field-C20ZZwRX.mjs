import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as cn } from "./router-CyWOvyCW.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-C20ZZwRX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
	...props
}));
Label.displayName = Root.displayName;
function Field({ label, required, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-0.5 text-destructive",
			children: "*"
		}) : null] }), children]
	});
}
//#endregion
export { Field as t };
