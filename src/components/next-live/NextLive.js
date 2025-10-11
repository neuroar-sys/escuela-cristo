import { getNextLive } from '@/lib/notion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Countdown from '../Countdown';

export default async function NextLive({ id }) {
  const nextLiveData = await getNextLive();

  if (!nextLiveData || nextLiveData.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-amber-50" id={id}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No hay vivos programados</h2>
          <p className="text-gray-600">Vuelve pronto para ver el próximo estudio bíblico en vivo.</p>
        </div>
      </section>
    );
  }

  const nextLive = nextLiveData[0];
  const isoDate = nextLive.date;
  const formattedDate = isoDate
    ? format(new Date(isoDate), "EEEE d 'de' MMMM 'a las' HH:mm'hs'", { locale: es })
    : 'Fecha no disponible';

  return (
    <section className="py-12 md:py-16 bg-amber-50" id={id}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
            Próximo VIVO
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Únete a nuestra próxima transmisión</h2>
          <p className="text-xl text-gray-600">
            No te pierdas nuestro estudio bíblico en vivo, donde profundizaremos en la Palabra de Dios.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 via-white to-amber-100 border border-amber-200 rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="font-medium text-gray-700">Próxima transmisión en vivo</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{nextLive.title}</h3>
              <p className="text-gray-600 mb-6">{nextLive.description}</p>

              <div className="flex items-center bg-amber-50 px-3 py-2 rounded-lg mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formattedDate}</span>
              </div>

              <a
                href={nextLive.youtubeLink || '#'}
                className="inline-flex items-center justify-center w-full px-6 py-4 bg-red-600 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-red-700 transition-all md:w-auto md:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Unirse al vivo
              </a>

              <Countdown isoDate={isoDate} />
            </div>

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
