import puppeteer from "puppeteer";

export const botAbsensi = async (url, email, password, presensi = false) => {
  //open web
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    navigator.geolocation.getCurrentPosition = (cb) => {
      setTimeout(() => {
        cb({
          coords: {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: -7.3229351,
            longitude: 112.7362878,
            speed: null,
          },
        });
      }, 1000);
    };
  });
  await page.goto(url);
  //fill login form
  await page.type("#email", email);
  await page.type("#password", password);
  await page.waitForTimeout(500);
  //click login
  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click("#form-login > div.row > div.col-sm-4.text-end > button"), // Clicking the link will indirectly cause a navigation
  ]);
  //open dropdown
  const burgerMenuSelector = "#app > div > nav > div > form > ul > li > a";
  await page.waitForSelector(burgerMenuSelector);
  await page.click(burgerMenuSelector);
  await page.click(burgerMenuSelector);

  //click pengguna
  const penggunaMenuSelector =
    "#sidebar-wrapper > ul > li.nav-item.dropdown > a";

  await Promise.all([
    page.waitForSelector(penggunaMenuSelector),
    page.click(penggunaMenuSelector),
    page.waitForTimeout(500),
  ]);
  //click presensi menu
  const presensiMenuSelector =
    "#sidebar-wrapper > ul > li.nav-item.dropdown.active > ul > li:nth-child(2) > a";
  await page.waitForSelector(presensiMenuSelector),
    await page.click(presensiMenuSelector);

  if (presensi === true) {
    //click presensi button
    await page.click("#app > div > div.main-content > section > div.section-body > div.row.mt-sm-4 > div > div > div > form > button")
  }

  //   logout
  await page.waitForTimeout(2000);
  const logoutButton = "#sidebar-wrapper > ul > li:nth-child(3) > a";
  await page.click(logoutButton);
};
