// src/components/ui/FilloutFormModal.js
'use client'; // Este componente necesita ser un Client Component para la interactividad

import { useState } from 'react';

export default function FilloutFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <div className="mt-12 text-center">
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors duration-200"
        >
          Enviar una pregunta
        </button>
      </div>

      {/* Modal/Popup para el Formulario de Fillout */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Encabezado del modal */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Formulario de Preguntas</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cerrar formulario"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Contenido del modal - iframe del formulario */}
            <div className="p-4 flex-grow overflow-auto">
              <iframe
                src="https://forms.fillout.com/t/s2JbFfPVbnus" // URL del formulario de Fillout
                className="w-full h-[600px] md:h-[700px] rounded-lg border border-gray-200"
                title="Dejanos tus Preguntas"
                loading="lazy"
              ></iframe>
            </div>
            
            {/* Pie del modal */}
            <div className="p-4 border-t text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
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