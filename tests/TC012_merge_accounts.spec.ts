import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"

const fromAccountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-5)}`;
const toAccountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-4)}`;

test(`TC012 Merge Accounts @crud @account`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsAccount }) => {
    test.setTimeout(180000);
    test.info().annotations.push({ type: 'TestCase', description: 'Merge two Accounts using the lookup windows and verify the From Account is removed' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let fromAccountId: string;
    let toAccountId: string;
    await test.step(`Precondition: create two Accounts`, async () => {
        fromAccountId = await LeaftapsAccount.createAccount(fromAccountName);
        toAccountId = await LeaftapsAccount.createAccount(toAccountName);
    });

    await LeaftapsHome.clickTab("Accounts");
    await LeaftapsHome.clickShortcut("Merge Accounts");
    await LeaftapsHome.selectFromRecord(fromAccountId, "Find Accounts");
    await LeaftapsHome.selectToRecord(toAccountId, "Find Accounts");
    await LeaftapsHome.clickMerge();
    await LeaftapsHome.verifySectionHeader("Account Details");
    await LeaftapsAccount.verifyAccountName(toAccountName);

    await LeaftapsHome.clickShortcut("Find Accounts");
    await LeaftapsHome.searchById(fromAccountId, "Find Accounts");
    await LeaftapsHome.verifyNoRecords();
})
