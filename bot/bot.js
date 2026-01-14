const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { listaTld } = require("./listas");

// =======================
// Utils
// =======================
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =======================
// Bot principal
// =======================
async function iniciarBot(keywordSelecionada) {

  const options = new chrome.Options();
  options.addArguments(
    "--start-maximized",
    "--disable-blink-features=AutomationControlled"
  );

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  // Página neutra inicial
  await driver.get("https://www.google.com.br");

  // =======================
  // Função genérica de busca
  // =======================
  async function abrirBusca(motor, textoBusca) {
    let url = "";

    if (motor === "google") {
      url =
        "https://www.google.com.br/search?q=" +
        encodeURIComponent(textoBusca) +
        "&tbs=qdr:m";
    }

    if (motor === "bing") {
      url =
        "https://www.bing.com/search?q=" +
        encodeURIComponent(textoBusca) +
        "&filters=ex1:%22ez1%22";
    }

    await driver.executeScript(
      "var a = document.createElement('a');" +
      "a.href = arguments[0];" +
      "a.target = '_blank';" +
      "document.body.appendChild(a);" +
      "a.click();" +
      "a.remove();",
      url
    );

    console.log("🔍", motor.toUpperCase(), "→", textoBusca);

    // Delay humano
    await sleep(random(3000, 5500));
  }

  // =======================
  // PRIMEIRA RODADA (keyword)
  // =======================
  const buscaBase = '"' + keywordSelecionada + '"';

  await abrirBusca("google", buscaBase);
  await sleep(random(3500, 6000));

  await abrirBusca("bing", buscaBase);
  await sleep(random(3500, 6000));

  // =======================
  // BUSCAS COM TLDs (intercaladas)
  // =======================
  let index = 0;

  while (index < listaTld.length) {

    const grupoTld = listaTld.slice(index, index + 3);

    const busca =
      '"' + keywordSelecionada + '" ' +
      grupoTld.map(tld => '"' + tld + '"').join(" ");

    // Google
    await abrirBusca("google", busca);
    await sleep(random(3500, 6000));

    // Bing
    await abrirBusca("bing", busca);
    await sleep(random(3500, 6000));

    index += 3;
  }

  console.log("✅ Buscas concluídas (Google + Bing intercalados).");
}

module.exports = iniciarBot;
