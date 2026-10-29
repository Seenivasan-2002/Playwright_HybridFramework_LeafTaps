import { BrowserContext, Page } from "@playwright/test";
import { selectors } from "./selectors";
import { PlaywrightWrapper } from "../helpers/playwright";

export class LeaftapsOpportunityPage extends PlaywrightWrapper {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async opportunityName(value: string) {
        await this.type(selectors.opportunity.name, "Opportunity Name", value)
    }

    public async accountId(value: string) {
        await this.type(selectors.opportunity.accountId, "Account", value)
    }

    public async contactId(value: string) {
        await this.type(selectors.opportunity.contactId, "Contact", value)
    }

    public async stage(value: string) {
        await this.selectDropdown(selectors.opportunity.stage, { label: value })
    }

    public async opportunityType(value: string) {
        await this.selectDropdown(selectors.opportunity.type, { label: value })
    }

    public async amount(value: string) {
        await this.type(selectors.opportunity.amount, "Estimated Amount", value)
    }

    // Format: M/d/yy
    public async closeDate(value: string) {
        await this.type(selectors.opportunity.closeDate, "Estimated Close Date", value)
    }

    public async description(value: string) {
        await this.type(selectors.opportunity.description, "Description", value)
    }

    public async clickCreateOpportunity() {
        await this.click(selectors.opportunity.createOpportunityBtn, "Create Opportunity", "Button")
    }

    // Precondition helper: Opportunities tab -> Create Opportunity for an account
    public async createOpportunity(name: string, accountId: string, amount: string, closeDate: string) {
        await this.click(selectors.menuLink("Opportunities"), "Opportunities", "Tab")
        await this.click(selectors.menuLink("Create Opportunity"), "Create Opportunity", "Link")
        await this.opportunityName(name)
        await this.accountId(accountId)
        await this.amount(amount)
        await this.closeDate(closeDate)
        await this.clickCreateOpportunity()
        await this.verifyOpportunityName(name)
    }

    public async verifyOpportunityName(expectedValue: string) {
        await this.validateElementVisibility(selectors.opportunity.viewName, "Opportunity Name")
        await this.verification(selectors.opportunity.viewName, expectedValue)
    }

    public async verifyAccountName(expectedValue: string) {
        await this.verification(selectors.opportunity.viewAccount, expectedValue)
    }

    public async verifyStage(expectedValue: string) {
        await this.verification(selectors.opportunity.viewStage, expectedValue)
    }

    // View shows the amount formatted, e.g. "$75,000.00"
    public async verifyAmount(expectedValue: string) {
        const formatted = Number(expectedValue).toLocaleString('en-US')
        await this.verification(selectors.opportunity.viewAmount, formatted)
    }

    public async verifyNextStep(expectedValue: string) {
        await this.verification(selectors.opportunity.viewNextStep, expectedValue)
    }

    public async clickEdit() {
        await this.click(selectors.editLink, "Edit", "Link")
    }

    public async updateName(value: string) {
        await this.type(selectors.opportunity.updateName, "Opportunity Name", value)
    }

    public async updateStage(value: string) {
        await this.selectDropdown(selectors.opportunity.updateStage, { label: value })
    }

    public async updateAmount(value: string) {
        await this.type(selectors.opportunity.updateAmount, "Estimated Amount", value)
    }

    public async updateNextStep(value: string) {
        await this.type(selectors.opportunity.updateNextStep, "Next Step", value)
    }

    // Required by Leaftaps when the stage is changed
    public async updateChangeNote(value: string) {
        await this.type(selectors.opportunity.updateChangeNote, "Change Note", value)
    }

    public async clickUpdate() {
        await this.click(selectors.updateBtn, "Update", "Button")
    }

    // Find Opportunities has no ID field, so search by name
    public async searchByName(name: string) {
        await this.type(selectors.opportunity.findName, "Opportunity Name", name)
        await this.click(selectors.record.findBtn("Find Opportunities"), "Find Opportunities", "Button")
    }

    public async openOpportunityFromResult(name: string) {
        await this.click(selectors.opportunity.resultName(name), name, "Link")
    }
}
