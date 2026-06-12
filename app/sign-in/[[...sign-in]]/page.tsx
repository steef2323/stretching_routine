import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="screen screen-auth">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/"
      />
    </div>
  );
}
