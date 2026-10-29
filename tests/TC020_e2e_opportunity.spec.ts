import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { opportunity } = crudData;
const accountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-5)}`;
const opportunityName = `${FakerData.getCourseName()} ${Date.now().toString().slice(-5)}`;
const updatedOpportunityName = `${opportunityName} Upd`;

// Leaftaps has no Delete/Deactivate for opportunities, so the flow ends after the update
test(`TC020 E2E - Opportunity Create, Find and Update @e2e @opportunity`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsAccount, LeaftapsOpportunity }) => {
    test.setTimeout(180000);
    test.info().annotations.push({ type: 'TestCase', description: 'E2E: create an Opportunity for an Account, find it, update it and find it by the new name' });

    let accountId: string;

    await test.step(`Login as sales manager`, async () => {
        await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
        await LeaftapsLogin.clickCRMSFA();
    });

    await test.step(`Precondition: create an Account`, async () => {
        accountId = await LeaftapsAccount.createAccount(accountName);
    });

    await test.step(`Create Opportunity`, async () => {
        await LeaftapsHome.clickTab("Opportunities");
        await LeaftapsHome.clickShortcut("Create Opportunity");
        await LeaftapsOpportunity.opportunityName(opportunityName);
        await LeaftapsOpportunity.accountId(accountId);
        await LeaftapsOpportunity.stage(opportunity.stage);
        await LeaftapsOpportunity.amount(opportunity.amount);
        await LeaftapsOpportunity.closeDate(opportunity.closeDate);
        await LeaftapsOpportunity.clickCreateOpportunity();
        await LeaftapsOpportunity.verifyOpportunityName(opportunityName);
    });

    await test.step(`Find Opportunity`, async () => {
        await LeaftapsHome.clickShortcut("Find Opportunities");
        await LeaftapsOpportunity.searchByName(opportunityName);
        await LeaftapsOpportunity.openOpportunityFromResult(opportunityName);
        await LeaftapsOpportunity.verifyOpportunityName(opportunityName);
    });

    await test.step(`Update Opportunity`, async () => {
        await LeaftapsOpportunity.clickEdit();
        await LeaftapsOpportunity.updateName(updatedOpportunityName);
        await LeaftapsOpportunity.updateStage(opportunity.updatedStage);
        await LeaftapsOpportunity.updateChangeNote(opportunity.changeNote);
        await LeaftapsOpportunity.updateAmount(opportunity.updatedAmount);
        await LeaftapsOpportunity.clickUpdate();
        await LeaftapsOpportunity.verifyOpportunityName(updatedOpportunityName);
        await LeaftapsOpportunity.verifyStage(opportunity.updatedStage);
        await LeaftapsOpportunity.verifyAmount(opportunity.updatedAmount);
    });

    await test.step(`Verify updated Opportunity is found by new name`, async () => {
        await LeaftapsHome.clickShortcut("Find Opportunities");
        await LeaftapsOpportunity.searchByName(updatedOpportunityName);
        await LeaftapsOpportunity.openOpportunityFromResult(updatedOpportunityName);
        await LeaftapsOpportunity.verifyAccountName(accountName);
    });
})
