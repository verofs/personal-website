export type Language = "en" | "it" | "es";

export type LocalizedText = Record<Language, string>;

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "it", label: "Italiano", flag: "\u{1F1EE}\u{1F1F9}" },
  { code: "es", label: "Espa\u00F1ol", flag: "\u{1F1EA}\u{1F1F8}" },
];

export const translations = {
  nav: {
    home: { en: "Home", it: "Home", es: "Inicio" },
    about: { en: "About", it: "Chi sono", es: "Sobre mi" },
    journey: { en: "Journey", it: "Percorso", es: "Trayectoria" },
    rebelbot: { en: "RebelBot", it: "RebelBot", es: "RebelBot" },
    experience: { en: "Experience", it: "Esperienza", es: "Experiencia" },
    languages: { en: "Languages", it: "Lingue", es: "Idiomas" },
    travel: { en: "Travel", it: "Viaggi", es: "Viajes" },
    community: { en: "Community", it: "Community", es: "Comunidad" },
    menu: { en: "Toggle menu", it: "Apri menu", es: "Abrir menu" },
    language: { en: "Language", it: "Lingua", es: "Idioma" },
  },
  hero: {
    subtitles: {
      en: ["Startup Founder", "International Business", "World Traveler", "Community Builder"],
      it: ["Fondatrice di startup", "Business internazionale", "Viaggiatrice globale", "Community builder"],
      es: ["Fundadora de startup", "Comercio internacional", "Viajera global", "Creadora de comunidad"],
    },
    tagline: {
      en: "Trilingual. Award-winning founder. Building across borders.",
      it: "Trilingue. Fondatrice premiata. Costruisco oltre i confini.",
      es: "Trilingue. Fundadora premiada. Construyendo sin fronteras.",
    },
    scroll: { en: "Scroll", it: "Scorri", es: "Desliza" },
  },
  about: {
    title: { en: "About Me", it: "Chi Sono", es: "Sobre Mi" },
    body: {
      en: "I'm Veronica - born in Spain, raised between Italy and the U.S., and always chasing the next big thing. I'm a startup founder, a club president four times over, and someone who genuinely believes the best way to learn business is to live it across borders. I don't just study international business - I am international business.",
      it: "Sono Veronica: nata in Spagna, cresciuta tra Italia e Stati Uniti, sempre alla ricerca della prossima grande sfida. Sono fondatrice di una startup, presidente di quattro organizzazioni e credo davvero che il modo migliore per imparare il business sia viverlo oltre i confini. Non studio soltanto business internazionale: lo vivo.",
      es: "Soy Veronica: nacida en Espa\u00F1a, criada entre Italia y Estados Unidos, y siempre buscando el siguiente gran reto. Soy fundadora de una startup, presidenta de cuatro organizaciones y creo que la mejor forma de aprender negocios es vivirlos entre culturas. No solo estudio comercio internacional: lo vivo.",
    },
    stats: {
      en: ["Languages", "Countries & Cities", "Club Presidencies", "Startup"],
      it: ["Lingue", "Paesi e citta", "Presidenze club", "Startup"],
      es: ["Idiomas", "Paises y ciudades", "Presidencias", "Startup"],
    },
    traits: {
      en: ["Direct", "Honest", "Genuine", "Positive", "Energetic", "Girl Boss"],
      it: ["Diretta", "Onesta", "Autentica", "Positiva", "Energica", "Leader"],
      es: ["Directa", "Honesta", "Autentica", "Positiva", "Energetica", "Lider"],
    },
    photo: { en: "Add photo here", it: "Aggiungi foto", es: "Agregar foto" },
  },
  timeline: {
    title: { en: "My Journey", it: "Il Mio Percorso", es: "Mi Trayectoria" },
    intro: {
      en: "From Valencia to Las Vegas - every chapter shaped who I am today.",
      it: "Da Valencia a Las Vegas: ogni capitolo ha formato chi sono oggi.",
      es: "De Valencia a Las Vegas: cada etapa formo quien soy hoy.",
    },
    previous: { en: "Previous", it: "Precedente", es: "Anterior" },
    next: { en: "Next", it: "Successivo", es: "Siguiente" },
    photo: { en: "Add photo", it: "Aggiungi foto", es: "Agregar foto" },
  },
  experience: {
    title: { en: "Experience & Leadership", it: "Esperienza e Leadership", es: "Experiencia y Liderazgo" },
    intro: {
      en: "From international sales to diplomacy programs - building skills across borders.",
      it: "Dalle vendite internazionali ai programmi diplomatici: competenze costruite oltre i confini.",
      es: "De ventas internacionales a programas diplomaticos: desarrollando habilidades entre culturas.",
    },
    professional: { en: "Professional Experience", it: "Esperienza Professionale", es: "Experiencia Profesional" },
    leadership: { en: "Leadership", it: "Leadership", es: "Liderazgo" },
  },
  languagesSection: {
    title: { en: "Languages & Skills", it: "Lingue e Competenze", es: "Idiomas y Habilidades" },
    native: { en: "Native", it: "Madrelingua", es: "Nativo" },
    fluent: { en: "Fluent", it: "Fluente", es: "Fluido" },
    currentlyLearning: { en: "Currently learning", it: "Sto imparando", es: "Aprendiendo ahora" },
    quote: {
      en: "I learn fast - languages and everything else.",
      it: "Imparo in fretta: le lingue e tutto il resto.",
      es: "Aprendo rapido: idiomas y todo lo demas.",
    },
    businessSkills: { en: "Business Skills", it: "Competenze Business", es: "Habilidades de Negocio" },
    tools: { en: "Tools", it: "Strumenti", es: "Herramientas" },
  },
  rebelbot: {
    tagline: {
      en: "AI-Powered Student Engagement Platform",
      it: "Piattaforma AI per l'engagement studentesco",
      es: "Plataforma de engagement estudiantil con IA",
    },
    body: {
      en: "I founded RebelBot to solve a real problem: students struggling to access campus resources and academic support. What started as an idea became a platform with real pilot users at UNLV.",
      it: "Ho fondato RebelBot per risolvere un problema reale: studenti che faticano ad accedere alle risorse universitarie e al supporto accademico. Da un'idea e nata una piattaforma con utenti pilota reali a UNLV.",
      es: "Funde RebelBot para resolver un problema real: estudiantes que tienen dificultad para acceder a recursos universitarios y apoyo academico. Lo que empezo como una idea se convirtio en una plataforma con usuarios piloto reales en UNLV.",
    },
    achievements: {
      en: [
        ["President's Innovation Challenge", "Winner 2026"],
        ["UNLV Research Symposium", "Award Recipient"],
        ["25+ Discovery Interviews", "NSF I-Corps Method"],
        ["Live Pilot Users", "At UNLV"],
      ],
      it: [
        ["President's Innovation Challenge", "Vincitrice 2026"],
        ["UNLV Research Symposium", "Premiata"],
        ["25+ interviste discovery", "Metodo NSF I-Corps"],
        ["Utenti pilota attivi", "A UNLV"],
      ],
      es: [
        ["President's Innovation Challenge", "Ganadora 2026"],
        ["UNLV Research Symposium", "Premiada"],
        ["25+ entrevistas discovery", "Metodo NSF I-Corps"],
        ["Usuarios piloto reales", "En UNLV"],
      ],
    },
    eventPhoto: { en: "Add photo: The Exchange Event", it: "Aggiungi foto: The Exchange Event", es: "Agregar foto: The Exchange Event" },
  },
  globe: {
    title: { en: "Where I've Been", it: "Dove Sono Stata", es: "Donde He Estado" },
    quote: {
      en: "I don't just talk about international business - I live it.",
      it: "Non parlo solo di business internazionale: lo vivo.",
      es: "No solo hablo de comercio internacional: lo vivo.",
    },
    photos: {
      en: ["Valencia sunset", "Rome adventures", "Las Vegas life", "On the road"],
      it: ["Tramonto a Valencia", "Avventure a Roma", "Vita a Las Vegas", "In viaggio"],
      es: ["Atardecer en Valencia", "Aventuras en Roma", "Vida en Las Vegas", "En camino"],
    },
    addPhoto: { en: "Add photo", it: "Aggiungi foto", es: "Agregar foto" },
  },
  community: {
    title: { en: "Community", it: "Community", es: "Comunidad" },
    intro: {
      en: "Building community in Las Vegas - through networking, connecting people, and giving back. The best business is built on genuine relationships.",
      it: "Costruisco community a Las Vegas attraverso networking, connessioni autentiche e volontariato. Il business migliore nasce da relazioni genuine.",
      es: "Construyendo comunidad en Las Vegas a traves de networking, conexiones reales y servicio. Los mejores negocios nacen de relaciones genuinas.",
    },
    photoLabels: {
      en: ["Networking event", "Community service", "Club meeting", "Guest speaker event", "Team photo", "Volunteer day"],
      it: ["Evento networking", "Servizio community", "Riunione club", "Evento con speaker", "Foto team", "Giornata volontariato"],
      es: ["Evento networking", "Servicio comunitario", "Reunion de club", "Evento con speaker", "Foto de equipo", "Dia de voluntariado"],
    },
    addPhoto: { en: "Add photo", it: "Aggiungi foto", es: "Agregar foto" },
    volunteerTitle: { en: "Volunteer Work", it: "Volontariato", es: "Voluntariado" },
  },
  footer: {
    title: { en: "Let's Connect", it: "Connettiamoci", es: "Conectemos" },
    body: {
      en: "Open to travel and relocation opportunities worldwide. Let's build something amazing together.",
      it: "Disponibile a viaggi e trasferimenti in tutto il mondo. Costruiamo qualcosa di straordinario insieme.",
      es: "Abierta a oportunidades de viaje y reubicacion en todo el mundo. Construyamos algo increible juntas.",
    },
    resume: { en: "Download Resume", it: "Scarica CV", es: "Descargar CV" },
  },
} as const;

export function localize(value: LocalizedText, language: Language) {
  return value[language] ?? value.en;
}
