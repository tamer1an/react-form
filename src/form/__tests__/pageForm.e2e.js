import puppeteer from 'puppeteer-core';
// const puppeteer = require('puppeteer'); // uncomment if core path not working

jest.setTimeout(10000);

const urlMainPage = 'http://localhost:3000/';
const args = ['--no-sandbox', '--disable-setuid-sandbox'];
const path = './screenshots/screenshot.png';
let screenshots = false;

async function checkInputValidation(page, { firstname, username, password, re_password, email }) {
  let checkValidity;

  checkValidity = await page.$eval('#first_name', (el) => el.checkValidity());
  expect(checkValidity).toEqual(firstname);

  checkValidity = await page.$eval('#username', (el) => el.checkValidity());
  expect(checkValidity).toEqual(username);

  checkValidity = await page.$eval('#password', (el) => el.checkValidity());
  expect(checkValidity).toEqual(password);

  checkValidity = await page.$eval('#re_password', (el) => el.checkValidity());
  expect(checkValidity).toEqual(re_password);

  checkValidity = await page.$eval('input[name="email"]', (el) => el.checkValidity());
  expect(checkValidity).toEqual(email);
}

async function fillFields(page) {
  await page.$eval('#first_name', (el) => (el.value = 'Jhon'));
  await page.$eval('#username', (el) => (el.value = 'jhon1'));
  await page.$eval('#password', (el) => (el.value = '765TGbnm'));
  await page.$eval('#re_password', (el) => (el.value = '765TGbnm'));
  await page.$eval('#email', (el) => (el.value = 'user@user.com'));
}

async function preparePage() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    args,
  });
  const page = await browser.newPage();
  await page.goto(urlMainPage);

  return [browser, page];
}

describe('Elements', () => {
  it('Have required fields', async () => {
    const [browser, page] = await preparePage();

    await page.$eval('#first_name', (el) => (el.value = 'Jhon1'));
    await checkInputValidation(page, {
      firstname: false,
      username: false,
      password: false,
      re_password: false,
      email: false,
    });
    await fillFields(page);
    await checkInputValidation(page, {
      firstname: true,
      username: true,
      password: true,
      re_password: true,
      email: true,
    });
    if (screenshots) {
      await page.screenshot({ path });
    }
    await browser.close();
  });
});
