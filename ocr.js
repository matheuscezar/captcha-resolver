const { createWorker } = require('tesseract.js');

const worker = createWorker();

async function ocr() {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '0123456789',
  });
  const { data: { text } } = await worker.recognize('captcha.png');
  console.log(text);
  await worker.terminate();
  return text;
}

module.exports = ocr
