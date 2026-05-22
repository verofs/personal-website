const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  LevelFormat, BorderStyle,
  ExternalHyperlink, ImageRun, Table, TableRow, TableCell, WidthType,
} = require('docx');

// ============ COLOR PALETTE ============
const NAVY = "1F3A5F";
const ACCENT = "C5283D";
const DARK = "1A1A1A";
const GREY = "555555";

// ============ PAGE GEOMETRY (A4, 0.75" margins) ============
const PAGE_W = 11906;
const PAGE_H = 16838;
const MARGIN = 1080;
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9746

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

// ============ PHOTO ============
const photoBuffer = fs.readFileSync("/Users/veronicafs/Resume/UNLV Club Photos-19.JPG");

// ============ HEADER TABLE (photo + info) ============
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
                  altText: { title: "Foto", description: "Foto di Veronica Fortuno Seput", name: "veronica" },
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
                  text: "Studentessa in International Business & Marketing  |  Fondatrice di startup",
                  size: 20, color: GREY, italics: true, font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "Nazionalità: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                new TextRun({ text: "Italiana / Spagnola", size: 19, color: DARK, font: "Calibri" }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "Indirizzo: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                new TextRun({ text: "Las Vegas, Nevada, USA  (disponibile al trasferimento in Europa)", size: 19, color: DARK, font: "Calibri" }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "Telefono: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
                new TextRun({ text: "+1 702 728 6843", size: 19, color: DARK, font: "Calibri" }),
              ],
            }),
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "E-mail: ", bold: true, size: 19, color: NAVY, font: "Calibri" }),
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
          ],
        }),
      ],
    }),
  ],
});

