import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { opportunity } = crudData;
const accountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-5)}`;
const opportunityName = `${FakerData.getCourseName()} ${Date.now().toString().slice(-5)}`;

test(`TC017 Edit Opportunity @crud @opportunity`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsAccount, LeaftapsOpportunity }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Edit Stage, Amount and Next Step of an existing Opportunity' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    await test.step(`Precondition: create an Account and an Opportunity`, async () => {
        const accountId = await LeaftapsAccount.createAccount(accountName);
        await LeaftapsOpportunity.createOpportunity(opportunityName, accountId, opportunity.amount, opportunity.closeDate);
    });

    await LeaftapsHome.clickTab("Opportunities");
    await LeaftapsHome.clickShortcut("Find Opportunities");
    await LeaftapsOpportunity.searchByName(opportunityName);
    await LeaftapsOpportunity.openOpportunityFromResult(opportunityName);
    await LeaftapsOpportunity.clickEdit();
    await LeaftapsOpportunity.updateStage(opportunity.updatedStage);
    await LeaftapsOpportunity.updateChangeNote(opportunity.changeNote);
    await LeaftapsOpportunity.updateAmount(opportunity.updatedAmount);
    await LeaftapsOpportunity.updateNextStep(opportunity.updatedNextStep);
    await LeaftapsOpportunity.clickUpdate();
    await LeaftapsOpportunity.verifyStage(opportunity.updatedStage);
    await LeaftapsOpportunity.verifyAmount(opportunity.updatedAmount);
    await LeaftapsOpportunity.verifyNextStep(opportunity.updatedNextStep);
})
