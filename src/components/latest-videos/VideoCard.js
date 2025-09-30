// src/components/latest-videos/VideoCard.js
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function VideoCard({ video }) {
  const formattedDate = video.date ? format(new Date(video.date), "d 'de' MMM", { locale: es }) : '';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative pb-[56.25%] h-0">
        {video.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-t-xl"
          ></iframe>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            Video no disponible
          </div>
        )}
      </div>
      <div className="p-4">
        {video.category && (
          <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full mb-2">
            {video.category}
          </span>
        )}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
        {video.date && (
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formattedDate}
          </div>
        )}
      </div>
    </div>
  );
}