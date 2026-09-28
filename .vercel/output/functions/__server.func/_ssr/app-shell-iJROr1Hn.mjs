import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useLocation, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime, d as DialogContent, h as DialogTitle, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as LayoutDashboard, E as ClipboardList, O as Bell, T as CupSoda, _ as Package, b as MapPin, f as ScrollText, i as UserRound, k as ArrowUpRight, l as ShoppingBag, n as Warehouse, p as ScanLine, r as Users, s as Sparkles, t as X, u as Settings2, w as Dumbbell, x as LogOut, y as Menu } from "../_libs/lucide-react.mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as cn, r as initials } from "./router-CyWOvyCW.mjs";
import { C as useStudio, f as canManageTemplates, h as canViewAudit, p as canManageUsers, s as ROLE_LABELS } from "./store-pW1j3esF.mjs";
import { t as Badge } from "./badge-AaoE7jSB.mjs";
import { t as Button } from "./button-BW4LFYAQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-iJROr1Hn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var SheetContent = import_react.forwardRef(({ side = "left", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 flex h-full flex-col bg-card shadow-lg transition ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-400", side === "left" && "inset-y-0 left-0 w-72 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left", side === "right" && "inset-y-0 right-0 w-80 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		className: "absolute right-3 top-3 flex size-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted",
		"aria-label": "Đóng",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
	})]
})] }));
SheetContent.displayName = DialogContent.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5 pr-12", className),
		...props
	});
}
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("font-display text-lg", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none transition-colors focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var PRIMARY_NAV = [
	{
		to: "/dashboard",
		label: "Trang chính",
		icon: LayoutDashboard
	},
	{
		to: "/checkin",
		label: "Check-in",
		icon: ScanLine
	},
	{
		to: "/sales",
		label: "Bán hàng",
		icon: ShoppingBag
	},
	{
		to: "/customers",
		label: "Hội viên",
		icon: Users
	},
	{
		to: "/packages",
		label: "Gói tập",
		icon: Package
	},
	{
		to: "/pt",
		label: "Buổi PT",
		icon: Dumbbell
	}
];
var CATALOG_NAV = [
	{
		to: "/drinks",
		label: "Đồ uống",
		icon: CupSoda
	},
	{
		to: "/ingredients",
		label: "Nguyên liệu",
		icon: Warehouse
	},
	{
		to: "/products",
		label: "Sản phẩm",
		icon: Sparkles
	}
];
var ADMIN_NAV = [
	{
		to: "/package-templates",
		label: "Mẫu gói",
		icon: ClipboardList,
		minRole: "OWNER"
	},
	{
		to: "/package-upgrade",
		label: "Nâng cấp gói",
		icon: ArrowUpRight,
		minRole: "OWNER"
	},
	{
		to: "/audit",
		label: "Nhật ký",
		icon: ScrollText,
		minRole: "OWNER"
	},
	{
		to: "/users",
		label: "Người dùng",
		icon: UserRound,
		minRole: "ADMIN"
	},
	{
		to: "/locations",
		label: "Cơ sở",
		icon: Settings2,
		minRole: "ADMIN"
	}
];
function canSee(item, role) {
	if (!item.minRole) return true;
	if (item.minRole === "OWNER") return canManageTemplates(role) || canViewAudit(role);
	return canManageUsers(role);
}
function NavLinks({ role, pathname, onNavigate }) {
	const groups = [
		{
			title: "Vận hành",
			items: PRIMARY_NAV
		},
		{
			title: "Kho & menu",
			items: CATALOG_NAV
		},
		{
			title: "Quản trị",
			items: ADMIN_NAV.filter((i) => canSee(i, role))
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-5 px-3 pb-6",
		children: groups.map((group) => group.items.length === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1.5 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
			children: group.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-0.5",
			children: group.items.map((item) => {
				const active = pathname === item.to || pathname.startsWith(item.to + "/");
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					onClick: onNavigate,
					className: cn("flex h-10 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium transition-colors", active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), item.label]
				}, item.to);
			})
		})] }, group.title))
	});
}
function AppShell({ children }) {
	const pathname = useLocation({ select: (l) => l.pathname });
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const user = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId));
	const location = useStudio((s) => s.locations.find((l) => l.id === s.sessionLocationId));
	const locations = useStudio((s) => {
		const ids = s.userLocations.filter((ul) => ul.userId === s.sessionUserId).map((ul) => ul.locationId);
		return s.locations.filter((l) => l.isActive && ids.includes(l.id));
	});
	const selectLocation = useStudio((s) => s.selectLocation);
	const logout = useStudio((s) => s.logout);
	const brand = (0, import_react.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center px-4 py-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/bao-ngoc-logo.png",
			alt: "Bảo Ngọc",
			className: "h-16 w-auto object-contain"
		})
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-card md:flex",
				children: [
					brand,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
							role: user?.role ?? null,
							pathname
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate px-2 text-xs text-muted-foreground",
							children: location?.name
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "w-72 p-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
							className: "sr-only",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Menu" })
						}),
						brand,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
							role: user?.role ?? null,
							pathname,
							onNavigate: () => setOpen(false)
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background/90 px-3 backdrop-blur-sm sm:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "md:hidden",
							onClick: () => setOpen(true),
							"aria-label": "Mở menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-2 text-sm text-muted-foreground md:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: location?.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "sage",
									size: "sm",
									className: "hidden sm:inline-flex",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/checkin",
										children: "Check-in"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "hidden sm:inline-flex",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/sales",
										children: "Bán hàng"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										className: "max-w-48",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: location?.name ?? "Cơ sở"
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Đổi cơ sở" }),
										locations.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => {
												const res = selectLocation(loc.id);
												if (res.ok) toast.success(res.message);
												else toast.error(res.message);
											},
											children: [loc.name, loc.id === location?.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: "ml-auto",
												children: "Hiện tại"
											}) : null]
										}, loc.id)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onClick: () => navigate({ to: "/select-location" }),
											children: "Tất cả cơ sở"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										className: "h-10 gap-2 px-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-8 items-center justify-center rounded-full bg-sage/30 text-xs font-medium text-olive",
											children: initials(user?.fullName ?? "NV")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden max-w-32 truncate text-left text-sm sm:block",
											children: user?.fullName
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									className: "w-56",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-foreground",
												children: user?.fullName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-normal",
												children: user ? ROLE_LABELS[user.role] : ""
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => {
												logout();
												navigate({ to: "/login" });
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Đăng xuất"]
										})
									]
								})] })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-3 py-5 sm:px-6 sm:py-6 lg:px-8",
					children
				})]
			})
		]
	});
}
function BirthdayNudge() {
	const todayBirthdays = useStudio((s) => {
		const loc = s.sessionLocationId;
		const today = /* @__PURE__ */ new Date();
		const mmdd = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
		return s.customers.filter((c) => c.locationId === loc && c.isActive && c.birthDate.slice(5, 10) === mmdd);
	});
	if (!todayBirthdays.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex items-start gap-3 rounded-xl bg-sage/15 px-4 py-3 text-sm text-ink shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mt-0.5 size-4 text-olive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"Sinh nhật hôm nay:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: todayBirthdays.map((c) => `${c.fullName} (${c.code})`).join(", ")
			})
		] })]
	});
}
//#endregion
export { BirthdayNudge as n, AppShell as t };
