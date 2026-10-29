import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { contact } = crudData;
const firstName = FakerData.getFirstName();
const lastName = FakerData.getLastName();
const updatedLastName = `${lastName}Upd`;

test(`TC019 E2E - Contact Create, Find, Update and Deactivate @e2e @contact`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsContact }) => {
    test.setTimeout(180000);
    test.info().annotations.push({ type: 'TestCase', description: 'E2E: create a Contact, find it, update it, deactivate it and verify removal' });

    let contactId: string;

    await test.step(`Login as sales manager`, async () => {
        await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
        await LeaftapsLogin.clickCRMSFA();
    });

    await test.step(`Create Contact`, async () => {
        await LeaftapsHome.clickTab("Contacts");
        await LeaftapsHome.clickShortcut("Create Contact");
        await LeaftapsContact.firstName(firstName);
        await LeaftapsContact.lastName(lastName);
        await LeaftapsContact.department(contact.department);
        await LeaftapsContact.clickCreateContact();
        await LeaftapsContact.verifyContactName(`${firstName} ${lastName}`);
        contactId = await LeaftapsContact.getContactId();
    });

    await test.step(`Find Contact`, async () => {
        await LeaftapsHome.clickShortcut("Find Contacts");
        await LeaftapsHome.searchById(contactId, "Find Contacts");
        await LeaftapsHome.openRecordFromResult(contactId);
        await LeaftapsContact.verifyContactName(`${firstName} ${lastName}`);
    });

    await test.step(`Update Contact`, async () => {
        await LeaftapsContact.clickEdit();
        await LeaftapsContact.updateLastName(updatedLastName);
        await LeaftapsContact.updateTitle(contact.updatedTitle);
        await LeaftapsContact.updateDepartment(contact.updatedDepartment);
        await LeaftapsContact.clickUpdate();
        await LeaftapsContact.verifyContactName(`${firstName} ${updatedLastName}`);
        await LeaftapsContact.verifyDepartment(contact.updatedDepartment);
    });

    await test.step(`Deactivate Contact`, async () => {
        await LeaftapsContact.clickDeactivate();
        await LeaftapsHome.verifyWarningMessage("deactivated");
    });

    await test.step(`Verify Contact is removed`, async () => {
        await LeaftapsHome.clickShortcut("Find Contacts");
        await LeaftapsHome.searchById(contactId, "Find Contacts");
        await LeaftapsHome.verifyNoRecords();
    });
})