// ============ DOCUMENT ============
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

      sectionHeading("Profilo Professionale"),
      new Paragraph({
        spacing: { before: 60, after: 60, line: 270 },
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextRun({
            text: "Studentessa trilingue (italiano · spagnolo · inglese) di International Business e Marketing presso la University of Nevada, Las Vegas, e fondatrice di una startup premiata a livello universitario. Ho creato e lanciato ",
            size: 21, color: DARK, font: "Calibri",
          }),
          new TextRun({ text: "RebelBot", bold: true, size: 21, color: ACCENT, font: "Calibri" }),
          new TextRun({
            text: ", piattaforma di engagement studentesco basata su intelligenza artificiale, vincitrice della UNLV President’s Innovation Challenge 2026. Possiedo esperienza concreta in sviluppo commerciale, marketing digitale, comunicazione interculturale e coordinamento eventi internazionali, maturata in contesti imprenditoriali e accademici. Cresciuta tra Spagna, Italia e Stati Uniti, porto una mentalità globale, leadership comprovata in quattro associazioni universitarie e una forte attitudine all’innovazione. Disponibile a viaggi e trasferimenti.",
            size: 21, color: DARK, font: "Calibri",
          }),
        ],
      }),

      sectionHeading("Istruzione e Formazione"),
      ...roleBlock(
        "Bachelor of Science in Business Administration — Doppia specializzazione: International Business & Marketing",
        "University of Nevada, Las Vegas (UNLV) — Lee Business School",
        "Las Vegas, USA",
        "Conseguimento: Dic 2026"
      ),
      bullet("Selezionata per il Lee Student Advisory Board: rappresentanza studentesca nella governance della facoltà."),
      bullet("Membro attivo della sorority Gamma Phi Beta, con ruoli di Standards Chair a supporto dello sviluppo personale dei membri."),

      ...roleBlock(
        "NSF I-Corps Aspire Program — Regione Desert & Pacific",
        "National Science Foundation (USA)",
        "",
        "Mag – Giu 2025"
      ),
      bullet("Selezione competitiva tra studenti universitari per lo sviluppo e la validazione di idee imprenditoriali in fase iniziale."),
      bullet("Realizzate oltre 25 interviste di customer discovery; applicata la metodologia lean startup con mentorship di professionisti del settore."),

      ...roleBlock(
        "Sales Development Representative (SDR) Training Program",
        "StartUp Vegas",
        "",
        "Ago 2025"
      ),
      bullet("Formazione intensiva su prospezione outbound, qualificazione lead e gestione della pipeline commerciale."),
      bullet("Esercitazioni pratiche su cold calling, email outreach, LinkedIn networking e tecniche di negoziazione e chiusura."),

      sectionHeading("Esperienze Professionali"),

      ...roleBlock(
        "Marketing & Programs Intern",
        "World Affairs Council of Las Vegas",
        "Las Vegas, USA",
        "Mag 2026 – Set 2026"
      ),
      bullet("Supporto alla programmazione di delegazioni internazionali e di eventi interculturali, tra cui l’International Visitor Leadership Program (IVLP), valorizzando la fluenza trilingue nella relazione con delegazioni da oltre 10 Paesi."),
      bullet("Coordinamento della logistica eventi: prenotazione sedi, catering, allestimento sale, supporto AV, accoglienza ospiti e relazioni con gli stakeholder."),
      bullet("Realizzazione di materiali di marketing e gestione della promozione su più piattaforme social per aumentare visibilità e partecipazione."),
      bullet("Redazione di corrispondenza istituzionale, materiali di programma e comunicazioni di massa per board members, partner ed event participants."),

      ...roleBlock(
        "Marketing Lead",
        "Team Casas Mortgage",
        "Las Vegas, USA",
        "Ott 2025 – Ago 2026"
      ),
      bullet("Definizione ed esecuzione della strategia di marketing per un team del settore mutui immobiliari in un mercato competitivo."),
      bullet("Creazione e gestione di contenuti social e campagne promozionali a supporto della brand visibility e della lead generation."),
      bullet("Allineamento con la direzione delle iniziative di marketing rispetto agli obiettivi commerciali trimestrali."),

      ...roleBlock(
        "Assistente Amministrativa e Operativa",
        "Davide Tarsi",
        "Las Vegas, USA",
        "Gen 2023 – Ago 2025"
      ),
      bullet("Supporto amministrativo di alto livello per oltre due anni e mezzo: agenda, ricerca informativa, coordinamento attività quotidiane."),
      bullet("Gestione delle comunicazioni e dell’organizzazione logistica con i clienti tramite Yelp, Google Calendar ed email."),

      ...roleBlock(
        "Addetta alle Vendite",
        "DAN Valetudo",
        "Valencia, Spagna",
        "Gen 2019 – Presente"
      ),
      bullet("Generati oltre 5.000 USD di vendite in un singolo weekend durante grandi eventi internazionali di MMA e Brazilian Jiu-Jitsu."),
      bullet("Costruite relazioni durevoli con clienti wholesale internazionali, anticipandone le esigenze."),
      bullet("Gestione dell’inventario in tempo reale e dei report di vendita in condizioni di forte affluenza."),

      sectionHeading("Imprenditorialità e Leadership"),

      ...roleBlock(
        "Fondatrice e CEO — RebelBot",
        "Piattaforma di student engagement basata su intelligenza artificiale",
        "Las Vegas, USA",
        "Apr 2025 – Presente"
      ),
      bullet("Ideata e guidata RebelBot, piattaforma AI che migliora l’accesso degli studenti a risorse del campus, supporto accademico e comunicazioni universitarie."),
      bullet("Vincitrice della UNLV President’s Innovation Challenge 2026 e premiata al UNLV Research Symposium per l’innovazione nello sviluppo imprenditoriale."),
      bullet("Condotte oltre 25 interviste di customer discovery con studenti, advisor e stakeholder universitari secondo la metodologia NSF I-Corps."),
      bullet("Responsabile di strategia di prodotto, branding, ricerca utente e modello di business; coordinamento di mentor, sviluppatori e partner accademici."),
      bullet("Presentazione del progetto in contesti competitivi di pitch imprenditoriale e networking."),

      ...roleBlock(
        "Presidente — International Business Association",
        "University of Nevada, Las Vegas",
        "",
        "Estate 2025 – Mag 2026"
      ),
      bullet("Guida delle operazioni del club e di un consiglio direttivo, con delega strategica e rispetto delle scadenze."),
      bullet("Pianificazione di eventi di sviluppo professionale, sessioni di networking e incontri con relatori del business internazionale."),

      ...roleBlock(
        "Presidente — Artificial Intelligence in Business",
        "University of Nevada, Las Vegas",
        "",
        "Autunno 2025 – Mag 2026"
      ),
      bullet("Direzione di un’associazione studentesca dedicata all’applicazione dell’AI in strategia aziendale, marketing e operations."),
      bullet("Organizzazione di guest lecture, workshop ed eventi di networking con professionisti del settore tech."),

      ...roleBlock(
        "Presidente — Bhakti Yoga Club",
        "University of Nevada, Las Vegas",
        "",
        "Autunno 2025 – Presente"
      ),
      bullet("Gestione di strategia, budget, pianificazione eventi e marketing per una community universitaria di benessere e scambio culturale."),
      bullet("Direzione delle comunicazioni con incremento costante della partecipazione studentesca."),

      ...roleBlock(
        "Segretaria — Lee Student Advisory Board (LSAB)",
        "Lee Business School, UNLV",
        "",
        "Autunno 2025 – Presente"
      ),
      bullet("Verbalizzazione delle riunioni, gestione action item e comunicazioni interne tra rappresentanti studenteschi e corpo docente."),
      bullet("Supporto a progetti di governance, iniziative studentesche e collaborazioni con la facoltà."),

      sectionHeading("Premi e Riconoscimenti"),
      bullet("Vincitrice — UNLV President’s Innovation Challenge 2026 (innovazione imprenditoriale e sviluppo di startup)."),
      bullet("Premiata al UNLV Research Symposium per la presentazione di una ricerca studentesca innovativa e di un concept di business."),
      bullet("Selezione competitiva — NSF I-Corps Aspire Program, Desert & Pacific Region (2025)."),

      sectionHeading("Competenze Linguistiche"),
      new Paragraph({
        spacing: { before: 60, after: 20, line: 270 },
        children: [
          new TextRun({ text: "Italiano: ", bold: true, size: 21, color: NAVY, font: "Calibri" }),
          new TextRun({ text: "Madrelingua   •   ", size: 21, color: DARK, font: "Calibri" }),
          new TextRun({ text: "Spagnolo: ", bold: true, size: 21, color: NAVY, font: "Calibri" }),
          new TextRun({ text: "Madrelingua   •   ", size: 21, color: DARK, font: "Calibri" }),
          new TextRun({ text: "Inglese: ", bold: true, size: 21, color: NAVY, font: "Calibri" }),
          new TextRun({ text: "Fluente (C2, ambiente accademico e professionale)", size: 21, color: DARK, font: "Calibri" }),
        ],
      }),

      sectionHeading("Competenze Professionali"),
      sectionLeader("Area Business:", "Digital marketing · Content strategy · Lead generation · Customer discovery · Lean startup methodology · Vendite e prospezione · Coordinamento eventi · Comunicazione interculturale."),
      sectionLeader("Strumenti:", "Strumenti di AI per produttività e ricerca (ChatGPT, Claude, Perplexity) · Canva · Adobe Premiere Pro · Final Cut Pro · Microsoft Office (Excel, PowerPoint, Word) · Google Workspace · LinkedIn Sales Navigator."),
      sectionLeader("Soft skill:", "Leadership · Public speaking · Negoziazione · Pensiero strategico · Adattabilità interculturale · Problem solving."),

      sectionHeading("Attività di Volontariato"),
      bullet("Animal Sanctuary of Las Vegas — cura degli animali, manutenzione degli habitat, supporto alla raccolta fondi e gestione del pubblico."),
      bullet("Spring Preserve e Girls on the Run — coordinamento eventi, allestimento stand e supporto ai partecipanti (Gennaio 2021 – Presente)."),

      new Paragraph({
        spacing: { before: 240, after: 0 },
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextRun({
            text: "Autorizzo il trattamento dei miei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR) e del D. Lgs. 196/2003 e successive modifiche, esclusivamente per le finalità connesse al processo di selezione del personale.",
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
  fs.writeFileSync("output/Veronica_Fortuno_CV_Italiano.docx", buffer);
  console.log("Italian CV created");
});
