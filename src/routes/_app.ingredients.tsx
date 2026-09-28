import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, SlidersHorizontal, Trash2, Warehouse } from "lucide-react";
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
import { formatDateTime } from "@/lib/format";
import { canAdjustStock, canEditCatalog, canSoftDelete } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import { ADJUST_LABELS, UNIT_LABELS, type AdjustmentType, type Ingredient, type IngredientUnit } from "@/lib/types";
import { matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/_app/ingredients")({
  component: IngredientsPage,
});

function IngredientsPage() {
  const locId = useStudio((s) => s.sessionLocationId)!;
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const rowsAll = useStudio((s) => s.ingredients.filter((i) => i.locationId === locId && i.isActive));
  const history = useStudio((s) => s.inventoryAdjustments.filter((a) => a.locationId === locId));
  const users = useStudio((s) => s.users);
  const upsert = useStudio((s) => s.upsertIngredient);
  const deactivate = useStudio((s) => s.deactivateIngredient);
  const adjust = useStudio((s) => s.adjustIngredient);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Ingredient | null>(null);
  const [pending, setPending] = useState<Ingredient | null>(null);
  const [adjusting, setAdjusting] = useState<Ingredient | null>(null);
  const [form, setForm] = useState({ name: "", unit: "muỗng" as IngredientUnit, minStock: 10 });
  const [adj, setAdj] = useState({ type: "add" as AdjustmentType, quantity: 10, reason: "" });

  const rows = useMemo(() => rowsAll.filter((i) => matchesQuery(i.name, q)), [rowsAll, q]);

  return (
    <div>
      <PageHeader
        title="Nguyên liệu"
        description="Tồn kho theo muỗng / nắp / gói. Chỉ Admin được điều chỉnh."
        actions={
          canEditCatalog(role) ? (
            <Button
              onClick={() => {
                setEditing(null);
                setForm({ name: "", unit: "muỗng", minStock: 10 });
                setOpen(true);
              }}
            >
              <Plus className="size-4" /> Thêm nguyên liệu
            </Button>
          ) : null
        }
      />
      <SearchField value={q} onChange={setQ} placeholder="Tìm nguyên liệu" className="mb-4" />
      {rows.length === 0 ? (
        <EmptyState icon={Warehouse} title="Chưa có nguyên liệu" />
      ) : (
        <div className="grid gap-3">
          {rows.map((i) => {
            const low = i.currentStock <= i.minStock;
            return (
              <div key={i.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Tối thiểu {i.minStock} {UNIT_LABELS[i.unit]}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={low ? "danger" : "success"}>
                    {i.currentStock} {i.unit}
                  </Badge>
                  {canAdjustStock(role) ? (
                    <Button variant="outline" size="sm" onClick={() => { setAdjusting(i); setAdj({ type: "add", quantity: 10, reason: "" }); }}>
                      <SlidersHorizontal className="size-3.5" /> Điều chỉnh
                    </Button>
                  ) : null}
                  {canEditCatalog(role) ? (
                    <Button variant="ghost" size="icon" onClick={() => { setEditing(i); setForm({ name: i.name, unit: i.unit, minStock: i.minStock }); setOpen(true); }}>
                      <Pencil className="size-4" />
                    </Button>
                  ) : null}
                  {canSoftDelete(role) ? (
                    <Button variant="ghost" size="icon" onClick={() => setPending(i)}>
                      <Trash2 className="size-4" />
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <h2 className="mt-8 font-display text-lg">Lịch sử điều chỉnh</h2>
      <div className="mt-3 grid gap-2">
        {history.slice(0, 8).map((h) => {
          const ing = rowsAll.find((i) => i.id === h.ingredientId);
          const user = users.find((u) => u.id === h.createdBy);
          return (
            <div key={h.id} className="flex justify-between gap-3 rounded-lg bg-card px-4 py-3 text-sm shadow-[var(--shadow-border)]">
              <span>
                {ADJUST_LABELS[h.adjustmentType]} {h.quantity} · {ing?.name} · {user?.fullName}
                {h.reason ? ` · ${h.reason}` : ""}
              </span>
              <span className="text-muted-foreground">{formatDateTime(h.createdAt)}</span>
            </div>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa nguyên liệu" : "Thêm nguyên liệu"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Tên" required>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Đơn vị">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value as IngredientUnit })}>
                {Object.entries(UNIT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tồn tối thiểu">
              <Input type="number" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: Number(e.target.value) })} />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                const res = upsert({ id: editing?.id, ...form });
                if (res.ok) {
                  toast.success(res.message);
                  setOpen(false);
                } else toast.error(res.message);
              }}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(adjusting)} onOpenChange={(v) => !v && setAdjusting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Điều chỉnh {adjusting?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Loại">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={adj.type} onChange={(e) => setAdj({ ...adj, type: e.target.value as AdjustmentType })}>
                {Object.entries(ADJUST_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={adj.type === "count_correct" ? "Số lượng thực tế" : "Số lượng"}>
              <Input type="number" value={adj.quantity} onChange={(e) => setAdj({ ...adj, quantity: Number(e.target.value) })} />
            </Field>
            <Field label="Lý do">
              <Input value={adj.reason} onChange={(e) => setAdj({ ...adj, reason: e.target.value })} />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjusting(null)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                if (!adjusting) return;
                const res = adjust({ ingredientId: adjusting.id, type: adj.type, quantity: adj.quantity, reason: adj.reason });
                if (res.ok) {
                  toast.success(res.message);
                  setAdjusting(null);
                } else toast.error(res.message);
              }}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pending)}
        onOpenChange={(v) => !v && setPending(null)}
        title="Vô hiệu hóa nguyên liệu?"
        description={`${pending?.name} sẽ không còn dùng trong công thức mới.`}
        confirmLabel="Vô hiệu hóa"
        destructive
        onConfirm={() => {
          if (!pending) return;
          const res = deactivate(pending.id);
          if (res.ok) toast.success(res.message);
          else toast.error(res.message);
          setPending(null);
        }}
      />
    </div>
  );
}
