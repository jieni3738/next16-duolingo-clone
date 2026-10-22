import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  const isPublicRoute =
    path === "/" ||
    path === "/api/webhooks/stripe" ||
    path === "/sign-in" ||
    path.startsWith("/sign-in/") ||
    path === "/sign-up" ||
    path.startsWith("/sign-up/");

  if (!isPublicRoute) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};