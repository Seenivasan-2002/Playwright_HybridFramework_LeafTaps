import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { contact } = crudData;
const firstName = FakerData.getFirstName();
const lastName = FakerData.getLastName();
const updatedLastName = `${lastName}Upd`;

test(`TC013 Edit Contact @crud @contact`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsContact }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Edit Last Name, Title and Department of an existing Contact' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let contactId: string;
    await test.step(`Precondition: create a Contact`, async () => {
        contactId = await LeaftapsContact.createContact(firstName, lastName);
    });

    await LeaftapsHome.clickTab("Contacts");
    await LeaftapsHome.clickShortcut("Find Contacts");
    await LeaftapsHome.searchById(contactId, "Find Contacts");
    await LeaftapsHome.openRecordFromResult(contactId);
    await LeaftapsContact.clickEdit();
    await LeaftapsContact.updateLastName(updatedLastName);
    await LeaftapsContact.updateTitle(contact.updatedTitle);
    await LeaftapsContact.updateDepartment(contact.updatedDepartment);
    await LeaftapsContact.clickUpdate();
    await LeaftapsContact.verifyContactName(`${firstName} ${updatedLastName}`);
    await LeaftapsContact.verifyTitle(contact.updatedTitle);
    await LeaftapsContact.verifyDepartment(contact.updatedDepartment);
})
