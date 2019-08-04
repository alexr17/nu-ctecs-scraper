async function click_text(page, text, element='span', count=0) {
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

async function select(page, dropdown, value) {
    await selector_wait(page, `#${dropdown}`)
    await page.select(`#${dropdown}`, value)
}

async function selector_wait(page, selector, tries=0) {
    try {
        await page.waitForSelector(selector, {timeout: 3000})
    }
    catch (err) {
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
    selector_wait: selector_wait
}