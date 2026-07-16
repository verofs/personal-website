import type { LocalizedText } from "./translations";

export interface TimelineEntry {
  id: string;
  year: string;
  flag: string;
  title: LocalizedText;
  location: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  metrics?: LocalizedText[];
}

export const timelineData: TimelineEntry[] = [
  {
    id: "valencia",
    year: "2005",
    flag: "\u{1F1EA}\u{1F1F8}",
    title: { en: "Born in Valencia", it: "Nata a Valencia", es: "Nací en Valencia" },
    location: { en: "Valencia, Spain", it: "Valencia, Spagna", es: "Valencia, España" },
    description: {
      en: "Where it all started - growing up between Spanish and Italian cultures from day one.",
      it: "Dove è cominciato tutto: crescere tra cultura spagnola e italiana fin dal primo giorno.",
      es: "Donde empezó todo: crecer entre la cultura española y la italiana desde el primer día.",
    },
    highlights: [
      { en: "Dual cultural upbringing", it: "Crescita biculturale", es: "Crianza bicultural" },
      { en: "Native Spanish & Italian", it: "Spagnolo e italiano madrelingua", es: "Español e italiano nativos" },
    ],
  },
  {
    id: "rome",
    year: "2010",
    flag: "\u{1F1EE}\u{1F1F9}",
    title: { en: "Rome Years", it: "Gli Anni a Roma", es: "Los Años en Roma" },
    location: { en: "Rome, Italy", it: "Roma, Italia", es: "Roma, Italia" },
    description: {
      en: "Moved to Rome and attended a Liceo Scientifico – Scienze Applicate with the Cambridge program. A global mindset took root.",
      it: "Mi sono trasferita a Roma e ho frequentato il Liceo Scientifico – Scienze Applicate Cambridge. È lì che ho preso una mentalità aperta al mondo.",
      es: "Me mudé a Roma y estudié en un Liceo Scientifico – Scienze Applicate con el programa Cambridge. Ahí eché raíces con una mentalidad abierta al mundo.",
    },
    highlights: [
      { en: "Liceo Scientifico – Scienze Applicate", it: "Liceo Scientifico – Scienze Applicate", es: "Liceo Scientifico – Scienze Applicate" },
      { en: "Cambridge academic program", it: "Programma Cambridge", es: "Programa Cambridge" },
      { en: "Multilingual environment", it: "Ambiente multilingue", es: "Entorno multilingüe" },
    ],
  },
  {
    id: "america",
    year: "2020",
    flag: "\u{1F1FA}\u{1F1F8}",
    title: { en: "A New Chapter in America", it: "Un Nuovo Capitolo in America", es: "Un Nuevo Capítulo en América" },
    location: { en: "Pahrump, NV", it: "Pahrump, Nevada", es: "Pahrump, Nevada" },
    description: {
      en: "Moved to the United States. Tough times brought massive personal growth and resilience.",
      it: "Mi sono trasferita negli Stati Uniti. Un periodo difficile che mi ha regalato una crescita personale enorme e tanta resilienza.",
      es: "Me mudé a Estados Unidos. Una época difícil que me trajo un crecimiento personal enorme y mucha resiliencia.",
    },
    highlights: [
      { en: "Cultural adaptation", it: "Adattamento culturale", es: "Adaptación cultural" },
      { en: "Building resilience", it: "Resilienza", es: "Resiliencia" },
      { en: "New beginnings", it: "Nuovi inizi", es: "Nuevos comienzos" },
    ],
  },
  {
    id: "ib-program",
    year: "2021-2023",
    flag: "\u{1F1FA}\u{1F1F8}",
    title: { en: "Las Vegas & IB Program", it: "Las Vegas e Programma IB", es: "Las Vegas y Programa IB" },
    location: { en: "Palo Verde HS, Las Vegas", it: "Palo Verde HS, Las Vegas", es: "Palo Verde HS, Las Vegas" },
    description: {
      en: "International Baccalaureate program, President of Hispanic Honor Society, deep community involvement.",
      it: "Programma International Baccalaureate, presidente della Hispanic Honor Society e un forte impegno nella community.",
      es: "Programa International Baccalaureate, presidenta de la Hispanic Honor Society y una fuerte implicación en la comunidad.",
    },
    highlights: [
      { en: "IB Program", it: "Programma IB", es: "Programa IB" },
      { en: "President, Hispanic Honor Society", it: "Presidente, Hispanic Honor Society", es: "Presidenta, Hispanic Honor Society" },
      { en: "Spring Preserve & Animal Sanctuary volunteering", it: "Volontariato con Spring Preserve e Animal Sanctuary", es: "Voluntariado con Spring Preserve y Animal Sanctuary" },
    ],
  },
  {
    id: "unlv",
    year: "2023-Present",
    flag: "\u{1F393}",
    title: { en: "University of Nevada, Las Vegas - Going All In", it: "University of Nevada, Las Vegas - Al Massimo", es: "University of Nevada, Las Vegas - Con Todo" },
    location: { en: "University of Nevada, Las Vegas", it: "University of Nevada, Las Vegas", es: "University of Nevada, Las Vegas" },
    description: {
      en: "Double major in International Business & Marketing, plus student leadership across clubs, a sorority, and the Lee Student Advisory Board - including growing one club from 3 to 13 members.",
      it: "Doppia specializzazione in International Business e Marketing, insieme a un percorso di leadership tra club, sorority e il Lee Student Advisory Board, con un club cresciuto da 3 a 13 membri.",
      es: "Doble especialización en International Business y Marketing, además de liderazgo estudiantil entre clubes, una sororidad y el Lee Student Advisory Board, con un club que crecí de 3 a 13 miembros.",
    },
    highlights: [
      { en: "Double Major: International Business & Marketing", it: "Doppia specializzazione: International Business e Marketing", es: "Doble especialización: International Business y Marketing" },
      { en: "Grew a student club 3 to 13 members", it: "Club cresciuto da 3 a 13 membri", es: "Club que crecí de 3 a 13 miembros" },
      { en: "Gamma Phi Beta", it: "Gamma Phi Beta", es: "Gamma Phi Beta" },
      { en: "Lee Student Advisory Board", it: "Lee Student Advisory Board", es: "Lee Student Advisory Board" },
    ],
    metrics: [
      { en: "333% club membership growth", it: "Crescita membri del club del 333%", es: "Crecimiento de miembros del club del 333%" },
      { en: "First club trip after years of inactivity", it: "Primo viaggio del club dopo anni di inattività", es: "Primer viaje del club tras años de inactividad" },
    ],
  },
  {
    id: "exchange",
    year: "2025",
    flag: "\u{1F91D}",
    title: { en: "The Exchange", it: "The Exchange", es: "The Exchange" },
    location: { en: "Las Vegas, NV", it: "Las Vegas, Nevada", es: "Las Vegas, Nevada" },
    description: {
      en: "Built and led a large networking event connecting students, professionals, and founders across Las Vegas.",
      it: "Ho ideato e guidato un grande evento di networking che ha messo in contatto studenti, professionisti e founder di Las Vegas.",
      es: "Ideé y dirigí un gran evento de networking que conectó a estudiantes, profesionales y fundadores de Las Vegas.",
    },
    highlights: [
      { en: "120+ RSVPs", it: "120+ iscritti", es: "120+ inscritos" },
      { en: "80+ attendees", it: "80+ partecipanti", es: "80+ asistentes" },
      { en: "Managed 15 people", it: "Team di 15 persone", es: "Equipo de 15 personas" },
    ],
    metrics: [
      { en: "Community-building at scale", it: "Community-building su larga scala", es: "Creación de comunidad a gran escala" },
    ],
  },
  {
    id: "rebelbot-born",
    year: "2025",
    flag: "\u{1F680}",
    title: { en: "RebelBot is Born", it: "Nasce RebelBot", es: "Nace RebelBot" },
    location: { en: "Las Vegas, NV", it: "Las Vegas, Nevada", es: "Las Vegas, Nevada" },
    description: {
      en: "First startup idea sparked. Selected for NSF I-Corps, completed SDR training, and started building with a 4-person team.",
      it: "Scocca la prima idea di startup. Selezionata per l'NSF I-Corps, ho completato la formazione SDR e ho iniziato a costruire con un team di 4 persone.",
      es: "Surge la primera idea de startup. Seleccionada para el NSF I-Corps, completé la formación SDR y empecé a construir con un equipo de 4 personas.",
    },
    highlights: [
      { en: "NSF I-Corps Aspire Program", it: "Programma NSF I-Corps Aspire", es: "Programa NSF I-Corps Aspire" },
      { en: "25+ customer discovery interviews", it: "25+ interviste di customer discovery", es: "25+ entrevistas de customer discovery" },
      { en: "SDR Training at StartUp Vegas", it: "Formazione SDR con StartUp Vegas", es: "Formación SDR en StartUp Vegas" },
    ],
  },
  {
    id: "rebelbot-wins",
    year: "March 2026",
    flag: "\u{1F3C6}",
    title: { en: "RebelBot Launches & Wins", it: "RebelBot Lancia e Vince", es: "RebelBot Lanza y Gana" },
    location: { en: "University of Nevada, Las Vegas, Las Vegas", it: "University of Nevada, Las Vegas, Las Vegas", es: "University of Nevada, Las Vegas, Las Vegas" },
    description: {
      en: "RebelBot officially launched from idea to product in under a year. Won both competitions and entered discussions for University of Nevada, Las Vegas implementation.",
      it: "RebelBot passa ufficialmente da idea a prodotto in meno di un anno. Ho vinto entrambe le competizioni e avviato le trattative per l'adozione alla University of Nevada, Las Vegas.",
      es: "RebelBot pasa oficialmente de idea a producto en menos de un año. Gané las dos competiciones e inicié conversaciones para su implementación en la University of Nevada, Las Vegas.",
    },
    highlights: [
      { en: "President's Innovation Challenge Winner", it: "Vincitrice del President's Innovation Challenge", es: "Ganadora del President's Innovation Challenge" },
      { en: "Research Symposium Award", it: "Premio al Research Symposium", es: "Premio en el Research Symposium" },
      { en: "Platform launch with pilot users", it: "Lancio della piattaforma con utenti pilota", es: "Lanzamiento de la plataforma con usuarios piloto" },
    ],
    metrics: [
      { en: "4-person team", it: "Team di 4 persone", es: "Equipo de 4 personas" },
      { en: "Idea to product in under 1 year", it: "Da idea a prodotto in meno di 1 anno", es: "De idea a producto en menos de 1 año" },
    ],
  },
  {
    id: "next-chapter",
    year: "2026",
    flag: "\u{1F30D}",
    title: { en: "Next Chapter - Europe", it: "Prossimo Capitolo - Europa", es: "Próximo Capítulo - Europa" },
    location: { en: "The World", it: "Il mondo", es: "El mundo" },
    description: {
      en: "Graduating December 2026. Moving back to Europe. The adventure continues.",
      it: "Laurea a dicembre 2026. Ritorno in Europa. L'avventura continua.",
      es: "Me gradúo en diciembre de 2026. Vuelvo a Europa. La aventura continúa.",
    },
    highlights: [
      { en: "Graduating University of Nevada, Las Vegas Dec 2026", it: "Laurea alla University of Nevada, Las Vegas a dicembre 2026", es: "Graduación en la University of Nevada, Las Vegas en diciembre de 2026" },
      { en: "Returning to Europe", it: "Ritorno in Europa", es: "Regreso a Europa" },
      { en: "Open to global opportunities", it: "Aperta a opportunità globali", es: "Abierta a oportunidades globales" },
    ],
  },
];
