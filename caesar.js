async function login(page, username, password) {
    await page.click('input[name=IDToken1]', 100);
    await page.waitFor(500);
    await page.type('input[name=IDToken1]', username, {delay: 200})
    await page.waitFor(500);
    await page.click('input[name=IDToken2]', 100);
    await page.waitFor(500);
    await page.type('input[name=IDToken2]', password, {delay: 200})
    await page.waitFor(500);
    await page.click('input[name=Login\\.Submit]', 100);
}

module.exports = {
    login: login
}