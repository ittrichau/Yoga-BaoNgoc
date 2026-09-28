import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as Search } from "../_libs/lucide-react.mjs";
import { n as cn } from "./router-CyWOvyCW.mjs";
import { t as Input } from "./input-C6m3RfnP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-field-C6sRWTvk.js
var import_jsx_runtime = require_jsx_runtime();
function SearchField({ value, onChange, placeholder = "Tìm kiếm...", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative min-w-0 flex-1", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "pl-9"
		})]
	});
}
//#endregion
export { SearchField as t };
