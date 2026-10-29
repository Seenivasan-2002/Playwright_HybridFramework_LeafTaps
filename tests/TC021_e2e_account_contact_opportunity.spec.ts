import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { contact, opportunity } = crudData;
const accountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-5)}`;
const firstName = FakerData.getFirstName();
const lastName = FakerData.getLastName();
const opportunityName = `${FakerData.getCourseName()} ${Date.now().toString().slice(-5)}`;

test(`TC021 E2E - Account, Contact and Opportunity @e2e`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsAccount, LeaftapsContact, LeaftapsOpportunity }) => {
    test.setTimeout(240000);
    test.info().annotations.push({ type: 'TestCase', description: 'E2E: create an Account, a Contact for it and an Opportunity linked to both, then move the Opportunity to the next stage' });

    let accountId: string;
    let contactId: string;

    await test.step(`Login as sales manager`, async () => {
        await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
        await LeaftapsLogin.clickCRMSFA();
    });

    await test.step(`Create Account`, async () => {
        accountId = await LeaftapsAccount.createAccount(accountName);
        await LeaftapsAccount.verifyAccountName(accountName);
    });

    await test.step(`Create Contact for the Account`, async () => {
        await LeaftapsHome.clickTab("Contacts");
        await LeaftapsHome.clickShortcut("Create Contact");
        await LeaftapsContact.firstName(firstName);
        await LeaftapsContact.lastName(lastName);
        await LeaftapsContact.department(contact.department);
        await LeaftapsContact.accountId(accountId);
        await LeaftapsContact.clickCreateContact();
        await LeaftapsContact.verifyContactName(`${firstName} ${lastName}`);
        contactId = await LeaftapsContact.getContactId();
    });

    await test.step(`Create Opportunity for the Account and Contact`, async () => {
        await LeaftapsHome.clickTab("Opportunities");
        await LeaftapsHome.clickShortcut("Create Opportunity");
        await LeaftapsOpportunity.opportunityName(opportunityName);
        await LeaftapsOpportunity.accountId(accountId);
        await LeaftapsOpportunity.contactId(contactId);
        await LeaftapsOpportunity.stage(opportunity.stage);
        await LeaftapsOpportunity.amount(opportunity.amount);
        await LeaftapsOpportunity.closeDate(opportunity.closeDate);
        await LeaftapsOpportunity.clickCreateOpportunity();
        await LeaftapsOpportunity.verifyOpportunityName(opportunityName);
        await LeaftapsOpportunity.verifyAccountName(accountName);
    });

    await test.step(`Move Opportunity to next stage`, async () => {
        await LeaftapsOpportunity.clickEdit();
        await LeaftapsOpportunity.updateStage(opportunity.updatedStage);
        await LeaftapsOpportunity.updateChangeNote(opportunity.changeNote);
        await LeaftapsOpportunity.updateAmount(opportunity.updatedAmount);
        await LeaftapsOpportunity.clickUpdate();
        await LeaftapsOpportunity.verifyStage(opportunity.updatedStage);
        await LeaftapsOpportunity.verifyAmount(opportunity.updatedAmount);
    });
})
