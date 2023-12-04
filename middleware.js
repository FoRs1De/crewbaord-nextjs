import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const protectedRoutes = ['/login', '/registration'];
const seamanProtectedRoutes = [];
const employerProtectedRoutes = [];

export default function middleware(req) {
  const cookiesList = cookies();
  const sessionStatus = cookiesList.has('JWT');
  const tokenObj = cookiesList.get('JWT');
  let token;
  let userRole;
  if (tokenObj) {
    token = tokenObj.value;
    const userData = jwt.decode(token);
    userRole = userData.userRole;
  }

  // rules for all loggedin users
  if (sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  //rules for seamen

  if (
    userRole === 'seaman' &&
    seamanProtectedRoutes.includes(req.nextUrl.pathname)
  ) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  //rules for employers

  if (
    userRole === 'employer' &&
    employerProtectedRoutes.includes(req.nextUrl.pathname)
  ) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
