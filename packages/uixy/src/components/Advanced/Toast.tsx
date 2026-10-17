"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

export type ToastType = "default" | "success" | "error" | "warning" | "info";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  type?: ToastType;
  /** Auto-dismiss time in ms (0 = never) */
  duration?: number;
}

interface ToastEntry extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions | string) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

export interface ToastProviderProps {
  position?: ToastPosition;
  children: React.ReactNode;
}

const positions: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

const accents: Record<ToastType, string> = {
  default: "bg-violet-400",
  success: "bg-emerald-400",
  error: "bg-red-400",
  warning: "bg-amber-400",
  info: "bg-blue-400",
};

const ToastItem: React.FC<{ entry: ToastEntry; onDismiss: () => void }> = ({ entry, onDismiss }) => {
  const duration = entry.duration ?? 4000;
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (duration > 0) timer.current = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <div
      role="status"
      onMouseEnter={() => clearTimeout(timer.current)}
      onMouseLeave={() => duration > 0 && (timer.current = setTimeout(onDismiss, 1500))}
      className="pointer-events-auto relative w-80 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 p-4 pl-5 shadow-xl"
      style={{ animation: "uixy-toast-in .3s cubic-bezier(.22,1,.36,1)" }}
    >
      <span className={cn("absolute inset-y-0 left-0 w-1", accents[entry.type ?? "default"])} />
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onDismiss}
        className="absolute right-2 top-2 text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
      <p className="pr-4 text-sm font-medium text-zinc-100">{entry.title}</p>
      {entry.description && <p className="mt-0.5 text-xs text-zinc-400">{entry.description}</p>}
    </div>
  );
};

/** Wrap your app once, then call `useToast().toast(...)` anywhere. */
export const ToastProvider: React.FC<ToastProviderProps> = ({ position = "bottom-right", children }) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const counter = useRef(0);
  useEffect(() => setMounted(true), []);

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback((options: ToastOptions | string) => {
    const id = ++counter.current;
    const entry = typeof options === "string" ? { title: options } : options;
    setToasts((t) => [...t.slice(-4), { ...entry, id }]);
    return id;
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {mounted &&
        createPortal(
          <div className={cn("pointer-events-none fixed z-[60] flex flex-col gap-2", positions[position])}>
            <style>{`@keyframes uixy-toast-in { from { opacity: 0; transform: translateY(12px) scale(.95); } to { opacity: 1; transform: none; } }`}</style>
            {toasts.map((t) => (
              <ToastItem key={t.id} entry={t} onDismiss={() => dismiss(t.id)} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
