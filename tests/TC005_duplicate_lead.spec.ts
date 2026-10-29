import { test } from "../customFixtures/leaftapsFixture"
import { expect } from "@playwright/test"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { lead } = crudData;
const firstName = FakerData.getFirstName();
const lastName = FakerData.getLastName();

test(`TC005 Duplicate Lead @crud @lead`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsLead }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Duplicate an existing Lead and verify a new Lead is created with the same name' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let leadId: string;
    await test.step(`Precondition: create a Lead`, async () => {
        leadId = await LeaftapsLead.createLead(lead.company, firstName, lastName);
    });

    await LeaftapsLead.clickDuplicateLead();
    await LeaftapsHome.verifyPageTitle("Duplicate Lead");
    await LeaftapsLead.clickCreateLead();
    await LeaftapsHome.verifyPageTitle("View Lead");
    await LeaftapsLead.verifyFirstName(firstName);
    const duplicateLeadId = await LeaftapsLead.getLeadId();
    expect(duplicateLeadId).not.toEqual(leadId);
})
