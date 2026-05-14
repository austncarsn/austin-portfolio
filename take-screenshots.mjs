import { chromium } from 'playwright';

const outputDir = '/Users/austincarson/Projects/ACTIVE/personal-website/public/screenshots';

const targets = [
  { url: 'https://montana-civic-data.vercel.app/', filename: 'montana-civic-data.png' },
  { url: 'https://mikethecookie.com/', filename: 'daily-mike.png' },
  { url: 'https://cameo-web.vercel.app/', filename: 'cameo-web.png' },
  { url: 'https://east-texas-heritage.vercel.app/', filename: 'east-texas-history.png' },
  { url: 'https://refmake.vercel.app/', filename: 'figma-make-mastery.png' },
];

const browser = await chromium.launch({ headless: true });

for (const { url, filename } of targets) {
  const outPath = `${outputDir}/${filename}`;
  console.log(`Capturing ${url} → ${filename}`);
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({
      path: outPath,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 900 },
    });
    await page.close();
    console.log(`  ✓ Saved ${filename}`);
  } catch (err) {
    console.error(`  ✗ Failed for ${url}: ${err.message}`);
  }
}

await browser.close();
console.log('Done.');
