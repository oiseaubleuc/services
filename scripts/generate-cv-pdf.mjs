import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import playwright from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// NOTE: This content is based on the latest CV text you shared in chat.
// If you want an exact match to the PDF layout, share the source (DOCX/Google Doc) or we can iterate.
const cv = {
  name: 'HOUDAIFA HAMOUCHI',
  phone: '+32 451 01 54 76',
  email: 'houdihm@gmail.com',
  profile:
    'Full-stack developer & freelancer building end-to-end web products (frontend, backend, databases, and deployment). Strong analytical mindset from a Law background, focused on scalable, secure, and maintainable solutions that ship fast and perform well.',
  experience: [
    {
      when: '2026 – Present',
      title: 'Freelance – Hohosolutions',
      bullets: ['Currently working as a freelance full-stack developer, delivering end-to-end solutions for client projects'],
    },
    {
      when: 'February 2025 – May 2025',
      title: 'Internship – Bpost',
      bullets: ['Backend development within an enterprise environment, leveraging TypeScript, database systems, and CI/CD automation'],
    },
    {
      when: '2025',
      title: 'Dispatcher & Driver – Interhealthcare Transport',
      bullets: ['Managed routes and communication between hospitals, patients, and drivers'],
    },
    {
      when: '2023 – 2025',
      title: 'Legal Consultant – Brussels',
      bullets: [
        'Experience in Family, Immigration, Criminal, and Traffic Law',
        'Managed client cases and drafted legal documents independently',
      ],
    },
    {
      when: '2021 – 2023',
      title: 'Credit Controller – Financial Department',
      bullets: ['Managed client databases and maintained contact information', 'Supported a collection project and handled payment follow-ups'],
    },
  ],
  education: [
    { when: '2022 – 2025', title: 'KU LEUVEN', bullets: ['Bachelor of Laws'] },
    { when: '2023 – 2025', title: 'ERASMUSHOGESCHOOL', bullets: ['Graduation Programming'] },
  ],
  technicalGroups: [
    {
      title: 'Frontend',
      items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'PWA', 'SEO basics', 'Accessibility'],
    },
    {
      title: 'Backend',
      items: ['Node.js', 'REST APIs', 'Auth (token/session)', 'Laravel', 'Prisma', 'Nodemailer', 'Webhooks', 'Background jobs basics'],
    },
    {
      title: 'Data',
      items: ['SQL', 'SQLite', 'MySQL', 'Schema design', 'Indexes', 'Data export (CSV)', 'Analytics tracking'],
    },
    {
      title: 'DevOps / Delivery',
      items: ['Git', 'CI/CD basics', 'Vercel', 'Env management', 'Logs & monitoring basics', 'Docker basics'],
    },
    {
      title: 'Quality',
      items: ['Testing mindset', 'Type safety', 'Code reviews', 'Debugging', 'Performance profiling basics'],
    },
    {
      title: 'Tools',
      items: ['VS Code', 'Postman', 'GitHub', 'Figma', 'Microsoft 365'],
    },
    {
      title: 'Enterprise / CRM / BI',
      items: [
        'SAP (modules, reporting)',
        'Salesforce (CRM, Sales Cloud)',
        'Power BI (dashboards, reports, DAX)',
        'ERP (processen, integraties)',
        'CRM (pipeline, contacten, automatisering)',
        'HubSpot, Zoho CRM',
      ],
    },
  ],
  skills: [
    'Problem solving',
    'Clear communication',
    'Time management',
    'Client focus',
    'Ownership',
  ],
  languages: ['English', 'French', 'Dutch'],
};

function section(title, innerHtml) {
  return `
    <section class="section">
      <h2 class="sectionTitle">${escapeHtml(title)}</h2>
      ${innerHtml}
    </section>
  `;
}

