import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { PiArrowLeft } from "react-icons/pi";

type BackButtonProps = {
  to: LinkProps["to"];
};

export default function BackButton({ to }: BackButtonProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-gray-500 px-4 py-2 text-sm font-semibold text-white transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      <PiArrowLeft size={18} />
      Back
    </Link>
  );
}