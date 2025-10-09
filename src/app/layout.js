// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Escuela del Cristo Colectivo | Comunidad Cristiana',
    template: '%s | Escuela del Cristo Colectivo',
  },
  description: 'Escuela del Cristo Colectivo es una comunidad nacida en la Obra Apostólica, dedicada a edificar el Cuerpo de Cristo con un propósito claro y eterno: que Cristo sea formado en nosotros.',
  openGraph: {
    title: 'Escuela del Cristo Colectivo | Comunidad Cristiana',
    description: 'Escuela del Cristo Colectivo es una comunidad nacida en la Obra Apostólica, dedicada a edificar el Cuerpo de Cristo con un propósito claro y eterno: que Cristo sea formado en nosotros.',
    url: 'https://escuela-cristo.vercel.app/',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}