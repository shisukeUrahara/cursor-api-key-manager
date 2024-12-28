import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '@/context/AuthContext';

export async function POST(req) {
  const { apiKey } = await req.json();


 

  console.log("validate-key api endpoint called , apiKey: ", apiKey);

  try {

    const { data, error } = await  supabase
    .from('api_keys')
    .select('*')
    .eq('key', apiKey)
    .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase query error:", error);
    }

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

 

    if (data && data.length > 0) {
      return NextResponse.json({ isValidApiKey:true, message: 'Valid API key' }, { status: 200 });
    } else {
      return NextResponse.json({ isValidApiKey:false, message: 'Invalid API key' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error validating API key:', error);
    return NextResponse.json({ message: 'Error validating API key' }, { status: 500 });
  }
}