import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ClipboardList,
  CupSoda,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Package,
  ScanLine,
  Settings2,
  ShoppingBag,
  Sparkles,
  UserRound,
  Users,
  Warehouse,
  ScrollText,
  Dumbbell,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStudio } from "@/lib/store";
import { canManageTemplates, canManageUsers, canViewAudit } from "@/lib/permissions";
import { ROLE_LABELS, type Role } from "@/lib/types";
import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  minRole?: Role;
};

const PRIMARY_NAV: NavItem[] = [
  { to: "/dashboard", label: "Trang chính", icon: LayoutDashboard },
  { to: "/checkin", label: "Check-in", icon: ScanLine },
  { to: "/sales", label: "Bán hàng", icon: ShoppingBag },
  { to: "/customers", label: "Hội viên", icon: Users },
  { to: "/packages", label: "Gói tập", icon: Package },
  { to: "/pt", label: "Buổi PT", icon: Dumbbell },
];

const CATALOG_NAV: NavItem[] = [
  { to: "/drinks", label: "Đồ uống", icon: CupSoda },
  { to: "/ingredients", label: "Nguyên liệu", icon: Warehouse },
  { to: "/products", label: "Sản phẩm", icon: Sparkles },
];

const ADMIN_NAV: NavItem[] = [
  { to: "/package-templates", label: "Mẫu gói", icon: ClipboardList, minRole: "OWNER" },
  { to: "/package-upgrade", label: "Nâng cấp gói", icon: ArrowUpRight, minRole: "OWNER" },
  { to: "/audit", label: "Nhật ký", icon: ScrollText, minRole: "OWNER" },
  { to: "/users", label: "Người dùng", icon: UserRound, minRole: "ADMIN" },
  { to: "/locations", label: "Cơ sở", icon: Settings2, minRole: "ADMIN" },
];

function canSee(item: NavItem, role: Role | null) {
  if (!item.minRole) return true;
  if (item.minRole === "OWNER") return canManageTemplates(role) || canViewAudit(role);
  return canManageUsers(role);
}

function NavLinks({
  role,
  pathname,
  onNavigate,
}: {
  role: Role | null;
  pathname: string;
  onNavigate?: () => void;
}) {
  const groups = [
    { title: "Vận hành", items: PRIMARY_NAV },
    { title: "Kho & menu", items: CATALOG_NAV },
    { title: "Quản trị", items: ADMIN_NAV.filter((i) => canSee(i, role)) },
  ];
  return (
    <nav className="flex flex-col gap-5 px-3 pb-6">
      {groups.map((group) =>
        group.items.length === 0 ? null : (
          <div key={group.title}>
            <p className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {group.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = pathname === item.to || pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "flex h-10 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium transition-colors",
                      active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ),
      )}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (l) => l.pathname });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId));
  const location = useStudio((s) => s.locations.find((l) => l.id === s.sessionLocationId));
  const locations = useStudio((s) => {
    const ids = s.userLocations.filter((ul) => ul.userId === s.sessionUserId).map((ul) => ul.locationId);
    return s.locations.filter((l) => l.isActive && ids.includes(l.id));
  });
  const selectLocation = useStudio((s) => s.selectLocation);
  const logout = useStudio((s) => s.logout);

  const brand = useMemo(
    () => (
      <div className="flex items-center justify-center px-4 py-5">
        <img src="/bao-ngoc-logo.png" alt="Bảo Ngọc" className="h-16 w-auto object-contain" />
      </div>
    ),
    [],
  );

  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-card md:flex">
        {brand}
        <div className="flex-1 overflow-y-auto">
          <NavLinks role={user?.role ?? null} pathname={pathname} />
        </div>
        <div className="border-t border-border p-3">
          <p className="truncate px-2 text-xs text-muted-foreground">{location?.name}</p>
        </div>
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          {brand}
          <NavLinks role={user?.role ?? null} pathname={pathname} onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background/90 px-3 backdrop-blur-sm sm:px-5">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)} aria-label="Mở menu">
            <Menu className="size-5" />
          </Button>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <MapPin className="size-3.5" />
            <span className="truncate">{location?.name}</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="sage" size="sm" className="hidden sm:inline-flex" asChild>
              <Link to="/checkin">Check-in</Link>
            </Button>
            <Button size="sm" className="hidden sm:inline-flex" asChild>
              <Link to="/sales">Bán hàng</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="max-w-48">
                  <MapPin className="size-3.5" />
                  <span className="truncate">{location?.name ?? "Cơ sở"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Đổi cơ sở</DropdownMenuLabel>
                {locations.map((loc) => (
                  <DropdownMenuItem
                    key={loc.id}
                    onClick={() => {
                      const res = selectLocation(loc.id);
                      if (res.ok) toast.success(res.message);
                      else toast.error(res.message);
                    }}
                  >
                    {loc.name}
                    {loc.id === location?.id ? <Badge className="ml-auto">Hiện tại</Badge> : null}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/select-location" })}>Tất cả cơ sở</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 gap-2 px-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-sage/30 text-xs font-medium text-olive">
                    {initials(user?.fullName ?? "NV")}
                  </span>
                  <span className="hidden max-w-32 truncate text-left text-sm sm:block">{user?.fullName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">{user?.fullName}</span>
                    <span className="text-xs font-normal">{user ? ROLE_LABELS[user.role] : ""}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate({ to: "/login" });
                  }}
                >
                  <LogOut className="size-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="px-3 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function BirthdayNudge() {
  const todayBirthdays = useStudio((s) => {
    const loc = s.sessionLocationId;
    const today = new Date();
    const mmdd = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return s.customers.filter((c) => c.locationId === loc && c.isActive && c.birthDate.slice(5, 10) === mmdd);
  });
  if (!todayBirthdays.length) return null;
  return (
    <div className="mb-5 flex items-start gap-3 rounded-xl bg-sage/15 px-4 py-3 text-sm text-ink shadow-[var(--shadow-border)]">
      <Bell className="mt-0.5 size-4 text-olive" />
      <p>
        Sinh nhật hôm nay:{" "}
        <span className="font-medium">{todayBirthdays.map((c) => `${c.fullName} (${c.code})`).join(", ")}</span>
      </p>
    </div>
  );
}
