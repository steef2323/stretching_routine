import Link from "next/link";

export default function HamburgerButton() {
  return (
    <Link href="/menu" className="btn-hamburger" aria-label="Open menu">
      <span className="hamburger-line" />
      <span className="hamburger-line" />
      <span className="hamburger-line" />
    </Link>
  );
}
