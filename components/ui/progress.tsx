import * as React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // Current progress value
  max?: number;  // Maximum progress value (default: 100)
}

export function Progress({ value, max = 100, className, ...props }: ProgressProps) {
  return (
    <div
      className={`relative w-full h-2 bg-gray-200 rounded overflow-hidden ${className}`}
      {...props}
    >
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );
}
