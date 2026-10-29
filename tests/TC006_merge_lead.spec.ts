import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { lead } = crudData;
const toFirstName = FakerData.getFirstName();

test(`TC006 Merge Leads @crud @lead`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsLead }) => {
    test.setTimeout(180000);
    test.info().annotations.push({ type: 'TestCase', description: 'Merge two Leads using the lookup windows and verify the From Lead is removed' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let fromLeadId: string;
    let toLeadId: string;
    await test.step(`Precondition: create two Leads`, async () => {
        fromLeadId = await LeaftapsLead.createLead(lead.company, FakerData.getFirstName(), FakerData.getLastName());
        toLeadId = await LeaftapsLead.createLead(lead.company, toFirstName, FakerData.getLastName());
    });

    await LeaftapsHome.clickTab("Leads");
    await LeaftapsHome.clickShortcut("Merge Leads");
    await LeaftapsHome.selectFromRecord(fromLeadId, "Find Leads");
    await LeaftapsHome.selectToRecord(toLeadId, "Find Leads");
    await LeaftapsHome.clickMerge();
    await LeaftapsHome.verifyPageTitle("View Lead");
    await LeaftapsLead.verifyFirstName(toFirstName);

    await LeaftapsHome.clickShortcut("Find Leads");
    await LeaftapsHome.searchById(fromLeadId, "Find Leads");
    await LeaftapsHome.verifyNoRecords();
})
