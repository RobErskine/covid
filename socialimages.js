const chromium = require('chrome-aws-lambda');
const pages = require('./dynamicPages.json');
const fs = require("fs");
const path = require("path");

(async function() {
  const executablePath = await chromium.executablePath

  const browser = await chromium.puppeteer.launch({
      //args: chromium.args,
      args: await chromium.args,
      executablePath: executablePath,
      headless: true,
  });

  let dimensions = {
    width: 1200,
    height: 630
  }

  console.log(pages.length);

  for(i=0;i < pages.length; i++){
    let state = pages[i];
    let uri = (state.location).toLowerCase();
        uri = uri.replace(/ /g, '_');

    let host = 'https://covidcasesbythenumbers.com/';  //todo replace with .env

    const page = await browser.newPage();

    await page.goto(host + '/social-image/' + uri);
    await page.evaluateHandle('document.fonts.ready');

    const dir = './dist/img';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    await page.setViewport({
      width: dimensions.width,
      height: dimensions.height
    })

    console.log(uri);

    await page.screenshot({ 
      path: `${dir}/${uri}.png`,
      type: 'png',
      clip: {x:0, y:0, width: dimensions.width, height: dimensions.height}
    });

    await page.close();
  }

  await browser.close();
})().catch(console.error)