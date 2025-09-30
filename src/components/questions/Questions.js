// src/components/questions/Questions.js
import { getMemberQuestions } from '@/lib/notion';
import { QuestionsCard } from './QuestionsCard';

export default async function Questions({ id, openForm }) {
  const questions = await getMemberQuestions();

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
          {questions.map((question) => (
            <QuestionsCard key={question.id} question={question} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={openForm}
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors"
          >
            Enviar una pregunta
          </button>
        </div>
      </div>
    </section>
  );
}