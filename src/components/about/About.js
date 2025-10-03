// src/components/about/About.js
import { getAboutData } from '@/lib/notion';

export default async function About({ id }) {
  const aboutData = await getAboutData();
  const about = aboutData[0] || {
    title: "Sobre Escuela de Cristo Colectivo",
    description: "Somos una comunidad cristiana global que busca conectar a creyentes de todo el mundo a través de estudios bíblicos, oración y crecimiento espiritual.",
    mission: "Nuestra misión es hacer accesible la enseñanza bíblica profunda y aplicable a personas de todas partes del mundo, fomentando una comunidad de apoyo y crecimiento espiritual.",
    vision: "Ser una comunidad global de creyentes que vive y comparte la Palabra de Dios, transformando vidas a través de la enseñanza bíblica sólida y la conexión fraterna.",
    values: [
      "Biblia como fundamento de toda enseñanza",
      "Comunidad inclusiva y amorosa",
      "Oración como eje central de nuestra vida",
      "Aprendizaje continuo en la Palabra",
      "Testimonio auténtico y transformador"
    ],
    // *************************************************************************
    // CORREGIDO: URL de imagen directa
    image: "https://placehold.co/600x400/FFD700/000000?text=Comunidad+Cristiana" // <-- Cambia por tu URL real
    // *************************************************************************
  };

  return (
    <section className="py-12 md:py-16 bg-white" id={id}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{about.title}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {about.description}
            </p>

            <div className="bg-amber-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nuestra misión</h3>
              <p className="text-gray-600">
                {about.mission}
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nuestra visión</h3>
              <p className="text-gray-600">
                {about.vision}
              </p>
            </div>
          </div>

          <div>
            {/* *************************************************************************
                 CORREGIDO: Sección de imagen con URL simple
                 ************************************************************************* */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-8">
              {about.image ? (
                <img 
                  src={about.image} 
                  alt="Comunidad cristiana" 
                  className="w-full h-auto rounded-xl"
                  onError={(e) => {
                    // Si la imagen no carga, mostramos un placeholder
                    e.target.onerror = null; // Previene loops infinitos
                    e.target.src = "https://placehold.co/600x400/FFD700/000000?text=Imagen+no+disponible";
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-amber-100 flex items-center justify-center text-amber-800 font-bold rounded-xl">
                  Escuela de Cristo Colectivo
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nuestros valores</h3>
              <ul className="space-y-3">
                {about.values.map((value, index) => (
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