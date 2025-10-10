import { getLatestVideos } from '@/lib/notion';
import { VideoCard } from './VideoCard';

export default async function LatestVideos({ id }) {
  const videos = await getLatestVideos();

  const fallbackVideos = [
    {
      id: '1',
      title: 'El fruto del Espíritu Santo en tu vida',
      description: 'Exploramos los nueve frutos del Espíritu Santo según Gálatas 5:22-23 y cómo manifestarlos en nuestra vida diaria.',
      youtubeId: 'dQw4w9WgXcQ',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Estudios bíblicos'
    },
    {
      id: '2',
      title: 'Oración por sanidad emocional',
      description: 'Un tiempo especial de oración guiada para sanidad emocional y liberación de cargas del pasado.',
      youtubeId: 'dQw4w9WgXcQ',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Oración'
    },
    {
      id: '3',
      title: 'Cómo leer la Biblia diariamente',
      description: 'Consejos prácticos para establecer un hábito sólido de lectura bíblica y crecer en tu relación con Dios.',
      youtubeId: 'dQw4w9WgXcQ',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Crecimiento espiritual'
    }
  ];

  const videoList = videos.length > 0 ? videos : fallbackVideos;

  return (
    <section className="py-12 md:py-20 bg-white" id={id}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Últimos lives de Joaco</h2>
          <p className="text-xl text-gray-600">
            Explora nuestras últimas transmisiones en vivo y estudios bíblicos grabados para tu crecimiento espiritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoList.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@JoaquinPensa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-amber-600 text-amber-600 rounded-md font-medium hover:bg-amber-50 transition-colors"
          >
            Ver todos los videos en YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
