import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { supabase } from './supabase';

export async function getUserFromToken(req) {
  try {
    // Get JWT token
    const token = req?.cookies ? 
      req.cookies.get('jwt')?.value : 
      cookies().get('jwt')?.value;
    
    if (!token) {
      console.log('No JWT token found');
      return null;
    }

    // Verify JWT token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!payload.userId) {
      console.log('No userId in JWT payload');
      return null;
    }

    // Get Supabase session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Supabase session error:', sessionError);
      return null;
    }

    if (!session?.user) {
      console.log('No Supabase session found');
      return null;
    }

    return { id: session.user.id };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
} 