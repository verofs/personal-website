const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  LevelFormat, BorderStyle,
  ExternalHyperlink, ImageRun, Table, TableRow, TableCell, WidthType,
} = require('docx');

const NAVY = "1F3A5F";
const ACCENT = "C5283D";
const DARK = "1A1A1A";
const GREY = "555555";

const PAGE_W = 11906;
const PAGE_H = 16838;
const MARGIN = 1080;
const CONTENT_W = PAGE_W - 2 * MARGIN;

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = {
  top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
  insideHorizontal: noBorder, insideVertical: noBorder,
};

const sectionHeading = (text) => new Paragraph({
  spacing: { before: 220, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY, space: 4 } },
  children: [
    new TextRun({
      text: text.toUpperCase(),
      bold: true, size: 24, color: NAVY, font: "Calibri", characterSpacing: 40,
    }),
  ],
});

const twoColRow = (leftRuns, rightRuns, opts = {}) => {
  const leftW = opts.leftW || 6800;
  const rightW = CONTENT_W - leftW;
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [leftW, rightW],
    borders: noBorders,
    rows: [new TableRow({
      children: [
        new TableCell({
          width: { size: leftW, type: WidthType.DXA },
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
          borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
          children: [new Paragraph({ spacing: { before: 0, after: 0 }, children: leftRuns })],
        }),
        new TableCell({
          width: { size: rightW, type: WidthType.DXA },
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
          borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 0, after: 0 },
            children: rightRuns,
          })],
        }),
      ],
    })],
  });
};

const roleBlock = (role, org, location, dates) => {
  const out = [];
  out.push(twoColRow(
    [new TextRun({ text: role, bold: true, size: 22, color: DARK, font: "Calibri" })],
    [new TextRun({ text: dates, size: 20, color: GREY, font: "Calibri" })],
  ));
  out.push(twoColRow(
    [new TextRun({ text: org, italics: true, size: 21, color: ACCENT, font: "Calibri" })],
    location ? [new TextRun({ text: location, italics: true, size: 20, color: GREY, font: "Calibri" })] : [new TextRun({ text: "" })],
  ));
  out.push(new Paragraph({ spacing: { before: 0, after: 40 }, children: [new TextRun({ text: "", size: 4 })] }));
  return out;
};

const bullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { before: 20, after: 20, line: 260 },
  children: [new TextRun({ text, size: 21, color: DARK, font: "Calibri" })],
});

const sectionLeader = (label, body) => new Paragraph({
  spacing: { before: 60, after: 20, line: 270 },
  children: [
    new TextRun({ text: `${label} `, bold: true, size: 21, color: NAVY, font: "Calibri" }),
    new TextRun({ text: body, size: 21, color: DARK, font: "Calibri" }),
  ],
});

const photoBuffer = fs.readFileSync("/Users/veronicafs/Resume/UNLV Club Photos-19.JPG");

const headerTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [2400, CONTENT_W - 2400],
  borders: noBorders,
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 2400, type: WidthType.DXA },
          margins: { top: 0, bottom: 0, left: 0, right: 120 },
          borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new ImageRun({
                  type: "jpg",
                  data: photoBuffer,
                  transformation: { width: 140, height: 175 },
                  altText: { title: "Foto", description: "Foto de Veronica Fortuno Seput", name: "veronica" },
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: CONTENT_W - 2400, type: WidthType.DXA },
          margins: { top: 80, bottom: 0, left: 200, right: 0 },
          borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
          children: [
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "VERONICA", bold: true, size: 40, color: NAVY, font: "Calibri", characterSpacing: 40 }),
                new TextRun({ text: " FORTUNO SEPUT", bold: true, size: 40, color: ACCENT, font: "Calibri", characterSpacing: 40 }),
              ],
            }),
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: "Estudiante de International Business & Marketing  |  Fundadora de startup",
                  size: 20, color: GREY, italics: true, font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "Nacionalidad: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                new TextRun({ text: "Española / Italiana", size: 19, color: DARK, font: "Calibri" }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "Domicilio: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                new TextRun({ text: "Las Vegas, Nevada, EE. UU.  (disponibilidad para traslado a España y Europa)", size: 19, color: DARK, font: "Calibri" }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "Teléfono: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                new TextRun({ text: "+1 702 728 6843", size: 19, color: DARK, font: "Calibri" }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "Correo electrónico: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                new ExternalHyperlink({
                  children: [new TextRun({ text: "v.fortunoseput@gmail.com", size: 19, color: NAVY, font: "Calibri", underline: {} })],
                  link: "mailto:v.fortunoseput@gmail.com",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "LinkedIn: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                new ExternalHyperlink({
                  children: [new TextRun({ text: "linkedin.com/in/veronica-fortuno-seput", size: 19, color: NAVY, font: "Calibri", underline: {} })],
                  link: "https://linkedin.com/in/veronica-fortuno-seput",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "Permiso de conducir: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                new TextRun({ text: "Sí (categoría B)", size: 19, color: DARK, font: "Calibri" }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

const doc = new Document({
  creator: "Veronica Fortuno Seput",
  title: "Veronica Fortuno Seput - Curriculum Vitae",
  styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "▸",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 240 } }, run: { color: ACCENT } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: 720, right: MARGIN, bottom: 720, left: MARGIN },
      },
    },
    children: [
      headerTable,

      sectionHeading("Perfil Profesional"),
      new Paragraph({
        spacing: { before: 60, after: 60, line: 270 },
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextRun({
            text: "Estudiante trilingüe (español · italiano · inglés) de Comercio Internacional y Marketing en la University of Nevada, Las Vegas, y fundadora de una startup premiada a nivel universitario. He creado y lanzado ",
            size: 21, color: DARK, font: "Calibri",
          }),
          new TextRun({ text: "RebelBot", bold: true, size: 21, color: ACCENT, font: "Calibri" }),
          new TextRun({
            text: ", una plataforma de engagement estudiantil basada en inteligencia artificial, ganadora del UNLV President’s Innovation Challenge 2026. Cuento con experiencia real en desarrollo comercial, marketing digital, comunicación intercultural y coordinación de eventos internacionales, combinada con liderazgo en cuatro asociaciones universitarias y formación intensiva en metodología lean startup (NSF I-Corps). Mi recorrido entre España, Italia y Estados Unidos me aporta una mentalidad global y una alta capacidad de adaptación. Disponible para viajar y trasladarme.",
            size: 21, color: DARK, font: "Calibri",
          }),
        ],
      }),

      sectionHeading("Formación Académica"),
      ...roleBlock(
        "Bachelor of Science in Business Administration — Doble especialización: International Business & Marketing",
        "University of Nevada, Las Vegas (UNLV) — Lee Business School",
        "Las Vegas, EE. UU.",
        "Finalización: Dic 2026"
      ),
      bullet("Seleccionada para el Lee Student Advisory Board, órgano de representación estudiantil en la gobernanza de la facultad."),
      bullet("Miembro activo de la sorority Gamma Phi Beta, con funciones de Standards Chair en apoyo al desarrollo personal de las integrantes."),

      ...roleBlock(
        "Programa NSF I-Corps Aspire — Región Desert & Pacific",
        "National Science Foundation (EE. UU.)",
        "",
        "May – Jun 2025"
      ),
      bullet("Seleccionada de manera competitiva para desarrollar y validar ideas de negocio en fase inicial."),
      bullet("Realización de más de 25 entrevistas de descubrimiento de cliente aplicando metodología lean startup, con mentoría de profesionales del sector."),

      ...roleBlock(
        "Programa de Formación Sales Development Representative (SDR)",
        "StartUp Vegas",
        "",
        "Ago 2025"
      ),
      bullet("Formación intensiva en prospección outbound, calificación de leads y gestión de pipeline comercial."),
      bullet("Prácticas en cold calling, email outreach, LinkedIn networking y técnicas de negociación y cierre."),

      sectionHeading("Experiencia Profesional"),

      ...roleBlock(
        "Marketing & Programs Intern (Prácticas)",
        "World Affairs Council of Las Vegas",
        "Las Vegas, EE. UU.",
        "May 2026 – Sep 2026"
      ),
      bullet("Apoyo a la programación de delegaciones internacionales y eventos interculturales, incluido el International Visitor Leadership Program (IVLP), aprovechando mi trilingüismo en la relación con delegaciones de más de 10 países."),
      bullet("Coordinación de logística de eventos: reserva de sedes, catering, montaje de salas, soporte audiovisual, atención al asistente y comunicación con stakeholders."),
      bullet("Creación de materiales de marketing y gestión de la promoción en redes sociales para incrementar la visibilidad y la participación."),
      bullet("Redacción de correspondencia institucional, materiales de programa y comunicaciones masivas a board members, socios y participantes."),

      ...roleBlock(
        "Responsable de Marketing",
        "Team Casas Mortgage",
        "Las Vegas, EE. UU.",
        "Oct 2025 – Ago 2026"
      ),
      bullet("Diseño y ejecución de la estrategia de marketing de un equipo del sector hipotecario inmobiliario en un mercado altamente competitivo."),
      bullet("Creación y gestión de contenidos para redes sociales y campañas promocionales orientadas a brand visibility y generación de leads."),
      bullet("Coordinación con la dirección para alinear las iniciativas de marketing con los objetivos comerciales trimestrales."),

      ...roleBlock(
        "Asistente Administrativa y de Operaciones",
        "Davide Tarsi",
        "Las Vegas, EE. UU.",
        "Ene 2023 – Ago 2025"
      ),
      bullet("Soporte administrativo ejecutivo durante más de dos años: agenda, investigación y coordinación de actividades diarias."),
      bullet("Gestión de comunicaciones y logística con clientes a través de Yelp, Google Calendar y correo electrónico."),

      ...roleBlock(
        "Dependienta y Asociada de Ventas",
        "DAN Valetudo",
        "Valencia, España",
        "Ene 2019 – Actualidad"
      ),
      bullet("Generación de más de 5.000 USD en ventas en un solo fin de semana en grandes eventos internacionales de MMA y Jiu-Jitsu Brasileño."),
      bullet("Atención al cliente y a compradores mayoristas internacionales, anticipando sus necesidades y consolidando relaciones a largo plazo."),
      bullet("Gestión de inventario en tiempo real y elaboración de informes de venta en eventos de alta afluencia."),

      sectionHeading("Emprendimiento y Liderazgo"),

      ...roleBlock(
        "Fundadora y CEO — RebelBot",
        "Plataforma de student engagement basada en inteligencia artificial",
        "Las Vegas, EE. UU.",
        "Abr 2025 – Actualidad"
      ),
      bullet("Fundé y dirijo RebelBot, plataforma con IA que mejora el acceso de estudiantes a recursos del campus, apoyo académico y comunicación universitaria."),
      bullet("Ganadora del UNLV President’s Innovation Challenge 2026 y reconocida en el UNLV Research Symposium por innovación en desarrollo de startups."),
      bullet("Realizadas más de 25 entrevistas de descubrimiento de cliente con estudiantes, asesores y stakeholders universitarios siguiendo la metodología NSF I-Corps."),
      bullet("Lidero la estrategia de producto, branding, investigación de usuarios y modelo de negocio; coordino mentores, desarrolladores y partners académicos."),
      bullet("He presentado el proyecto en entornos competitivos de pitch emprendedor y networking."),

      ...roleBlock(
        "Presidenta — International Business Association",
        "University of Nevada, Las Vegas",
        "",
        "Verano 2025 – May 2026"
      ),
      bullet("Dirección de las operaciones del club y de la junta directiva, con delegación estratégica y cumplimiento de plazos."),
      bullet("Planificación de eventos de desarrollo profesional, sesiones de networking y conferencias con líderes del negocio internacional."),

      ...roleBlock(
        "Presidenta — Artificial Intelligence in Business",
        "University of Nevada, Las Vegas",
        "",
        "Otoño 2025 – May 2026"
      ),
      bullet("Liderazgo de una asociación estudiantil enfocada en aplicaciones de IA en estrategia empresarial, marketing y operaciones."),
      bullet("Organización de conferencias, talleres y eventos de networking con profesionales del sector tecnológico."),

      ...roleBlock(
        "Presidenta — Bhakti Yoga Club",
        "University of Nevada, Las Vegas",
        "",
        "Otoño 2025 – Actualidad"
      ),
      bullet("Gestión integral de estrategia, presupuesto, planificación de eventos y marketing para una comunidad universitaria de bienestar e intercambio cultural."),
      bullet("Dirección de comunicación con incrementos sostenidos en la participación estudiantil."),

      ...roleBlock(
        "Secretaria — Lee Student Advisory Board (LSAB)",
        "Lee Business School, UNLV",
        "",
        "Otoño 2025 – Actualidad"
      ),
      bullet("Redacción de actas, seguimiento de acciones y gestión de la comunicación interna entre representantes estudiantiles y profesorado."),
      bullet("Apoyo a proyectos de gobernanza, iniciativas estudiantiles y colaboración con el cuerpo docente."),

      sectionHeading("Premios y Reconocimientos"),
      bullet("Ganadora — UNLV President’s Innovation Challenge 2026 (innovación emprendedora y desarrollo de startups)."),
      bullet("Galardonada en el UNLV Research Symposium por la presentación de investigación estudiantil innovadora y conceptos de negocio."),
      bullet("Selección competitiva — NSF I-Corps Aspire Program, región Desert & Pacific (2025)."),

      sectionHeading("Idiomas"),
      new Paragraph({
        spacing: { before: 60, after: 20, line: 270 },
        children: [
          new TextRun({ text: "Español: ", bold: true, size: 21, color: NAVY, font: "Calibri" }),
          new TextRun({ text: "Nativo   •   ", size: 21, color: DARK, font: "Calibri" }),
          new TextRun({ text: "Italiano: ", bold: true, size: 21, color: NAVY, font: "Calibri" }),
          new TextRun({ text: "Nativo   •   ", size: 21, color: DARK, font: "Calibri" }),
          new TextRun({ text: "Inglés: ", bold: true, size: 21, color: NAVY, font: "Calibri" }),
          new TextRun({ text: "Fluido (C2, entorno académico y profesional)", size: 21, color: DARK, font: "Calibri" }),
        ],
      }),

      sectionHeading("Competencias Profesionales"),
      sectionLeader("Área de Negocio:", "Marketing digital · Estrategia de contenidos · Generación de leads · Customer discovery · Metodología lean startup · Ventas y prospección · Coordinación de eventos · Comunicación intercultural."),
      sectionLeader("Herramientas:", "Herramientas de IA para productividad e investigación (ChatGPT, Claude, Perplexity) · Canva · Adobe Premiere Pro · Final Cut Pro · Microsoft Office (Excel, PowerPoint, Word) · Google Workspace · LinkedIn Sales Navigator."),
      sectionLeader("Habilidades blandas:", "Liderazgo · Oratoria pública · Negociación · Pensamiento estratégico · Adaptabilidad intercultural · Resolución de problemas."),

      sectionHeading("Voluntariado"),
      bullet("Animal Sanctuary of Las Vegas — cuidado de animales, mantenimiento de hábitats, apoyo en recaudación de fondos y atención al público."),
      bullet("Spring Preserve y Girls on the Run — coordinación de eventos, montaje de stands y apoyo a participantes (Enero 2021 – Actualidad)."),

      new Paragraph({
        spacing: { before: 240, after: 0 },
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextRun({
            text: "De acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, autorizo el tratamiento de mis datos personales con la única finalidad de participar en procesos de selección de personal.",
            size: 18, italics: true, color: GREY, font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        spacing: { before: 120, after: 0 },
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({ text: "Firma: Veronica Fortuno Seput", size: 18, italics: true, color: GREY, font: "Calibri" }),
        ],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("output/Veronica_Fortuno_CV_Espanol.docx", buffer);
  console.log("Spanish CV created");
});
