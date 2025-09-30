// src/lib/notion.js
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const DATABASE_IDS = {
  HERO: process.env.NOTION_HERO_DB_ID || '',
  LATEST_VIDEOS: process.env.NOTION_LATEST_VIDEOS_DB_ID || '',
  NEXT_LIVE: process.env.NOTION_NEXT_LIVE_DB_ID || '',
  TESTIMONIALS: process.env.NOTION_TESTIMONIALS_DB_ID || '',
  ABOUT: process.env.NOTION_ABOUT_DB_ID || '',
  QUESTIONS: process.env.NOTION_QUESTIONS_DB_ID || '', // Base para preguntas de Fillout
};

// --- FUNCIONES PARA OBTENER DATOS ---
export async function getHeroData() {
  if (!DATABASE_IDS.HERO) {
    console.error('NOTION_HERO_DB_ID no está definido');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.HERO,
    });
    return response.results.map(pageToHeroData);
  } catch (error) {
    console.error('Error al obtener datos del Hero:', error);
    return [];
  }
}

export async function getLatestVideos() {
  if (!DATABASE_IDS.LATEST_VIDEOS) {
    console.error('NOTION_LATEST_VIDEOS_DB_ID no está definido');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.LATEST_VIDEOS,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        { property: 'Date', direction: 'descending' }
      ],
      page_size: 6
    });
    return response.results.map(pageToVideoData);
  } catch (error) {
    console.error('Error al obtener los últimos videos:', error);
    return [];
  }
}

export async function getNextLive() {
  if (!DATABASE_IDS.NEXT_LIVE) {
    console.error('NOTION_NEXT_LIVE_DB_ID no está definido');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.NEXT_LIVE,
      filter: {
        property: 'Date',
        date: {
          after: new Date().toISOString()
        }
      },
      sorts: [
        { property: 'Date', direction: 'ascending' }
      ],
      page_size: 1
    });
    return response.results.map(pageToNextLiveData);
  } catch (error) {
    console.error('Error al obtener el próximo vivo:', error);
    return [];
  }
}

export async function getTestimonials() {
  if (!DATABASE_IDS.TESTIMONIALS) {
    console.error('NOTION_TESTIMONIALS_DB_ID no está definido');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.TESTIMONIALS,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        { property: 'Date', direction: 'descending' }
      ],
      page_size: 8
    });
    return response.results.map(pageToTestimonialData);
  } catch (error) {
    console.error('Error al obtener testimonios:', error);
    return [];
  }
}

// --- NUEVA FUNCIÓN: Obtener Preguntas de los Miembros ---
export async function getMemberQuestions() {
  if (!DATABASE_IDS.QUESTIONS) {
    console.error('NOTION_QUESTIONS_DB_ID no está definido');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.QUESTIONS,
      // Opcional: Filtrar si es necesario (por ejemplo, si se añaden otras propiedades como 'Procesado')
      // filter: { ... },
      // Ordenar por fecha de creación (o propiedad de fecha) descendente para obtener las más recientes
      sorts: [
        { property: 'Fecha', direction: 'descending' } // Cambia 'Fecha' por el NOMBRE EXACTO de tu propiedad de fecha en Notion
      ],
      page_size: 10 // Limitar a las últimas 10 preguntas
    });
    // Mapear los resultados usando una nueva función específica para preguntas de Fillout
    return response.results.map(pageToMemberQuestionData);
  } catch (error) {
    console.error('Error al obtener preguntas de los miembros desde Notion:', error);
    return [];
  }
}


export async function getAboutData() {
  if (!DATABASE_IDS.ABOUT) {
    console.error('NOTION_ABOUT_DB_ID no está definido');
    return [];
  }

  try {
    // Consultar la base de datos ABOUT
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.ABOUT,
      page_size: 1 // Asumiendo un solo registro de información general
    });

    if (response.results.length === 0) {
      console.warn('No se encontraron registros en la base de datos ABOUT.');
      return [];
    }

    const aboutRecord = response.results[0];

    // Obtener el ID de la página detallada desde la base de datos
    // Asumiendo que el nombre de la propiedad es 'About Page ID' en Notion
    const detailedPageId = getTextProperty(aboutRecord.properties['About Page ID']); // Cambia 'About Page ID' por el nombre exacto en Notion

    // Obtener el contenido de la página detallada
    let detailedContent = null;
    if (detailedPageId) {
      try {
        detailedContent = await getDetailedPageContent(detailedPageId);
      } catch (error) {
        console.error('Error al obtener el contenido de la página detallada de About:', error);
        // Puedes optar por continuar con el resto de la info y sin el contenido detallado
      }
    }

    return [{
      id: aboutRecord.id,
      title: getTextProperty(aboutRecord.properties.Title), // Asumiendo propiedad 'Title'
      description: getTextProperty(aboutRecord.properties.Description), // Asumiendo propiedad 'Description'
      mission: getTextProperty(aboutRecord.properties.Mission), // Asumiendo propiedad 'Mission'
      vision: getTextProperty(aboutRecord.properties.Vision), // Asumiendo propiedad 'Vision'
      values: getMultilineTextProperty(aboutRecord.properties.Values), // Asumiendo propiedad 'Values'
      image: getTextProperty(aboutRecord.properties['Image URL']), // Asumiendo propiedad 'Image URL'
      detailedContent: detailedContent, // Agregar el contenido detallado obtenido de la página
    }];
  } catch (error) {
    console.error('Error al obtener datos de "Sobre nosotros" desde la base:', error);
    return [];
  }
}

