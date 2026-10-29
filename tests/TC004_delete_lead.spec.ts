import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { lead } = crudData;
const firstName = FakerData.getFirstName();
const lastName = FakerData.getLastName();

test(`TC004 Delete Lead @crud @lead`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsLead }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Delete a Lead and verify it is no longer found' });

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
    await LeaftapsLead.clickDelete();
    await LeaftapsHome.verifyPageTitle("My Leads");
    await LeaftapsHome.clickShortcut("Find Leads");
    await LeaftapsHome.searchById(leadId, "Find Leads");
    await LeaftapsHome.verifyNoRecords();
})
