import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  inputSize?: "sm" | "md" | "lg";
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Custom class for the wrapper */
  wrapperClassName?: string;
}

const sizeStyles = {
  sm: { input: "h-8 pl-7 pr-7 text-xs", iconL: "left-2 h-3.5 w-3.5", iconR: "right-1.5 h-3.5 w-3.5" },
  md: { input: "h-10 pl-9 pr-9 text-sm", iconL: "left-3 h-4 w-4", iconR: "right-2.5 h-4 w-4" },
  lg: { input: "h-12 pl-11 pr-11 text-base", iconL: "left-4 h-5 w-5", iconR: "right-3.5 h-5 w-5" },
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, inputSize = "md", onClear, wrapperClassName, onChange, value: controlledValue, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() || "");
    const value = controlledValue !== undefined ? controlledValue.toString() : internalValue;
    const sizes = sizeStyles[inputSize];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (controlledValue === undefined) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (controlledValue === undefined) setInternalValue("");
      onClear?.();
    };

    return (
      <div className={cn("relative w-full", wrapperClassName)}>
        <span className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500", sizes.iconL)}>
          <SearchIcon className="h-full w-full" />
        </span>
        <input
          ref={ref}
          type="search"
          className={cn(
            "w-full rounded-md border border-zinc-300 bg-transparent text-zinc-900 placeholder:text-zinc-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100 dark:placeholder:text-zinc-500 [&::-webkit-search-cancel-button]:hidden",
            sizes.input,
            className
          )}
          value={controlledValue !== undefined ? controlledValue : undefined}
          defaultValue={controlledValue !== undefined ? undefined : defaultValue}
          onChange={handleChange}
          {...props}
        />
        {value.length > 0 && (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleClear}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors",
              sizes.iconR
            )}
            aria-label="Clear search"
          >
            <XIcon className="h-full w-full" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
