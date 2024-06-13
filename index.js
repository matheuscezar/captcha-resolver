const puppeteer = require('puppeteer');
const tesseract = require('tesseract.js');
ocr = require('./ocr');

(async () => {
  const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--single-process', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService']});
  const page = await browser.newPage();
  await page.goto('https://URL');
  await page.waitForSelector('#loginForm > div:nth-child(3) > img');
  await page.waitForSelector('#btnSubmit');
  const element = await page.$('#loginForm > div:nth-child(3) > img');
  await element.screenshot({path: 'captcha.png'});
  const captcha = await ocr();
  await page.type('#user', 'YOUR_USER');
  await page.type('#password', 'YOUR_PASSWORD');
  await page.type('#captcha', captcha.trim());
  await page.click('#btnSubmit');
  try {
    await page.waitForSelector('body > div.wrapper > header > nav > div > ul > li > a > img')
    console.log('Captcha resolvido com sucesso!');
  } catch(error){
    console.log('Captcha falhou!');
  }

await browser.close();

})();
