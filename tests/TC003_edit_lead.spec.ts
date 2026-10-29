import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { lead } = crudData;
const firstName = FakerData.getFirstName();
const lastName = FakerData.getLastName();

test(`TC003 Edit Lead @crud @lead`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsLead }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Edit Company Name and Title of an existing Lead' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let leadId: string;
    await test.step(`Precondition: create a Lead`, async () => {
        leadId = await LeaftapsLead.createLead(lead.company, firstName, lastName);
    });

    await LeaftapsHome.clickTab("Leads");
    await LeaftapsHome.clickShortcut("Find Leads");
    await LeaftapsHome.searchById(leadId, "Find Leads");
    await LeaftapsHome.openRecordFromResult(leadId);
    await LeaftapsLead.clickEdit();
    await LeaftapsLead.updateCompanyName(lead.updatedCompany);
    await LeaftapsLead.updateTitle(lead.updatedTitle);
    await LeaftapsLead.clickUpdate();
    await LeaftapsLead.verifyCompanyName(lead.updatedCompany);
    await LeaftapsLead.verifyTitle(lead.updatedTitle);
})
