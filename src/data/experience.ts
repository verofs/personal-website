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
    role: { en: "Marketing & Programs Intern", it: "Stagista Marketing e Programmi", es: "Practicas de Marketing y Programas" },
    company: "World Affairs Council of Las Vegas",
    location: { en: "Las Vegas, NV", it: "Las Vegas, Nevada", es: "Las Vegas, Nevada" },
    dates: { en: "May 2026 - Sep 2026", it: "Maggio 2026 - Settembre 2026", es: "Mayo 2026 - Septiembre 2026" },
    bullets: [
      { en: "Supporting IVLP delegations from 10+ countries, leveraging trilingual fluency for cross-cultural engagement.", it: "Supporto a delegazioni IVLP da oltre 10 Paesi, usando la fluenza trilingue per l'engagement interculturale.", es: "Apoyo a delegaciones IVLP de mas de 10 paises, usando fluidez trilingue para engagement intercultural." },
      { en: "Coordinating end-to-end event logistics for diplomatic and business audiences.", it: "Coordinamento completo della logistica eventi per audience diplomatiche e business.", es: "Coordinacion integral de logistica de eventos para audiencias diplomaticas y empresariales." },
      { en: "Producing marketing collateral and managing multi-platform social media campaigns.", it: "Creazione di materiali marketing e gestione campagne social multi-piattaforma.", es: "Produccion de materiales de marketing y gestion de campanas sociales multiplataforma." },
      { en: "Drafting executive correspondence for board members, partners, and participants.", it: "Redazione di comunicazioni executive per board member, partner e partecipanti.", es: "Redaccion de comunicaciones ejecutivas para board members, partners y participantes." },
    ],
  },
  {
    role: { en: "Marketing Lead", it: "Responsabile Marketing", es: "Responsable de Marketing" },
    company: "Team Casas Mortgage",
    location: { en: "Las Vegas, NV", it: "Las Vegas, Nevada", es: "Las Vegas, Nevada" },
    dates: { en: "Oct 2025 - Aug 2026", it: "Ottobre 2025 - Agosto 2026", es: "Octubre 2025 - Agosto 2026" },
    bullets: [
      { en: "Owned end-to-end marketing strategy for a residential mortgage team in a competitive market.", it: "Gestione end-to-end della strategia marketing per un team mortgage in un mercato competitivo.", es: "Gestion completa de estrategia de marketing para un equipo hipotecario en un mercado competitivo." },
      { en: "Created social media content and campaigns that strengthened brand visibility and lead generation.", it: "Creazione di contenuti social e campagne per rafforzare visibilita del brand e lead generation.", es: "Creacion de contenido social y campanas para fortalecer visibilidad de marca y generacion de leads." },
      { en: "Aligned marketing initiatives with quarterly business objectives and client outreach priorities.", it: "Allineamento delle iniziative marketing con obiettivi trimestrali e priorita di client outreach.", es: "Alineacion de iniciativas de marketing con objetivos trimestrales y prioridades de contacto con clientes." },
    ],
  },
  {
    role: { en: "Administrative & Operations Assistant", it: "Assistente Amministrativa e Operativa", es: "Asistente Administrativa y de Operaciones" },
    company: "Davide Tarsi",
    location: { en: "Las Vegas, NV", it: "Las Vegas, Nevada", es: "Las Vegas, Nevada" },
    dates: { en: "Jan 2023 - Aug 2025", it: "Gennaio 2023 - Agosto 2025", es: "Enero 2023 - Agosto 2025" },
    bullets: [
      { en: "Delivered executive-level admin support across scheduling, research, and daily operations for 2.5+ years.", it: "Supporto amministrativo executive per scheduling, ricerca e operazioni quotidiane per oltre 2,5 anni.", es: "Apoyo administrativo ejecutivo en agenda, investigacion y operaciones diarias por mas de 2,5 anos." },
      { en: "Managed client communications through Yelp, Google Calendar, and email with consistent positive feedback.", it: "Gestione comunicazioni clienti tramite Yelp, Google Calendar ed email con feedback costantemente positivo.", es: "Gestion de comunicaciones con clientes por Yelp, Google Calendar y email con feedback positivo constante." },
    ],
  },
  {
    role: { en: "Sales Associate", it: "Addetta Vendite", es: "Asociada de Ventas" },
    company: "DAN Valetudo",
    location: { en: "Valencia, Spain", it: "Valencia, Spagna", es: "Valencia, Espa\u00F1a" },
    dates: { en: "Jan 2019 - Present", it: "Gennaio 2019 - Presente", es: "Enero 2019 - Presente" },
    bullets: [
      { en: "Generated $5,000+ in merchandise revenue in a single weekend at MMA and BJJ competitions.", it: "Generati oltre $5.000 di ricavi merchandise in un weekend durante competizioni MMA e BJJ.", es: "Genere mas de $5.000 en ventas de merchandise en un fin de semana en competencias MMA y BJJ." },
      { en: "Built rapport with international wholesale buyers, converting inquiries into recurring orders.", it: "Costruzione relazioni con buyer wholesale internazionali, convertendo richieste in ordini ricorrenti.", es: "Construccion de relaciones con compradores mayoristas internacionales, convirtiendo consultas en pedidos recurrentes." },
      { en: "Managed live inventory tracking and sales reporting under high-traffic event conditions.", it: "Gestione tracking inventario live e report vendite in eventi ad alto traffico.", es: "Gestion de inventario en vivo y reportes de ventas en eventos de alto trafico." },
    ],
  },
];

