/**
 * The goal of this method is to allow for the failure of a promise, so that it may be retried until it succeeds
 * @param {Page} page 
 * @param {Object} func 
 * @param {Array} args 
 * @param {Object} optional_args 
 * @param {Number} retries 
 */

async function event_wrapper(page, func, args, optional_args = {}, retries=3) {
    // Page is the first argument usually
    if (!optional_args['no_page']) {
        args.unshift(page)
    } try {
        if (optional_args['wait_for']) {
            await page.waitFor(optional_args['wait_for'])
        }
        let resp = await func.apply(page, args)
        
        if (optional_args['wait_for_nav']) {
            await page.waitForNavigation({ waitUntil: optional_args['wait_for_nav'] })
        }
        if (optional_args['wait_for']) {
            await page.waitFor(optional_args['wait_for'])
        }
        return resp
    } catch (err) {
        console.log(err)
        console.log('Trying again')
        if (retries-- < 0) {
            throw 'Could not successfully resolve promises after multiple tries'
        }
        return await event_wrapper(page, func, args, optional_args, retries)
    }
}

/**
 * Tries to find the text in the specified element on the screen and clicks it
 * @param {Page} page 
 * @param {String} text 
 * @param {String} element like `span` or `a` or `div`
 * @param {Number} count optional, used to verify retries
 */
async function click_text(page, text, element='span', count=0) {
    console.log(`Clicking on text: ${text}`)
    const links = await page.$x(`//${element}[contains(text(), '${text}')]`);

    if (links.length > 0) {
        await links[0].click();
    } else {
        console.log(`Link with text: ${text} not found.`);
        if (count > 4) {
            throw `Could not find link ${text} after 2 tries`
        }
        await page.waitFor(1000);
        await click_text(page, text, element, count+1);
    }
}

/**
 * Selects a value from a dropdown
 * @param {Page} page 
 * @param {String} dropdown_id
 * @param {String} value 
 */
async function select(page, dropdown_id, value) {
    await selector_wait(page, `#${dropdown_id}`)
    await page.select(`#${dropdown}`, value)
}

/**
 * 
 * @param {Page} page 
 * @param {String} selector the raw selector 
 * @param {Number} tries optional argument
 */
async function selector_wait(page, selector, tries=0) {
    try {
        await page.waitForSelector(selector, {timeout: 3000})
    } catch (err) {
        console.log("Timeout error")
        let s = await page.$(selector)
        if (s == null) {
            console.log("Could not find selector, trying again")
            if (tries > 2) {
                throw `Could not find selector "${selector}"`
            } else {
                await selector_wait(page, selector, tries+1)
            }
        }
    }
}

module.exports = {
    click_text: click_text,
    select_dropdown: select,
    selector_wait: selector_wait,
    event_wrapper: event_wrapper
}