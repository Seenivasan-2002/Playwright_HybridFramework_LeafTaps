import { test } from "../customFixtures/leaftapsFixture"
import { FakerData } from "../helpers/fakerUtils"
import crudData from "../data/leaftapsCrudData.json"

const { account } = crudData;
const accountName = `${FakerData.getRandomTitle()} ${Date.now().toString().slice(-5)}`;
const updatedAccountName = `${accountName} Upd`;

test(`TC018 E2E - Account Create, Find, Update and Deactivate @e2e @account`, async ({ LeaftapsLogin, LeaftapsHome, LeaftapsAccount }) => {
    test.setTimeout(180000);
    test.info().annotations.push({ type: 'TestCase', description: 'E2E: create an Account, find it, update it, deactivate it and verify removal' });

    let accountId: string;

    await test.step(`Login as sales manager`, async () => {
        await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
        await LeaftapsLogin.clickCRMSFA();
    });

    await test.step(`Create Account`, async () => {
        await LeaftapsHome.clickTab("Accounts");
        await LeaftapsHome.clickShortcut("Create Account");
        await LeaftapsAccount.accountName(accountName);
        await LeaftapsAccount.industry(account.industry);
        await LeaftapsAccount.ownership(account.ownership);
        await LeaftapsAccount.clickCreateAccount();
        await LeaftapsAccount.verifyAccountName(accountName);
        accountId = await LeaftapsAccount.getAccountId(accountName);
    });

    await test.step(`Find Account`, async () => {
        await LeaftapsHome.clickShortcut("Find Accounts");
        await LeaftapsHome.searchById(accountId, "Find Accounts");
        await LeaftapsHome.openRecordFromResult(accountId);
        await LeaftapsAccount.verifyAccountName(accountName);
    });

    await test.step(`Update Account`, async () => {
        await LeaftapsAccount.clickEdit();
        await LeaftapsAccount.accountName(updatedAccountName);
        await LeaftapsAccount.description(account.updatedDescription);
        await LeaftapsAccount.clickSave();
        await LeaftapsAccount.verifyAccountName(updatedAccountName);
    });

    await test.step(`Deactivate Account`, async () => {
        await LeaftapsAccount.clickDeactivate();
        await LeaftapsHome.verifyWarningMessage("This account was deactivated");
    });

    await test.step(`Verify Account is removed`, async () => {
        await LeaftapsHome.clickShortcut("Find Accounts");
        await LeaftapsHome.searchById(accountId, "Find Accounts");
        await LeaftapsHome.verifyNoRecords();
    });
})
