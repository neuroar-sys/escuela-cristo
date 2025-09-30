// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/ui/Header';

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
    url: 'https://tu-sitio-de-escuela-cristo-colectivo.vercel.app/', // Cambia por tu URL real
    images: ['/images/og-image.jpg'], // Asegúrate de tener esta imagen o cámbiala
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

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Escuela de Cristo Colectivo</h3>
            <p className="text-sm opacity-75">Comunidad cristiana para todo el mundo.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 contacto@escueladecristocolectivo.com</li>
              {/* <li>📱 +54 9 11 1234-5678</li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Legales</h3>
            <ul className="space-y-2">
              {/* <li><a href="/notion-page/privacy" className="text-blue-400 hover:underline">Política de Privacidad</a></li>
              <li><a href="/notion-page/consent" className="text-blue-400 hover:underline">Consentimiento Informado</a></li>
              <li><a href="/notion-page/terms" className="text-blue-400 hover:underline">Términos y Condiciones</a></li> */}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-xs opacity-50">© {new Date().getFullYear()} Escuela de Cristo Colectivo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}