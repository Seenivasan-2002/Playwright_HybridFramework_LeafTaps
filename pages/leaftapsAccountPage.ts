import { BrowserContext, Page, expect } from "@playwright/test";
import { selectors } from "./selectors";
import { PlaywrightWrapper } from "../helpers/playwright";

export class LeaftapsAccountPage extends PlaywrightWrapper {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    // Used on both Create and Edit Account (same field ids)
    public async accountName(value: string) {
        await this.type(selectors.accounts.accountName, "Account Name", value)
    }

    public async description(value: string) {
        await this.type(selectors.accounts.description, "Description", value)
    }

    public async industry(value: string) {
        await this.selectDropdown(selectors.accounts.industry, { label: value })
    }

    public async ownership(value: string) {
        await this.selectDropdown(selectors.accounts.ownership, { label: value })
    }

    public async numberOfEmployees(value: string) {
        await this.type(selectors.accounts.numberOfEmployees, "Number of Employees", value)
    }

    public async clickCreateAccount() {
        await this.click(selectors.accounts.createAccountBtn, "Create Account", "Button")
    }

    // Precondition helper: Accounts tab -> Create Account with mandatory fields; returns the new Account ID
    public async createAccount(name: string): Promise<string> {
        await this.click(selectors.menuLink("Accounts"), "Accounts", "Tab")
        await this.click(selectors.menuLink("Create Account"), "Create Account", "Link")
        await this.accountName(name)
        await this.clickCreateAccount()
        return await this.getAccountId(name)
    }

    // Account Details shows the name as "Name  (12227)"
    public async getAccountId(name: string): Promise<string> {
        const accountText = await this.getInnerText(selectors.accounts.viewAccountName(name))
        const accountId = accountText.match(/\((\d+)\)/)[1]
        console.log(`Account ID: ${accountId}`);
        return accountId
    }

    public async verifyAccountName(expectedValue: string) {
        await expect(this.page.locator(selectors.accounts.viewAccountName(expectedValue))).toBeVisible()
    }

    public async clickEdit() {
        await this.click(selectors.editLink, "Edit", "Link")
    }

    public async clickSave() {
        await this.click(selectors.accounts.saveBtn, "Save", "Button")
    }

    public async clickDeactivate() {
        await this.clickAndAcceptDialog(selectors.accounts.deactivateLink, "Deactivate Account", "Link")
    }
}