function datedList(items) {
  return `
    <div class="datedList">
      ${items
        .map(
          (it) => `
        <div class="datedItem">
          <div class="when">${escapeHtml(it.when)}</div>
          <div class="body">
            <div class="title">${escapeHtml(it.title)}</div>
            ${it.bullets?.length ? `<ul class="bullets">${it.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `;
}

function pillList(items) {
  return `
    <div class="pillWrap">
      ${items.map((t) => `<span class="pill">${escapeHtml(t)}</span>`).join('')}
    </div>
  `;
}

function groupList(groups) {
  return `
    <div class="groupList">
      ${groups
        .map(
          (g) => `
        <div class="group">
          <div class="groupTitle">${escapeHtml(g.title)}</div>
          ${pillList(g.items)}
        </div>
      `,
        )
        .join('')}
    </div>
  `;
}

function groupText(groups) {
  return `
    <div class="groupText">
      ${groups
        .map((g) => {
          const line = `${g.title}: ${g.items.join(', ')}`;
          return `<div class="groupTextLine"><span class="groupTextTitle">${escapeHtml(g.title)}:</span> ${escapeHtml(
            g.items.join(', '),
          )}</div>`;
        })
        .join('')}
    </div>
  `;
}

function commaList(items) {
  return `<div class="commaList">${escapeHtml(items.join(', '))}</div>`;
}

function bulletList(items) {
  return `<ul class="plainBullets">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
}

function techStackBulletList(groups) {
  return `<ul class="plainBullets">${groups
    .map((g) => `<li><span class="groupTextTitle">${escapeHtml(g.title)}:</span> ${escapeHtml(g.items.join(', '))}</li>`)
    .join('')}</ul>`;
}

function buildHtml() {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <title>${escapeHtml(cv.name)} – CV</title>
    <style>
      @page { size: A4; margin: 12mm; }
      :root {
        --paper: #ffffff;
        --ink: #111827;
        --muted: #4b5563;
        --muted2: #6b7280;
        --line: rgba(17, 24, 39, 0.12);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Space Grotesk", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: var(--ink);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 10.1pt;
        line-height: 1.38;
        background: var(--paper);
      }
      .page {
        width: 100%;
      }
      .header {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 14px;
        padding: 4px 0 12px;
        border-bottom: 1px solid var(--line);
        margin-bottom: 14px;
      }
      .name {
        font-size: 19pt;
        font-weight: 700;
        letter-spacing: -0.02em;
      }
      .contact {
        text-align: right;
        font-size: 9.5pt;
        color: var(--muted);
        line-height: 1.25;
      }
      .contact a { color: inherit; text-decoration: none; }
      .section { margin: 12px 0 14px; }
      .sectionTitle {
        font-size: 10pt;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        margin: 0 0 8px;
        color: var(--muted2);
        padding-bottom: 4px;
        border-bottom: 1px solid rgba(17, 24, 39, 0.08);
      }
      .profile {
        color: var(--ink);
        font-size: 9.85pt;
      }
      .datedList { display: flex; flex-direction: column; gap: 12px; }
      .datedItem {
        display: grid;
        grid-template-columns: 122px 1fr;
        gap: 12px;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .when { color: var(--muted); font-size: 9.4pt; padding-top: 1px; }
      .title { font-weight: 700; }
      .subtitle {
        margin-top: 1px;
        color: var(--muted);
        font-size: 9.4pt;
      }
      .bullets {
        margin: 6px 0 0;
        padding-left: 18px;
      }
      .bullets li { margin: 3px 0; }
      /* ATS-friendly: avoid "chips"/badges; keep plain text blocks */
      .groupText { display: flex; flex-direction: column; gap: 6px; }
      .groupTextLine { color: var(--ink); }
      .groupTextTitle { font-weight: 700; }
      .commaList { color: var(--ink); }
      .plainBullets {
        margin: 0;
        padding-left: 18px;
      }
      .plainBullets li { margin: 4px 0; }
      .columns {
        display: grid;
        grid-template-columns: 1fr 210px;
        gap: 22px;
        align-items: start;
      }
      .side {
        border-left: 1px solid rgba(17, 24, 39, 0.10);
        padding-left: 14px;
      }
      /* ATS note: still plain text. Two-column is typically OK, but we keep it simple and avoid icons/tables */
      .side .section { margin-top: 0; }
      .side .sectionTitle { margin-top: 0; }
      /* Give the sidebar a bit more breathing room between blocks */
      .side .section { margin-bottom: 16px; }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="header">
        <div>
          <div class="name">${escapeHtml(cv.name)}</div>
        </div>
        <div class="contact">
          <div>${escapeHtml(cv.phone)}</div>
          <div><a href="mailto:${escapeHtml(cv.email)}">${escapeHtml(cv.email)}</a></div>
        </div>
      </div>

      <div class="columns">
        <div class="main">
          ${section(
            'Profile',
            `<div class="profile">${escapeHtml(cv.profile)}</div>`,
          )}
          ${section('Work Experience', datedList(cv.experience))}
          ${section('Education', datedList(cv.education))}
        </div>
        <aside class="side">
          ${section('Tech Stack', techStackBulletList(cv.technicalGroups))}
          ${section('Skills', bulletList(cv.skills))}
          ${section('Languages', bulletList(cv.languages))}
        </aside>
      </div>
    </div>
  </body>
</html>`;
}

async function main() {
  const outDir = path.resolve(__dirname, '..', 'generated');
  const outPdf = path.join(outDir, 'Houdaifa-Hamouchi-CV-Space-Grotesk.pdf');
  await fs.mkdir(outDir, { recursive: true });

  const html = buildHtml();

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({
    path: outPdf,
    format: 'A4',
    printBackground: true,
    margin: { top: '14mm', bottom: '14mm', left: '14mm', right: '14mm' },
  });
  await browser.close();

  // eslint-disable-next-line no-console
  console.log(`Wrote: ${outPdf}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

