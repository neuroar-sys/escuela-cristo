// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Escuela de Cristo Colectivo | Comunidad Cristiana',
    template: '%s | Escuela de Cristo Colectivo',
  },
  description: 'Un espacio de aprendizaje, crecimiento espiritual y conexión con otros creyentes de todo el mundo.',
  openGraph: {
    title: 'Escuela de Cristo Colectivo | Comunidad Cristiana',
    description: 'Un espacio de aprendizaje, crecimiento espiritual y conexión con otros creyentes de todo el mundo.',
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