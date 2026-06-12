"use client";

import {
  Show,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function AccountMenu() {
  return (
    <div className="account-menu">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button type="button" className="menu-item account-sign-in">
            Sign in to save
          </button>
        </SignInButton>
        <p className="account-hint">
          Sign in to sync streak &amp; exercises across devices
        </p>
        <Link href="/sign-in" className="btn btn-secondary">
          Open sign-in page
        </Link>
      </Show>

      <Show when="signed-in">
        <div className="account-signed-in">
          <UserButton />
          <p className="account-hint">Synced to the cloud</p>
        </div>
        <SignOutButton>
          <button type="button" className="btn btn-secondary">
            Sign out
          </button>
        </SignOutButton>
      </Show>

      <Link href="/" className="btn btn-secondary account-home">
        Back home
      </Link>
    </div>
  );
}
