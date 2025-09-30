// src/components/next-live/NextLive.js
import { getNextLive } from '@/lib/notion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default async function NextLive({ id }) { // Recibe el id como prop
  const nextLiveData = await getNextLive();
  const nextLive = nextLiveData[0] || {
    title: "Título del próximo vivo",
    description: "Descripción del próximo estudio bíblico o evento.",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días en el futuro como ejemplo
    time: "19:00",
    youtubeLink: "https://www.youtube.com/@JoaquinPensa", // Cambia esta URL por la tuya
  };

  const date = new Date(nextLive.date);
  const formattedDate = format(date, "EEEE, d 'de' MMMM", { locale: es });
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <section className="py-12 md:py-16 bg-amber-50" id={id}> {/* Usa el id aquí */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
            Próximo VIVO
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Únete a nuestra próxima transmisión</h2>
          <p className="text-xl text-gray-600">
            No te pierdas nuestro estudio bíblico en vivo, donde profundizaremos en la Palabra de Dios y compartiremos momentos de oración juntos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="font-medium text-gray-700">Próxima transmisión en vivo</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{nextLive.title}</h3>
              <p className="text-gray-600 mb-6">{nextLive.description}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-amber-50 px-3 py-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{capitalizedDate}</span>
                </div>
                <div className="flex items-center bg-amber-50 px-3 py-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{nextLive.time} hora local</span>
                </div>
              </div>

              <a
                href={nextLive.youtubeLink}
                className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Unirse al vivo
              </a>
            </div>

            {/* Imagen promocional opcional */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-transparent"></div>
              <div className="h-full w-full bg-amber-100 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-200 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">¿No puedes asistir?</h4>
                  <p className="text-gray-600">Todas nuestras transmisiones son grabadas y están disponibles en nuestro canal de YouTube para que puedas verlas cuando quieras.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}