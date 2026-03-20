import React from "react";
import { cn } from "../../utils/cn";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
  required?: boolean;
}

const sizeStyles: Record<NonNullable<LabelProps["size"]>, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = "md", required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "font-medium text-zinc-900 dark:text-zinc-100 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";
