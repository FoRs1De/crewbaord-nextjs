import { cookies } from 'next/headers';

export const GET = async (req, res) => {
  cookies().set('JWT', 'remove', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });
  return Response.json({ message: 'Logged out' });
};
