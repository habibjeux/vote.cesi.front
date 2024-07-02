import React from "react";
interface Props {
  variant?: Variant;
  children?: React.ReactNode | any;
}
declare type Variant = "h1" | "h2" | "description" | "smallText";
export default function Text({ variant = "h1", children }: Props) {
  switch (variant) {
    case "h1":
      return (
        <h1 className="text-4xl font-bold text-zinc-800 mb-8">{children}</h1>
      );
    case "h2":
      return (
        <h2 className="text-4xl font-semibold text-gray-700 mb-6">
          {children}
        </h2>
      );
    case "description":
      return <p className="text-lg text-gray-600 mb-4">{children}</p>;
    case "smallText":
      return <p className="text-sm text-gray-500">{children}</p>;
    default:
      return <p className="text-sm text-gray-500">{children}</p>;
  }
}
