import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"

const accountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-5)}`;

// Leaftaps has no Delete for accounts; Deactivate removes the account from Find Accounts
test(`TC011 Deactivate Account @crud @account`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsAccount }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Deactivate an Account and verify it is no longer found' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let accountId: string;
    await test.step(`Precondition: create an Account`, async () => {
        accountId = await LeaftapsAccount.createAccount(accountName);
    });

    await LeaftapsAccount.clickDeactivate();
    await LeaftapsHome.verifyWarningMessage("This account was deactivated");
    await LeaftapsHome.clickShortcut("Find Accounts");
    await LeaftapsHome.searchById(accountId, "Find Accounts");
    await LeaftapsHome.verifyNoRecords();
})
