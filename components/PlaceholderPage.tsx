import Link from "next/link";
import HamburgerButton from "@/components/HamburgerButton";

interface PlaceholderPageProps {
  title: string;
  message: string;
}

export default function PlaceholderPage({ title, message }: PlaceholderPageProps) {
  return (
    <div className="screen screen-placeholder">
      <div className="page-top">
        <HamburgerButton />
      </div>

      <main className="placeholder-main">
        <h1 className="placeholder-title">{title}</h1>
        <p className="placeholder-message">{message}</p>
      </main>

      <footer className="placeholder-footer">
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </footer>
    </div>
  );
}
