import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
  /** Custom class for the wrapper */
  wrapperClassName?: string;
}

const sizeStyles = {
  sm: { input: "h-8 px-2 pr-8 text-xs", btn: "right-1.5 h-5 w-5" },
  md: { input: "h-10 px-3 pr-10 text-sm", btn: "right-2.5 h-5 w-5" },
  lg: { input: "h-12 px-4 pr-12 text-base", btn: "right-3.5 h-6 w-6" },
};

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </svg>
);

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, inputSize = "md", error, wrapperClassName, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const sizes = sizeStyles[inputSize];

    return (
      <div className={cn("relative w-full", wrapperClassName)}>
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn(
            "w-full rounded-md border border-zinc-300 bg-transparent text-zinc-900 placeholder:text-zinc-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100 dark:placeholder:text-zinc-500",
            sizes.input,
            error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
            className
          )}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors",
            sizes.btn
          )}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
