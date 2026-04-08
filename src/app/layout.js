import './globals.css';

export const metadata = {
  title: 'Interactive Wall Calendar | Take U Forward',
  description: 'A beautiful, interactive wall calendar component with date range selection, integrated notes, and seasonal themes. Built with React and Next.js.',
  keywords: 'calendar, wall calendar, date picker, range selector, react, next.js',
  openGraph: {
    title: 'Interactive Wall Calendar',
    description: 'A polished, interactive calendar component inspired by physical wall calendars.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
