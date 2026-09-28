import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime, k as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./router-CyWOvyCW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BW4LFYAQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-sm hover:bg-olive",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
			outline: "border border-border bg-card hover:bg-muted",
			ghost: "hover:bg-muted",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
			sage: "bg-sage text-accent-foreground hover:bg-olive hover:text-primary-foreground"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 rounded-sm px-3 text-xs",
			lg: "h-11 rounded-lg px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
	if (asChild) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		disabled: disabled || loading,
		"aria-busy": loading || void 0,
		...props,
		children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, children]
	});
});
Button.displayName = "Button";
//#endregion
export { buttonVariants as n, Button as t };
