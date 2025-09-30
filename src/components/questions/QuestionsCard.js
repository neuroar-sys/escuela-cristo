// src/components/questions/QuestionsCard.js
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function QuestionsCard({ question }) {
  const formattedDate = question.date ? format(new Date(question.date), "d 'de' MMMM yyyy", { locale: es }) : '';

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <span className="text-blue-800 font-bold">?</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{question.askedBy}</h4>
          <p className="text-sm text-gray-500">{question.country} • {formattedDate}</p>
        </div>
      </div>

      <p className="text-gray-700 mb-4">
        <span className="font-medium">Pregunta:</span> {question.question}
      </p>
    </div>
  );
}