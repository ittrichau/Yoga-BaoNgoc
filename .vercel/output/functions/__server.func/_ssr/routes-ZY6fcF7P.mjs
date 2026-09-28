import { b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as useStudio, S as useHydrated } from "./store-pW1j3esF.mjs";
import { t as Splash } from "./splash-PL2gzM7j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ZY6fcF7P.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const hydrated = useHydrated();
	const userId = useStudio((s) => s.sessionUserId);
	const locationId = useStudio((s) => s.sessionLocationId);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!userId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (!locationId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/select-location" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
}
//#endregion
export { Home as component };
