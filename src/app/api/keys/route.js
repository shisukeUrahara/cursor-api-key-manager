import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getUserFromToken } from '@/lib/auth';

// Get all API keys
export async function GET(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) throw new Error('Unauthorized');

    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    if (!supabaseUser) throw new Error('No Supabase user found');

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', supabaseUser.id)
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

const generateApiKey = () => {
  const randomStr = Math.random().toString(36).substring(2, 12);
  return `shke${randomStr}${Date.now().toString(36).slice(-9)}`;
};

// Create new API key
export async function POST(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) throw new Error('Unauthorized');

    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    if (!supabaseUser) throw new Error('No Supabase user found');

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
        user_id: supabaseUser.id
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating API key:', error);
      throw new Error('Failed to create API key');
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API key creation error:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}

// Add update endpoint
export async function PUT(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) throw new Error('Unauthorized');

    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    if (!supabaseUser) throw new Error('No Supabase user found');

    const { id, name, limit } = await req.json();

    const { data, error } = await supabase
      .from('api_keys')
      .update({ name, limit })
      .eq('id', id)
      .eq('user_id', supabaseUser.id)
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

// Add delete endpoint
export async function DELETE(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) throw new Error('Unauthorized');

    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    if (!supabaseUser) throw new Error('No Supabase user found');

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)
      .eq('user_id', supabaseUser.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
} 