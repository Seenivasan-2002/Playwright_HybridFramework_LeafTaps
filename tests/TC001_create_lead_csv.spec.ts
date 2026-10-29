import { test } from "../customFixtures/leaftapsFixture"
import { readDataFromCSV } from '../helpers/csvUtil';
import { updateJSONFile } from "../helpers/jsonDataHandler";
import { leadData } from "../data/lead.interface";

const csvFilePath = './data/leads.csv';

test('TC001 Creating Leads Using CSV Data @lead', async ({ LeaftapsLogin, LeaftapsHome, LeaftapsLead }) => {
    const data = await readDataFromCSV(csvFilePath);

    test.info().annotations.push(
        { type: 'TestCase', description: 'Creating Leads Using CSV Data' },
        { type: 'Test Description', description: "Create one Lead per CSV row with source, industry and ownership" }
    );

    await LeaftapsLogin.leaftapsLogin("SALESMANAGER");
    await LeaftapsLogin.clickCRMSFA();

    for (const row of data) {
        const { Company, FirstName, LastName, Source, Industry, Ownership } = row;

        await LeaftapsHome.clickTab("Leads");
        await LeaftapsHome.clickShortcut("Create Lead");
        await LeaftapsLead.companyName(Company);
        await LeaftapsLead.firstName(FirstName);
        await LeaftapsLead.lastName(LastName);
        await LeaftapsLead.source(Source);
        await LeaftapsLead.industry(Industry);
        await LeaftapsLead.ownership(Ownership);
        await LeaftapsLead.clickCreateLead();
        await LeaftapsHome.verifyPageTitle("View Lead");
        await LeaftapsLead.verifyFirstName(FirstName);

        const leadId = await LeaftapsLead.getLeadId();
        updateJSONFile<leadData>("../data/leaddata.json", { TC001: leadId });
    }
});
