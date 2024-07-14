import { GraphqlProvider } from '../layouts/ApolloProvider';
import './style.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar justify-between bg-base-300 sticky top-0">
          <a className="btn btn-ghost text-lg">Blabber</a>

          <ul className="hidden menu sm:menu-horizontal gap-2">
            <li>
              <Link href="/jira">Tasks</Link>
            </li>
            <li>
              <Link
                shallow={true}
                prefetch={true}
                scroll={false}
                href="/bitbucket"
              >
                Team
              </Link>
            </li>
            <li>
              <a>Ops</a>
            </li>
          </ul>

          <div className="hidden sm:flex gap-2">
            <a className="btn btn-circle btn-ghost btn-sm text-xl">
              👋
            </a>
            <a className="btn btn-sm btn-primary">Log in</a>
          </div>
        </nav>
        <main>
          <GraphqlProvider>{children}</GraphqlProvider>
        </main>
      </body>
    </html>
  );
}
