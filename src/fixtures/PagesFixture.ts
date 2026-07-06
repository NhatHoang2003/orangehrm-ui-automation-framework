import { test as baseTest } from '@playwright/test';

import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage"
import { MyInfoPage } from "../pages/MyInfoPage";
import { SaveSystemUsersPage } from '../pages/SaveSystemUsersPage';
import { ViewSystemUsersPage } from '../pages/ViewSystemUsersPage';

type FormsFixtureType = {
    loginPage: LoginPage
    dashboardPage: DashboardPage;
    myInfoPage: MyInfoPage;
    viewSystemUsersPage: ViewSystemUsersPage;
    saveSystemUsersPage: SaveSystemUsersPage;   
}

export const test = baseTest.extend<FormsFixtureType>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    myInfoPage: async ({ page }, use) => {
        await use(new MyInfoPage(page));
    },

    viewSystemUsersPage: async ({ page }, use) => {
        await use(new ViewSystemUsersPage(page));
    },

    saveSystemUsersPage: async ({ page }, use) => {
        await use(new SaveSystemUsersPage(page));
    },
});

export { expect } from '@playwright/test'

