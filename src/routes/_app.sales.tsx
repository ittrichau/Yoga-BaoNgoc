import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { PageHeader } from "@/components/page-header";
import { SearchField } from "@/components/search-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateTime, formatVnd, isoDate } from "@/lib/format";
import { useStudio, type CartLine } from "@/lib/store";
import { PRODUCT_TYPE_LABELS } from "@/lib/types";
import { matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/_app/sales")({
  component: SalesPage,
});

function salePrice(price: number, salePercent: number) {
  return Math.round(price * (1 - salePercent / 100));
}

function SalesPage() {
  const locId = useStudio((s) => s.sessionLocationId)!;
  const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
  const drinks = useStudio((s) => s.drinks.filter((d) => d.locationId === locId && d.isActive));
  const products = useStudio((s) => s.products.filter((p) => p.locationId === locId && p.isActive));
  const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId && p.isActive));
  const items = useStudio((s) => s.packageItems);
  const txs = useStudio((s) => s.transactions.filter((t) => t.locationId === locId));
  const users = useStudio((s) => s.users);
  const checkout = useStudio((s) => s.checkoutCart);

  const [customerId, setCustomerId] = useState<number | null>(customers.find((c) => c.fullName === "Khách vãng lai")?.id ?? customers[0]?.id ?? null);
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [usePackage, setUsePackage] = useState(true);
  const [removeKey, setRemoveKey] = useState<string | null>(null);

  const customer = customers.find((c) => c.id === customerId);
  const customerPkgs = packages.filter((p) => p.customerId === customerId);
  const pkgItem = items.find((i) => customerPkgs.some((p) => p.id === i.packageId && p.isActive) && i.remainingServings > 0);

  const filteredDrinks = drinks.filter((d) => matchesQuery(d.name, q));
  const filteredProducts = products.filter((p) => matchesQuery(`${p.name} ${PRODUCT_TYPE_LABELS[p.productType]}`, q));
  const today = isoDate();
  const todayTx = useMemo(
    () => txs.filter((t) => t.createdAt.startsWith(today)).slice(0, 12),
    [txs, today],
  );

  const total = cart.reduce((sum, l) => sum + (l.usePackageItemId ? 0 : l.unitPrice * l.quantity), 0);

  function addDrink(id: number) {
    const drink = drinks.find((d) => d.id === id);
    if (!drink) return;
    const useItem = usePackage ? pkgItem : null;
    setCart((prev) => {
      const key = `drink-${id}-${useItem?.id ?? "cash"}`;
      const existing = prev.find((l) => l.key === key);
      if (existing) return prev.map((l) => (l.key === key ? { ...l, quantity: l.quantity + 1 } : l));
      return [
        ...prev,
        {
          key,
          kind: "drink",
          drinkId: id,
          name: drink.name + (useItem ? " (gói)" : ""),
          unitPrice: drink.pricePerServing,
          quantity: 1,
          usePackageItemId: useItem?.id ?? null,
        },
      ];
    });
  }

  function addProduct(id: number) {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const price = salePrice(product.price, product.salePercent);
    setCart((prev) => {
      const key = `product-${id}`;
      const existing = prev.find((l) => l.key === key);
      if (existing) return prev.map((l) => (l.key === key ? { ...l, quantity: l.quantity + 1 } : l));
      return [...prev, { key, kind: "product", productId: id, name: product.name, unitPrice: price, quantity: 1 }];
    });
  }

  return (
    <div>
      <PageHeader title="Bán hàng" description="Chọn hội viên, thêm món vào giỏ, thanh toán một lần." />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.8fr)]">
        <div>
          <Card>
            <CardContent className="p-4 sm:p-5">
              <label className="text-sm font-medium">Hội viên</label>
              <select
                className="mt-1.5 h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
                value={customerId ?? ""}
                onChange={(e) => setCustomerId(Number(e.target.value))}
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.fullName}
                  </option>
                ))}
              </select>
              {pkgItem ? (
                <label className="mt-3 flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={usePackage} onChange={(e) => setUsePackage(e.target.checked)} />
                  Trừ từ gói (còn {pkgItem.remainingServings} ly)
                </label>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">Hội viên chưa có suất đồ uống trong gói — tính tiền mặt.</p>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="drinks" className="mt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="drinks">Đồ uống</TabsTrigger>
                <TabsTrigger value="products">Sản phẩm</TabsTrigger>
              </TabsList>
              <SearchField value={q} onChange={setQ} placeholder="Tìm món" className="sm:max-w-64" />
            </div>
            <TabsContent value="drinks">
              <div className="grid gap-2 sm:grid-cols-2">
                {filteredDrinks.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => addDrink(d.id)}
                    className="rounded-xl bg-card p-4 text-left shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)]"
                  >
                    <p className="font-medium">{d.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                    <p className="mt-2 text-sm tabular-nums text-olive">{formatVnd(d.pricePerServing)}</p>
                  </button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="products">
              <div className="grid gap-2 sm:grid-cols-2">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addProduct(p.id)}
                    className="rounded-xl bg-card p-4 text-left shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium">{p.name}</p>
                      <Badge variant="muted">{PRODUCT_TYPE_LABELS[p.productType]}</Badge>
                    </div>
                    <p className="mt-2 text-sm tabular-nums text-olive">
                      {formatVnd(salePrice(p.price, p.salePercent))}
                      {p.salePercent ? <span className="ml-2 text-warning">-{p.salePercent}%</span> : null}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Tồn {p.currentStock}</p>
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Giỏ hàng</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">Chưa có món.</p>
              ) : (
                <div className="grid gap-2">
                  {cart.map((line) => (
                    <div key={line.key} className="flex items-center gap-2 rounded-lg bg-muted/60 px-2 py-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{line.name}</p>
                        <p className="text-xs tabular-nums text-muted-foreground">
                          {line.usePackageItemId ? "Trừ gói" : formatVnd(line.unitPrice)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => setCart((p) => p.map((l) => (l.key === line.key ? { ...l, quantity: Math.max(1, l.quantity - 1) } : l)))}>
                          <Minus className="size-3.5" />
                        </Button>
                        <span className="w-5 text-center text-sm tabular-nums">{line.quantity}</span>
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => setCart((p) => p.map((l) => (l.key === line.key ? { ...l, quantity: l.quantity + 1 } : l)))}>
                          <Plus className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => setRemoveKey(line.key)}>
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Thanh toán</span>
                <span className="font-display text-xl tabular-nums">{formatVnd(total)}</span>
              </div>
              <Button className="mt-4 w-full" disabled={!customer || cart.length === 0} onClick={() => setConfirmOpen(true)}>
                <ShoppingBag className="size-4" /> Thanh toán
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Giao dịch hôm nay</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {todayTx.length === 0 ? (
                <p className="text-sm text-muted-foreground">Chưa có giao dịch.</p>
              ) : (
                todayTx.map((t) => {
                  const c = customers.find((x) => x.id === t.customerId);
                  const staff = users.find((u) => u.id === t.createdBy);
                  return (
                    <div key={t.id} className="flex items-center justify-between gap-2 text-sm">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{c?.fullName}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {staff?.fullName} · {formatDateTime(t.createdAt)}
                        </p>
                      </div>
                      <span className="tabular-nums">{t.amount ? formatVnd(t.amount) : "Gói"}</span>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Xác nhận thanh toán"
        description={`Thu ${formatVnd(total)} cho ${customer?.fullName ?? "hội viên"} · ${cart.length} món.`}
        confirmLabel="Thanh toán"
        onConfirm={() => {
          if (!customerId) return;
          const res = checkout({ customerId, lines: cart });
          if (res.ok) {
            toast.success(res.message);
            setCart([]);
          } else toast.error(res.message);
          setConfirmOpen(false);
        }}
      />
      <ConfirmDialog
        open={Boolean(removeKey)}
        onOpenChange={(v) => !v && setRemoveKey(null)}
        title="Xóa món khỏi giỏ?"
        description="Món này sẽ bị gỡ khỏi giỏ hàng hiện tại."
        confirmLabel="Xóa món"
        destructive
        onConfirm={() => {
          setCart((p) => p.filter((l) => l.key !== removeKey));
          setRemoveKey(null);
        }}
      />
    </div>
  );
}
