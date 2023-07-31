import { auth, googleAuth } from '../../../../modules/user/lucia';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('oauth_state')?.value ?? null;
  if (!storedState || storedState !== state || !code || !state) {
    return new Response(null, { status: 401 });
  }
  const {
    existingUser,
    googleUser: providerUser,
    createUser,
  } = await googleAuth.validateCallback(code);

  const getUser = async () => {
    if (existingUser) return existingUser;
    return await createUser({
      attributes: {
        fullName: providerUser.name,
      },
    });
  };
  const user = await getUser();
  const session = await auth.createSession({
    userId: user.userId,
    attributes: {},
  });
  const authRequest = auth.handleRequest({ request: null, cookies });
  authRequest.setSession(session);
  return NextResponse.redirect(new URL('/', url));
};
