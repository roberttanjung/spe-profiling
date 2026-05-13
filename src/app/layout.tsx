import type { Metadata } from 'next';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Roboto } from 'next/font/google';
import { ColorSchemeProvider } from '../components/ColorSchemeProvider';
import AppLayout from '../components/AppLayout';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'ACT SPV Monitor',
  description: 'Dashboard monitoring profiling dan roadmap Frontend Engineer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <ColorSchemeProvider>
            <AppLayout>{children}</AppLayout>
          </ColorSchemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
