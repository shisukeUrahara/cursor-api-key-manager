import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { 
          isValidApiKey: false,
          message: 'API key is required',
          details: null
        }, 
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Supabase query error:", error);
      throw error;
    }

    if (data) {
      return NextResponse.json({
        isValidApiKey: true,
        message: 'Valid API key',
        details: {
          name: data.name,
          limit: data.limit,
          created_at: data.created_at
        }
      });
    } else {
      return NextResponse.json({
        isValidApiKey: false,
        message: 'Invalid API key',
        details: null
      });
    }
  } catch (error) {
    console.error('Error validating API key:', error);
    return NextResponse.json(
      { 
        isValidApiKey: false,
        message: 'Error validating API key',
        details: null
      }, 
      { status: 500 }
    );
  }
}