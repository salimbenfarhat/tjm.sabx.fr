import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="border border-zinc-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}
