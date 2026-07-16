import type { LocalizedText } from "./translations";

export interface WorkExperience {
  role: LocalizedText;
  company: string;
  location: LocalizedText;
  dates: LocalizedText;
  bullets: LocalizedText[];
}

export interface LeadershipRole {
  title: LocalizedText;
  org: string;
  dates: LocalizedText;
  description: LocalizedText;
}

export const workExperience: WorkExperience[] = [
  {
    role: { en: "Marketing & Programs Intern", it: "Stagista Marketing e Programmi", es: "Practicante de Marketing y Programas" },
    company: "World Affairs Council of Las Vegas",
    location: { en: "Las Vegas, NV", it: "Las Vegas, Nevada", es: "Las Vegas, Nevada" },
    dates: { en: "May 2026 - Sep 2026", it: "Maggio 2026 - Settembre 2026", es: "Mayo 2026 - Septiembre 2026" },
    bullets: [
      { en: "Supporting IVLP delegations from 10+ countries, leveraging trilingual fluency for cross-cultural engagement.", it: "Seguo le delegazioni IVLP di oltre 10 Paesi, mettendo a frutto la mia trilinguità per creare un dialogo interculturale.", es: "Acompaño a delegaciones IVLP de más de 10 países, aprovechando mi trilingüismo para tender puentes entre culturas." },
      { en: "Coordinating end-to-end event logistics for diplomatic and business audiences.", it: "Coordino tutta la logistica degli eventi, dall'inizio alla fine, per un pubblico diplomatico e aziendale.", es: "Coordino toda la logística de los eventos, de principio a fin, para un público diplomático y empresarial." },
      { en: "Producing marketing collateral and managing multi-platform social media campaigns.", it: "Realizzo materiali di marketing e gestisco campagne social su più piattaforme.", es: "Creo materiales de marketing y gestiono campañas en redes sociales en varias plataformas." },
      { en: "Drafting executive correspondence for board members, partners, and participants.", it: "Curo la corrispondenza istituzionale per membri del consiglio, partner e partecipanti.", es: "Redacto la correspondencia institucional para miembros de la junta, socios y participantes." },
    ],
  },
  {
    role: { en: "Marketing Lead", it: "Responsabile Marketing", es: "Responsable de Marketing" },
    company: "Team Casas Mortgage",
    location: { en: "Las Vegas, NV", it: "Las Vegas, Nevada", es: "Las Vegas, Nevada" },
    dates: { en: "Oct 2025 - Aug 2026", it: "Ottobre 2025 - Agosto 2026", es: "Octubre 2025 - Agosto 2026" },
    bullets: [
      { en: "Owned end-to-end marketing strategy for a residential mortgage team in a competitive market.", it: "Ho guidato l'intera strategia di marketing di un team di mutui residenziali in un mercato molto competitivo.", es: "Llevé toda la estrategia de marketing de un equipo de hipotecas residenciales en un mercado muy competitivo." },
      { en: "Created social media content and campaigns that strengthened brand visibility and lead generation.", it: "Ho creato contenuti e campagne social che hanno rafforzato la visibilità del brand e portato nuovi contatti.", es: "Creé contenido y campañas en redes que reforzaron la visibilidad de la marca y atrajeron nuevos clientes potenciales." },
      { en: "Aligned marketing initiatives with quarterly business objectives and client outreach priorities.", it: "Ho allineato le iniziative di marketing agli obiettivi trimestrali e alle priorità di contatto con i clienti.", es: "Alineé las iniciativas de marketing con los objetivos trimestrales y las prioridades de contacto con clientes." },
    ],
  },
  {
    role: { en: "Administrative & Operations Assistant", it: "Assistente Amministrativa e Operativa", es: "Asistente Administrativa y de Operaciones" },
    company: "Davide Tarsi",
    location: { en: "Las Vegas, NV", it: "Las Vegas, Nevada", es: "Las Vegas, Nevada" },
    dates: { en: "Jan 2023 - Aug 2025", it: "Gennaio 2023 - Agosto 2025", es: "Enero 2023 - Agosto 2025" },
    bullets: [
      { en: "Delivered executive-level admin support across scheduling, research, and daily operations for 2.5+ years.", it: "Per oltre due anni e mezzo ho offerto un supporto amministrativo di alto livello tra agenda, ricerche e gestione quotidiana.", es: "Durante más de dos años y medio di apoyo administrativo de alto nivel en agenda, investigación y gestión del día a día." },
      { en: "Managed client communications through Yelp, Google Calendar, and email with consistent positive feedback.", it: "Ho gestito i contatti con i clienti tramite Yelp, Google Calendar ed email, ricevendo sempre riscontri positivi.", es: "Gestioné la comunicación con los clientes por Yelp, Google Calendar y correo, con reseñas siempre positivas." },
    ],
  },
  {
    role: { en: "Sales Associate", it: "Addetta alle Vendite", es: "Vendedora" },
    company: "DAN Valetudo",
    location: { en: "Valencia, Spain", it: "Valencia, Spagna", es: "Valencia, España" },
    dates: { en: "Jan 2019 - Present", it: "Gennaio 2019 - Oggi", es: "Enero 2019 - Actualidad" },
    bullets: [
      { en: "Generated $5,000+ in merchandise revenue in a single weekend at MMA and BJJ competitions.", it: "In un solo weekend, tra competizioni di MMA e BJJ, ho generato oltre 5.000 dollari di vendite di merchandise.", es: "En un solo fin de semana, entre competiciones de MMA y BJJ, generé más de 5.000 dólares en venta de merchandising." },
      { en: "Built rapport with international wholesale buyers, converting inquiries into recurring orders.", it: "Ho costruito un rapporto di fiducia con buyer wholesale internazionali, trasformando le richieste in ordini ricorrenti.", es: "Construí relaciones de confianza con compradores mayoristas internacionales, convirtiendo consultas en pedidos recurrentes." },
      { en: "Managed live inventory tracking and sales reporting under high-traffic event conditions.", it: "Ho gestito il magazzino in tempo reale e la reportistica delle vendite durante eventi molto affollati.", es: "Gestioné el inventario en tiempo real y los informes de ventas en eventos con mucha afluencia." },
    ],
  },
];

