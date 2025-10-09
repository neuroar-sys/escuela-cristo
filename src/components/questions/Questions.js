// src/components/questions/Questions.js
import { getMemberQuestions } from '@/lib/notion';
import { QuestionsCard } from './QuestionsCard';
import Form from '@/components/form/Form';

export default async function Questions({ id }) {
  const questions = await getMemberQuestions();

  const fallbackQuestions = [
    {
      id: '1',
      question: '¿Cómo puedo aplicar la Palabra de Dios en mi matrimonio?',
      askedBy: 'Juan Pérez',
      country: 'Buenos Aires, Argentina',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
    },
    {
      id: '2',
      question: '¿Qué dice la Biblia sobre la ansiedad?',
      askedBy: 'María López',
      country: 'México DF, México',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días atrás
    },
    {
      id: '3',
      question: '¿Cómo puedo perdonar de corazón?',
      askedBy: 'Carlos Rodríguez',
      country: 'España',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días atrás
    }
  ];

  const questionsList = questions.length > 0 ? questions : fallbackQuestions;

  return (
    <section className="py-12 md:py-16 bg-white" id={id}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas de los miembros</h2>
          <p className="text-xl text-gray-600">
            Aquí encontrarás las últimas preguntas realizadas por nuestra comunidad. Serán respondidas en el próximo live.
          </p>
        </div>

        {/* *************************************************************************
             ACTUALIZADO: Cuadrícula para mostrar 2 o 3 tarjetas por fila en escritorio
             ************************************************************************* */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionsList.map((question) => (
            <QuestionsCard key={question.id} question={question} />
          ))}
        </div>
        {/* ************************************************************************* */}

        <Form />
      </div>
    </section>
  );
}
