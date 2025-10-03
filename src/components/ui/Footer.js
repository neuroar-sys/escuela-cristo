// src/components/ui/Footer.js
export default function Footer() {
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
              <li>📱 +54 9 11 1234-5678</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Legales</h3>
            <ul className="space-y-2">
              <li><a href="/notion-page/privacy" className="text-blue-400 hover:underline">Política de Privacidad</a></li>
              <li><a href="/notion-page/consent" className="text-blue-400 hover:underline">Consentimiento Informado</a></li>
              <li><a href="/notion-page/terms" className="text-blue-400 hover:underline">Términos y Condiciones</a></li>
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