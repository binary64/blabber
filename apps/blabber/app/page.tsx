import { auth } from '../modules/user/lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Page = async () => {
  const authRequest = auth.handleRequest({
    cookies,
  });
  const session = await authRequest.validate();
  if (!session) redirect('/login');
  return (
    <>
      <p>
        This page is protected and can only be accessed by
        authenticated users.
      </p>
      <pre className="code">{JSON.stringify(session, null, 2)}</pre>
      LOGOUT
    </>
  );
};

export default Page;
