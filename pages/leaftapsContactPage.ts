import { BrowserContext, Page } from "@playwright/test";
import { selectors } from "./selectors";
import { PlaywrightWrapper } from "../helpers/playwright";

export class LeaftapsContactPage extends PlaywrightWrapper {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async firstName(value: string) {
        await this.type(selectors.contacts.firstName, "First Name", value)
    }

    public async lastName(value: string) {
        await this.type(selectors.contacts.lastName, "Last Name", value)
    }

    public async title(value: string) {
        await this.type(selectors.contacts.title, "Title", value)
    }

    public async department(value: string) {
        await this.type(selectors.contacts.department, "Department", value)
    }

    public async email(value: string) {
        await this.type(selectors.contacts.email, "Email", value)
    }

    public async accountId(value: string) {
        await this.type(selectors.contacts.accountId, "Account", value)
    }

    public async clickCreateContact() {
        await this.click(selectors.contacts.createContactBtn, "Create Contact", "Button")
    }

    // Precondition helper: Contacts tab -> Create Contact with mandatory fields; returns the new Contact ID
    public async createContact(firstName: string, lastName: string): Promise<string> {
        await this.click(selectors.menuLink("Contacts"), "Contacts", "Tab")
        await this.click(selectors.menuLink("Create Contact"), "Create Contact", "Link")
        await this.firstName(firstName)
        await this.lastName(lastName)
        await this.clickCreateContact()
        return await this.getContactId()
    }

    // View Contact shows the name as "First Last (12178)"
    public async getContactId(): Promise<string> {
        const nameText = await this.getInnerText(selectors.contacts.viewFullName)
        const contactId = nameText.match(/\((\d+)\)/)[1]
        console.log(`Contact ID: ${contactId}`);
        return contactId
    }

    public async verifyContactName(expectedValue: string) {
        await this.validateElementVisibility(selectors.contacts.viewFullName, "Contact Name")
        await this.verification(selectors.contacts.viewFullName, expectedValue)
    }

    public async verifyTitle(expectedValue: string) {
        await this.verification(selectors.contacts.viewTitle, expectedValue)
    }

    public async verifyDepartment(expectedValue: string) {
        await this.verification(selectors.contacts.viewDepartment, expectedValue)
    }

    public async clickEdit() {
        await this.click(selectors.editLink, "Edit", "Link")
    }

    public async updateFirstName(value: string) {
        await this.type(selectors.contacts.updateFirstName, "First Name", value)
    }

    public async updateLastName(value: string) {
        await this.type(selectors.contacts.updateLastName, "Last Name", value)
    }

    public async updateTitle(value: string) {
        await this.type(selectors.contacts.updateTitle, "Title", value)
    }

    public async updateDepartment(value: string) {
        await this.type(selectors.contacts.updateDepartment, "Department", value)
    }

    public async clickUpdate() {
        await this.click(selectors.updateBtn, "Update", "Button")
    }

    public async clickDeactivate() {
        await this.clickAndAcceptDialog(selectors.contacts.deactivateLink, "Deactivate Contact", "Link")
    }
}
