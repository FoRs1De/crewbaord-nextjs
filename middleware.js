import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/login', '/registration'];

export default function middleware(req) {
  const cookiesList = cookies();
  const sessionStatus = cookiesList.has('JWT');
  if (sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
