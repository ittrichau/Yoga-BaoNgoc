import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Package, ScanLine, ShoppingBag, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BirthdayNudge } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { daysBetween, formatNumber, formatVnd, isoDate } from "@/lib/format";
import { canViewAudit } from "@/lib/permissions";
import { useStudio } from "@/lib/store";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const locId = useStudio((s) => s.sessionLocationId);
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const locationName = useStudio((s) => s.locations.find((l) => l.id === locId)?.name ?? "");
  const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
  const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
  const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId && p.isActive));
  const ingredients = useStudio((s) => s.ingredients.filter((i) => i.locationId === locId && i.isActive));
  const products = useStudio((s) => s.products.filter((p) => p.locationId === locId && p.isActive));
  const transactions = useStudio((s) => s.transactions.filter((t) => t.locationId === locId));
  const sessions = useStudio((s) => s.packageSessions);
  const users = useStudio((s) => s.users);

  const today = isoDate();
  const monthPrefix = today.slice(0, 7);
  const todayTx = transactions.filter((t) => t.createdAt.startsWith(today));
  const monthTx = transactions.filter((t) => t.createdAt.startsWith(monthPrefix));
  const todayCheckins = sessions.filter((s) => {
    const pkg = packages.find((p) => p.id === s.packageId);
    return pkg && s.checkinDate === today;
  }).length;
  const todayRevenue = todayTx.reduce((sum, t) => sum + t.amount, 0);
  const monthRevenue = monthTx.reduce((sum, t) => sum + t.amount, 0);
  const lowIngredients = ingredients.filter((i) => i.currentStock <= i.minStock);
  const lowProducts = products.filter((p) => p.currentStock <= p.minStock);

  const expiring = packages
    .map((p) => {
      const customer = customers.find((c) => c.id === p.customerId);
      const reasons: string[] = [];
      if (p.endDate) {
        const left = daysBetween(today, p.endDate);
        if (left < 0) reasons.push(`Đã hết hạn ${Math.abs(left)} ngày`);
        else if (left <= 7) reasons.push(`Còn ${left} ngày hết hạn`);
      }
      if (p.totalSessions > 0 && p.remainingSessions <= 3) {
        reasons.push(`Chỉ còn ${p.remainingSessions}/${p.totalSessions} buổi`);
      }
      return { p, customer, reasons };
    })
    .filter((x) => x.reasons.length > 0)
    .slice(0, 8);

  const chart = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = isoDate(d);
    const amount = transactions.filter((t) => t.createdAt.startsWith(key)).reduce((sum, t) => sum + t.amount, 0);
    return { day: `${d.getDate()}/${d.getMonth() + 1}`, amount };
  });

  const fraud = canViewAudit(role)
    ? todayTx
        .filter((t) => t.kind === "drink" && t.amount === 0 && !t.packageItemId && !t.sessionCheckin)
        .map((t) => {
          const c = customers.find((x) => x.id === t.customerId);
          const d = drinks.find((x) => x.id === t.drinkId);
          return `Bán ${d?.name ?? "đồ uống"} cho ${c?.fullName ?? "hội viên"} không có gói, không thu tiền.`;
        })
    : [];

  const recent = [...transactions]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 6);

  const stats = [
    { label: "Hội viên", value: formatNumber(customers.length), hint: "Đang hoạt động", icon: Users },
    { label: "Doanh thu hôm nay", value: formatVnd(todayRevenue), hint: `${todayTx.length} giao dịch`, icon: ShoppingBag },
    { label: "Doanh thu tháng", value: formatVnd(monthRevenue), hint: monthPrefix, icon: Package },
    { label: "Check-in hôm nay", value: formatNumber(todayCheckins), hint: `${drinks.length} đồ uống`, icon: ScanLine },
  ];

  return (
    <div>
      <PageHeader
        title="Trang chính"
        description={locationName}
        actions={
          <>
            <Button variant="sage" asChild>
              <Link to="/checkin">Check-in</Link>
            </Button>
            <Button asChild>
              <Link to="/sales">Bán hàng</Link>
            </Button>
          </>
        }
      />
      <BirthdayNudge />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-start justify-between p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{s.label}</p>
                <p className="mt-2 font-display text-2xl font-medium tabular-nums tracking-tight">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-lg bg-sage/20 text-olive">
                <s.icon className="size-4" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Doanh thu 14 ngày</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8FAF9D" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#8FAF9D" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E4DDD2" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#6B756F", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "#6B756F", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
                />
                <ReTooltip
                  formatter={(v) => formatVnd(Number(v ?? 0))}
                  contentStyle={{ borderRadius: 12, borderColor: "#E4DDD2", background: "#FFFCF8" }}
                />
                <Area type="monotone" dataKey="amount" stroke="#4F6B5C" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Gói cần chú ý</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/packages">Xem gói</Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-2">
            {expiring.length === 0 ? (
              <p className="text-sm text-muted-foreground">Không có gói sắp hết hạn hoặc hết buổi.</p>
            ) : (
              expiring.map(({ p, customer, reasons }) => (
                <div key={p.id} className="rounded-lg bg-muted/60 px-3 py-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">
                      {customer?.fullName} <span className="text-muted-foreground">· {customer?.code}</span>
                    </p>
                    <Badge variant="warning">Cảnh báo</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{p.name}</p>
                  <p className="mt-1 text-xs text-warning">{reasons.join(" · ")}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Tồn kho thấp</CardTitle>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/ingredients">Nguyên liệu</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            {lowIngredients.length + lowProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Tồn kho ổn định.</p>
            ) : (
              <>
                {lowIngredients.map((i) => (
                  <div key={`i-${i.id}`} className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-sm">
                    <span>{i.name}</span>
                    <Badge variant="danger">
                      {i.currentStock} / {i.minStock} {i.unit}
                    </Badge>
                  </div>
                ))}
                {lowProducts.map((p) => (
                  <div key={`p-${p.id}`} className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-sm">
                    <span>{p.name}</span>
                    <Badge variant="danger">
                      {p.currentStock} / {p.minStock}
                    </Badge>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {recent.map((t) => {
              const c = customers.find((x) => x.id === t.customerId);
              const staff = users.find((u) => u.id === t.createdBy);
              return (
                <div key={t.id} className="flex items-center justify-between gap-3 rounded-lg bg-muted/60 px-3 py-2 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c?.fullName ?? "Hội viên"}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {staff?.fullName} · {t.notes || t.kind}
                    </p>
                  </div>
                  <span className="tabular-nums text-sm">{t.amount ? formatVnd(t.amount) : "Gói"}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {canViewAudit(role) && fraud.length > 0 ? (
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-warning" /> Cảnh báo gian lận
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {fraud.map((msg) => (
              <p key={msg} className="rounded-lg bg-warning/10 px-3 py-2 text-sm text-warning">
                {msg}
              </p>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
