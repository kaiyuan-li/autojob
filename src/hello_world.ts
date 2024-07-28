import puppeteer from "puppeteer-extra";

import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";

const close_browser_on_key_press = async (browser) => {
    console.log("按下任意键关闭浏览器...");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", async () => {
        // await saveCookiesToFile(page, cookies_file_path);
        await browser.close();
        process.exit();
    });
}

const close_cookie_popup = async (page) => {
    const accept_button_selector = 'button[id="onetrust-accept-btn-handler"]';
    await page.waitForSelector(accept_button_selector);
    await page.click(accept_button_selector);
    await Bun.sleep(1000);
}

const login = async (page) => {
    const email_selector = 'input[data-automation-id="email"]';
    const password_selector = 'input[data-automation-id="password"]';
    const submit_button_selector= 'button[data-automation-id="signInSubmitButton"]';
    const email = "xiaofenglibio@gmail.com";
    const password = "Pf123567!";
    await page.waitForSelector(email_selector);
    await page.type(email_selector, email);
    await page.type(password_selector, password);
    await Bun.sleep(1000);
    await page.click(submit_button_selector);
    await Bun.sleep(1000);
}

const main = async () => {
    puppeteer.use(StealthPlugin()).use(AdblockerPlugin({ blockTrackers: true }));
    const browser = await puppeteer.launch({
        headless: false,
        // args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    // const pfizer_url = "https://www.pfizer.com/";
    const pfizer_url = "https://pfizer.wd1.myworkdayjobs.com/PfizerCareers/login";
    await page.goto(pfizer_url);
    await login(page);
    // await page.screenshot({ path: "example.png" });
    // await close_cookie_popup(page);
    await close_browser_on_key_press(browser);
    // await browser.close();
};

main();