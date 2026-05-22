import type { LocalizedText } from "./translations";

export interface TimelineEntry {
  year: string;
  flag: string;
  title: LocalizedText;
  location: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
}

export const timelineData: TimelineEntry[] = [
  {
    year: "2005",
    flag: "\u{1F1EA}\u{1F1F8}",
    title: { en: "Born in Valencia", it: "Nata a Valencia", es: "Naci en Valencia" },
    location: { en: "Valencia, Spain", it: "Valencia, Spagna", es: "Valencia, Espa\u00F1a" },
    description: {
      en: "Where it all started - growing up between Spanish and Italian cultures from day one.",
      it: "Dove tutto e iniziato: crescere tra cultura spagnola e italiana fin dal primo giorno.",
      es: "Donde empezo todo: creciendo entre culturas espanola e italiana desde el primer dia.",
    },
    highlights: [
      { en: "Dual cultural upbringing", it: "Crescita biculturale", es: "Crianza bicultural" },
      { en: "Native Spanish & Italian", it: "Spagnolo e italiano madrelingua", es: "Espa\u00F1ol e italiano nativos" },
    ],
  },
  {
    year: "2010",
    flag: "\u{1F1EE}\u{1F1F9}",
    title: { en: "Rome Years", it: "Gli Anni a Roma", es: "Los A\u00F1os en Roma" },
    location: { en: "Rome, Italy", it: "Roma, Italia", es: "Roma, Italia" },
    description: {
      en: "Moved to Rome and attended an international school with the Cambridge program. A global mindset took root.",
      it: "Mi sono trasferita a Roma e ho frequentato una scuola internazionale con programma Cambridge. Da li e nata una mentalita globale.",
      es: "Me mude a Roma y estudie en una escuela internacional con programa Cambridge. Ahi nacio una mentalidad global.",
    },
    highlights: [
      { en: "International school education", it: "Formazione internazionale", es: "Educacion internacional" },
      { en: "Cambridge academic program", it: "Programma Cambridge", es: "Programa Cambridge" },
      { en: "Multilingual environment", it: "Ambiente multilingue", es: "Ambiente multilingue" },
    ],
  },
  {
    year: "2020",
    flag: "\u{1F1FA}\u{1F1F8}",
    title: { en: "A New Chapter in America", it: "Un Nuovo Capitolo in America", es: "Un Nuevo Capitulo en America" },
    location: { en: "Pahrump, NV", it: "Pahrump, Nevada", es: "Pahrump, Nevada" },
    description: {
      en: "Moved to the United States. Tough times brought massive personal growth and resilience.",
      it: "Mi sono trasferita negli Stati Uniti. Momenti difficili hanno portato crescita personale e resilienza.",
      es: "Me mude a Estados Unidos. Los momentos dificiles trajeron crecimiento personal y resiliencia.",
    },
    highlights: [
      { en: "Cultural adaptation", it: "Adattamento culturale", es: "Adaptacion cultural" },
      { en: "Building resilience", it: "Resilienza", es: "Resiliencia" },
      { en: "New beginnings", it: "Nuovi inizi", es: "Nuevos comienzos" },
    ],
  },
  {
    year: "2021-2023",
    flag: "\u{1F1FA}\u{1F1F8}",
    title: { en: "Las Vegas & IB Program", it: "Las Vegas e Programma IB", es: "Las Vegas y Programa IB" },
    location: { en: "Palo Verde HS, Las Vegas", it: "Palo Verde HS, Las Vegas", es: "Palo Verde HS, Las Vegas" },
    description: {
      en: "International Baccalaureate program, President of Hispanic Honor Society, deep community involvement.",
      it: "Programma International Baccalaureate, Presidente della Hispanic Honor Society e forte impegno nella community.",
      es: "Programa International Baccalaureate, Presidenta de Hispanic Honor Society y fuerte participacion comunitaria.",
    },
    highlights: [
      { en: "IB Program", it: "Programma IB", es: "Programa IB" },
      { en: "President, Hispanic Honor Society", it: "Presidente, Hispanic Honor Society", es: "Presidenta, Hispanic Honor Society" },
      { en: "Spring Preserve & Animal Sanctuary volunteering", it: "Volontariato con Spring Preserve e Animal Sanctuary", es: "Voluntariado con Spring Preserve y Animal Sanctuary" },
    ],
  },
  {
    year: "2023-Present",
    flag: "\u{1F393}",
    title: { en: "UNLV - Going All In", it: "UNLV - Al Massimo", es: "UNLV - Con Todo" },
    location: { en: "University of Nevada, Las Vegas", it: "University of Nevada, Las Vegas", es: "University of Nevada, Las Vegas" },
    description: {
      en: "Double major in International Business & Marketing. Four club presidencies, sorority life, and the Lee Student Advisory Board.",
      it: "Doppia specializzazione in International Business e Marketing. Quattro presidenze, sorority e Lee Student Advisory Board.",
      es: "Doble especializacion en International Business y Marketing. Cuatro presidencias, sorority y Lee Student Advisory Board.",
    },
    highlights: [
      { en: "Double Major: International Business & Marketing", it: "Doppia specializzazione: International Business e Marketing", es: "Doble especializacion: International Business y Marketing" },
      { en: "4 Club Presidencies", it: "4 presidenze club", es: "4 presidencias" },
      { en: "Gamma Phi Beta", it: "Gamma Phi Beta", es: "Gamma Phi Beta" },
      { en: "Lee Student Advisory Board", it: "Lee Student Advisory Board", es: "Lee Student Advisory Board" },
    ],
  },
  {
    year: "2025",
    flag: "\u{1F680}",
    title: { en: "RebelBot is Born", it: "Nasce RebelBot", es: "Nace RebelBot" },
    location: { en: "Las Vegas, NV", it: "Las Vegas, Nevada", es: "Las Vegas, Nevada" },
    description: {
      en: "First startup idea sparked. Selected for NSF I-Corps, completed SDR training, and started building.",
      it: "Nasce la prima idea di startup. Selezionata per NSF I-Corps, completata formazione SDR e inizio costruzione.",
      es: "Nace la primera idea de startup. Seleccionada para NSF I-Corps, complete formacion SDR y empece a construir.",
    },
    highlights: [
      { en: "NSF I-Corps Aspire Program", it: "Programma NSF I-Corps Aspire", es: "Programa NSF I-Corps Aspire" },
      { en: "25+ customer discovery interviews", it: "25+ interviste customer discovery", es: "25+ entrevistas customer discovery" },
      { en: "SDR Training at StartUp Vegas", it: "Formazione SDR con StartUp Vegas", es: "Formacion SDR en StartUp Vegas" },
    ],
  },
  {
    year: "March 2026",
    flag: "\u{1F3C6}",
    title: { en: "RebelBot Launches & Wins", it: "RebelBot Lancia e Vince", es: "RebelBot Lanza y Gana" },
    location: { en: "UNLV, Las Vegas", it: "UNLV, Las Vegas", es: "UNLV, Las Vegas" },
    description: {
      en: "RebelBot officially launched. Won the UNLV President's Innovation Challenge and the Research Symposium award.",
      it: "RebelBot viene lanciato ufficialmente. Vince la UNLV President's Innovation Challenge e un premio al Research Symposium.",
      es: "RebelBot se lanza oficialmente. Gana el UNLV President's Innovation Challenge y un premio en el Research Symposium.",
    },
    highlights: [
      { en: "President's Innovation Challenge Winner", it: "Vincitrice President's Innovation Challenge", es: "Ganadora President's Innovation Challenge" },
      { en: "Research Symposium Award", it: "Premio Research Symposium", es: "Premio Research Symposium" },
      { en: "Platform launch with pilot users", it: "Lancio con utenti pilota", es: "Lanzamiento con usuarios piloto" },
    ],
  },
  {
    year: "2026",
    flag: "\u{1F30D}",
    title: { en: "Next Chapter - Europe", it: "Prossimo Capitolo - Europa", es: "Proximo Capitulo - Europa" },
    location: { en: "The World", it: "Il mondo", es: "El mundo" },
    description: {
      en: "Graduating December 2026. Moving back to Europe. The adventure continues.",
      it: "Laurea prevista a dicembre 2026. Ritorno in Europa. L'avventura continua.",
      es: "Graduacion prevista en diciembre 2026. Regreso a Europa. La aventura continua.",
    },
    highlights: [
      { en: "Graduating UNLV Dec 2026", it: "Laurea UNLV dicembre 2026", es: "Graduacion UNLV diciembre 2026" },
      { en: "Returning to Europe", it: "Ritorno in Europa", es: "Regreso a Europa" },
      { en: "Open to global opportunities", it: "Aperta a opportunita globali", es: "Abierta a oportunidades globales" },
    ],
  },
];
