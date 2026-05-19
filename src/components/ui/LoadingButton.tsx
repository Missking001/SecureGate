import * as React from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading, disabled, children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        aria-busy={isLoading}
        className={`flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 flex items-center">
            <LoadingSpinner className="h-4 w-4" />
          </div>
        )}
        {children}
      </button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";
