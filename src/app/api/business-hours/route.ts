import { NextResponse } from 'next/server';
import { getBusinessHours } from '@/lib/mdx';

export async function GET() {
  try {
    const hours = getBusinessHours();
    
    // Add cache headers for better performance
    const response = NextResponse.json(hours);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    
    return response;
  } catch (error) {
    console.error('Error fetching business hours:', error);
    
    // Return empty array with error status
    return NextResponse.json(
      { error: 'Failed to load business hours', hours: [] }, 
      { status: 500 }
    );
  }
}
