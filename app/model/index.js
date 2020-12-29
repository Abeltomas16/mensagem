
require('dotenv').config()
const puppeteer = require('puppeteer');
const { NOME, SENHA } = process.env

//controller que armazena as funções
var funcoes = {}

funcoes.requisita = async (numero, corpo) => {

  //DEFINICAO DO BROWSER
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  //DEFINIÇÃO DA JENELA
  const page = await browser.newPage();

  //ENTREI NO SITE
  await page.goto('https://conta.unitel.ao/SelfCare_Web/');

  //ENTRADA DOS DADOS NA PÁGINA
  await page.type('input[type="text"]', NOME)
  await page.type('input[type="password"]', SENHA)

  //CLICA NO BOTÃO ENTRAR
  await (await page.$('input[type="password"]')).press('Enter')

  //AGUARDA PELO SELECTOR
  await page.waitForSelector('#wt5_wtstage_wt57_wtContent_WebPatterns_wt188_block_wtColumn1_wt33_WebPatterns_wt4_block_wtCell2_wtInfo')

  var Status = ''
  var Mensagem = null;

  //ENTRA NAS OPÇÃO DE ENVIAR MENSAGEM
  await page.goto('https://conta.unitel.ao/SelfCare_Web/EnviarSMS.aspx')

  //AGURADA ATÉ QUE A PÁGINA SEJA CARREGADA
  await page.waitForFunction(
    'document.querySelector("h1").innerText.includes("ENVIAR SMS")'
  )

  //PRENCHE OS CAMPOS NÚMERO E TEXO
  await page.type('input[type="text"]', numero)
  await page.type('textarea', corpo)

  //PRESSIONA ENTER PARA O ENVIO DA MENSAGEM
  await (await page.$('input[type="submit"]')).press('Enter')

  //ESPERA 1,5S (PRECAUÇÃO CASO A REDE FOR LENTA)
  await page.waitForTimeout(1500)

  //PEGA O TEXTO DA MODAL RESULTADO
  const texto = await page.$eval('.ValidationMessage', z => z.textContent)

  const cli = texto;

  //COMPARA SE O RETORNO FOI CONTACTO ESTÁ INVÁLIDO
  if (cli == 'Contacto inválido') {

    //PEGUEI O ERRO
    const err = await page.$eval(
      '.ValidationMessage', el => el.textContent
    )
    Status = err;
  } else {
    //CORREU TUDO BEM
    //SELECIONEI A MODAL QUE CONTÉM A MENSAGEM DE SUCESSO
    await page.waitForSelector('.ModalContainer')

    //PEGEUEI A MENSAGEM
    const status = await page.$eval(
      'div.popup-dialog-title > span', el => el.textContent
    )
    // A VARIAVÉL DE RETORNO PEGA O SEU VALOR
    const mensage = await page.$eval(
      '.ModalMessage > div ', el => el.textContent
    )

    //SETEI AS VARIAVÉIS STATUS E MENSAGE PARA EU RETORNAR MAIS TARDE
    Status = status;
    Mensagem = mensage;
  }

  //FECHEI O NAVGEDOR
  await browser.close();

  //RETORNO DAS VARIAVÉIS STATUS E MENSAGEM
  return { Status, Mensagem }
}

module.exports = funcoes;