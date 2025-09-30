// src/components/testimonials/TestimonioCard.js
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function TestimonioCard({ testimonial }) {
  const formattedDate = testimonial.date ? format(new Date(testimonial.date), "d 'de' MMMM yyyy", { locale: es }) : '';

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
          <span className="text-amber-800 font-bold">{testimonial.name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
          {testimonial.location && (
            <p className="text-sm text-gray-500">{testimonial.location}</p>
          )}
        </div>
      </div>
      <blockquote className="text-gray-600 italic mb-4">"{testimonial.testimonial}"</blockquote>
      {testimonial.date && (
        <div className="text-xs text-gray-400">
          {formattedDate}
        </div>
      )}
    </div>
  );
}