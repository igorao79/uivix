"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Footer content (usually buttons) */
  footer?: React.ReactNode;
  /** Close when the backdrop is clicked */
  closeOnBackdrop?: boolean;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
}

const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" };

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  footer,
  closeOnBackdrop = true,
  size = "md",
  children,
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes uixy-dialog-in { from { opacity: 0; transform: translateY(12px) scale(.96); } to { opacity: 1; transform: none; } }
        @keyframes uixy-dialog-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ animation: "uixy-dialog-fade .2s ease" }}
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl",
          sizes[size],
          className
        )}
        style={{ animation: "uixy-dialog-in .25s cubic-bezier(.22,1,.36,1)" }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        {title && <h2 className="pr-6 text-lg font-semibold text-zinc-100">{title}</h2>}
        {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
        {children && <div className="mt-4 text-sm text-zinc-300">{children}</div>}
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

Dialog.displayName = "Dialog";
