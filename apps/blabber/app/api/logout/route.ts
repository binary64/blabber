import { auth } from '../../../modules/user/lucia';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  console.log('logout.POST');
  const authRequest = auth.handleRequest({ request: null, cookies });
  const session = await authRequest.validate();
  if (!session) {
    console.log('logout.POST - no session');
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return new Response(null, {
    status: 302,
    headers: {
      location: '/login',
    },
  });
};
