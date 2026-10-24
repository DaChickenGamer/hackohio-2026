import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Folio — Build something that matters', description: 'Discover real-world challenges, share your projects, and grow through feedback.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>}
