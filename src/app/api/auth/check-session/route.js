import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = await getUserFromToken(req);
    
    if (user) {
      return NextResponse.json({ isAuthenticated: true });
    } else {
      return NextResponse.json({ isAuthenticated: false });
    }
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false });
  }
} 