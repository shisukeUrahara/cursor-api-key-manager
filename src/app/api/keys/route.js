import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getUserFromToken } from '@/lib/auth';

// Get all API keys
export async function GET(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) throw new Error('Unauthorized');

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 401 }
    );
  }
}

// Create new API key
export async function POST(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) throw new Error('Unauthorized');

    const { name, limit } = await req.json();

    const generatedKey = generateApiKey();
    const maskedKey = `${generatedKey.slice(0, 4)}${'*'.repeat(19)}`;

    const { data, error } = await supabase
      .from('api_keys')
      .insert([{
        name,
        key: generatedKey,
        display_key: maskedKey,
        limit,
        user_id: user.id
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
} 