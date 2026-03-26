#!/usr/bin/env node
/**
 * Genereert een PDF van de offerte (Space Grotesk, print-styling).
 * Gebruik: node scripts/generate-offerte-pdf.mjs
 * Output: documents/offerte-enterprise-2900.pdf
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OFFERTE_HTML = path.resolve(__dirname, '..', 'documents', 'offerte-enterprise-2900.html');
const OFFERTE_PDF = path.resolve(__dirname, '..', 'documents', 'offerte-enterprise-2900.pdf');

async function main() {
  const html = await fs.readFile(OFFERTE_HTML, 'utf-8');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: 'networkidle0',
    timeout: 15000,
  });

  await page.pdf({
    path: OFFERTE_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: '18mm', bottom: '18mm', left: '18mm', right: '18mm' },
  });

  await browser.close();

  console.log('PDF opgeslagen:', OFFERTE_PDF);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
