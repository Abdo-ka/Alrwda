import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/mdx';

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json([], { status: 500 });
  }
}
