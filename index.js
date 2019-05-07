require('dotenv').config()
const puppeteer = require('puppeteer');
const caesar = require('./caesar');

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            userDataDir: 'pup-data/'
        });
        const page = await browser.newPage();
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.goto('https://caesar.ent.northwestern.edu');
        await page.waitForNavigation();
        await page.waitFor(500);
        await caesar.login(page, process.env.caesar_username, process.env.caesar_password)
        // the first time you will need to do two factor authentication to store the cookies
        // in pup-data that will be used for further logins
        await page.waitFor(30000);
        await browser.close();
        
    }
    catch (e)
    {
        console.log(e)
        browser.close();
    }
})();

