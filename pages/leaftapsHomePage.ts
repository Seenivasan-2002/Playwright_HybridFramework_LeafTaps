import { BrowserContext, Page, expect, test } from "@playwright/test";
import { selectors } from "./selectors";
import { PlaywrightWrapper } from "../helpers/playwright";

export class LeaftapsHomePage extends PlaywrightWrapper {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    // Top tabs: Leads, Contacts, Accounts, Opportunities...
    public async clickTab(tabName: string) {
        await this.click(selectors.menuLink(tabName), tabName, "Tab");
    }

    // Left shortcuts: Create Lead, Find Leads, Merge Leads, Create Account...
    public async clickShortcut(linkName: string) {
        await this.click(selectors.menuLink(linkName), linkName, "Link");
    }

    public async verifyPageTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(new RegExp(expectedTitle), { timeout: 20000 });
    }

    public async verifySectionHeader(expectedText: string) {
        await expect(this.page.locator(selectors.sectionHeader)).toContainText(expectedText);
    }

    // Common record actions shared by Lead, Account and Contact

    // findButton is the grid's button text: "Find Leads", "Find Accounts" or "Find Contacts"
    public async searchById(id: string, findButton: string) {
        await this.type(selectors.record.findById, "ID", id);
        await this.click(selectors.record.findBtn(findButton), findButton, "Button");
    }

    public async openRecordFromResult(id: string) {
        await this.click(selectors.record.resultId(id), id, "Link");
    }

    public async verifyNoRecords() {
        await expect(this.page.locator(selectors.record.noRecords)).toContainText("No records to display", { timeout: 15000 });
    }

    public async verifyWarningMessage(expectedText: string) {
        await expect(this.page.locator(selectors.record.warningMessage)).toContainText(expectedText);
    }

    // Lookup icon opens a Find window; picking a record fills the field and closes it
    private async selectFromLookup(lookupLocator: string, name: string, id: string, findButton: string) {
        await test.step(`Select ${name} record ${id} from lookup window`, async () => {
            await this.childTab(lookupLocator);
            await this.page.waitForLoadState('load');
            await this.searchById(id, findButton);
            await this.openRecordFromResult(id);
            this.switchToParentPage();
        });
    }

    public async selectFromRecord(id: string, findButton: string) {
        await this.selectFromLookup(selectors.record.fromLookup, "From", id, findButton);
    }

    public async selectToRecord(id: string, findButton: string) {
        await this.selectFromLookup(selectors.record.toLookup, "To", id, findButton);
    }

    // Merge asks "Are you sure?" in a confirm dialog
    public async clickMerge() {
        await this.clickAndAcceptDialog(selectors.record.mergeBtn, "Merge", "Button");
    }
}
