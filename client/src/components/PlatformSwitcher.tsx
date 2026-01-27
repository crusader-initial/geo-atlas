import { Link, useLocation } from "wouter";

const platforms = [
  { label: "Web", href: "/" },
  { label: "App", href: "/app" },
  { label: "Mini Program", href: "/mini" },
];

export default function PlatformSwitcher() {
  const [location] = useLocation();

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--color-swiss-border)] bg-white/80 p-1 text-xs backdrop-blur-sm shadow-sm">
      {platforms.map((platform) => {
        const isActive = location === platform.href;
        return (
          <Link key={platform.href} href={platform.href}>
            <span
              className={`cursor-pointer rounded-full px-3 py-1 font-medium transition-colors ${
                isActive
                  ? "bg-[var(--color-swiss-fg)] text-white"
                  : "text-muted-foreground hover:text-[var(--color-swiss-fg)]"
              }`}
            >
              {platform.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
