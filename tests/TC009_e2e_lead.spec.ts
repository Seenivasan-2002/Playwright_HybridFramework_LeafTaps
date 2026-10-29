import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { lead } = crudData;
const firstName = FakerData.getFirstName();
const lastName = FakerData.getLastName();

test(`TC009 E2E - Lead Create, Find, Update and Delete @e2e @lead`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsLead }) => {
    test.setTimeout(180000);
    test.info().annotations.push({ type: 'TestCase', description: 'E2E: create a Lead, find it, update it, delete it and verify removal' });

    let leadId: string;

    await test.step(`Login as sales manager`, async () => {
        await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
        await LeaftapsLogin.clickCRMSFA();
    });

    await test.step(`Create Lead`, async () => {
        await LeaftapsHome.clickTab("Leads");
        await LeaftapsHome.clickShortcut("Create Lead");
        await LeaftapsLead.companyName(lead.company);
        await LeaftapsLead.firstName(firstName);
        await LeaftapsLead.lastName(lastName);
        await LeaftapsLead.source(lead.source);
        await LeaftapsLead.clickCreateLead();
        await LeaftapsLead.verifyFirstName(firstName);
        leadId = await LeaftapsLead.getLeadId();
    });

    await test.step(`Find Lead`, async () => {
        await LeaftapsHome.clickShortcut("Find Leads");
        await LeaftapsHome.searchById(leadId, "Find Leads");
        await LeaftapsHome.openRecordFromResult(leadId);
        await LeaftapsLead.verifyFirstName(firstName);
    });

    await test.step(`Update Lead`, async () => {
        await LeaftapsLead.clickEdit();
        await LeaftapsLead.updateCompanyName(lead.updatedCompany);
        await LeaftapsLead.updateTitle(lead.updatedTitle);
        await LeaftapsLead.clickUpdate();
        await LeaftapsLead.verifyCompanyName(lead.updatedCompany);
        await LeaftapsLead.verifyTitle(lead.updatedTitle);
    });

    await test.step(`Delete Lead`, async () => {
        await LeaftapsLead.clickDelete();
        await LeaftapsHome.verifyPageTitle("My Leads");
    });

    await test.step(`Verify Lead is removed`, async () => {
        await LeaftapsHome.clickShortcut("Find Leads");
        await LeaftapsHome.searchById(leadId, "Find Leads");
        await LeaftapsHome.verifyNoRecords();
    });
})
