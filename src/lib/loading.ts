import { useSyncExternalStore } from "react";

type LoadingKind = "page" | "action";

type LoadingSnapshot = {
  busy: boolean;
  kind: LoadingKind;
  label: string;
};

const MIN_VISIBLE_MS = 450;
const OVERLAY_ID = "bao-ngoc-app-loader";
const listeners = new Set<() => void>();
const IDLE_SNAPSHOT: LoadingSnapshot = { busy: false, kind: "page", label: "Đang tải..." };

let count = 0;
let kind: LoadingKind = "page";
let snapshot: LoadingSnapshot = IDLE_SNAPSHOT;

function syncOverlay() {
  if (typeof document === "undefined") return;
  document.body.dataset.appLoading = snapshot.busy ? "true" : "false";
  let root = document.getElementById(OVERLAY_ID);
  if (snapshot.busy) {
    if (!root) {
      root = document.createElement("div");
      root.id = OVERLAY_ID;
      root.className = "app-loader";
      root.setAttribute("role", "status");
      root.setAttribute("aria-live", "polite");
      root.setAttribute("aria-busy", "true");
      root.innerHTML =
        '<div class="app-loader-bar"></div>' +
        '<div class="app-loader-panel">' +
        '<div class="app-loader-mark">' +
        '<span class="app-loader-ring"></span>' +
        '<img src="/bao-ngoc-logo-small.png" alt="" class="app-loader-logo" />' +
        "</div>" +
        '<p class="app-loader-label"></p>' +
        "</div>";
      document.body.appendChild(root);
    }
    const label = root.querySelector(".app-loader-label");
    if (label) label.textContent = snapshot.label;
  } else if (root) {
    root.remove();
  }
}

function emit() {
  snapshot =
    count > 0
      ? {
          busy: true,
          kind,
          label: kind === "page" ? "Đang tải trang..." : "Đang xử lý...",
        }
      : IDLE_SNAPSHOT;
  syncOverlay();
  for (const listener of listeners) listener();
}

export function subscribeLoading(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getLoadingSnapshot(): LoadingSnapshot {
  return snapshot;
}

export function beginLoading(nextKind: LoadingKind = "action") {
  count += 1;
  kind = nextKind;
  emit();
}

export function endLoading() {
  const finish = () => {
    count = Math.max(0, count - 1);
    emit();
  };
  if (typeof window === "undefined") {
    finish();
    return;
  }
  window.setTimeout(finish, MIN_VISIBLE_MS);
}

export function useLoading(): LoadingSnapshot {
  return useSyncExternalStore(subscribeLoading, getLoadingSnapshot, getLoadingSnapshot);
}

export function wrapWithLoading<T extends Record<string, unknown>>(state: T, keys: readonly string[]): T {
  const next = { ...state };
  for (const key of keys) {
    const fn = next[key];
    if (typeof fn !== "function") continue;
    const original = fn as (...args: never[]) => unknown;
    (next as Record<string, unknown>)[key] = (...args: never[]) => {
      beginLoading("action");
      try {
        return original(...args);
      } finally {
        endLoading();
      }
    };
  }
  return next;
}
