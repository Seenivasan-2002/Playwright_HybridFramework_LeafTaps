# Playwright Framework - Leaftaps

Playwright + TypeScript framework for the Leaftaps (opentaps CRM/SFA) application.
It follows the same structure as `Playwright_Framework_Salesforce`, without the API layer and without storage state:
every test logs in with a fresh session.

- Application: http://leaftaps.com/opentaps/control/main
- Credentials: `Demosalesmanager` / `crmsfa` (`constants/credentialData.ts`, role `SALESMANAGER`)

## Project Structure

```
Playwright_Framework_Leaftaps
│
├── .github/workflows/playwright.yml   CI pipeline
├── constants
│   ├── credentialData.ts              Login credentials by role
│   └── urlConstants.ts                Application URL
├── customFixtures
│   └── leaftapsFixture.ts             Page objects exposed as fixtures
├── data
│   ├── leads.csv                      CSV data for TC001
│   ├── leaftapsCrudData.json          JSON test data
│   ├── leaddata.json                  Runtime data written by TC001
│   └── lead.interface.ts              Type for leaddata.json
├── helpers
│   ├── playwright.ts                  PlaywrightWrapper (base class for all pages)
│   ├── fakerUtils.ts                  Random test data
│   ├── csvUtil.ts / excelUtils.ts / jsonReader.ts / jsonDataHandler.ts
├── pages
│   ├── selectors.ts                   All locators in one place
│   ├── leaftapsLogin.ts               Login + CRM/SFA
│   ├── leaftapsHomePage.ts            Tabs, shortcuts, shared Find by ID / Merge lookups / verifications
│   ├── leaftapsLeadPage.ts            Create / Edit / Delete / Duplicate Lead
│   ├── leaftapsAccountPage.ts         Create / Edit / Deactivate Account
│   ├── leaftapsContactPage.ts         Create / Edit / Deactivate Contact
│   └── leaftapsOpportunityPage.ts     Create / Edit / Find Opportunity
├── tests                              TC001 - TC021
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Test Cases

| ID    | Spec                              | Scenario                                        |
| ----- | --------------------------------- | ----------------------------------------------- |
| TC001 | TC001_create_lead_csv.spec.ts     | Create Leads from CSV rows, save Lead ID to JSON |
| TC002 | TC002_create_lead.spec.ts         | Create Lead with Faker data                     |
| TC003 | TC003_edit_lead.spec.ts           | Edit Lead company and title                     |
| TC004 | TC004_delete_lead.spec.ts         | Delete Lead and verify "No records to display"  |
| TC005 | TC005_duplicate_lead.spec.ts      | Duplicate Lead                                  |
| TC006 | TC006_merge_lead.spec.ts          | Merge Leads via lookup windows + confirm alert  |
| TC007 | TC007_create_account.spec.ts      | Create Account                                  |
| TC008 | TC008_create_contact.spec.ts      | Create Contact                                  |
| TC009 | TC009_e2e_lead.spec.ts            | E2E: Create, Find, Update, Delete Lead          |
| TC010 | TC010_edit_account.spec.ts        | Edit Account name and description               |
| TC011 | TC011_deactivate_account.spec.ts  | Deactivate Account and verify it is not found   |
| TC012 | TC012_merge_accounts.spec.ts      | Merge Accounts via lookup windows               |
| TC013 | TC013_edit_contact.spec.ts        | Edit Contact last name, title, department       |
| TC014 | TC014_deactivate_contact.spec.ts  | Deactivate Contact and verify it is not found   |
| TC015 | TC015_merge_contacts.spec.ts      | Merge Contacts via lookup windows               |
| TC016 | TC016_create_opportunity.spec.ts  | Create Opportunity for an Account               |
| TC017 | TC017_edit_opportunity.spec.ts    | Edit Opportunity stage, amount, next step       |
| TC018 | TC018_e2e_account.spec.ts         | E2E: Create, Find, Update, Deactivate Account   |
| TC019 | TC019_e2e_contact.spec.ts         | E2E: Create, Find, Update, Deactivate Contact   |
| TC020 | TC020_e2e_opportunity.spec.ts     | E2E: Create, Find, Update Opportunity           |
| TC021 | TC021_e2e_account_contact_opportunity.spec.ts | E2E: Account → Contact → Opportunity → next stage |

Leaftaps has no Delete for Accounts and Contacts (only Deactivate), and no Delete or Deactivate for
Opportunities, so those flows end with Deactivate / Update.

## Running Tests

```sh
npm install
npx playwright install
npx playwright test                    # all tests
npx playwright test --grep @lead       # by tag (@lead, @account, @contact, @opportunity, @crud, @e2e)
npx playwright test tests/TC006_merge_lead.spec.ts
npx playwright show-report
```

Tests run with one worker: they all use the same Leaftaps user, and parallel logins
for that user log each other out.
