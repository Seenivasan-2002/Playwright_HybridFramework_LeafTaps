import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { contact } = crudData;
const firstName = FakerData.getFirstName();
const lastName = FakerData.getLastName();

test(`TC008 Create Contact @contact`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsContact }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Create a Contact with title, department and email' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();
    await LeaftapsHome.clickTab("Contacts");
    await LeaftapsHome.clickShortcut("Create Contact");
    await LeaftapsContact.firstName(firstName);
    await LeaftapsContact.lastName(lastName);
    await LeaftapsContact.title(FakerData.jobRole());
    await LeaftapsContact.department(contact.department);
    await LeaftapsContact.email(FakerData.getEmail());
    await LeaftapsContact.clickCreateContact();
    await LeaftapsHome.verifySectionHeader("View Contact");
    await LeaftapsContact.verifyContactName(`${firstName} ${lastName}`);
})
