import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/auth/callback'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Get token from cookies
  const token = request.cookies.get('jwt')?.value;

  // Redirect to login if no token and trying to access protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to public paths even without token
  if (isPublicPath) {
    return NextResponse.next();
  }

  try {
    // Verify JWT token
    if (token) {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      
      // If on login page with valid token, redirect to dashboard
      if (request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, clear it and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('jwt');
    return response;
  }
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 