export const leadershipRoles: LeadershipRole[] = [
  {
    title: { en: "Former Club President", it: "Ex Presidente di Club", es: "Expresidenta de Clubes" },
    org: "UNLV Student Organizations",
    dates: { en: "2025 - 2026", it: "2025 - 2026", es: "2025 - 2026" },
    description: {
      en: "Founded and led three student clubs - including growing the International Business Association from 3 to 13 members and launching its first trip in years.",
      it: "Ho fondato e guidato tre club studenteschi, tra cui l'International Business Association, che ho portato da 3 a 13 membri organizzando il primo viaggio dopo anni.",
      es: "Fundé y dirigí tres clubes estudiantiles, entre ellos la International Business Association, que crecí de 3 a 13 miembros y llevé a su primer viaje en años.",
    },
  },
  {
    title: { en: "Secretary", it: "Segretaria", es: "Secretaria" },
    org: "Lee Student Advisory Board",
    dates: { en: "Fall 2025 - Present", it: "Autunno 2025 - Oggi", es: "Otoño 2025 - Actualidad" },
    description: {
      en: "Documenting board minutes, tracking action items, and supporting governance within the Lee Business School.",
      it: "Redigo i verbali del consiglio, tengo traccia delle azioni da seguire e sostengo la governance della Lee Business School.",
      es: "Redacto las actas del consejo, hago seguimiento de las tareas y apoyo la gobernanza de la Lee Business School.",
    },
  },
  {
    title: { en: "Standards Chair", it: "Standards Chair", es: "Standards Chair" },
    org: "Gamma Phi Beta",
    dates: { en: "2023 - Present", it: "2023 - Oggi", es: "2023 - Actualidad" },
    description: {
      en: "Supporting member development and upholding chapter standards within the sorority.",
      it: "Accompagno la crescita delle socie e custodisco i valori del capitolo all'interno della sorority.",
      es: "Acompaño el desarrollo de las miembros y velo por los valores del capítulo dentro de la sororidad.",
    },
  },
];
