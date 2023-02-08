import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
// `withAuth` augments your `Request` with the user's token.
export async function middleware(req) {
  const token = await getToken({ req });
  // console.log('session', req.url);

  if (req.nextUrl.pathname.includes('profile')) {
    if (!token) {
      // return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // if (req.nextUrl.pathname === '/profile') {
  //   console.log('run');
  //   return NextResponse.rewrite(new URL('/profile/all-properties', req.url));
  // }
}
