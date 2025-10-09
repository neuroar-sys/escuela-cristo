import { getHeroData } from '@/lib/notion';

export default async function Hero() {
  const heroData = await getHeroData();
  const hero = heroData[0] || {
    title: "Escuela del Cristo Colectivo",
    subtitle: "Edificando el Cuerpo de Cristo por medio de la Obra Apostólica 🚧 ",
    description: "Escuela del Cristo Colectivo es una comunidad nacida en la Obra Apostólica, dedicada a edificar el Cuerpo de Cristo con un propósito claro y eterno: que Cristo sea formado en nosotros.",
    ctaText: "Conocer el canal",
    ctaLink: "https://www.youtube.com/@JoaquinPensa",
  };

  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna de texto centrada con fondo */}
          <div className="flex flex-col justify-center h-full">
            <div className="bg-white/80 backdrop-blur-md border border-amber-100 rounded-2xl p-8 shadow-md">
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
                // *************************************************************************
                // CORREGIDO: Usar hero.ctaLink en lugar de hero.ctaLink
                href={hero.ctaLink} // <-- AQUÍ
                // *************************************************************************
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
          </div>

          {/* Video */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/MrhB9D2f2EI"
                title="Último video del vivo - Escuela de Cristo Colectivo"
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
