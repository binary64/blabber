/** @jsxImportSource react */

'use server';

import { auth } from '../modules/user/lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Index from '../modules/user';

const Page = async () => {
  const authRequest = auth.handleRequest({
    cookies,
    request: null,
  });
  const session = await authRequest.validate();
  if (!session) redirect('/login');
  return <Index />;
};

export default Page;
