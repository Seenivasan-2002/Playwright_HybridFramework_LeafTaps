import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"

const toFirstName = FakerData.getFirstName();
const toLastName = FakerData.getLastName();

test(`TC015 Merge Contacts @crud @contact`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsContact }) => {
    test.setTimeout(180000);
    test.info().annotations.push({ type: 'TestCase', description: 'Merge two Contacts using the lookup windows and verify the From Contact is removed' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let fromContactId: string;
    let toContactId: string;
    await test.step(`Precondition: create two Contacts`, async () => {
        fromContactId = await LeaftapsContact.createContact(FakerData.getFirstName(), FakerData.getLastName());
        toContactId = await LeaftapsContact.createContact(toFirstName, toLastName);
    });

    await LeaftapsHome.clickTab("Contacts");
    await LeaftapsHome.clickShortcut("Merge Contacts");
    await LeaftapsHome.selectFromRecord(fromContactId, "Find Contacts");
    await LeaftapsHome.selectToRecord(toContactId, "Find Contacts");
    await LeaftapsHome.clickMerge();
    await LeaftapsHome.verifySectionHeader("View Contact");
    await LeaftapsContact.verifyContactName(`${toFirstName} ${toLastName}`);

    await LeaftapsHome.clickShortcut("Find Contacts");
    await LeaftapsHome.searchById(fromContactId, "Find Contacts");
    await LeaftapsHome.verifyNoRecords();
})
