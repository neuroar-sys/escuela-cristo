import { getEdificadores } from '@/lib/notion';
import { EdificadorCard } from './EdificadorCard';

export default async function Edificadores() {
  const videos = await getEdificadores();

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">Edificadores</h2>
<p className="text-lg text-gray-600 text-center mb-8">
  Videos que edifican tu fe y fortalecen tu caminar espiritual.
</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <EdificadorCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
