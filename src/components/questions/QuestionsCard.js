'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import flags from 'emoji-flags';

export function QuestionsCard({ question }) {
  const [expandida, setExpandida] = useState(false);
  const formattedDate = question.date
    ? format(new Date(question.date), "d 'de' MMMM yyyy", { locale: es })
    : '';

  const texto = question.question || '';
  const esLarga = texto.length > 200;
  const textoVisible = expandida ? texto : texto.slice(0, 200);

  // Obtener bandera por país
  const countryName = question.country || '';
const countryMatch = flags.data.find(f =>
  countryName.trim().toLowerCase().endsWith(f.name.toLowerCase())
);
const countryFlag = countryMatch?.emoji || '';

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start mb-4">
        <div className="relative w-10 h-10 mr-3">
          <UserCircleIcon className="w-10 h-10 text-blue-800" />
          <span className="absolute top-0 right-0 text-xs font-bold text-blue-800 bg-white rounded-full px-1">
            ?
          </span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{question.askedBy}</h4>
          {countryName && (
            <p className="text-sm text-gray-500">
              {countryFlag} {countryName}
            </p>
          )}
          {question.date && (
            <p className="text-xs text-gray-500">{formattedDate}</p>
          )}
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">
        <span className="font-medium">Pregunta:</span> {textoVisible}
        {esLarga && !expandida && '...'}
      </p>

      {esLarga && (
        <button
          onClick={() => setExpandida(!expandida)}
          className="mt-4 inline-block px-4 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-200"
        >
          {expandida ? 'Leer menos' : 'Leer más'}
        </button>
      )}
    </div>
  );
}
