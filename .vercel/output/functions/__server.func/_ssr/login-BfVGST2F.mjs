import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as useLoading } from "./loading-DOG8Qu5J.mjs";
import { b as Navigate, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useStudio, S as useHydrated, n as DEMO_ACCOUNTS, s as ROLE_LABELS } from "./store-pW1j3esF.mjs";
import { t as Button } from "./button-BW4LFYAQ.mjs";
import { t as Splash } from "./splash-PL2gzM7j.mjs";
import { t as Input } from "./input-C6m3RfnP.mjs";
import { t as Field } from "./field-C20ZZwRX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BfVGST2F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const hydrated = useHydrated();
	const navigate = useNavigate();
	const userId = useStudio((s) => s.sessionUserId);
	const login = useStudio((s) => s.login);
	const { busy } = useLoading();
	const [username, setUsername] = (0, import_react.useState)("admin");
	const [password, setPassword] = (0, import_react.useState)("admin123");
	const [error, setError] = (0, import_react.useState)("");
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (userId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/select-location" });
	function onSubmit(e) {
		e.preventDefault();
		const res = login(username, password);
		if (!res.ok) {
			setError(res.message);
			toast.error(res.message);
			return;
		}
		toast.success(res.message);
		navigate({ to: "/select-location" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(143,175,157,0.18),transparent_55%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-col items-center text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/bao-ngoc-logo.png",
						alt: "Bảo Ngọc",
						className: "h-28 w-auto object-contain sm:h-32"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[11px] tracking-[0.32em] text-muted-foreground",
						children: "FITNESS AND YOGA"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)] sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-medium tracking-tight",
							children: "Đăng nhập"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Dành cho giáo viên và quản lý cơ sở."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Tên đăng nhập",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: username,
										onChange: (e) => setUsername(e.target.value),
										autoComplete: "username"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Mật khẩu",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										autoComplete: "current-password"
									})
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-destructive",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "h-11 w-full",
									loading: busy,
									children: "Vào hệ thống"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-xl bg-card/80 p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
						children: "Tài khoản demo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2",
						children: DEMO_ACCOUNTS.map((acc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center justify-between rounded-lg bg-muted/70 px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
							onClick: () => {
								setUsername(acc.username);
								setPassword(acc.password);
								setError("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: acc.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-muted-foreground",
								children: ROLE_LABELS[acc.role]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-olive",
								children: [
									acc.username,
									" / ",
									acc.password
								]
							})]
						}, acc.username))
					})]
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
