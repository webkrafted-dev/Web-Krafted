import { iconMap } from "@/components/iconMap";

export default function ServiceIcon({ name, className = "h-5 w-5" }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.5} />;
}