export const leadershipRoles: LeadershipRole[] = [
  {
    title: { en: "President", it: "Presidente", es: "Presidenta" },
    org: "International Business Association",
    dates: { en: "Summer 2025 - May 2026", it: "Estate 2025 - Maggio 2026", es: "Verano 2025 - Mayo 2026" },
    description: { en: "Led all operations and executive board, organizing professional development events and guest speaker engagements.", it: "Guida operazioni e board esecutivo, organizzando eventi professionali e speaker ospiti.", es: "Liderazgo de operaciones y junta ejecutiva, organizando eventos profesionales y charlas con invitados." },
  },
  {
    title: { en: "President", it: "Presidente", es: "Presidenta" },
    org: "Artificial Intelligence in Business",
    dates: { en: "Fall 2025 - May 2026", it: "Autunno 2025 - Maggio 2026", es: "Otono 2025 - Mayo 2026" },
    description: { en: "Led a student org exploring AI in business strategy, marketing, and operations with industry guest lectures.", it: "Guida organizzazione studentesca su AI in strategia, marketing e operazioni con guest lecture.", es: "Liderazgo de organizacion estudiantil sobre IA en estrategia, marketing y operaciones con charlas de industria." },
  },
  {
    title: { en: "President", it: "Presidente", es: "Presidenta" },
    org: "Bhakti Yoga Club",
    dates: { en: "Fall 2025 - Present", it: "Autunno 2025 - Presente", es: "Otono 2025 - Presente" },
    description: { en: "Overseeing strategy, budgeting, event planning, and marketing for a campus wellness community.", it: "Supervisione strategia, budget, eventi e marketing per una community wellness universitaria.", es: "Supervision de estrategia, presupuesto, eventos y marketing para una comunidad wellness universitaria." },
  },
  {
    title: { en: "Secretary", it: "Segretaria", es: "Secretaria" },
    org: "Lee Student Advisory Board",
    dates: { en: "Fall 2025 - Present", it: "Autunno 2025 - Presente", es: "Otono 2025 - Presente" },
    description: { en: "Documenting board minutes, tracking action items, and supporting governance within the Lee Business School.", it: "Documentazione verbali, tracking action item e supporto governance alla Lee Business School.", es: "Documentacion de actas, seguimiento de tareas y apoyo a gobernanza en Lee Business School." },
  },
  {
    title: { en: "Standards Chair", it: "Standards Chair", es: "Standards Chair" },
    org: "Gamma Phi Beta",
    dates: { en: "2023 - Present", it: "2023 - Presente", es: "2023 - Presente" },
    description: { en: "Supporting member development and upholding chapter standards within the sorority.", it: "Supporto allo sviluppo membri e agli standard del chapter nella sorority.", es: "Apoyo al desarrollo de miembros y a los estandares del chapter en la sorority." },
  },
  {
    title: { en: "President", it: "Presidente", es: "Presidenta" },
    org: "Hispanic Honor Society",
    dates: { en: "2021 - 2023", it: "2021 - 2023", es: "2021 - 2023" },
    description: { en: "Led the organization in high school, partnering with Spring Preserve and Animal Sanctuary for community events.", it: "Guida dell'organizzazione al liceo, con partnership con Spring Preserve e Animal Sanctuary.", es: "Lidere la organizacion en high school, colaborando con Spring Preserve y Animal Sanctuary." },
  },
];
