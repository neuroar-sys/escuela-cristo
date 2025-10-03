// src/components/ui/Header.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-amber-700">
              Escuela de Cristo Colectivo
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#next-live" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">
              Próximo Vivo
            </Link>
            <Link href="#latest-videos" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">
              Videos
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">
              Testimonios
            </Link>
            <Link href="#questions" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">
              Preguntas
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">
              Nosotros
            </Link>
          </nav>

          {/* Botones CTA Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <a
              href="https://www.youtube.com/@JoaquinPensa"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-200 text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Suscríbete
            </a>
          </div>

          {/* Menú hamburguesa para móviles */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              aria-label="Alternar menú principal"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-md">
              <Link
                href="#next-live"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Próximo Vivo
              </Link>
              <Link
                href="#latest-videos"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Videos
              </Link>
              <Link
                href="#testimonials"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Testimonios
              </Link>
              <Link
                href="#questions"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Preguntas
              </Link>
              <Link
                href="#about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Sobre Nosotros
              </Link>
              <div className="px-3 pt-2 pb-2 space-y-2">
                <a
                  href="https://www.youtube.com/@JoaquinPensa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-200 block flex items-center justify-center"
                  onClick={closeMenu}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  Suscríbete
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}