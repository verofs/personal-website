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
    title: { en: "President", it: "Presidente", es: "Presidenta" },
    org: "International Business Association",
    dates: { en: "May 2025 - May 2026", it: "Maggio 2025 - Maggio 2026", es: "Mayo 2025 - Mayo 2026" },
    description: {
      en: "Directed a 9-person executive board, drove 333% growth in paid membership, and created and led \"The Exchange,\" an inaugural networking forum connecting faculty and industry professionals.",
      it: "Ho guidato un consiglio direttivo di 9 persone, portato la membership pagante a +333% e ideato e diretto \"The Exchange\", il primo forum di networking tra docenti e professionisti del settore.",
      es: "Dirigí una junta ejecutiva de 9 personas, impulsé un crecimiento del 333% en la membresía de pago y creé y lideré \"The Exchange\", el primer foro de networking entre profesorado y profesionales del sector.",
    },
  },
  {
    title: { en: "Founding President", it: "Presidente Fondatrice", es: "Presidenta Fundadora" },
    org: "Artificial Intelligence in Business",
    dates: { en: "Aug 2025 - May 2026", it: "Agosto 2025 - Maggio 2026", es: "Agosto 2025 - Mayo 2026" },
    description: {
      en: "Founded the organization from scratch - its mission, leadership structure, and programming - and led a 5-person board running biweekly workshops on applying AI to real business scenarios.",
      it: "Ho fondato l'organizzazione da zero - missione, struttura di leadership e programmazione - guidando un consiglio di 5 persone e workshop bisettimanali sull'uso dell'AI in contesti di business reali.",
      es: "Fundé la organización desde cero - su misión, estructura de liderazgo y programación - y lideré una junta de 5 personas con talleres quincenales sobre cómo aplicar la IA a casos reales de negocio.",
    },
  },
  {
    title: { en: "President", it: "Presidente", es: "Presidenta" },
    org: "Bhakti Yoga Club",
    dates: { en: "Fall 2025 - Present", it: "Autunno 2025 - Oggi", es: "Otoño 2025 - Actualidad" },
    description: {
      en: "Overseeing strategy, budgeting, event planning, and marketing for a campus wellness community.",
      it: "Supervisiono strategia, budget, eventi e marketing per una community di benessere universitaria.",
      es: "Superviso la estrategia, el presupuesto, los eventos y el marketing de una comunidad de bienestar en el campus.",
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

export interface EducationEntry {
  degree: string;
  majors: LocalizedText[];
  school: string;
  dates: LocalizedText;
}

export const education: EducationEntry[] = [
  {
    degree: "B.S. in Business Administration",
    majors: [
      {
        en: "International Business",
        it: "Corso di Laurea in International Business",
        es: "International Business",
      },
      {
        en: "Marketing",
        it: "Corso di Laurea in Marketing",
        es: "Marketing",
      },
    ],
    school: "University of Nevada, Las Vegas",
    dates: { en: "Expected December 2026", it: "Laurea prevista dicembre 2026", es: "Graduación prevista diciembre 2026" },
  },
];

export interface CourseEntry {
  name: string;
  org: string;
  dates: LocalizedText;
  description: LocalizedText;
}

export const courses: CourseEntry[] = [
  {
    name: "NSF I-Corps Aspire Program",
    org: "Desert & Pacific Region",
    dates: { en: "May - Jun 2025", it: "Maggio - Giugno 2025", es: "Mayo - Junio 2025" },
    description: {
      en: "Entrepreneurial development in customer-driven research, business model validation, and Lean Startup principles.",
      it: "Formazione imprenditoriale su customer discovery, validazione del business model e principi Lean Startup.",
      es: "Formación emprendedora en customer discovery, validación de modelos de negocio y principios Lean Startup.",
    },
  },
  {
    name: "SDR Training",
    org: "StartUp Vegas",
    dates: { en: "2025", it: "2025", es: "2025" },
    description: {
      en: "Sales development training on outreach, qualification, and pipeline building for early-stage startups.",
      it: "Formazione SDR su outreach, qualificazione dei lead e costruzione della pipeline per startup early-stage.",
      es: "Formación SDR en prospección, cualificación de leads y construcción de pipeline para startups en fase inicial.",
    },
  },
];

export interface AwardEntry {
  title: string;
  detail: LocalizedText;
}

export const awards: AwardEntry[] = [
  {
    title: "President's Innovation Challenge",
    detail: { en: "Winner 2026 - RebelBot", it: "Vincitrice 2026 - RebelBot", es: "Ganadora 2026 - RebelBot" },
  },
  {
    title: "University of Nevada, Las Vegas Research Symposium",
    detail: { en: "Recognition - RebelBot student innovation", it: "Riconoscimento - innovazione studentesca RebelBot", es: "Reconocimiento - innovación estudiantil RebelBot" },
  },
  {
    title: "NSF I-Corps Aspire Program",
    detail: { en: "Selected Participant - Desert & Pacific Region", it: "Partecipante selezionata - Desert & Pacific Region", es: "Participante seleccionada - Desert & Pacific Region" },
  },
  {
    title: "Dean's List Honoree",
    detail: { en: "University of Nevada, Las Vegas - 2 semesters", it: "University of Nevada, Las Vegas - 2 semestri", es: "University of Nevada, Las Vegas - 2 semestres" },
  },
];
