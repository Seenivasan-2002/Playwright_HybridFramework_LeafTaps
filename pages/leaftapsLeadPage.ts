import { BrowserContext, Page } from "@playwright/test";
import { selectors } from "./selectors";
import { PlaywrightWrapper } from "../helpers/playwright";


export class LeaftapsLeadPage extends PlaywrightWrapper {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async companyName(value: string) {
        await this.type(selectors.leads.companyName, "Company Name", value)
    }

    public async firstName(value: string) {
        await this.type(selectors.leads.firstName, "First Name", value)
    }

    public async lastName(value: string) {
        await this.type(selectors.leads.lastName, "Last Name", value)
    }

    public async source(value: string) {
        await this.selectDropdown(selectors.leads.source, { label: value })
    }

    public async industry(value: string) {
        await this.selectDropdown(selectors.leads.industry, { label: value })
    }

    public async ownership(value: string) {
        await this.selectDropdown(selectors.leads.ownership, { label: value })
    }

    public async title(value: string) {
        await this.type(selectors.leads.title, "Title", value)
    }

    public async phoneNumber(value: string) {
        await this.type(selectors.leads.phoneNumber, "Phone Number", value)
    }

    public async email(value: string) {
        await this.type(selectors.leads.email, "Email", value)
    }

    public async clickCreateLead() {
        await this.click(selectors.leads.createLeadBtn, "Create Lead", "Button")
    }

    // Precondition helper: Leads tab -> Create Lead with mandatory fields; returns the new Lead ID
    public async createLead(company: string, firstName: string, lastName: string): Promise<string> {
        await this.click(selectors.menuLink("Leads"), "Leads", "Tab")
        await this.click(selectors.menuLink("Create Lead"), "Create Lead", "Link")
        await this.companyName(company)
        await this.firstName(firstName)
        await this.lastName(lastName)
        await this.clickCreateLead()
        return await this.getLeadId()
    }

    // View Lead shows the company as "Testleaf (12176)"
    public async getLeadId(): Promise<string> {
        const companyText = await this.getInnerText(selectors.leads.viewCompanyName)
        const leadId = companyText.match(/\((\d+)\)/)[1]
        console.log(`Lead ID: ${leadId}`);
        return leadId
    }

    public async verifyFirstName(expectedValue: string) {
        await this.validateElementVisibility(selectors.leads.viewFirstName, "First Name")
        await this.verification(selectors.leads.viewFirstName, expectedValue)
    }

    public async verifyCompanyName(expectedValue: string) {
        await this.verification(selectors.leads.viewCompanyName, expectedValue)
    }

    public async verifyTitle(expectedValue: string) {
        await this.verification(selectors.leads.viewTitle, expectedValue)
    }

    public async clickEdit() {
        await this.click(selectors.editLink, "Edit", "Link")
    }

    public async updateCompanyName(value: string) {
        await this.type(selectors.leads.updateCompanyName, "Company Name", value)
    }

    public async updateTitle(value: string) {
        await this.type(selectors.leads.updateTitle, "Title", value)
    }

    public async clickUpdate() {
        await this.click(selectors.updateBtn, "Update", "Button")
    }

    public async clickDelete() {
        await this.click(selectors.leads.deleteLink, "Delete", "Link")
    }

    public async clickDuplicateLead() {
        await this.click(selectors.leads.duplicateLink, "Duplicate Lead", "Link")
    }
}
