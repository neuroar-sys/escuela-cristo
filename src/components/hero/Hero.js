// src/components/hero/Hero.js
import { getHeroData } from '@/lib/notion'; // Importamos la función nombrada
import { getLatestVideos } from '@/lib/notion'; // Importamos la función nombrada

export default async function Hero() {
  const heroData = await getHeroData(); // <-- Usamos la función importada
  const hero = heroData[0] || {
    title: "Escuela de Cristo Colectivo",
    subtitle: "Edificando el Cuerpo de Cristo por medio de la Obra Apostólica 🚧 ",
    description: "Un espacio de aprendizaje, crecimiento espiritual y conexión con otros creyentes de todo el mundo. Únete a nuestras transmisiones en vivo.",
    ctaText: "Suscríbete a nuestro canal",
    ctaLink: "https://www.youtube.com/@JoaquinPensa",
  };

  // Obtenemos los últimos videos de Notion
  const latestVideos = await getLatestVideos(); // <-- Usamos la función importada
  // Tomamos el primer video de la lista (el más reciente, según el orden en Notion o el sort definido)
  const latestVideo = latestVideos[0] || {
    // Valores por defecto si no hay videos en Notion
    youtubeId: 'MrhB9D2f2EI', // ID del video de ejemplo que mencionaste
    title: 'Último video del vivo',
    description: 'Última transmisión en vivo de Escuela de Cristo Colectivo.'
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {hero.title}
            </h1>
            <p className="text-xl text-amber-700 font-medium mb-4">
              {hero.subtitle}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={hero.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors"
              >
                {hero.ctaText}
              </a>
              <a
                href="#next-live"
                className="inline-flex items-center justify-center px-6 py-3 border border-amber-600 text-amber-600 rounded-md font-medium hover:bg-amber-50 transition-colors"
              >
                Ver próximo vivo
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Contenedor con aspect ratio 16:9 */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio (9 / 16 * 100%) */}
              {/* Iframe que ocupa el 100% del contenedor relativo */}
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${latestVideo.youtubeId}`}
                title={latestVideo.title || "Último video del vivo - Escuela de Cristo Colectivo"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}