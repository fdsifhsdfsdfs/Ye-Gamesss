
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { usePathname } from 'next/navigation';
import { FirebaseClientProvider } from '@/firebase';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const metadata: Metadata = {
    title: 'Ye Games',
    description: 'educational lessons by BxltRust',
  };

  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={String(metadata.description)} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}');
              `}
            </script>
          </>
        )}
        {adSenseClientId && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
            crossOrigin="anonymous"></script>
        )}
      </head>
      <body className="bg-background text-foreground font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <div id="app-container" className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </FirebaseClientProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
