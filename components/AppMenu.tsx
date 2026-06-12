"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
  { href: "/", label: "Do your Stretchy" },
  { href: "/streak", label: "See your streak" },
  { href: "/exercises", label: "Select my Stretchy" },
  { href: "/days", label: "Select my days" },
  { href: "/help", label: "Let Stretchy help you" },
  { href: "/account", label: "Save my Stretchy" },
] as const;

export default function AppMenu() {
  const router = useRouter();

  return (
    <div className="screen screen-menu">
      <header className="menu-header">
        <button
          type="button"
          className="btn-close"
          onClick={() => router.back()}
          aria-label="Close menu"
        >
          ×
        </button>
      </header>

      <nav className="menu-nav">
        <ul className="menu-list">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="menu-item">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
