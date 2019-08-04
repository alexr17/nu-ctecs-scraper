const c_util = require('./util')

async function login(page, username, password) {
    await page.click('input[name=IDToken1]', 100);
    await page.waitFor(500);
    await page.type('input[name=IDToken1]', username, { delay: 200 })
    await page.waitFor(500);
    await page.click('input[name=IDToken2]', 100);
    await page.waitFor(500);
    await page.type('input[name=IDToken2]', password, { delay: 200 })
    await page.waitFor(500);
    await page.click('input[name=Login\\.Submit]', 100);
    // await page.waitForSelector('#myId')
    if (new URL(page.url()).host == 'caesar.ent.northwestern.edu') {
        console.log("Sucessfully logged into Caesar!")
    }
    else if (new URL(page.url()).host == 'websso.it.northwestern.edu') {
        console.log("Waiting for 2FA");
        await page.waitFor(2000);
        while (new URL(page.url()).host != 'caesar.ent.northwestern.edu') {
            await page.waitFor(2000);
        }
        console.log("2FA success!")
    } else {
        throw ("Unsuccessful login")
    }
}

async function gettoctecs(page) {
    await page.waitFor(1000);
    await c_util.click_text(page, "Manage Classes");
    // There is no other way to wait for the AJAX load of data to go to the next step. Puppeteer will not detect the element on page.waitForSelector() for some reason. If you try to click on search CTECs without letting the AJAX call finish, it won't have any data loaded and you will be stuck.
    await page.waitFor(5000);
    await c_util.click_text(page, "Search CTECs")
    await page.waitFor(2000);
}

/**
 * This method selects a subject the CTECS dropdown and navigates to the page, returning an array of the classes that have ctecs for the subject, so that the `click_text` method can select them
 * 
 * @param {Object} page the pupeteer page
 * @param {String} level defaults to 'UGRD', for undergraduate
 * @param {String} dep defaults to 'EECS', for testing
 * 
 * @return {Array<String>} the list of classes for the ctecs
 */
async function select_subject(page, level='UGRD', dep='EECS') {
    await c_util.select_dropdown(page, 'NW_CT_PB_SRCH_ACAD_CAREER', level);
    await page.waitFor(1000);
    await c_util.select_dropdown(page, 'NW_CT_PB_SRCH_SUBJECT', dep);
    await page.waitFor(500);
    await page.click(`#NW_CT_PB_SRCH_SRCH_BTN`);
    await page.waitFor(1000);
    let children = await page.$eval('.ps_grid-body', el => {
        let arr = []
        for (child of el.children) {
            arr.push(child.querySelector('span.ps_box-value').textContent)
        }
        return arr
    });
    return children
}

async function select_class(page, klass) {
    await c_util.click_text(page, klass)
    await page.waitFor(30000)
}

module.exports = {
    login: login,
    gettoctecs: gettoctecs,
    select_subject: select_subject,
    select_class: select_class
}