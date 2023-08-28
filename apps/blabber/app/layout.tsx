/** @jsxImportSource react */

export const metadata = {
  title: 'Blabber',
};

export default function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
