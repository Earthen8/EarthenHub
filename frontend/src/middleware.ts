import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Match /media/:path*
  if (pathname.startsWith('/media/')) {
    const r2PublicUrl = process.env.R2_PUBLIC_URL;
    const backendUrl = process.env.BACKEND_URL || 'http://backend:8000';
    
    // Extract the path after /media/
    const filePath = pathname.replace(/^\/media\//, '');
    
    // Construct the destination URL
    const destinationUrl = r2PublicUrl
      ? `${r2PublicUrl}/${filePath}${search}`
      : `${backendUrl}/media/${filePath}${search}`;

    return NextResponse.rewrite(new URL(destinationUrl));
  }

  return NextResponse.next();
}

// Match only /media/:path* to keep middleware execution light
export const config = {
  matcher: ['/media/:path*'],
};
