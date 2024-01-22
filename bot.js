const puppeteer = require('puppeteer');

async function realizarPesquisa(termo, listaDominios) {
  const browser = await puppeteer.launch({ headless: false });
  const pages = [];

  for (let i = 0; i < listaDominios.length; i += 3) {
    const page = await browser.newPage();
    pages.push(page);

    // Configura a nova aba
    await page.setDefaultNavigationTimeout(0);  // Remove o limite de tempo de espera
    await page.setViewport({ width: 1366, height: 768 });  // Define o tamanho da janela

    // Executa a pesquisa na nova aba
    const dominiosDaAba = listaDominios.slice(i, i + 3);
    const complementoPesquisa = dominiosDaAba.join(' | ');
    const searchString = `${termo} ${complementoPesquisa}`;

    const searchUrl = `https://www.google.com.br/search?q=${encodeURIComponent(searchString)}`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

    // Aguarda um curto período (opcional)
    await page.waitForTimeout(600);
  }

  console.log('Pesquisas concluídas. Mantendo as páginas abertas para análise.');
}

const termoUsuario = '" autenticador zippi  "';
const listaDominios = [
  'sites.google.com', 'negocio.site', 'business.site',
  'webnode.com.br', '000webhostapp.com', 'site123.me',
  'web.app', 'yolasite.com', 'tilda.ws', '42web.io',
  'wordpress.com', 'godaddysites.com', 'wixsite.com',
  'weeblysite.com', 'weebly.com', 'blogspot.com',
  'square.site', 'webhop.me', 'plesk.page', 'canva.site',
  'zyrosite.com', 'sitey.me', 'company.site',
  'reservio.com', 'prezly.com', 'placeweb.site',
  'hospedagemdesites.ws', 'ueniweb.com', 'kyte.site',
  'tk', 'ml', 'nl', 'ga', 'cn', 'co.vu', 'cm', 'cf', 'xyz',
  'shop', 'my.id', 'live', 'digital', 'host', 'online', 'net',
  'linodeusercontent.com', 'cloudapp.azure.com', 'azure.com', 'azurewebsites.net',
  'minhalojanouol.com.br', 'mybluemix.net', 'ecwid.com',
  'lojaintegrada.com.br', 'myshopify.com', 'hotm.art',
  'netlify.app', 'netlify.com', 'vercel.app', 'herokuapp.com',
  'github.io', 'repl.co', 'stackblitz.io', 'firebaseapp.com', 'glide.page',
  'fly.dev', 'deta.dev', 'onrender.com', 'cyclic.app', 'webflow.io',
  'pt.surveymonkey.com', 'forms.monday.com', 'docs.google.com/form', 'forms.app',
  'webwave.dev', '.nave', '.space', '.club', 'net.pl',
];


realizarPesquisa(termoUsuario, listaDominios);
