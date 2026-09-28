import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { SearchField } from "@/components/search-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { daysBetween, formatDate, formatVnd, isoDate } from "@/lib/format";
import { useStudio } from "@/lib/store";
import { initials, matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/_app/checkin")({
  component: CheckinPage,
});

function CheckinPage() {
  const locId = useStudio((s) => s.sessionLocationId);
  const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
  const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId && p.isActive));
  const items = useStudio((s) => s.packageItems);
  const drinks = useStudio((s) => s.drinks);
  const sessions = useStudio((s) => s.packageSessions);
  const checkin = useStudio((s) => s.checkin);
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(customers[0]?.id ?? null);

  const filtered = useMemo(
    () => customers.filter((c) => matchesQuery(`${c.code} ${c.fullName} ${c.phone}`, q)),
    [customers, q],
  );
  const selected = customers.find((c) => c.id === selectedId) ?? filtered[0];
  const today = isoDate();
  const customerPackages = packages.filter((p) => p.customerId === selected?.id);
  const todayCount = sessions.filter((s) => s.checkinDate === today).length;

  return (
    <div>
      <PageHeader
        title="Check-in buổi tập"
        description={`${todayCount} lượt check-in hôm nay tại cơ sở này.`}
      />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <Card>
          <CardContent className="p-4 sm:p-5">
            <SearchField value={q} onChange={setQ} placeholder="Tìm mã, tên hoặc số điện thoại" />
            <div className="mt-3 max-h-[60vh] space-y-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-2 py-8 text-center text-sm text-muted-foreground">Không tìm thấy hội viên.</p>
              ) : (
                filtered.map((c) => {
                  const active = selected?.id === c.id;
                  const pkgCount = packages.filter((p) => p.customerId === c.id).length;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedId(c.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors ${
                        active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <span
                        className={`flex size-9 items-center justify-center rounded-full text-xs font-medium ${
                          active ? "bg-primary-foreground/15" : "bg-sage/20 text-olive"
                        }`}
                      >
                        {initials(c.fullName)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{c.fullName}</span>
                        <span className={`block text-xs ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {c.code} · {c.phone || "Không có SĐT"}
                        </span>
                      </span>
                      <Badge variant={active ? "outline" : "muted"}>{pkgCount} gói</Badge>
                    </button>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        <div>
          {!selected ? (
            <EmptyState icon={ScanLine} title="Chọn hội viên" description="Tìm và chọn hội viên bên trái để check-in." />
          ) : (
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{selected.code}</p>
                  <h2 className="mt-1 font-display text-2xl font-medium">{selected.fullName}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{selected.phone || "Chưa có số điện thoại"}</p>
                </CardContent>
              </Card>
              {customerPackages.length === 0 ? (
                <EmptyState
                  icon={ScanLine}
                  title="Chưa có gói tập"
                  description="Hội viên này chưa được gán gói. Vào mục Gói tập để gán mẫu gói."
                />
              ) : (
                customerPackages.map((pkg) => {
                  const remainingDrinks = items
                    .filter((i) => i.packageId === pkg.id)
                    .reduce((sum, i) => sum + i.remainingServings, 0);
                  const expired = Boolean(pkg.endDate && pkg.endDate < today);
                  const daysLeft = pkg.endDate ? daysBetween(today, pkg.endDate) : null;
                  const drinkNames = items
                    .filter((i) => i.packageId === pkg.id)
                    .map((i) => drinks.find((d) => d.id === i.drinkId)?.name)
                    .filter(Boolean)
                    .join(", ");
                  return (
                    <Card key={pkg.id}>
                      <CardContent className="p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-lg font-medium">{pkg.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {formatDate(pkg.startDate)} — {formatDate(pkg.endDate)} · {formatVnd(pkg.totalAmount)}
                            </p>
                          </div>
                          {expired ? <Badge variant="danger">Hết hạn</Badge> : <Badge variant="success">Đang dùng</Badge>}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <Stat label="Buổi còn" value={pkg.totalSessions ? `${pkg.remainingSessions}/${pkg.totalSessions}` : "—"} />
                          <Stat label="Ly còn" value={String(remainingDrinks)} />
                          <Stat label="Hạn" value={daysLeft === null ? "—" : daysLeft < 0 ? "Hết hạn" : `${daysLeft} ngày`} />
                        </div>
                        {drinkNames ? <p className="mt-3 text-xs text-muted-foreground">Đồ uống: {drinkNames}</p> : null}
                        <Button
                          className="mt-4 w-full sm:w-auto"
                          disabled={expired || (pkg.totalSessions > 0 && pkg.remainingSessions <= 0) || remainingDrinks <= 0}
                          onClick={() => {
                            const res = checkin({ customerId: selected.id, packageId: pkg.id });
                            if (res.ok) toast.success(res.message);
                            else toast.error(res.message);
                          }}
                        >
                          Check-in buổi tập
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/70 px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium tabular-nums">{value}</p>
    </div>
  );
}
