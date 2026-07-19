export type Language = "en" | "it" | "es";

export type LocalizedText = Record<Language, string>;

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "it", label: "Italiano", flag: "\u{1F1EE}\u{1F1F9}" },
  { code: "es", label: "Español", flag: "\u{1F1EA}\u{1F1F8}" },
];

export const translations = {
  nav: {
    home: { en: "Home", it: "Home", es: "Inicio" },
    about: { en: "About", it: "Chi sono", es: "Sobre mí" },
    journey: { en: "Journey", it: "Percorso", es: "Trayectoria" },
    rebelbot: { en: "RebelBot", it: "RebelBot", es: "RebelBot" },
    experience: { en: "Experience", it: "Esperienza", es: "Experiencia" },
    languages: { en: "Languages", it: "Lingue", es: "Idiomas" },
    travel: { en: "Travel", it: "Viaggi", es: "Viajes" },
    gallery: { en: "Gallery", it: "Galleria", es: "Galería" },
    community: { en: "Community", it: "Community", es: "Comunidad" },
    menu: { en: "Toggle menu", it: "Apri il menu", es: "Abrir menú" },
    language: { en: "Language", it: "Lingua", es: "Idioma" },
  },
  hero: {
    subtitles: {
      en: ["Founder @ RebelBot", "International Business Student", "Exploring the World", "Building Community"],
      it: ["Founder @ RebelBot", "Studentessa di Business Internazionale", "Giro il mondo", "Creo community"],
      es: ["Founder @ RebelBot", "Estudiante de Negocios Internacionales", "Recorriendo el mundo", "Creando comunidad"],
    },
    tagline: {
      en: "Curious mind. Growing a startup. Always learning across cultures.",
      it: "Mente curiosa, una startup che cresce e la voglia di imparare da ogni cultura.",
      es: "Mente curiosa, una startup que crece y muchas ganas de aprender de cada cultura.",
    },
    scroll: { en: "Scroll", it: "Scorri", es: "Desliza" },
  },
  about: {
    title: { en: "About Me", it: "Chi Sono", es: "Sobre Mí" },
    body: {
      en: "I'm Veronica - born in Spain, raised between Italy and the U.S., and shaped by moving through different cultures. I study international business and marketing at University of Nevada, Las Vegas, build community through student organizations, and am growing RebelBot one step at a time by listening to real student needs.",
      it: "Sono Veronica: nata in Spagna, cresciuta tra l'Italia e gli Stati Uniti e plasmata dal passare continuamente da una cultura all'altra. Studio Business Internazionale e Marketing alla University of Nevada, Las Vegas, creo community dentro le associazioni studentesche e faccio crescere RebelBot un passo alla volta, partendo sempre dai bisogni veri degli studenti.",
      es: "Soy Veronica: nací en España, crecí entre Italia y Estados Unidos y me formé moviéndome de una cultura a otra. Estudio Negocios Internacionales y Marketing en la University of Nevada, Las Vegas, creo comunidad desde las organizaciones estudiantiles y hago crecer RebelBot paso a paso, escuchando lo que de verdad necesitan los estudiantes.",
    },
    photo: { en: "Add photo here", it: "Aggiungi una foto", es: "Añade una foto" },
  },
  timeline: {
    title: { en: "My Journey", it: "Il Mio Percorso", es: "Mi Trayectoria" },
    intro: {
      en: "From Valencia to Las Vegas - every chapter shaped who I am today.",
      it: "Da Valencia a Las Vegas: ogni capitolo mi ha resa la persona che sono oggi.",
      es: "De Valencia a Las Vegas: cada capítulo me hizo quien soy hoy.",
    },
    previous: { en: "Previous", it: "Precedente", es: "Anterior" },
    next: { en: "Next", it: "Successivo", es: "Siguiente" },
    photo: { en: "Add photo", it: "Aggiungi una foto", es: "Añade una foto" },
  },
  experience: {
    title: { en: "Experience & Leadership", it: "Esperienza e Leadership", es: "Experiencia y Liderazgo" },
    intro: {
      en: "From international sales to diplomacy programs - building skills across borders.",
      it: "Dalle vendite internazionali ai programmi di diplomazia: competenze che nascono oltre i confini.",
      es: "De las ventas internacionales a los programas de diplomacia: habilidades que crecen cruzando fronteras.",
    },
    professional: { en: "Professional Experience", it: "Esperienza Professionale", es: "Experiencia Profesional" },
    leadership: { en: "Leadership", it: "Leadership", es: "Liderazgo" },
    education: { en: "Education", it: "Formazione", es: "Formación" },
    courses: { en: "Courses & Programs", it: "Corsi e Programmi", es: "Cursos y Programas" },
    awards: { en: "Honors & Awards", it: "Riconoscimenti", es: "Reconocimientos" },
  },
  languagesSection: {
    title: { en: "Languages & Skills", it: "Lingue e Competenze", es: "Idiomas y Habilidades" },
    native: { en: "Native", it: "Madrelingua", es: "Nativo" },
    fluent: { en: "Fluent", it: "Fluente", es: "Fluido" },
    businessSkills: { en: "Business Skills", it: "Competenze Business", es: "Habilidades de Negocio" },
    tools: { en: "Tools", it: "Strumenti", es: "Herramientas" },
  },
  rebelbot: {
    kicker: { en: "Student support platform", it: "Piattaforma di supporto agli studenti", es: "Plataforma de apoyo estudiantil" },
    tagline: {
      en: "Campus companion for resources, events, clubs, and support",
      it: "Il compagno di campus per risorse, eventi, club e supporto",
      es: "El compañero de campus para recursos, eventos, clubes y apoyo",
    },
    body: {
      en: "RebelBot is a student engagement platform designed to help students find campus resources, events, clubs, and peer support more easily. The work is still growing, guided by discovery interviews, pilot feedback, and what students say they actually need.",
      it: "RebelBot è una piattaforma di engagement studentesco che aiuta gli studenti a trovare più facilmente le risorse del campus, gli eventi, i club e il supporto tra pari. È un progetto in continua crescita, guidato dalle interviste di discovery, dai feedback del pilota e da ciò che gli studenti dicono di volere davvero.",
      es: "RebelBot es una plataforma de engagement estudiantil que ayuda a los estudiantes a encontrar más fácilmente los recursos del campus, los eventos, los clubes y el apoyo entre compañeros. Es un proyecto que sigue creciendo, guiado por las entrevistas de discovery, el feedback del piloto y lo que los estudiantes dicen que de verdad necesitan.",
    },
    cta: { en: "Visit rebelbot.ai", it: "Vai su rebelbot.ai", es: "Entra en rebelbot.ai" },
    achievements: {
      en: [
        ["President's Innovation Challenge", "Winner 2026"],
        ["University of Nevada, Las Vegas Research Symposium", "Award Recipient"],
        ["25+ Discovery Interviews", "NSF I-Corps Method"],
        ["Live Pilot Users", "At University of Nevada, Las Vegas"],
      ],
      it: [
        ["President's Innovation Challenge", "Vincitrice 2026"],
        ["University of Nevada, Las Vegas Research Symposium", "Riconoscimento"],
        ["25+ interviste di discovery", "Metodo NSF I-Corps"],
        ["Utenti pilota attivi", "Alla University of Nevada, Las Vegas"],
      ],
      es: [
        ["President's Innovation Challenge", "Ganadora 2026"],
        ["University of Nevada, Las Vegas Research Symposium", "Reconocimiento"],
        ["25+ entrevistas de discovery", "Método NSF I-Corps"],
        ["Usuarios piloto activos", "En la University of Nevada, Las Vegas"],
      ],
    },
    eventPhoto: { en: "Add photo: The Exchange Event", it: "Aggiungi foto: evento The Exchange", es: "Añade foto: evento The Exchange" },
  },
  globe: {
    title: { en: "Where I've Been", it: "Dove Sono Stata", es: "Dónde He Estado" },
    quote: {
      en: "Every place leaves a mark on how you see the world.",
      it: "Ogni luogo lascia un segno nel modo in cui guardi il mondo.",
      es: "Cada lugar deja una huella en tu forma de ver el mundo.",
    },
    photos: {
      en: ["Valencia sunset", "Rome adventures", "Las Vegas life", "On the road"],
      it: ["Tramonto a Valencia", "Avventure a Roma", "Vita a Las Vegas", "In viaggio"],
      es: ["Atardecer en Valencia", "Aventuras en Roma", "Vida en Las Vegas", "De camino"],
    },
    addPhoto: { en: "Add photo", it: "Aggiungi una foto", es: "Añade una foto" },
    livedLabel: { en: "lived", it: "vissuto", es: "vivido" },
  },
  gallery: {
    title: { en: "Photo Gallery", it: "Galleria Foto", es: "Galería de Fotos" },
    intro: {
      en: "A few snapshots from the places, teams, and moments that shaped the story.",
      it: "Qualche scatto dai luoghi, dai team e dai momenti che hanno scritto questa storia.",
      es: "Algunas instantáneas de los lugares, los equipos y los momentos que escribieron esta historia.",
    },
    empty: {
      en: "Gallery photos will appear here.",
      it: "Qui appariranno le foto della galleria.",
      es: "Aquí aparecerán las fotos de la galería.",
    },
    previous: { en: "Previous photo", it: "Foto precedente", es: "Foto anterior" },
    next: { en: "Next photo", it: "Foto successiva", es: "Foto siguiente" },
    close: { en: "Close gallery", it: "Chiudi la galleria", es: "Cerrar galería" },
  },
  social: {
    linkedin: { en: "LinkedIn", it: "LinkedIn", es: "LinkedIn" },
    github: { en: "GitHub", it: "GitHub", es: "GitHub" },
    whatsapp: { en: "WhatsApp", it: "WhatsApp", es: "WhatsApp" },
    instagram: { en: "Instagram", it: "Instagram", es: "Instagram" },
    email: { en: "Email", it: "Email", es: "Email" },
    resume: { en: "Resume", it: "CV", es: "CV" },
    followLabel: { en: "Connect", it: "Contatti", es: "Contacto" },
    resumeMenuTitle: { en: "Choose a format", it: "Scegli un formato", es: "Elige un formato" },
    resumeAmerican: { en: "American resume", it: "CV americano", es: "Currículum americano" },
    resumeEuropean: { en: "European resume (English)", it: "CV europeo (inglese)", es: "CV europeo (inglés)" },
    resumeItalian: { en: "Italian resume", it: "CV italiano", es: "CV italiano" },
    resumeSpanish: { en: "Spanish resume", it: "CV spagnolo", es: "CV español" },
  },
  community: {
    title: { en: "Community", it: "Community", es: "Comunidad" },
    intro: {
      en: "Building community in Las Vegas - through networking, connecting people, and giving back. The best business is built on genuine relationships.",
      it: "Creo community a Las Vegas: faccio networking, metto in contatto le persone e restituisco qualcosa agli altri. Il business migliore nasce da relazioni autentiche.",
      es: "Creo comunidad en Las Vegas: hago networking, conecto a las personas y devuelvo algo a los demás. Los mejores negocios nacen de relaciones auténticas.",
    },
    photoLabels: {
      en: ["Networking event", "Community service", "Club meeting", "Guest speaker event", "Team photo", "Volunteer day"],
      it: ["Evento di networking", "Servizio alla community", "Riunione del club", "Evento con speaker", "Foto di gruppo", "Giornata di volontariato"],
      es: ["Evento de networking", "Servicio comunitario", "Reunión del club", "Evento con ponente", "Foto de equipo", "Día de voluntariado"],
    },
    addPhoto: { en: "Add photo", it: "Aggiungi una foto", es: "Añade una foto" },
    volunteerTitle: { en: "Volunteer Work", it: "Volontariato", es: "Voluntariado" },
  },
  footer: {
    title: { en: "Let's Connect", it: "Restiamo in Contatto", es: "Conectemos" },
    body: {
      en: "Open to travel and relocation opportunities worldwide. Let's build something amazing together.",
      it: "Sono aperta a opportunità di viaggio e trasferimento in tutto il mondo. Costruiamo insieme qualcosa di straordinario.",
      es: "Estoy abierta a oportunidades de viaje y traslado en cualquier parte del mundo. Construyamos juntos algo increíble.",
    },
    resume: { en: "Download Resume", it: "Scarica il CV", es: "Descargar CV" },
  },
} as const;

export function localize(value: LocalizedText, language: Language) {
  return value[language] ?? value.en;
}
