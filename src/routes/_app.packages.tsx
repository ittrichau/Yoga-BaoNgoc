import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Package, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { Field } from "@/components/field";
import { PageHeader } from "@/components/page-header";
import { SearchField } from "@/components/search-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { daysBetween, formatDate, formatVnd, isoDate } from "@/lib/format";
import { canEditCatalog } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import { matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/_app/packages")({
  component: PackagesPage,
});

function PackagesPage() {
  const locId = useStudio((s) => s.sessionLocationId)!;
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
  const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId));
  const items = useStudio((s) => s.packageItems);
  const templates = useStudio((s) => s.packageTemplates.filter((t) => t.locationId === locId && t.isActive));
  const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
  const assignPackage = useStudio((s) => s.assignPackage);
  const deactivatePackage = useStudio((s) => s.deactivatePackage);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<number | null>(null);
  const [form, setForm] = useState({ customerId: customers[0]?.id ?? 0, templateId: templates[0]?.id ?? 0, startDate: isoDate(), drinkId: drinks[0]?.id ?? 0 });

  const rows = useMemo(() => {
    return packages
      .filter((p) => {
        const c = customers.find((x) => x.id === p.customerId);
        return matchesQuery(`${p.name} ${c?.fullName ?? ""} ${c?.code ?? ""}`, q);
      })
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [packages, customers, q]);

  const today = isoDate();

  return (
    <div>
      <PageHeader
        title="Gói tập"
        description="Gói trả trước đang gắn với hội viên tại cơ sở này."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" /> Gán gói
          </Button>
        }
      />
      <SearchField value={q} onChange={setQ} placeholder="Tìm hội viên hoặc tên gói" className="mb-4" />
      {rows.length === 0 ? (
        <EmptyState icon={Package} title="Chưa có gói" description="Gán mẫu gói cho hội viên để bắt đầu check-in." />
      ) : (
        <div className="grid gap-3">
          {rows.map((p) => {
            const c = customers.find((x) => x.id === p.customerId);
            const drinksLeft = items.filter((i) => i.packageId === p.id).reduce((s, i) => s + i.remainingServings, 0);
            const daysLeft = p.endDate ? daysBetween(today, p.endDate) : null;
            const warn = !p.isActive || (daysLeft !== null && daysLeft <= 7) || (p.totalSessions > 0 && p.remainingSessions <= 3);
            return (
              <div key={p.id} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-medium">{p.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {c?.code} · {c?.fullName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!p.isActive ? <Badge variant="muted">Vô hiệu</Badge> : warn ? <Badge variant="warning">Sắp hết</Badge> : <Badge variant="success">Đang dùng</Badge>}
                    {canEditCatalog(role) && p.isActive ? (
                      <Button variant="ghost" size="icon" onClick={() => setPending(p.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                  <Meta label="Hiệu lực" value={`${formatDate(p.startDate)} – ${formatDate(p.endDate)}`} />
                  <Meta label="Buổi còn" value={p.totalSessions ? `${p.remainingSessions}/${p.totalSessions}` : "Không giới hạn"} />
                  <Meta label="Ly còn" value={String(drinksLeft)} />
                  <Meta label="Giá trị" value={formatVnd(p.totalAmount)} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gán gói từ mẫu</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Hội viên" required>
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.customerId} onChange={(e) => setForm({ ...form, customerId: Number(e.target.value) })}>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.fullName}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Mẫu gói" required>
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.templateId} onChange={(e) => setForm({ ...form, templateId: Number(e.target.value) })}>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} · {formatVnd(t.totalAmount)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ngày bắt đầu">
              <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </Field>
            <Field label="Đồ uống trong gói">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.drinkId} onChange={(e) => setForm({ ...form, drinkId: Number(e.target.value) })}>
                {drinks.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                const res = assignPackage(form);
                if (res.ok) {
                  toast.success(res.message);
                  setOpen(false);
                } else toast.error(res.message);
              }}
            >
              Gán gói
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={pending !== null}
        onOpenChange={(v) => !v && setPending(null)}
        title="Vô hiệu hóa gói?"
        description="Gói sẽ không còn dùng để check-in. Lịch sử buổi tập được giữ."
        confirmLabel="Vô hiệu hóa"
        destructive
        onConfirm={() => {
          if (pending == null) return;
          const res = deactivatePackage(pending);
          if (res.ok) toast.success(res.message);
          else toast.error(res.message);
          setPending(null);
        }}
      />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/60 px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
