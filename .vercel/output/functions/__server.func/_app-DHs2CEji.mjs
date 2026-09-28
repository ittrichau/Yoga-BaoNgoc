import { b as Navigate, h as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as PageEnter } from "./_ssr/router-CyWOvyCW.mjs";
import { C as useStudio, S as useHydrated } from "./_ssr/store-pW1j3esF.mjs";
import { t as AppShell } from "./_ssr/app-shell-iJROr1Hn.mjs";
import { t as Splash } from "./_ssr/splash-PL2gzM7j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-DHs2CEji.js
var import_jsx_runtime = require_jsx_runtime();
function AppLayout() {
	const hydrated = useHydrated();
	const userId = useStudio((s) => s.sessionUserId);
	const locationId = useStudio((s) => s.sessionLocationId);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!userId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (!locationId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/select-location" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageEnter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) });
}
//#endregion
export { AppLayout as component };
