// src/components/questions/Questions.js
import { getMemberQuestions } from '@/lib/notion';
import { QuestionsCard } from './QuestionsCard';
import Form from '@/components/form/Form'; // Importamos el componente Form

export default async function Questions({ id }) {
  const questions = await getMemberQuestions();

  const fallbackQuestions = [
    {
      id: '1',
      question: '¿Cómo puedo aplicar la Palabra de Dios en mi matrimonio?',
      askedBy: 'Juan Pérez',
      country: 'Buenos Aires, Argentina',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      question: '¿Qué dice la Biblia sobre la ansiedad?',
      askedBy: 'María López',
      country: 'México DF, México',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];

  const questionsList = questions.length > 0 ? questions : fallbackQuestions;

  return (
    <section className="py-12 md:py-16 bg-white" id={id}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas de los miembros</h2>
          <p className="text-xl text-gray-600">
            Aquí encontrarás las últimas preguntas realizadas por nuestra comunidad cristiana. Únete a la conversación.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {questionsList.map((question) => (
            <QuestionsCard key={question.id} question={question} />
          ))}
        </div>

        {/* Componente Form para el botón y popup del formulario */}
        <Form />
      </div>
    </section>
  );
}