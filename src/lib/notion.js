// src/lib/notion.js
import { Client } from '@notionhq/client';

// Inicializa el cliente de Notion con la clave de API
// Esta clave NUNCA debe estar expuesta en el código del cliente
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// IDs de las bases de datos de Notion
// Estos IDs tampoco deben estar expuestos en el código del cliente
export const DATABASE_IDS = {
  HERO: process.env.NOTION_HERO_DB_ID || '',
  LATEST_VIDEOS: process.env.NOTION_LATEST_VIDEOS_DB_ID || '',
  NEXT_LIVE: process.env.NOTION_NEXT_LIVE_DB_ID || '',
  TESTIMONIALS: process.env.NOTION_TESTIMONIALS_DB_ID || '',
  ABOUT: process.env.NOTION_ABOUT_DB_ID || '',
  QUESTIONS: process.env.NOTION_QUESTIONS_DB_ID || '',
  EDIFICADORES: process.env.NOTION_EDIFICADORES_DB_ID || '',
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
      sorts: [{ property: 'Fecha', direction: 'descending' }],
      page_size: 6
    });

    return response.results.map(pageToVideoData);
  } catch (error) {
    console.error('Error al obtener últimos videos:', error);
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
        property: 'Fecha',
        date: {
          after: new Date().toISOString()
        }
      },
      sorts: [
        { property: 'Fecha', direction: 'ascending' }
      ],
      page_size: 1
    });
    return response.results.map(pageToNextLiveData);
  } catch (error) {
    console.error('Error al obtener el próximo vivo:', error);
    return [];
  }
}
export async function getEdificadores() {
  const response = await notion.databases.query({
    database_id: DATABASE_IDS.EDIFICADORES,
    filter: {
      property: 'Publicada',
      checkbox: { equals: true }
    },
    sorts: [
      { property: 'Fecha', direction: 'descending' }
    ],
    page_size: 6
  });

  return response.results.map(pageToEdificadorData);
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
        property: 'Publicado',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        { property: 'Fecha', direction: 'descending' }
      ],
      page_size: 8
    });
    return response.results.map(pageToTestimonialData);
  } catch (error) {
    console.error('Error al obtener testimonios:', error);
    return [];
  }
}

// --- CORREGIDA: Función para obtener preguntas de los miembros ---
export async function getMemberQuestions() {
  if (!DATABASE_IDS.QUESTIONS) {
    console.error('NOTION_QUESTIONS_DB_ID no está definido');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.QUESTIONS,
      filter: {
        property: 'Publicada', // Usamos 'Publicada' en lugar de 'Answered'
        checkbox: {
          equals: true // Solo preguntas publicadas
        }
      },
      sorts: [
        { property: 'Fecha', direction: 'descending' } // Ordenar por fecha descendente
      ],
      page_size: 10 // Limitar a las últimas 10 preguntas
    });
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
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.ABOUT,
      page_size: 1
    });

    if (response.results.length === 0) {
      console.warn('No se encontraron registros en la base de datos ABOUT.');
      return [];
    }

    const aboutRecord = response.results[0];
    return [{
      id: aboutRecord.id,
      title: getTextProperty(aboutRecord.properties.Titulo),
      description: getTextProperty(aboutRecord.properties.Descripcion),
      mission: getTextProperty(aboutRecord.properties.Mision),
      vision: getTextProperty(aboutRecord.properties.Vision),
      values: getMultilineTextProperty(aboutRecord.properties.Valores),
      image: getTextProperty(aboutRecord.properties['Imagen']),
    }];
  } catch (error) {
    console.error('Error al obtener datos de "Sobre nosotros" desde la base:', error);
    return [];
  }
}

// --- FUNCIONES DE MAPEO ---
function pageToHeroData(page) {
  return {
    id: page.id,
    // *************************************************************************
    // CAMBIADO: Ahora usamos la columna personalizada "Titulo" en lugar de "Title"
    title: getTextProperty(page.properties['Titulo']), // <-- AQUÍ: Usamos 'Titulo'
    // *************************************************************************
    subtitle: getTextProperty(page.properties.Subtitle),
    description: getTextProperty(page.properties.Description),
    ctaText: getTextProperty(page.properties.CTAText) || 'Suscríbete',
     ctaLink: getUrlProperty(page.properties.CTALink) || 'https://www.youtube.com/@JoaquinPensa',
  };
}

