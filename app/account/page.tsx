import AccountMenu from "@/components/AccountMenu";
import HamburgerButton from "@/components/HamburgerButton";

export default function AccountPage() {
  return (
    <div className="screen screen-exercises">
      <header className="exercises-header">
        <div className="exercises-header-row">
          <h1 className="exercises-title">Your account</h1>
          <HamburgerButton />
        </div>
      </header>
      <AccountMenu />
    </div>
  );
}
