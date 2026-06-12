import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="screen screen-auth">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/"
      />
    </div>
  );
}
