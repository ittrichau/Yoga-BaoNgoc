import { b as Navigate, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useStudio, S as useHydrated } from "./store-pW1j3esF.mjs";
import { t as Button } from "./button-BW4LFYAQ.mjs";
import { t as Splash } from "./splash-PL2gzM7j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/select-location-CnGPr0z-.js
var import_jsx_runtime = require_jsx_runtime();
function SelectLocationPage() {
	const hydrated = useHydrated();
	const navigate = useNavigate();
	const userId = useStudio((s) => s.sessionUserId);
	const user = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId));
	const locations = useStudio((s) => {
		if (!s.sessionUserId) return [];
		const ids = s.userLocations.filter((ul) => ul.userId === s.sessionUserId).map((ul) => ul.locationId);
		return s.locations.filter((l) => l.isActive && ids.includes(l.id));
	});
	const selectLocation = useStudio((s) => s.selectLocation);
	const logout = useStudio((s) => s.logout);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!userId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-background px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/bao-ngoc-logo.png",
							alt: "Bảo Ngọc",
							className: "h-20 w-auto object-contain"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 font-display text-3xl font-medium tracking-tight",
							children: "Chọn cơ sở làm việc"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								"Xin chào ",
								user?.fullName,
								". Dữ liệu hội viên, kho và giao dịch được lọc theo cơ sở bạn chọn."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: locations.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex items-start gap-4 rounded-xl bg-card p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]",
						onClick: () => {
							const res = selectLocation(loc.id);
							if (!res.ok) {
								toast.error(res.message);
								return;
							}
							toast.success(res.message);
							navigate({ to: "/dashboard" });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 items-center justify-center rounded-lg bg-sage/20 text-olive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-lg font-medium",
							children: loc.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted-foreground",
							children: loc.address || "Chưa có địa chỉ"
						})] })]
					}, loc.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							logout();
							navigate({ to: "/login" });
						},
						children: "Đăng xuất"
					})
				})
			]
		})
	});
}
//#endregion
export { SelectLocationPage as component };
