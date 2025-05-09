import { ButtonHTMLAttributes } from "react";
import cn from "./cn";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={cn(
        "bg-black text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition",
        className
      )}
    />
  );
}
