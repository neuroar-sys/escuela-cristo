// src/components/testimonials/Testimonials.js
import { getTestimonials } from '@/lib/notion';
import { TestimonioCard } from './TestimonioCard';

export default async function Testimonials({ id }) { // Recibe el id como prop
  const testimonials = await getTestimonials();

  const fallbackTestimonials = [
    {
      id: '1',
      name: 'María González',
      testimonial: 'La Escuela de Cristo Colectivo ha sido un refugio espiritual para mí durante momentos difíciles. Los estudios bíblicos son profundos y aplicables a la vida diaria.',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Buenos Aires, Argentina'
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      testimonial: 'Me encanta la comunidad que se ha formado. Aunque somos de diferentes países, nos sentimos como una familia en Cristo. Las transmisiones en vivo son un momento que espero con ansias cada semana.',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'México DF, México'
    },
    {
      id: '3',
      name: 'Ana Martínez',
      testimonial: 'Los recursos y estudios bíblicos han transformado mi vida. Ahora tengo herramientas para aplicar la Palabra de Dios en mi matrimonio y crianza de mis hijos.',
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Madrid, España'
    }
  ];

  const testimonialList = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="py-12 md:py-16 bg-amber-50" id={id}> {/* Usa el id aquí */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimonios de nuestra comunidad</h2>
          <p className="text-xl text-gray-600">
            Descubre cómo la Escuela de Cristo Colectivo ha impactado la vida de personas de todo el mundo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialList.map((testimonial) => (
            <TestimonioCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#next-live"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors"
          >
            Únete a nuestra comunidad
          </a>
        </div>
      </div>
    </section>
  );
}