// Nueva función para obtener el contenido de la página detallada
async function getDetailedPageContent(pageId) {
  // Verificar si el ID tiene el formato correcto (32 caracteres alfanuméricos)
  if (!pageId || pageId.length !== 32) {
    throw new Error('ID de página inválido para obtener contenido detallado.');
  }

  try {
    // Obtener bloques de la página
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    return response.results;
  } catch (error) {
    console.error('Error al listar bloques de la página detallada:', error);
    throw error; // Re-lanzar para manejarlo en getAboutData
  }
}


// --- FUNCIONES DE MAPEO ---
function pageToHeroData(page) {
  return {
    id: page.id,
    title: getTextProperty(page.properties.Title),
    subtitle: getTextProperty(page.properties.Subtitle),
    description: getTextProperty(page.properties.Description),
    ctaText: getTextProperty(page.properties.CTAText), // Corregido: añadido (page.properties.CTAText)
    ctaLink: getTextProperty(page.properties.CTALink) || '#',
  };
}

function pageToVideoData(page) {
  return {
    id: page.id,
    title: getTextProperty(page.properties.Title),
    description: getTextProperty(page.properties.Description),
    youtubeId: getTextProperty(page.properties.YouTubeID),
    date: getDateProperty(page.properties.Date),
    category: getTextProperty(page.properties.Category),
  };
}

function pageToNextLiveData(page) {
  return {
    id: page.id,
    title: getTextProperty(page.properties.Title),
    description: getTextProperty(page.properties.Description),
    date: getDateProperty(page.properties.Date),
    time: getTextProperty(page.properties.Time),
    youtubeLink: getTextProperty(page.properties.YoutubeLink) || '#',
  };
}

function pageToTestimonialData(page) {
  return {
    id: page.id,
    name: getTextProperty(page.properties.Name),
    testimonial: getTextProperty(page.properties.Testimonial),
    date: getDateProperty(page.properties.Date),
    location: getTextProperty(page.properties.Location),
  };
}

// --- NUEVA FUNCIÓN DE MAPEO: Pregunta de Miembro ---
// Asegúrate de usar los NOMBRES EXACTOS de las propiedades en Notion
function pageToMemberQuestionData(page) {
  return {
    id: page.id,
    // *************************************************************************
    // CAMBIA 'Texto Pregunta' por el NOMBRE EXACTO de la columna en Notion
    question: getTextProperty(page.properties['Pregunta']), // <-- AQUÍ (columna con el texto de la pregunta)
    // *************************************************************************
    // *************************************************************************
    // CAMBIA 'TuNombre' por el NOMBRE EXACTO de la columna en Notion
    askedBy: getTextProperty(page.properties['TuNombre']),       // <-- ACTUALIZADO: Ahora usa 'TuNombre'
    // *************************************************************************
    country: getTextProperty(page.properties['País']),      // <-- Asegúrate de que 'País' sea correcto
    date: getDateProperty(page.properties['Fecha']) || page.created_time // <-- Asegúrate de que 'Fecha' sea correcto
  };
}


// --- FUNCIONES AUXILIARES ---
function getTextProperty(property) {
  if (!property || !property.rich_text) return '';
  return property.rich_text.map(text => text.plain_text).join('');
}

function getMultilineTextProperty(property) {
  if (!property || !property.rich_text) return [];
  return property.rich_text
    .map(text => text.plain_text)
    .filter(content => content.trim() !== '');
}

// Asegúrate de que getDateProperty maneje tanto propiedades Date como el created_time de la página
function getDateProperty(property) {
  if (!property) return null;
  // Si es una propiedad Date de Notion
  if (property.date) {
    return property.date.start;
  }
  // Si se pasa el created_time de la página directamente (string ISO)
  if (typeof property === 'string' && !isNaN(Date.parse(property))) {
     return property;
  }
  return null;
}