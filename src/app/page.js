// src/app/page.js
'use client';

import { useState } from 'react';
import Hero from '@/components/hero/Hero';
import NextLive from '@/components/next-live/NextLive';
import LatestVideos from '@/components/latest-videos/LatestVideos';
import Testimonials from '@/components/testimonials/Testimonials';
import Questions from '@/components/questions/Questions';
import About from '@/components/about/About';

export default function Home() {
  const [showFormPopup, setShowFormPopup] = useState(false);

  const openForm = () => {
    setShowFormPopup(true);
  };

  const closeForm = () => {
    setShowFormPopup(false);
  };

  return (
    <main>
      <Hero />
      <NextLive id="next-live" />
      <LatestVideos id="latest-videos" />
      <Testimonials id="testimonials" />
      <Questions id="questions" openForm={openForm} />
      <About id="about" />

      {/* Popup/Modal para el Formulario */}
      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Formulario de Preguntas</h2>
              <button
                onClick={closeForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 flex-grow overflow-auto">
              {/* Incrusta el formulario de Fillout como un iframe */}
              <iframe
                src="https://forms.fillout.com/t/s2JbFfPVbnus"
                className="w-full h-[600px] md:h-[700px] rounded-lg border border-gray-200"
                title="Formulario de Preguntas"
              ></iframe>
            </div>
            <div className="p-4 border-t text-right">
              <button
                onClick={closeForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}