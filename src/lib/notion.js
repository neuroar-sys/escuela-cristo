import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const DATABASE_IDS = {
  HERO: process.env.NOTION_HERO_DB_ID || '',
  LATEST_VIDEOS: process.env.NOTION_LATEST_VIDEOS_DB_ID || '',
  NEXT_LIVE: process.env.NOTION_NEXT_LIVE_DB_ID || '',
  TESTIMONIALS: process.env.NOTION_TESTIMONIALS_DB_ID || '',
  ABOUT: process.env.NOTION_ABOUT_DB_ID || '',
  QUESTIONS: process.env.NOTION_QUESTIONS_DB_ID || '',
  EDIFICADORES: process.env.NOTION_EDIFICADORES_DB_ID || '',
};

// --- HERO ---
export async function getHeroData() {
  if (!DATABASE_IDS.HERO) return [];
  try {
    const response = await notion.databases.query({ database_id: DATABASE_IDS.HERO });
    return response.results.map(page => ({
      id: page.id,
      title: getText(page.properties.Titulo),
      subtitle: getText(page.properties.Subtitle),
      description: getText(page.properties.Description),
      ctaText: getText(page.properties.CTAText),
      ctaLink: getUrl(page.properties.CTALink),
    }));
  } catch (error) {
    console.error('Error en getHeroData:', error);
    return [];
  }
}

// --- ÚLTIMOS VIDEOS ---
export async function getLatestVideos() {
  if (!DATABASE_IDS.LATEST_VIDEOS) return [];
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.LATEST_VIDEOS,
      filter: {
        property: 'Publicado',
        status: { equals: 'Si' } // ← CORREGIDO
      },
      sorts: [{ property: 'Fecha', direction: 'descending' }],
      page_size: 3,
    });
    return response.results.map(page => ({
      id: page.id,
      title: getText(page.properties.Titulo),
      description: getText(page.properties.Descripcion),
      youtubeId: getText(page.properties.YouTubeID),
      date: getDate(page.properties.Fecha),
      category: getMultiSelect(page.properties.Categoria),
    }));
  } catch (error) {
    console.error('Error en getLatestVideos:', error);
    return [];
  }
}


// --- EDIFICADORES ---
export async function getEdificadores() {
  if (!DATABASE_IDS.EDIFICADORES) return [];
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.EDIFICADORES,
      filter: {
        property: 'Publicado',
        status: { equals: 'Si' }
      },
      sorts: [{ property: 'Fecha', direction: 'descending' }],
      page_size: 3,
    });
    return response.results.map(page => ({
      id: page.id,
      title: getText(page.properties.Titulo),
      description: getText(page.properties.Descripcion),
      youtubeId: getText(page.properties.YouTubeID),
      date: getDate(page.properties.Fecha),
      category: getMultiSelect(page.properties.Categoria),
      published: page.properties.Publicado?.status?.name === 'Si', // ✅ agregado
    }));
  } catch (error) {
    console.error('Error en getEdificadores:', error);
    return [];
  }
}


// --- TESTIMONIOS ---
export async function getTestimonials() {
  if (!DATABASE_IDS.TESTIMONIALS) return [];
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.TESTIMONIALS,
      filter: {
        property: 'Publicado',
        status: { equals: 'Si' } // ← CORREGIDO
      },
      sorts: [{ property: 'Fecha', direction: 'descending' }],
      page_size: 8,
    });
    return response.results.map(page => ({
      id: page.id,
      name: getText(page.properties.Nombre),
      testimonial: getText(page.properties.Testimonio),
      date: getDate(page.properties.Fecha),
      location: getText(page.properties.Pais),
    }));
  } catch (error) {
    console.error('Error en getTestimonials:', error);
    return [];
  }
}

// --- PREGUNTAS DE MIEMBROS ---
export async function getMemberQuestions() {
  if (!DATABASE_IDS.QUESTIONS) return [];
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.QUESTIONS,
      filter: {
        property: 'Publicado',
        status: { equals: 'Si' } // ← CORREGIDO
      },
      sorts: [{ property: 'Fecha', direction: 'descending' }],
      page_size: 10,
    });
    return response.results.map(page => ({
      id: page.id,
      question: getText(page.properties.Pregunta),
      askedBy: getText(page.properties.Nombre),
      country: getText(page.properties.Pais),
      date: getDate(page.properties.Fecha),
    }));
  } catch (error) {
    console.error('Error en getMemberQuestions:', error);
    return [];
  }
}

// --- PRÓXIMO VIVO ---
export async function getNextLive() {
  if (!DATABASE_IDS.NEXT_LIVE) return [];
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.NEXT_LIVE,
      filter: {
        property: 'Fecha',
        date: { after: new Date().toISOString() },
      },
      sorts: [{ property: 'Fecha', direction: 'ascending' }],
      page_size: 1,
    });
    return response.results.map(page => ({
      id: page.id,
      title: getText(page.properties.Nombre),
      description: getText(page.properties.Descripcion),
      date: getDate(page.properties.Fecha),
      youtubeLink: getUrl(page.properties.Canal),
    }));
  } catch (error) {
    console.error('Error en getNextLive:', error);
    return [];
  }
}

// --- SOBRE NOSOTROS ---
export async function getAboutData() {
  if (!DATABASE_IDS.ABOUT) return [];
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.ABOUT,
      page_size: 1,
    });
    if (response.results.length === 0) return [];
    const page = response.results[0];
    return [{
      id: page.id,
      title: getText(page.properties.Titulo),
      description: getText(page.properties.Descripcion),
      mission: getText(page.properties.Mision),
      vision: getText(page.properties.Vision),
      values: getMultiline(page.properties.Valores),
      image: getUrl(page.properties.Imagen),
    }];
  } catch (error) {
    console.error('Error en getAboutData:', error);
    return [];
  }
}

// --- FUNCIONES AUXILIARES ---
function getText(prop) {
  return prop?.rich_text?.map(t => t.plain_text).join('') || '';
}

function getMultiline(prop) {
  return prop?.rich_text?.map(t => t.plain_text).filter(t => t.trim() !== '') || [];
}

function getDate(prop) {
  return prop?.date?.start || null;
}

function getUrl(prop) {
  if (prop?.url) return prop.url;
  if (prop?.files?.length > 0) {
    const file = prop.files[0];
    return file.file?.url || file.external?.url || '';
  }
  return '';
}

function getMultiSelect(prop) {
  return prop?.multi_select?.map(opt => opt.name) || [];
}
