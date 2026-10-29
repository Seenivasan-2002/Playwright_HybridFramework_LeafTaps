import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { opportunity } = crudData;
const accountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-5)}`;
const opportunityName = `${FakerData.getCourseName()} ${Date.now().toString().slice(-5)}`;

test(`TC016 Create Opportunity @crud @opportunity`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsAccount, LeaftapsOpportunity }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Create an Opportunity for an existing Account' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let accountId: string;
    await test.step(`Precondition: create an Account`, async () => {
        accountId = await LeaftapsAccount.createAccount(accountName);
    });

    await LeaftapsHome.clickTab("Opportunities");
    await LeaftapsHome.clickShortcut("Create Opportunity");
    await LeaftapsOpportunity.opportunityName(opportunityName);
    await LeaftapsOpportunity.accountId(accountId);
    await LeaftapsOpportunity.stage(opportunity.stage);
    await LeaftapsOpportunity.opportunityType(opportunity.type);
    await LeaftapsOpportunity.amount(opportunity.amount);
    await LeaftapsOpportunity.closeDate(opportunity.closeDate);
    await LeaftapsOpportunity.description(FakerData.getDescription());
    await LeaftapsOpportunity.clickCreateOpportunity();
    await LeaftapsHome.verifyPageTitle("View Opportunity");
    await LeaftapsOpportunity.verifyOpportunityName(opportunityName);
    await LeaftapsOpportunity.verifyAccountName(accountName);
    await LeaftapsOpportunity.verifyStage(opportunity.stage);
    await LeaftapsOpportunity.verifyAmount(opportunity.amount);
})
