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
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.goto('https://caesar.ent.northwestern.edu');
        await page.waitForNavigation();
        await page.waitFor(500);
        await caesar.login(page, process.env.caesar_username, process.env.caesar_password)
        await page.waitFor(500);
        await caesar.gettoctecs(page);
        let class_list = await caesar.select_subject(page, 'UGRD', 'EECS');
        await browser.close();

    }
    catch (e) {
        console.log(e)
        browser.close();
    }
})();

