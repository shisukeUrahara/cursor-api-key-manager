import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const publicPaths = ['/', '/login', '/auth/callback'];
  const protectedPaths = ['/dashboard', '/playground'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  const isProtectedPath = protectedPaths.includes(request.nextUrl.pathname);
  const token = request.cookies.get('jwt')?.value;

  // Check if it's an API route
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  try {
    if (token) {
      // Verify token
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      // If user is authenticated and tries to access login page, redirect to dashboard
      if (request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } else if (isProtectedPath) {
      // If no token and trying to access protected route
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    // If token is invalid, clear it and redirect to login if on protected path
    if (isProtectedPath) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('jwt');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 