const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// White logo on dark background for tab favicon
const logoPath = path.join(__dirname, '../public/logos/logo_hss.png');
const publicDir = path.join(__dirname, '../public');

const BLACK_BG = { r: 10, g: 10, b: 15, alpha: 1 }; // #0a0a0f

// Sizes for different favicon formats
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

async function generateFavicons() {
  try {
    if (!fs.existsSync(logoPath)) {
      console.error(`Logo not found at ${logoPath}`);
      process.exit(1);
    }

    console.log('Generating favicons: fond noir + logo blanc...');

    for (const { size, name } of faviconSizes) {
      const outputPath = path.join(publicDir, name);
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'cover',
          position: 'centre',
          background: BLACK_BG
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    const favicon16 = await sharp(logoPath)
      .resize(16, 16, {
        fit: 'cover',
        position: 'centre',
        background: BLACK_BG
      })
      .png()
      .toBuffer();

    const favicon32 = await sharp(logoPath)
      .resize(32, 32, {
        fit: 'cover',
        position: 'centre',
        background: BLACK_BG
      })
      .png()
      .toBuffer();

    // For .ico, we'll use the 32x32 version as favicon.ico
    // (sharp doesn't support .ico directly, so we'll use the 32x32 PNG)
    // Most modern browsers accept PNG as favicon.ico
    const faviconIcoPath = path.join(publicDir, 'favicon.ico');
    await sharp(favicon32)
      .png()
      .toFile(faviconIcoPath);
    console.log('✓ Generated favicon.ico');

    console.log('\n✅ All favicons generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Update app/layout.tsx to include favicon metadata');
    console.log('2. The favicons are now in the /public folder');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
