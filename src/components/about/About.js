// src/components/about/About.js
import { getAboutData } from '@/lib/notion';

export default async function About({ id }) { // Recibe el id como prop
  const aboutData = await getAboutData();
  const aboutInfo = aboutData[0] || {
    // Valores por defecto si no hay datos en Notion
    title: "Sobre Escuela de Cristo Colectivo",
    description: "Somos una comunidad cristiana global...",
    mission: "Nuestra misión es hacer accesible la enseñanza bíblica...",
    vision: "Ser una comunidad global de creyentes...",
    values: [
      "Biblia como fundamento de toda enseñanza",
      "Comunidad inclusiva y amorosa",
      "Oración como eje central de nuestra vida",
      "Aprendizaje continuo en la Palabra",
      "Testimonio auténtico y transformador"
    ],
    image: "https://placehold.co/600x400/FFD700/000000?text=Comunidad+Cristiana",
    detailedContent: null // El contenido detallado puede no estar disponible
  };

  // Función para renderizar el contenido detallado de la página de Notion
  const renderDetailedContent = (blocks) => {
    if (!blocks || blocks.length === 0) {
      return null; // Si no hay contenido detallado, no renderizamos nada adicional aquí
    }

    return blocks.map((block, index) => {
      // Este es un ejemplo simple. Puedes hacer un renderizado más complejo según tus necesidades
      // y los tipos de bloques que uses en Notion.
      switch (block.type) {
        case 'paragraph':
          return <p key={index} className="text-gray-600 mb-4">{block.paragraph.rich_text.map((t, i) => <span key={i}>{t.plain_text}</span>)}</p>;
        case 'heading_1':
          return <h3 key={index} className="text-xl font-bold text-gray-900 mb-2">{block[block.type].rich_text.map((t, i) => <span key={i}>{t.plain_text}</span>)}</h3>;
        case 'heading_2':
          return <h4 key={index} className="text-lg font-semibold text-gray-800 mb-2">{block[block.type].rich_text.map((t, i) => <span key={i}>{t.plain_text}</span>)}</h4>;
        case 'heading_3':
          return <h5 key={index} className="text-base font-medium text-gray-700 mb-2">{block[block.type].rich_text.map((t, i) => <span key={i}>{t.plain_text}</span>)}</h5>;
        case 'bulleted_list_item':
          return <li key={index} className="list-disc pl-5 text-gray-600">{block.bulleted_list_item.rich_text.map((t, i) => <span key={i}>{t.plain_text}</span>)}</li>;
        case 'numbered_list_item':
          return <li key={index} className="list-decimal pl-5 text-gray-600">{block.numbered_list_item.rich_text.map((t, i) => <span key={i}>{t.plain_text}</span>)}</li>;
        case 'to_do':
          return <li key={index} className="flex items-center text-gray-600">
            <input type="checkbox" checked={block.to_do.checked} readOnly className="mr-2" />
            {block.to_do.rich_text.map((t, i) => <span key={i}>{t.plain_text}</span>)}
          </li>;
        case 'quote':
          return <blockquote key={index} className="border-l-4 border-amber-500 pl-4 italic text-gray-700 my-4">{block.quote.rich_text.map((t, i) => <span key={i}>{t.plain_text}</span>)}</blockquote>;
        case 'divider':
          return <hr key={index} className="my-6 border-t border-gray-200" />;
        // Agrega más casos según los tipos de bloques que uses en tu página de Notion
        default:
          console.log("Tipo de bloque no manejado en About:", block.type, block);
          return null;
      }
    });
  };

  return (
    <section className="py-12 md:py-16 bg-white" id={id}> {/* Usa el id aquí */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutInfo.title}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {aboutInfo.description}
            </p>

            {/* Renderizado del contenido detallado de la página de Notion */}
            {aboutInfo.detailedContent && (
              <div className="mb-8">
                {renderDetailedContent(aboutInfo.detailedContent)}
              </div>
            )}

            {/* Si no hay contenido detallado, mostramos los bloques fijos */}
            {!aboutInfo.detailedContent && (
              <>
                <div className="bg-amber-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Nuestra misión</h3>
                  <p className="text-gray-600">
                    {aboutInfo.mission}
                  </p>
                </div>

                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Nuestra visión</h3>
                  <p className="text-gray-600">
                    {aboutInfo.vision}
                  </p>
                </div>
              </>
            )}
          </div>

          <div>
            {/* Imagen promocional */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-8">
              {aboutInfo.image ? (
                <img
                  src={aboutInfo.image}
                  alt="Comunidad cristiana"
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-64 bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                  Comunidad cristiana global
                </div>
              )}
            </div>

            {/* Valores */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nuestros valores</h3>
              <ul className="space-y-3">
                {(aboutInfo.values.length > 0 ? aboutInfo.values : [
                  "Biblia como fundamento de toda enseñanza",
                  "Comunidad inclusiva y amorosa",
                  "Oración como eje central de nuestra vida",
                  "Aprendizaje continuo en la Palabra",
                  "Testimonio auténtico y transformador"
                ]).map((value, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span className="text-gray-600">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}