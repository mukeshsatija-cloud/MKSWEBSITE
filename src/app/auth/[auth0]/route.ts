import { auth0 } from '@/lib/auth0';
import { NextRequest, NextResponse } from 'next/server';

const isMissingCredentials = !process.env.AUTH0_DOMAIN || process.env.AUTH0_DOMAIN.includes('YOUR_DOMAIN');

export const GET = async (req: NextRequest) => {
  // If in dev and no credentials, simulate login
  if (process.env.NODE_ENV === 'development' && isMissingCredentials) {
    const { pathname } = req.nextUrl;
    if (pathname.includes('/login')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (pathname.includes('/logout')) {
       return NextResponse.redirect(new URL('/', req.url));
    }
  }
  return auth0.middleware(req);
};

export const POST = (req: NextRequest) => auth0.middleware(req);
export const PATCH = (req: NextRequest) => auth0.middleware(req);
export const DELETE = (req: NextRequest) => auth0.middleware(req);
export const PUT = (req: NextRequest) => auth0.middleware(req);
export const HEAD = (req: NextRequest) => auth0.middleware(req);
export const OPTIONS = (req: NextRequest) => auth0.middleware(req);
