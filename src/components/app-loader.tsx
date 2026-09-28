import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { beginLoading, endLoading } from "@/lib/loading";

function isInternalNav(anchor: HTMLAnchorElement) {
  if (anchor.hasAttribute("download")) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  try {
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return false;
    return true;
  } catch {
    return false;
  }
}

export function AppLoader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const firstPath = useRef(true);

  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    beginLoading("page");
    endLoading();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement) || !isInternalNav(anchor)) return;
      beginLoading("page");
      endLoading();
    };

    const onSubmit = (event: Event) => {
      if (event.defaultPrevented) return;
      beginLoading("action");
      endLoading();
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}

export function PageEnter({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
