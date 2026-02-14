import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/';
  const isAuthCallback = request.nextUrl.pathname === '/auth/callback';
  const isHome = request.nextUrl.pathname.startsWith('/home');
  const isSettings = request.nextUrl.pathname.startsWith('/settings');
  const isSources = request.nextUrl.pathname.startsWith('/sources');
  const isPremium = request.nextUrl.pathname.startsWith('/premium');
  const isLibrary = request.nextUrl.pathname.startsWith('/library');
  const isPanels = request.nextUrl.pathname.startsWith('/panels');
  const hasTokenCookie = request.cookies.has('jwt_token');

  // Always allow auth callback to pass through
  if (isAuthCallback) {
    return NextResponse.next();
  }

  // If accessing dashboard without token cookie, redirect to login
  if ((isHome || isSettings || isSources || isPremium || isLibrary || isPanels) && !hasTokenCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If accessing login page with token cookie, redirect to dashboard
  if (isLoginPage && hasTokenCookie) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/callback', '/home/:path*', '/settings/:path*', '/sources/:path*', '/premium/:path*', '/library/:path*', '/panels/:path*'],
};
