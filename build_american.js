const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  LevelFormat, BorderStyle, HeadingLevel,
  ExternalHyperlink, Table, TableRow, TableCell, WidthType,
} = require('docx');

// ============ COLOR PALETTE ============
const NAVY = "1F3A5F";
const ACCENT = "C5283D";
const DARK = "1A1A1A";
const GREY = "555555";

// ============ PAGE GEOMETRY (US Letter, 0.75" margins) ============
const PAGE_W = 12240;
const PAGE_H = 15840;
const MARGIN = 1080;
const CONTENT_W = PAGE_W - 2 * MARGIN; // 10080

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = {
  top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
  insideHorizontal: noBorder, insideVertical: noBorder,
};

const sectionHeading = (text) => new Paragraph({
  spacing: { before: 240, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY, space: 4 } },
  children: [
    new TextRun({
      text: text.toUpperCase(),
      bold: true,
      size: 24,
      color: NAVY,
      font: "Calibri",
      characterSpacing: 40,
    }),
  ],
});

// Two-column borderless row: left text, right text (right-aligned)
const twoColRow = (leftRuns, rightRuns, opts = {}) => {
  const leftW = opts.leftW || 7000;
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
  // tiny spacer
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

// ============ DOCUMENT ============
const doc = new Document({
  creator: "Veronica Fortuno Seput",
  title: "Veronica Fortuno Seput - Resume",
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
      // ===== HEADER =====
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: "VERONICA FORTUNO SEPUT",
            bold: true, size: 44, color: NAVY, font: "Calibri", characterSpacing: 60,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: "INTERNATIONAL BUSINESS  •  MARKETING  •  STARTUP FOUNDER",
            size: 19, color: ACCENT, font: "Calibri", characterSpacing: 50, bold: true,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({ text: "Las Vegas, NV  ·  (702) 728-6843  ·  ", size: 19, color: GREY, font: "Calibri" }),
          new ExternalHyperlink({
            children: [new TextRun({ text: "v.fortunoseput@gmail.com", size: 19, color: NAVY, font: "Calibri", underline: {} })],
            link: "mailto:v.fortunoseput@gmail.com",
          }),
          new TextRun({ text: "  ·  ", size: 19, color: GREY, font: "Calibri" }),
          new ExternalHyperlink({
            children: [new TextRun({ text: "linkedin.com/in/veronica-fortuno-seput", size: 19, color: NAVY, font: "Calibri", underline: {} })],
            link: "https://linkedin.com/in/veronica-fortuno-seput",
          }),
        ],
      }),

      // ===== SUMMARY =====
      sectionHeading("Professional Summary"),
      new Paragraph({
        spacing: { before: 40, after: 40, line: 270 },
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextRun({
            text: "Trilingual International Business and Marketing student (Italian · Spanish · English) and award-winning startup founder with proven leadership across four collegiate organizations and hands-on entrepreneurial training from the NSF I-Corps program. Built and launched ",
            size: 21, color: DARK, font: "Calibri",
          }),
          new TextRun({ text: "RebelBot", bold: true, size: 21, color: ACCENT, font: "Calibri" }),
          new TextRun({
            text: ", an AI-powered student engagement platform that earned the 2026 UNLV President’s Innovation Challenge. Combines a global perspective shaped by living in Spain, Italy, and the United States with deep experience in digital marketing, business development, and cross-cultural communication. Open to travel and global relocation opportunities.",
            size: 21, color: DARK, font: "Calibri",
          }),
        ],
      }),

      // ===== EDUCATION =====
      sectionHeading("Education"),
      ...roleBlock(
        "B.S. Business Administration — Double Major: International Business & Marketing",
        "University of Nevada, Las Vegas (UNLV) — Lee Business School",
        "Las Vegas, NV",
        "Expected Dec 2026"
      ),
      bullet("Selected for the Lee Student Advisory Board — one of a small group representing students in faculty governance."),
      bullet("Active member of Gamma Phi Beta sorority; Standards Chair responsibilities supporting member development."),

      ...roleBlock(
        "NSF I-Corps Aspire Program — Desert & Pacific Region",
        "National Science Foundation",
        "",
        "May – Jun 2025"
      ),
      bullet("Competitively selected undergraduate participant; completed 25+ customer discovery interviews to validate a venture concept."),
      bullet("Applied lean startup methodology and pivoted product strategy based on direct stakeholder evidence."),

      ...roleBlock(
        "Sales Development Representative (SDR) Training Program",
        "StartUp Vegas",
        "",
        "Aug 2025"
      ),
      bullet("Intensive training in outbound prospecting, lead qualification, and pipeline management."),
      bullet("Developed cold-calling, email outreach, and LinkedIn networking techniques through role-play and live case studies."),

      // ===== EXPERIENCE =====
      sectionHeading("Professional Experience"),

      ...roleBlock(
        "Marketing & Programs Intern",
        "World Affairs Council of Las Vegas",
        "Las Vegas, NV",
        "May 2026 – Sep 2026"
      ),
      bullet("Support programming for International Visitor Leadership Program (IVLP) delegations from 10+ countries — leveraging trilingual fluency to enhance cross-cultural engagement."),
      bullet("Coordinate end-to-end event logistics including venue booking, catering, AV support, and stakeholder communications for diplomatic and business audiences."),
      bullet("Produce marketing collateral and manage multi-platform social media campaigns to expand program visibility and community attendance."),
      bullet("Draft executive correspondence and mass-communication campaigns for board members, partners, and program participants."),

      ...roleBlock(
        "Marketing Lead",
        "Team Casas Mortgage",
        "Las Vegas, NV",
        "Oct 2025 – Aug 2026"
      ),
      bullet("Owned end-to-end marketing strategy and execution for a residential mortgage team operating in a competitive Las Vegas market."),
      bullet("Created and managed social media content and promotional campaigns that strengthened brand visibility and supported sustained lead generation."),
      bullet("Partnered with leadership to align marketing initiatives with quarterly business objectives and client outreach priorities."),

      ...roleBlock(
        "Administrative & Operations Assistant",
        "Davide Tarsi",
        "Las Vegas, NV",
        "Jan 2023 – Aug 2025"
      ),
      bullet("Delivered executive-level administrative support across scheduling, research, and daily operational coordination for 2.5+ years."),
      bullet("Managed client communications and logistics through Yelp, Google Calendar, and email — earning consistent positive feedback."),

      ...roleBlock(
        "Sales Associate",
        "DAN Valetudo",
        "Valencia, Spain",
        "Jan 2019 – Present"
      ),
      bullet("Generated over $5,000 in merchandise revenue in a single weekend across high-volume MMA and Brazilian Jiu-Jitsu competitions."),
      bullet("Built rapport with international wholesale buyers, anticipating needs and converting inquiries into recurring orders."),
      bullet("Managed live inventory tracking and sales reporting under high-traffic event conditions."),

      // ===== LEADERSHIP =====
      sectionHeading("Leadership & Entrepreneurship"),

      ...roleBlock(
        "Founder & CEO — RebelBot",
        "AI-Powered Student Engagement Platform",
        "Las Vegas, NV",
        "Apr 2025 – Present"
      ),
      bullet("Founded and lead an AI-powered platform improving student access to campus resources, academic support, and university communication — gaining traction across UNLV pilot users."),
      bullet("Won the 2026 UNLV President’s Innovation Challenge and recognized at the UNLV Research Symposium for innovation in startup development."),
      bullet("Conducted 25+ NSF I-Corps customer discovery interviews with students, advisors, and university stakeholders to validate the product-market fit."),
      bullet("Lead all product strategy, branding, user research, and business model development; coordinate cross-functional collaboration with mentors, developers, and university partners."),
      bullet("Pitched the venture in competitive entrepreneurial and investor networking environments."),

      ...roleBlock(
        "President — International Business Association",
        "University of Nevada, Las Vegas",
        "",
        "Summer 2025 – May 2026"
      ),
      bullet("Lead all club operations and a multi-member executive board, ensuring strategic delegation and on-time delivery of initiatives."),
      bullet("Plan and oversee professional development events, networking sessions, and guest speaker engagements connecting students with global business leaders."),

      ...roleBlock(
        "President — Artificial Intelligence in Business",
        "University of Nevada, Las Vegas",
        "",
        "Fall 2025 – May 2026"
      ),
      bullet("Lead a student organization exploring AI applications across business strategy, marketing, and operations."),
      bullet("Organize industry guest lectures, workshops, and cross-disciplinary networking events with emerging-technology professionals."),

      ...roleBlock(
        "President — Bhakti Yoga Club",
        "University of Nevada, Las Vegas",
        "",
        "Fall 2025 – Present"
      ),
      bullet("Oversee strategy, budgeting, event planning, and marketing for a campus wellness and cultural-exchange community."),
      bullet("Lead marketing and communications driving sustained increases in student engagement at weekly events."),

      ...roleBlock(
        "Secretary — Lee Student Advisory Board (LSAB)",
        "Lee Business School, UNLV",
        "",
        "Fall 2025 – Present"
      ),
      bullet("Document board minutes, track action items, and manage internal communications among student leaders and faculty."),
      bullet("Support governance initiatives and student-led projects within UNLV’s business school."),

      // ===== HONORS =====
      sectionHeading("Honors & Awards"),
      bullet("Winner — UNLV President’s Innovation Challenge 2026 (entrepreneurial innovation & startup development)."),
      bullet("Award Recipient — UNLV Research Symposium for innovative student research and business concept presentation."),
      bullet("Competitive Selection — NSF I-Corps Aspire Program, Desert & Pacific Region (2025)."),

      // ===== SKILLS =====
      sectionHeading("Languages & Skills"),
      sectionLeader("Languages:", "Italian (Native) · Spanish (Native) · English (Fluent)"),
      sectionLeader("Business:", "Digital Marketing · Content Strategy · Lead Generation · Customer Discovery · Lean Startup Methodology · Sales Prospecting · Event Coordination · Cross-Cultural Communication"),
      sectionLeader("Tools:", "AI Productivity & Research Tools (ChatGPT, Claude, Perplexity) · Canva · Adobe Premiere Pro · Final Cut Pro · Microsoft Office Suite (Excel, PowerPoint, Word) · Google Workspace · LinkedIn Sales Navigator"),
      sectionLeader("Global Experience:", "Lived in Spain, Italy, and the United States. Open to international travel and relocation."),

      // ===== VOLUNTEER =====
      sectionHeading("Community & Volunteer Work"),
      bullet("Animal Sanctuary of Las Vegas — Animal care, habitat maintenance, fundraising support, and customer engagement at sanctuary events."),
      bullet("Spring Preserve & Girls on the Run — Event coordination, booth setup, and runner support across multiple community events (Jan 2021 – Present)."),
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("output/Veronica_Fortuno_Resume_US.docx", buffer);
  console.log("US resume created");
});