function pageToVideoData(page) {
  return {
    id: page.id,
    title: getTextProperty(page.properties.Titulo),
    description: getTextProperty(page.properties.Descripcion),
    youtubeId: getTextProperty(page.properties.YouTubeID),
    date: getDateProperty(page.properties.Fecha),
    category: page.properties.Categoria?.multi_select?.map(opt => opt.name) || [],
  };
}



function pageToNextLiveData(page) {
  return {
    id: page.id,
    title: getTextProperty(page.properties.Nombre),
    description: getTextProperty(page.properties.Descripcion),
    date: getDateProperty(page.properties.Fecha), // ← incluye fecha y hora
    youtubeLink: getUrlProperty(page.properties.Canal) || '#',
  };
}


function pageToEdificadorData(page) {
  return {
    id: page.id,
    title: getTextProperty(page.properties.Titulo),
    description: getTextProperty(page.properties.Descripcion),
    youtubeId: getTextProperty(page.properties.YouTubeID),
    date: getDateProperty(page.properties.Fecha),
    category: page.properties.Categoria?.multi_select?.map(opt => opt.name) || [],
    published: page.properties.Publicada?.checkbox || false,
  };
}



function pageToTestimonialData(page) {
  return {
    id: page.id,
    name: getTextProperty(page.properties.Nombre),
    testimonial: getTextProperty(page.properties.Testimonio),
    date: getDateProperty(page.properties.Fecha),
    location: getTextProperty(page.properties.Pais),
  };
}

// --- CORREGIDA: Función de mapeo para preguntas de miembros ---
function pageToMemberQuestionData(page) {
  return {
    id: page.id,
    // *************************************************************************
    // USAMOS LOS NOMBRES EXACTOS DE LAS COLUMNAS EN TU BASE DE DATOS NOTION
    question: getTextProperty(page.properties['Pregunta']), // Columna 'Pregunta'
    askedBy: getTextProperty(page.properties['Nombre']),    // Columna 'Nombre'
    country: getTextProperty(page.properties['Pais']),      // Columna 'Pais'
    date: getDateProperty(page.properties['Fecha']) || page.created_time, // Columna 'fecha'
    // *************************************************************************
  };
}

function pageToAboutData(page) {
  return {
    id: page.id,
    title: getTextProperty(page.properties.Title), // Asumiendo propiedad 'Title'
    description: getTextProperty(page.properties.Description), // Asumiendo propiedad 'Description'
    mission: getTextProperty(page.properties.Mission), // Asumiendo propiedad 'Mission'
    vision: getTextProperty(page.properties.Vision), // Asumiendo propiedad 'Vision'
    values: getMultilineTextProperty(page.properties.Values), // Asumiendo propiedad 'Values'
    // *************************************************************************
    // CORREGIDO: Ahora usamos getTextProperty para una URL simple
    image: getTextProperty(page.properties['Image']), // <-- Cambia 'Image' por el NOMBRE EXACTO de tu columna en Notion
    // *************************************************************************
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

function getDateProperty(property) {
  if (!property || !property.date) return null;
  return property.date.start;
}
// *************************************************************************
// NUEVA FUNCIÓN AUXILIAR: Para obtener URLs de archivos o enlaces externos
function getUrlProperty(property) {
  if (!property) return '';
  
  // Si es una propiedad URL simple
  if (property.url) {
    return property.url;
  }
  
  // Si es una propiedad Files (archivos subidos a Notion)
  if (property.files && property.files.length > 0) {
    const file = property.files[0];
    if (file.file) {
      return file.file.url; // URL temporal de archivos subidos a Notion
    } else if (file.external) {
      return file.external.url; // URL de archivos externos
    }
  }
  
  return ''; // Si no hay URL válida
}
// *************************************************************************