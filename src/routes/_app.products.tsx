import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, SlidersHorizontal, Sparkles, Trash2 } from "lucide-react";
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
import { formatVnd } from "@/lib/format";
import { canAdjustStock, canEditCatalog, canSoftDelete } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import { ADJUST_LABELS, PRODUCT_TYPE_LABELS, type AdjustmentType, type Product, type ProductType } from "@/lib/types";
import { matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/_app/products")({
  component: ProductsPage,
});

function ProductsPage() {
  const locId = useStudio((s) => s.sessionLocationId)!;
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const products = useStudio((s) => s.products.filter((p) => p.locationId === locId && p.isActive));
  const upsert = useStudio((s) => s.upsertProduct);
  const deactivate = useStudio((s) => s.deactivateProduct);
  const adjust = useStudio((s) => s.adjustProduct);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [pending, setPending] = useState<Product | null>(null);
  const [adjusting, setAdjusting] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", productType: "other" as ProductType, price: 100000, salePercent: 0, minStock: 5 });
  const [adj, setAdj] = useState({ type: "add" as AdjustmentType, quantity: 5, reason: "" });
  const rows = useMemo(() => products.filter((p) => matchesQuery(`${p.name} ${PRODUCT_TYPE_LABELS[p.productType]}`, q)), [products, q]);

  return (
    <div>
      <PageHeader
        title="Sản phẩm bán lẻ"
        description="Thảm, trang phục, phụ kiện."
        actions={
          canEditCatalog(role) ? (
            <Button
              onClick={() => {
                setEditing(null);
                setForm({ name: "", productType: "other", price: 100000, salePercent: 0, minStock: 5 });
                setOpen(true);
              }}
            >
              <Plus className="size-4" /> Thêm sản phẩm
            </Button>
          ) : null
        }
      />
      <SearchField value={q} onChange={setQ} placeholder="Tìm sản phẩm" className="mb-4" />
      {rows.length === 0 ? (
        <EmptyState icon={Sparkles} title="Chưa có sản phẩm" />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map((p) => {
            const low = p.currentStock <= p.minStock;
            const price = Math.round(p.price * (1 - p.salePercent / 100));
            return (
              <div key={p.id} className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg">{p.name}</h3>
                    <Badge className="mt-2" variant="muted">
                      {PRODUCT_TYPE_LABELS[p.productType]}
                    </Badge>
                  </div>
                  <div className="flex">
                    {canAdjustStock(role) ? (
                      <Button variant="ghost" size="icon" onClick={() => { setAdjusting(p); setAdj({ type: "add", quantity: 5, reason: "" }); }}>
                        <SlidersHorizontal className="size-4" />
                      </Button>
                    ) : null}
                    {canEditCatalog(role) ? (
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(p); setForm({ name: p.name, productType: p.productType, price: p.price, salePercent: p.salePercent, minStock: p.minStock }); setOpen(true); }}>
                        <Pencil className="size-4" />
                      </Button>
                    ) : null}
                    {canSoftDelete(role) ? (
                      <Button variant="ghost" size="icon" onClick={() => setPending(p)}>
                        <Trash2 className="size-4" />
                      </Button>
                    ) : null}
                  </div>
                </div>
                <p className="mt-3 text-sm tabular-nums">
                  {formatVnd(price)}
                  {p.salePercent ? <span className="ml-2 text-warning">-{p.salePercent}%</span> : null}
                </p>
                <p className="mt-1 text-sm">
                  Tồn <Badge variant={low ? "danger" : "success"}>{p.currentStock}</Badge>
                  <span className="ml-2 text-muted-foreground">min {p.minStock}</span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa sản phẩm" : "Thêm sản phẩm"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Tên" required>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Loại">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value as ProductType })}>
                {Object.entries(PRODUCT_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Giá">
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              </Field>
              <Field label="% giảm">
                <Input type="number" value={form.salePercent} onChange={(e) => setForm({ ...form, salePercent: Number(e.target.value) })} />
              </Field>
            </div>
            <Field label="Tồn tối thiểu">
              <Input type="number" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: Number(e.target.value) })} />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
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
            <Field label="Số lượng">
              <Input type="number" value={adj.quantity} onChange={(e) => setAdj({ ...adj, quantity: Number(e.target.value) })} />
            </Field>
            <Field label="Lý do">
              <Input value={adj.reason} onChange={(e) => setAdj({ ...adj, reason: e.target.value })} />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjusting(null)}>Hủy</Button>
            <Button
              onClick={() => {
                if (!adjusting) return;
                const res = adjust({ productId: adjusting.id, type: adj.type, quantity: adj.quantity, reason: adj.reason });
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
        title="Vô hiệu hóa sản phẩm?"
        description={`${pending?.name} sẽ không còn bán được.`}
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
