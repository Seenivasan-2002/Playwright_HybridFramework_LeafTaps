export const selectors = {

    username: "#username",
    password: "#password",
    loginBtn: ".decorativeSubmit",
    crmsfaLink: "//a[contains(text(),'CRM/SFA')]",
    crmsfaUsername: "form[name='loginform'] input[name='USERNAME']",
    crmsfaPassword: "form[name='loginform'] input[name='PASSWORD']",
    crmsfaLoginBtn: "form[name='loginform'] input[value='Login']",
    // Top tabs (Leads, Accounts, Contacts...) and left shortcuts (Create Lead, Find Leads...) are plain links
    menuLink: (name: string) => `//a[text()='${name}']`,
    sectionHeader: ".sectionHeaderTitle >> nth=0",
    editLink: "//a[text()='Edit']",
    updateBtn: "input[value='Update']",

    // Shared by Find Leads / Accounts / Contacts pages and the Merge lookup popups
    record: {
        findById: "input[name='id']",
        findBtn: (buttonName: string) => `//button[text()='${buttonName}']`,
        resultId: (id: string) => `//div[contains(@class,'x-grid3-col-partyId')]/a[text()='${id}']`,
        noRecords: ".x-paging-info",
        fromLookup: "(//img[@alt='Lookup'])[1]",
        toLookup: "(//img[@alt='Lookup'])[2]",
        mergeBtn: "//a[text()='Merge']",
        warningMessage: ".subSectionWarning",
    },
    leads: {
        companyName: "#createLeadForm_companyName",
        firstName: "#createLeadForm_firstName",
        lastName: "#createLeadForm_lastName",
        source: "#createLeadForm_dataSourceId",
        industry: "#createLeadForm_industryEnumId",
        ownership: "#createLeadForm_ownershipEnumId",
        title: "#createLeadForm_generalProfTitle",
        phoneNumber: "#createLeadForm_primaryPhoneNumber",
        email: "#createLeadForm_primaryEmail",
        createLeadBtn: "input[value='Create Lead']",
        // Edit form
        updateCompanyName: "#updateLeadForm_companyName",
        updateTitle: "#updateLeadForm_generalProfTitle",
        // View Lead
        viewCompanyName: "#viewLead_companyName_sp",
        viewFirstName: "#viewLead_firstName_sp",
        viewLastName: "#viewLead_lastName_sp",
        viewTitle: "#viewLead_generalProfTitle_sp",
        deleteLink: "//a[text()='Delete']",
        duplicateLink: "//a[text()='Duplicate Lead']",
    },
    accounts: {
        // Create and Edit Account use the same field ids
        accountName: "#accountName",
        description: "textarea[name='description']",
        industry: "select[name='industryEnumId']",
        ownership: "select[name='ownershipEnumId']",
        numberOfEmployees: "#numberEmployees",
        createAccountBtn: "input[value='Create Account']",
        saveBtn: "input[value='Save']",
        // Account Details shows the name as "Name  (12227)"
        viewAccountName: (name: string) => `//span[contains(text(),'${name}')]`,
        deactivateLink: "//a[text()='Deactivate Account']",
    },
    contacts: {
        firstName: "#firstNameField",
        lastName: "#lastNameField",
        title: "#createContactForm_generalProfTitle",
        department: "#createContactForm_departmentName",
        email: "#createContactForm_primaryEmail",
        accountId: "#createContactForm_accountPartyId",
        createContactBtn: "input[value='Create Contact']",
        // Edit form
        updateFirstName: "#updateContactForm_firstName",
        updateLastName: "#updateContactForm_lastName",
        updateTitle: "#updateContactForm_generalProfTitle",
        updateDepartment: "#updateContactForm_departmentName",
        // View Contact shows the name as "First Last (12178)"
        viewFullName: "#viewContact_fullName_sp",
        viewTitle: "#viewContact_generalProfTitle_sp",
        viewDepartment: "#viewContact_departmentName_sp",
        deactivateLink: "//a[text()='Deactivate Contact']",
    },
    opportunity: {
        name: "#createOpportunityForm_opportunityName",
        accountId: "#createOpportunityForm_accountPartyId",
        contactId: "#createOpportunityForm_contactPartyId",
        stage: "#createOpportunityForm_opportunityStageId",
        type: "#createOpportunityForm_typeEnumId",
        amount: "#createOpportunityForm_estimatedAmount",
        closeDate: "#createOpportunityForm_estimatedCloseDate",
        description: "#createOpportunityForm_description",
        createOpportunityBtn: "input[value='Create Opportunity']",
        // Edit form
        updateName: "#updateOpportunityForm_opportunityName",
        updateStage: "#updateOpportunityForm_opportunityStageId",
        updateAmount: "#updateOpportunityForm_estimatedAmount",
        updateNextStep: "#updateOpportunityForm_nextStep",
        // Mandatory whenever the stage is changed
        updateChangeNote: "#updateOpportunityForm_changeNote",
        // View Opportunity
        viewName: "#viewOpportunity_opportunityName_sp",
        viewAccount: "#viewOpportunity_accountPartyId_sp",
        viewStage: "#viewOpportunity_opportunityStageId_sp",
        viewAmount: "#viewOpportunity_estimatedAmount_sp",
        viewNextStep: "#viewOpportunity_nextStep_sp",
        // Find Opportunities searches by name (no ID field); the quick-create panel has a hidden input with the same name
        findName: "input[name='opportunityName'] >> visible=true",
        resultName: (name: string) => `//div[contains(@class,'x-grid3-col-opportunityName')]/a[text()='${name}']`,
    },
};
