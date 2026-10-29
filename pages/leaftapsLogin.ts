import { BrowserContext, Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../helpers/playwright";
import { credentials } from "../constants/credentialData";
import { URLConstants } from "../constants/urlConstants";
import { selectors } from "./selectors";

export class LeaftapsLoginPage extends PlaywrightWrapper {

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    // No storage state: every test logs in with a fresh session
    public async leaftapsLogin(role: string) {

        const { username, password } = credentials[role];

        await this.loadApplication(URLConstants.leaftapsURL)
        await this.type(selectors.username, "Username", username);
        await this.type(selectors.password, "Password", password);
        await this.click(selectors.loginBtn, "Login", "Button");
        await this.validateElementVisibility(selectors.crmsfaLink, "CRM/SFA");
    }

    public async clickCRMSFA(role: string = "SALESMANAGER") {
        await this.click(selectors.crmsfaLink, "CRM/SFA", "Link");
        // The CRM/SFA hand-off sometimes lands on the "Opentaps CRMSFA Login" page; log in again there
        const leadsTab = this.page.locator(selectors.menuLink("Leads"));
        const crmsfaLoginBtn = this.page.locator(selectors.crmsfaLoginBtn);
        await leadsTab.or(crmsfaLoginBtn).first().waitFor({ state: 'visible', timeout: 20000 });
        if (await crmsfaLoginBtn.isVisible()) {
            const { username, password } = credentials[role];
            await this.type(selectors.crmsfaUsername, "Username", username);
            await this.type(selectors.crmsfaPassword, "Password", password);
            await this.click(selectors.crmsfaLoginBtn, "Login", "Button");
        }
        await expect(leadsTab).toBeVisible({ timeout: 20000 });
    }
}
