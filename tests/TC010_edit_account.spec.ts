import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { account } = crudData;
const accountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-5)}`;
const updatedAccountName = `${accountName} Upd`;

test(`TC010 Edit Account @crud @account`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsAccount }) => {
    test.info().annotations.push({ type: 'TestCase', description: 'Edit Account Name and Description of an existing Account' });

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    let accountId: string;
    await test.step(`Precondition: create an Account`, async () => {
        accountId = await LeaftapsAccount.createAccount(accountName);
    });

    await LeaftapsHome.clickTab("Accounts");
    await LeaftapsHome.clickShortcut("Find Accounts");
    await LeaftapsHome.searchById(accountId, "Find Accounts");
    await LeaftapsHome.openRecordFromResult(accountId);
    await LeaftapsAccount.clickEdit();
    await LeaftapsAccount.accountName(updatedAccountName);
    await LeaftapsAccount.description(account.updatedDescription);
    await LeaftapsAccount.clickSave();
    await LeaftapsHome.verifySectionHeader("Account Details");
    await LeaftapsAccount.verifyAccountName(updatedAccountName);
})
