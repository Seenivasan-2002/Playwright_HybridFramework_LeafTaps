import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"

const firstName = FakerData.getFirstName();
const lastName = FakerData.getLastName();

// Leaftaps has no Delete for contacts; Deactivate removes the contact from Find Contacts
test(`TC014 Deactivate Contact @crud @contact`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsContact }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Deactivate a Contact and verify it is no longer found' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let contactId: string;
    await test.step(`Precondition: create a Contact`, async () => {
        contactId = await LeaftapsContact.createContact(firstName, lastName);
    });

    await LeaftapsContact.clickDeactivate();
    await LeaftapsHome.verifyWarningMessage("deactivated");
    await LeaftapsHome.clickShortcut("Find Contacts");
    await LeaftapsHome.searchById(contactId, "Find Contacts");
    await LeaftapsHome.verifyNoRecords();
})
