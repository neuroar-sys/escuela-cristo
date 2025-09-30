import { getPageContent, getEquipo } from '@/lib/notion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import MiembroEquipoCard from '@/components/questions';
import MethodLucide from '@/components/MethodLucide';

// Mapea los slugs a los IDs de tus páginas en Notion
const PAGE_MAP = {
  about: process.env.PAGE_ABOUT_ID || '',
  privacy: process.env.PAGE_PRIVACY_ID || '',
  consent: process.env.PAGE_CONSENT_ID || '',
  terms: process.env.PAGE_TERMS_ID || '',
  'como-es': process.env.PAGE_COMO_ES_ID || '', // Página "Cómo es"
};

// Genera los parámetros estáticos para cada slug
export async function generateStaticParams() {
  return Object.keys(PAGE_MAP).map((slug) => ({ slug }));
}

export default async function NotionPage({ params }) {
  const pageId = PAGE_MAP[params.slug];

  if (!pageId) {
    return <div className="text-center text-red-500">Página no encontrada. Verifica la configuración en .env.local.</div>;
  }

  // Obtiene el contenido de la página de Notion y el equipo en paralelo
  const [content, equipo] = await Promise.all([
    getPageContent(pageId),
    getEquipo(),
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Contenido principal de la página de Notion */}
      <div className="prose prose-lg mb-16">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </div>

      {/* Sección del Equipo (solo si estamos en la página "about") */}
      {equipo.length > 0 && params.slug === 'about' && (
        <section className="py-16 bg-gray-50 rounded-2xl">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nuestro Equipo</h2>
            <p className="text-xl text-center mb-16 text-gray-600 max-w-2xl mx-auto">
              Conoce a las personas apasionadas detrás de "Buenos Pasos", dedicadas a mejorar tu salud y bienestar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {equipo.map((miembro) => (
                <MiembroEquipoCard key={miembro.id} miembro={miembro} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}