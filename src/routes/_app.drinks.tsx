import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CupSoda, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { Field } from "@/components/field";
import { PageHeader } from "@/components/page-header";
import { SearchField } from "@/components/search-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatVnd } from "@/lib/format";
import { canEditCatalog, canSoftDelete } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import type { Drink } from "@/lib/types";
import { matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/_app/drinks")({
  component: DrinksPage,
});

function DrinksPage() {
  const locId = useStudio((s) => s.sessionLocationId)!;
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
  const ingredients = useStudio((s) => s.ingredients.filter((i) => i.locationId === locId && i.isActive));
  const recipes = useStudio((s) => s.drinkRecipes);
  const upsert = useStudio((s) => s.upsertDrink);
  const deactivate = useStudio((s) => s.deactivateDrink);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Drink | null>(null);
  const [pending, setPending] = useState<Drink | null>(null);
  const [form, setForm] = useState({ name: "", pricePerServing: 30000, description: "", recipe: [] as Array<{ ingredientId: number; quantityPerServing: number }> });

  const rows = useMemo(() => drinks.filter((d) => matchesQuery(`${d.name} ${d.description}`, q)), [drinks, q]);

  function start(row?: Drink) {
    setEditing(row ?? null);
    setForm(
      row
        ? {
            name: row.name,
            pricePerServing: row.pricePerServing,
            description: row.description,
            recipe: recipes.filter((r) => r.drinkId === row.id).map((r) => ({ ingredientId: r.ingredientId, quantityPerServing: r.quantityPerServing })),
          }
        : { name: "", pricePerServing: 30000, description: "", recipe: [] },
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader
        title="Đồ uống"
        description="Công thức gắn với tồn kho nguyên liệu."
        actions={
          canEditCatalog(role) ? (
            <Button onClick={() => start()}>
              <Plus className="size-4" /> Thêm đồ uống
            </Button>
          ) : null
        }
      />
      <SearchField value={q} onChange={setQ} placeholder="Tìm đồ uống" className="mb-4" />
      {rows.length === 0 ? (
        <EmptyState icon={CupSoda} title="Chưa có đồ uống" />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {rows.map((d) => {
            const rec = recipes.filter((r) => r.drinkId === d.id);
            return (
              <div key={d.id} className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg">{d.name}</h3>
                    <p className="mt-1 text-sm tabular-nums text-olive">{formatVnd(d.pricePerServing)}</p>
                  </div>
                  <div className="flex">
                    {canEditCatalog(role) ? (
                      <Button variant="ghost" size="icon" onClick={() => start(d)}>
                        <Pencil className="size-4" />
                      </Button>
                    ) : null}
                    {canSoftDelete(role) ? (
                      <Button variant="ghost" size="icon" onClick={() => setPending(d)}>
                        <Trash2 className="size-4" />
                      </Button>
                    ) : null}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{d.description || "Không có mô tả"}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {rec.length
                    ? rec
                        .map((r) => {
                          const ing = ingredients.find((i) => i.id === r.ingredientId);
                          return ing ? `${ing.name} ${r.quantityPerServing} ${ing.unit}` : null;
                        })
                        .filter(Boolean)
                        .join(" · ")
                    : "Chưa có công thức"}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa đồ uống" : "Thêm đồ uống"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Tên" required>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Giá mỗi ly">
              <Input type="number" value={form.pricePerServing} onChange={(e) => setForm({ ...form, pricePerServing: Number(e.target.value) })} />
            </Field>
            <Field label="Mô tả">
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Field>
            <div>
              <p className="mb-2 text-sm font-medium">Công thức / ly</p>
              <div className="grid gap-2">
                {ingredients.map((ing) => {
                  const rec = form.recipe.find((r) => r.ingredientId === ing.id);
                  return (
                    <div key={ing.id} className="flex items-center gap-2">
                      <span className="min-w-0 flex-1 truncate text-sm">{ing.name}</span>
                      <Input
                        type="number"
                        className="h-9 w-24"
                        value={rec?.quantityPerServing ?? 0}
                        onChange={(e) => {
                          const qty = Number(e.target.value);
                          setForm((f) => ({
                            ...f,
                            recipe: [...f.recipe.filter((r) => r.ingredientId !== ing.id), { ingredientId: ing.id, quantityPerServing: qty }],
                          }));
                        }}
                      />
                      <span className="w-12 text-xs text-muted-foreground">{ing.unit}</span>
                    </div>
                  );
                })}
              </div>
            </div>
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
      <ConfirmDialog
        open={Boolean(pending)}
        onOpenChange={(v) => !v && setPending(null)}
        title="Vô hiệu hóa đồ uống?"
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
