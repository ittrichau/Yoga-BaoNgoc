import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Dumbbell, Plus } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/empty-state";
import { Field } from "@/components/field";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatVnd, isoDate } from "@/lib/format";
import { canEditCatalog } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import { PT_LOC_LABELS, PT_RATE_LABELS, type PtLocationType, type PtRateType } from "@/lib/types";

export const Route = createFileRoute("/_app/pt")({
  component: PtPage,
});

function PtPage() {
  const locId = useStudio((s) => s.sessionLocationId)!;
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
  const users = useStudio((s) => s.users.filter((u) => u.isActive));
  const rates = useStudio((s) => s.ptRates.filter((r) => r.locationId === locId && r.isActive));
  const sessions = useStudio((s) => s.ptSessions.filter((p) => p.locationId === locId));
  const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
  const record = useStudio((s) => s.recordPtSession);
  const upsertRate = useStudio((s) => s.upsertPtRate);
  const [open, setOpen] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);
  const [form, setForm] = useState({
    customerId: customers[0]?.id ?? 0,
    trainerId: users.find((u) => u.role === "TEACHER")?.id ?? users[0]?.id ?? 0,
    ptRateId: rates[0]?.id ?? 0,
    sessionDate: isoDate(),
    durationHours: 1,
    includeNutrition: false,
    drinkId: drinks[0]?.id ?? 0,
    notes: "",
  });
  const [rateForm, setRateForm] = useState({
    name: "",
    locationType: "AT_GYM" as PtLocationType,
    rateType: "PER_SESSION" as PtRateType,
    price: 220000,
  });

  return (
    <div>
      <PageHeader
        title="Buổi PT"
        description="Ghi nhận buổi tập với HLV và bảng giá."
        actions={
          <>
            {canEditCatalog(role) ? (
              <Button variant="outline" onClick={() => setRateOpen(true)}>
                Thêm bảng giá
              </Button>
            ) : null}
            <Button onClick={() => setOpen(true)}>
              <Plus className="size-4" /> Ghi buổi PT
            </Button>
          </>
        }
      />
      <div className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {rates.map((r) => (
          <div key={r.id} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
            <p className="text-sm font-medium">{r.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {PT_LOC_LABELS[r.locationType]} · {PT_RATE_LABELS[r.rateType]}
            </p>
            <p className="mt-2 tabular-nums text-olive">{formatVnd(r.price)}</p>
          </div>
        ))}
      </div>
      {sessions.length === 0 ? (
        <EmptyState icon={Dumbbell} title="Chưa có buổi PT" />
      ) : (
        <div className="grid gap-2">
          {sessions
            .slice()
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map((s) => {
              const c = customers.find((x) => x.id === s.customerId);
              const t = users.find((u) => u.id === s.trainerId);
              const r = rates.find((x) => x.id === s.ptRateId);
              return (
                <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
                  <div>
                    <p className="font-medium">{c?.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {t?.fullName} · {r?.name} · {formatDate(s.sessionDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.includeNutrition ? <Badge>Kèm đồ uống</Badge> : null}
                    <span className="tabular-nums font-medium">{formatVnd(s.totalAmount)}</span>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ghi buổi PT</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Hội viên" required>
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.customerId} onChange={(e) => setForm({ ...form, customerId: Number(e.target.value) })}>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.code} — {c.fullName}</option>
                ))}
              </select>
            </Field>
            <Field label="Huấn luyện viên">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.trainerId} onChange={(e) => setForm({ ...form, trainerId: Number(e.target.value) })}>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.fullName}</option>
                ))}
              </select>
            </Field>
            <Field label="Bảng giá">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.ptRateId} onChange={(e) => setForm({ ...form, ptRateId: Number(e.target.value) })}>
                {rates.map((r) => (
                  <option key={r.id} value={r.id}>{r.name} · {formatVnd(r.price)}</option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Ngày">
                <Input type="date" value={form.sessionDate} onChange={(e) => setForm({ ...form, sessionDate: e.target.value })} />
              </Field>
              <Field label="Số giờ">
                <Input type="number" step="0.5" value={form.durationHours} onChange={(e) => setForm({ ...form, durationHours: Number(e.target.value) })} />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.includeNutrition} onChange={(e) => setForm({ ...form, includeNutrition: e.target.checked })} />
              Kèm đồ uống dinh dưỡng
            </label>
            {form.includeNutrition ? (
              <Field label="Đồ uống">
                <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.drinkId} onChange={(e) => setForm({ ...form, drinkId: Number(e.target.value) })}>
                  {drinks.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </Field>
            ) : null}
            <Field label="Ghi chú">
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
            <Button
              onClick={() => {
                const res = record({ ...form, drinkId: form.includeNutrition ? form.drinkId : null });
                if (res.ok) {
                  toast.success(res.message);
                  setOpen(false);
                } else toast.error(res.message);
              }}
            >
              Lưu buổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rateOpen} onOpenChange={setRateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm bảng giá PT</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Tên" required>
              <Input value={rateForm.name} onChange={(e) => setRateForm({ ...rateForm, name: e.target.value })} />
            </Field>
            <Field label="Nơi tập">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={rateForm.locationType} onChange={(e) => setRateForm({ ...rateForm, locationType: e.target.value as PtLocationType })}>
                {Object.entries(PT_LOC_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Cách tính">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={rateForm.rateType} onChange={(e) => setRateForm({ ...rateForm, rateType: e.target.value as PtRateType })}>
                {Object.entries(PT_RATE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Giá">
              <Input type="number" value={rateForm.price} onChange={(e) => setRateForm({ ...rateForm, price: Number(e.target.value) })} />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRateOpen(false)}>Hủy</Button>
            <Button
              onClick={() => {
                const res = upsertRate(rateForm);
                if (res.ok) {
                  toast.success(res.message);
                  setRateOpen(false);
                } else toast.error(res.message);
              }}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
