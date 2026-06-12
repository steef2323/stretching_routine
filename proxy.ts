import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedApi = createRouteMatcher(["/api/sync(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedApi(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/__clerk/:path*",
    "/(api|trpc)(.*)",
  ],
};
