import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"

const firstName = FakerData.getFirstName()

test(`TC002 Create Lead @lead`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsLead }) => {
    test.info().annotations.push(
        { type: 'TestCase', description: 'Create Lead with mandatory and contact fields' },
    );

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();
    await LeaftapsHome.clickTab("Leads");
    await LeaftapsHome.clickShortcut("Create Lead");
    await LeaftapsLead.companyName(FakerData.getOrganizationName());
    await LeaftapsLead.firstName(firstName);
    await LeaftapsLead.lastName(FakerData.getLastName());
    await LeaftapsLead.title(FakerData.jobRole());
    await LeaftapsLead.phoneNumber(FakerData.getMobileNumber());
    await LeaftapsLead.email(FakerData.getEmail());
    await LeaftapsLead.clickCreateLead();
    await LeaftapsHome.verifyPageTitle("View Lead");
    await LeaftapsLead.verifyFirstName(firstName);
})
