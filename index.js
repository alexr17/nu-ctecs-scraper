require('dotenv').config()
const puppeteer = require('puppeteer');
const caesar = require('./caesar');
// let departments = ["AAL", "AFST", "AF_AM_ST", "ALT_CERT", "AMER_ST", "AMES", "ANIM_ART", "ANTHRO", "ARABIC", "ART", "ART_HIST", "ASIAN_AM", "ASIAN_LC", "ASIAN_ST", "ASTRON", "BIOL_SCI", "BMD_ENG", "BUS_INST", "CAT", "CFS", "CHEM", "CHEM_ENG", "CHINESE", "CHRCH_MU", "CIV_ENG", "CIV_ENV", "CLASSICS", "CMN", "COG_SCI", "COMM_SCI", "COMM_ST", "COMP_LIT", "COMP_SCI", "CONDUCT", "COOP", "CRDV", "CSD", "DANCE", "DSGN", "EARTH", "ECE", "ECON", "EDIT", "EECS", "ENGLISH", "ENTREP", "ENVR_POL", "ENVR_SCI", "ES_APPM", "EUR_ST", "EUR_TH", "FRENCH", "GBL_HLTH", "GEN_CMN", "GEN_ENG", "GEN_LA", "GEN_MUS", "GEN_SPCH", "GEOG", "GEOL_SCI", "GERMAN", "GNDR_ST", "GREEK", "HDPS", "HEBREW", "HINDI", "HIND_URD", "HISTORY", "HUM", "IDEA", "IEMS", "IMC", "INTG_ART", "INTG_SCI", "INTL_ST", "ISEN", "ITALIAN", "JAPANESE", "JAZZ_ST", "JOUR", "JWSH_ST", "KELLG_FE", "KELLG_MA", "KOREAN", "LATIN", "LATINO", "LATIN_AM", "LDRSHP", "LEGAL_ST", "LING", "LOC", "LRN_DIS", "MATH", "MAT_SCI", "MECH_ENG", "MENA", "MFG_ENG", "MMSS", "MUSIC", "MUSICOL", "MUSIC_ED", "MUS_COMP", "MUS_TECH", "MUS_THRY", "NEUROSCI", "NICO", "PERF_ST", "PERSIAN", "PHIL", "PHYSICS", "PIANO", "POLI_SCI", "PORT", "PRDV", "PSYCH", "RELIGION", "RTVF", "SESP", "SHC", "SLAVIC", "SOCIOL", "SOC_POL", "SPANISH", "SPCH", "STAT", "STRINGS", "SWAHILI", "TEACH_ED", "THEATRE", "TRANS", "TURKISH", "URBAN_ST", "VOICE", "WIND_PER", "WM_ST", "WRITING", "YIDDISH"]

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            userDataDir: 'pup-data/',
        });
        await (await browser.pages())[0].close(); // Closing about:blank page
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        // Get to Homepage
        await Promise.all([
            page.goto('https://caesar.ent.northwestern.edu'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);

        // Login
        await Promise.all([
            await page.waitFor(500),
            caesar.login(page, process.env.caesar_username, process.env.caesar_password),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);

        // Get to ctecs
        await Promise.all([
            await page.waitFor(500),
            caesar.get_to_ctecs(page),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
            
        ]);

        // Get list of classes for department
        let class_list = await caesar.get_classes(page, 'UGRD', 'EECS');

        let ctec_links = await caesar.get_ctec_links(page, class_list[0]);
        for (const link of ctec_links) {
            const label = await page.evaluate(el => el.innerText, link);
            // console.log(label.replace(class_list[0], ''))
        }
        // await caesar.scrape_ctec(browser, page, ctec_list[0])
        await page.waitFor(10000);

        await browser.close();

    }
    catch (e) {
        console.log(e)
        browser.close();
    }
})();

