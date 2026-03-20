import React, { useRef, useState, useCallback } from "react";
import { cn } from "../../utils/cn";

export interface OTPInputProps {
  /** Number of OTP digits */
  length?: number;
  /** Callback with the full OTP string */
  onComplete?: (otp: string) => void;
  /** Callback on value change */
  onChange?: (otp: string) => void;
  /** Size of each digit box */
  inputSize?: "sm" | "md" | "lg";
  /** Show error state */
  error?: boolean;
  /** Disable all inputs */
  disabled?: boolean;
  /** Custom class for each digit input */
  className?: string;
  /** Custom class for the wrapper */
  wrapperClassName?: string;
  /** Separator between groups (e.g. show dash after 3rd digit for 6-digit OTP) */
  separatorAfter?: number[];
}

const sizeStyles = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-lg",
  lg: "h-12 w-12 text-xl",
};

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  inputSize = "md",
  error = false,
  disabled = false,
  className,
  wrapperClassName,
  separatorAfter,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  }, [length]);

  const updateValues = useCallback(
    (newValues: string[]) => {
      setValues(newValues);
      const otp = newValues.join("");
      onChange?.(otp);
      if (otp.length === length && newValues.every((v) => v !== "")) {
        onComplete?.(otp);
      }
    },
    [length, onChange, onComplete]
  );

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const digit = val.slice(-1);
    const newValues = [...values];
    newValues[index] = digit;
    updateValues(newValues);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValues = [...values];
      if (values[index]) {
        newValues[index] = "";
        updateValues(newValues);
      } else if (index > 0) {
        newValues[index - 1] = "";
        updateValues(newValues);
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight") {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    const newValues = [...values];
    for (let i = 0; i < pasted.length; i++) {
      newValues[i] = pasted[i];
    }
    updateValues(newValues);
    focusInput(Math.min(pasted.length, length - 1));
  };

  const separatorSet = new Set(separatorAfter || []);

  return (
    <div className={cn("flex items-center gap-2", wrapperClassName)}>
      {values.map((val, i) => (
        <React.Fragment key={i}>
          <input
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={val}
            disabled={disabled}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            onFocus={(e) => e.target.select()}
            className={cn(
              "rounded-md border border-zinc-300 bg-transparent text-center font-mono text-zinc-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100",
              sizeStyles[inputSize],
              error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
              className
            )}
            aria-label={`Digit ${i + 1}`}
          />
          {separatorSet.has(i) && (
            <span className="text-zinc-400 dark:text-zinc-500 text-lg font-bold select-none">-</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

OTPInput.displayName = "OTPInput";
