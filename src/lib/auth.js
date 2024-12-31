import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function getUserFromToken(req) {
  try {
    const token = cookies().get('jwt')?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return { id: payload.userId };
  } catch (error) {
    return null;
  }
} 