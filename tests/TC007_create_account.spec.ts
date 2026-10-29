import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { account } = crudData;
const accountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-5)}`;

test(`TC007 Create Account @account`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsAccount }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Create an Account with industry and ownership' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();
    await LeaftapsHome.clickTab("Accounts");
    await LeaftapsHome.clickShortcut("Create Account");
    await LeaftapsAccount.accountName(accountName);
    await LeaftapsAccount.description(FakerData.getDescription());
    await LeaftapsAccount.industry(account.industry);
    await LeaftapsAccount.ownership(account.ownership);
    await LeaftapsAccount.numberOfEmployees(`${FakerData.getMaxseats()}`);
    await LeaftapsAccount.clickCreateAccount();
    await LeaftapsHome.verifySectionHeader("Account Details");
    await LeaftapsAccount.verifyAccountName(accountName);
})
