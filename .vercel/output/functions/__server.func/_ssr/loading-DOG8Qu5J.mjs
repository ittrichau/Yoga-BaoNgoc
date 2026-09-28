import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loading-DOG8Qu5J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var MIN_VISIBLE_MS = 450;
var OVERLAY_ID = "bao-ngoc-app-loader";
var listeners = /* @__PURE__ */ new Set();
var IDLE_SNAPSHOT = {
	busy: false,
	kind: "page",
	label: "Đang tải..."
};
var count = 0;
var kind = "page";
var snapshot = IDLE_SNAPSHOT;
function syncOverlay() {
	if (typeof document === "undefined") return;
	document.body.dataset.appLoading = snapshot.busy ? "true" : "false";
	let root = document.getElementById(OVERLAY_ID);
	if (snapshot.busy) {
		if (!root) {
			root = document.createElement("div");
			root.id = OVERLAY_ID;
			root.className = "app-loader";
			root.setAttribute("role", "status");
			root.setAttribute("aria-live", "polite");
			root.setAttribute("aria-busy", "true");
			root.innerHTML = "<div class=\"app-loader-bar\"></div><div class=\"app-loader-panel\"><div class=\"app-loader-mark\"><span class=\"app-loader-ring\"></span><img src=\"/bao-ngoc-logo-small.png\" alt=\"\" class=\"app-loader-logo\" /></div><p class=\"app-loader-label\"></p></div>";
			document.body.appendChild(root);
		}
		const label = root.querySelector(".app-loader-label");
		if (label) label.textContent = snapshot.label;
	} else if (root) root.remove();
}
function emit() {
	snapshot = count > 0 ? {
		busy: true,
		kind,
		label: kind === "page" ? "Đang tải trang..." : "Đang xử lý..."
	} : IDLE_SNAPSHOT;
	syncOverlay();
	for (const listener of listeners) listener();
}
function subscribeLoading(listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
function getLoadingSnapshot() {
	return snapshot;
}
function beginLoading(nextKind = "action") {
	count += 1;
	kind = nextKind;
	emit();
}
function endLoading() {
	const finish = () => {
		count = Math.max(0, count - 1);
		emit();
	};
	if (typeof window === "undefined") {
		finish();
		return;
	}
	window.setTimeout(finish, MIN_VISIBLE_MS);
}
function useLoading() {
	return (0, import_react.useSyncExternalStore)(subscribeLoading, getLoadingSnapshot, getLoadingSnapshot);
}
function wrapWithLoading(state, keys) {
	const next = { ...state };
	for (const key of keys) {
		const fn = next[key];
		if (typeof fn !== "function") continue;
		const original = fn;
		next[key] = (...args) => {
			beginLoading("action");
			try {
				return original(...args);
			} finally {
				endLoading();
			}
		};
	}
	return next;
}
//#endregion
export { wrapWithLoading as i, endLoading as n, useLoading as r, beginLoading as t };
