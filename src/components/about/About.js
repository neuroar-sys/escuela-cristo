// src/components/about/About.js
import { getAboutData } from '@/lib/notion';

export default async function About({ id }) {
  const aboutData = await getAboutData();
  const about = aboutData[0] || {
    title: "Sobre Escuela de Cristo Colectivo",
    description: "Somos una comunidad cristiana global que busca conectar a creyentes de todo el mundo a través de estudios bíblicos, oración y crecimiento espiritual.",
    mission: "Nuestra misión es hacer accesible la enseñanza bíblica profunda y aplicable a personas de todas partes del mundo, fomentando una comunidad de apoyo y crecimiento espiritual.",
    vision: "Ser una comunidad global de creyentes que vive y comparte la Palabra de Dios, transformando vidas a través de la enseñaje bíblica sólida y la conexión fraterna.",
    values: [
      "Biblia como fundamento de toda enseñanza",
      "Comunidad inclusiva y amorosa",
      "Oración como eje central de nuestra vida",
      "Aprendizaje continuo en la Palabra",
      "Testimonio auténtico y transformador"
    ],
    image: "https://placehold.co/600x400/FFD700/000000?text=Comunidad+Cristiana"
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-white" id={id}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título principal */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {about.title}
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenido de texto */}
            <div className="space-y-12">
              {/* Descripción destacada */}
              <div className="relative">
                <div className="absolute -inset-4">
                  <div className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter" style={{
                    background: 'linear-gradient(90deg, #f59e0b, #d97706)'
                  }}></div>
                </div>
                <div className="relative bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Llamado</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {about.description}
                  </p>
                </div>
              </div>

              {/* Misión */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-amber-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Nuestra Misión</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {about.mission}
                </p>
              </div>

              {/* Visión */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-amber-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Nuestra Visión</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {about.vision}
                </p>
              </div>
            </div>

            {/* Contenido visual */}
            <div className="space-y-8">
              {/* Imagen principal */}
              <div className="relative w-full text-amber-800 font-medium rounded-3xl px-6 py-0 text-center leading-loose h-auto min-h-[20rem] flex items-center justify-center overflow-hidden bg-amber-50 border border-amber-100 shadow-sm">
  {/* Badge */}
  <div className="absolute top-4 left-4 bg-white text-amber-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-amber-200">
    1 Corintios 12:12
  </div>

  {/* Texto bíblico */}
  <p className="relative z-10 max-w-3xl mx-auto">
    De hecho, aunque el cuerpo es uno solo, tiene muchos miembros y todos los miembros, no obstante ser muchos, forman un solo cuerpo. Así sucede con Cristo. Todos fuimos bautizados por un solo Espíritu para constituir un solo cuerpo —ya seamos judíos o no, esclavos o libres—, y a todos se nos dio a beber de un mismo Espíritu.
  </p>
</div>


              {/* Valores */}
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Nuestros Valores</h3>
                <ul className="space-y-4">
                  {about.values.map((value, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-amber-200" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-3 text-amber-50">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cita inspiracional */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-amber-100 text-center">
                <div className="text-amber-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <blockquote className="text-xl italic text-gray-700 mb-4">
                 "Por tanto, id y haced discípulos a todas las naciones..."
                </blockquote>
                <cite className="text-gray-500">— Mateo 28:19</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}