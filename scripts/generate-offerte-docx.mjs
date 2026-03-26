#!/usr/bin/env node
/**
 * Genereert een Word-document (.docx) van de offerte voor handmatige bewerking.
 * Gebruik: node scripts/generate-offerte-docx.mjs
 * Output: documents/offerte-enterprise-2900.docx
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  convertInchesToTwip,
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OFFERTE_DOCX = path.resolve(__dirname, '..', 'documents', 'offerte-enterprise-2900.docx');

const features = [
  'Volledige webapplicatie op maat',
  'Dashboard voor beheer en overzichten',
  'Login- en registratiecomponenten (authenticatie)',
  'API-integraties (externe diensten en data)',
  'Technische documentatie en uitleg van het werk',
  'Uniek design en visuele identiteit',
  'Geavanceerde backend en frontend ontwikkeling',
  'Beveiliging en schaalbare architectuur',
  'Training + ondersteuning (3 maanden)',
  'Hosting en bijkomende diensten — apart te offereren / toe te voegen',
];

function buildDocument() {
  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.7),
              right: convertInchesToTwip(0.7),
              bottom: convertInchesToTwip(0.7),
              left: convertInchesToTwip(0.7),
            },
          },
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: 'HohoSolutions', bold: true, size: 28 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Web development & digital solutions', size: 20, color: '666666' }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Offertenummer: ', bold: true }),
              new TextRun({ text: '008' }),
              new TextRun({ text: '    Datum: ', bold: true }),
              new TextRun({ text: '29 januari 2026' }),
              new TextRun({ text: '    Geldig tot: ', bold: true }),
              new TextRun({ text: '28 februari 2026' }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: 'Offerte — Volledige webapplicatie',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Op maat gemaakte applicatie met dashboard, authenticatie en technische documentatie', color: '666666', italics: true }),
            ],
            spacing: { after: 300 },
          }),
          new Paragraph({
            text: 'Geadresseerde',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Siggi Michiels', bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'michielssiggi@gmail.com' }),
            ],
            spacing: { after: 300 },
          }),
          new Paragraph({
            text: 'Enterprise pakket — Volledige applicatie',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Volledige webapplicatie met dashboard, inlog- en registratiecomponenten, API-integraties en technische uitleg van het werk. Hosting en eventuele bijkomende diensten kunnen apart worden toegevoegd.',
                color: '555555',
              }),
            ],
            spacing: { after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2.900 € ', bold: true, size: 32 }),
              new TextRun({ text: 'excl. BTW · startprijs', size: 22, color: '666666' }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: 'Inbegrepen:',
            bold: true,
            spacing: { before: 100, after: 100 },
          }),
          ...features.map(
            (text) =>
              new Paragraph({
                text: `• ${text}`,
                bullet: { level: 0 },
                spacing: { after: 60 },
              })
          ),
          new Paragraph({
            text: 'Algemene voorwaarden',
            bold: true,
            spacing: { before: 300, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  'Deze offerte is geldig tot 28 februari 2026. Na akkoord ontvangt u een gedetailleerd projectplan, planning en technische specificaties. De prijs betreft de ontwikkeling van de applicatie (dashboard, login/register, API-integraties, technische documentatie); hosting en eventuele bijkomende diensten worden apart geoffreerd en toegevoegd.',
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  'Betaling: conform de in de opdrachtbevestiging vermelde voorwaarden (bijv. 30% bij opdracht, 40% bij oplevering ontwerp, 30% bij livegang).',
              }),
            ],
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'HohoSolutions', bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'info@hohosolutions.com' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'hohosolutions.com' }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Wij kijken ernaar uit om uw project tot een succes te maken.', italics: true, color: '666666' }),
            ],
          }),
        ],
      },
    ],
  });
}

async function main() {
  const doc = buildDocument();
  const buffer = await Packer.toBuffer(doc);
  await fs.writeFile(OFFERTE_DOCX, buffer);
  console.log('Word-document opgeslagen:', OFFERTE_DOCX);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
