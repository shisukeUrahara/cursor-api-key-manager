import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { supabase } from './supabase';

export async function getUserFromToken(req) {
  try {
    // For API routes
    if (req?.cookies) {
      const token = req.cookies.get('jwt')?.value;
      if (!token) return null;

      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      return { id: payload.userId };
    }
    
    // For server components
    const cookieStore = cookies();
    const token = cookieStore.get('jwt')?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return { id: payload.userId };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
} 