import { test as baseTest } from '@playwright/test'
import { LeaftapsLoginPage } from '../pages/leaftapsLogin'
import { LeaftapsHomePage } from '../pages/leaftapsHomePage'
import { LeaftapsLeadPage } from '../pages/leaftapsLeadPage'
import { LeaftapsAccountPage } from '../pages/leaftapsAccountPage'
import { LeaftapsContactPage } from '../pages/leaftapsContactPage'
import { LeaftapsOpportunityPage } from '../pages/leaftapsOpportunityPage'

type leaftapsFixture = {
    LeaftapsLogin: LeaftapsLoginPage
    LeaftapsHome: LeaftapsHomePage
    LeaftapsLead: LeaftapsLeadPage
    LeaftapsAccount: LeaftapsAccountPage
    LeaftapsContact: LeaftapsContactPage
    LeaftapsOpportunity: LeaftapsOpportunityPage
}

export const test = baseTest.extend<leaftapsFixture>({

    LeaftapsLogin: async ({ page, context }, use) => {
        await use(new LeaftapsLoginPage(page, context))
    },

    LeaftapsHome: async ({ page, context }, use) => {
        const leaftapsHome = new LeaftapsHomePage(page, context);
        await use(leaftapsHome);
    },

    LeaftapsLead: async ({ page, context }, use) => {
        const leaftapsLead = new LeaftapsLeadPage(page, context);
        await use(leaftapsLead)
    },

    LeaftapsAccount: async ({ page, context }, use) => {
        const leaftapsAccount = new LeaftapsAccountPage(page, context);
        await use(leaftapsAccount)
    },

    LeaftapsContact: async ({ page, context }, use) => {
        const leaftapsContact = new LeaftapsContactPage(page, context);
        await use(leaftapsContact)
    },

    LeaftapsOpportunity: async ({ page, context }, use) => {
        const leaftapsOpportunity = new LeaftapsOpportunityPage(page, context);
        await use(leaftapsOpportunity)
    },
})
