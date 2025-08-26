const fs = require('fs');
const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';
const ROUTES = [
  '/', '/auth/login', '/auth/register', '/profile', '/cases',
  '/cases/new', '/cases/1', '/payments', '/admin/payments',
  '/assistant', '/directory', '/qna', '/upload', '/letter', '/help-documents'
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let report = '# Verificaci?n Migrantes UK ? PWA (autom?tica)\n\n';
  report += 'Ruta | PASA/FALLA | Observaciones | Acci?n aplicada\n';
  report += '--- | --- | --- | ---\n';

  for (const route of ROUTES) {
    let status = 'PASA';
    const obs = [];
    const consoleErrors = [];

    page.removeAllListeners('console');
    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

    try {
      await page.goto(BASE_URL + route, { waitUntil: 'networkidle2', timeout: 30000 });

      // BackNav
      const hasBack = await page.evaluate(() => {
        const nodes = Array.from(document.querySelectorAll('a,button'));
        return nodes.some(el => {
          const text = (el.textContent || '').toLowerCase();
          const cls  = (el.className || '').toLowerCase();
          return text.includes('inicio') || text.includes('atr?s') || text.includes('atras') || cls.includes('backnav');
        });
      });
      if (!hasBack && route !== '/') { status = 'FALLA'; obs.push('BackNav no visible'); }

      // Contenido visible
      const bodyText = await page.evaluate(() => document.body.innerText.trim());
      if (!bodyText || bodyText.length < 10) { status = 'FALLA'; obs.push('Contenido insuficiente'); }

      // Offline (offline.html)
      await page.setOfflineMode(true);
      let offlineOk = false;
      try {
        await page.goto(BASE_URL + route, { waitUntil: 'load', timeout: 15000 });
        offlineOk = await page.evaluate(() => {
          const t = document.body.innerText.toLowerCase();
          return t.includes('offline') || t.includes('sin conexi?n');
        });
      } catch {}
      await page.setOfflineMode(false);
      if (!offlineOk && route !== '/') obs.push('offline.html no detectado');

      if (consoleErrors.length) { status = 'FALLA'; obs.push('Consola: ' + consoleErrors.join(' | ')); }

      report += `${route} | ${status} | ${obs.join(', ') || 'OK'} | Verificado autom?ticamente\n`;
    } catch (e) {
      report += `${route} | FALLA | Error carga: ${e.message} | Intento autom?tico\n`;
    }
  }

  await browser.close();
  fs.writeFileSync('REPORT.md', report, { encoding: 'utf8' });
  console.log('Reporte generado: REPORT.md');
})();
