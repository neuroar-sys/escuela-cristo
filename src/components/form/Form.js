// src/components/form/Form.js
'use client'; // Es un Client Component porque maneja estado e interactividad

import { useState } from 'react';

export default function Form() {
  const [showFormPopup, setShowFormPopup] = useState(false);

  const openForm = () => {
    setShowFormPopup(true);
  };

  const closeForm = () => {
    setShowFormPopup(false);
  };

  return (
    <>
      {/* Botones para abrir el popup y enlace a WhatsApp */}
      <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
        {/* Botón para abrir el popup del formulario */}
        <button
          onClick={openForm}
          className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Enviar una pregunta
        </button>

        {/* Botón para unirse al grupo de WhatsApp */}
        <a
          href="https://chat.whatsapp.com/JSjT5PypZgPGbuj9wny0Qa" // Enlace al grupo de WhatsApp
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Unirse al grupo
        </a>
      </div>

      {/* Popup/Modal para el Formulario */}
      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Formulario de Preguntas</h2>
              <button
                onClick={closeForm}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cerrar formulario"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 flex-grow overflow-auto">
              <iframe
                src="https://forms.fillout.com/t/s2JbFfPVbnus"
                className="w-full h-[600px] md:h-[700px] rounded-lg border border-gray-200"
                title="Formulario de Preguntas"
                loading="lazy"
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
    </>
  );
}