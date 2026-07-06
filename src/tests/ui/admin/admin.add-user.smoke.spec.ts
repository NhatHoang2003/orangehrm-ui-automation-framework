import { expect, test } from '../../../fixtures/HooksFixture';

test.describe('Save System User Smoke Test', () => {

    test.beforeEach(async ({
        dashboardPage,
        viewSystemUsersPage,
        saveSystemUsersPage,
        page
    }) => {
        await dashboardPage.goto(dashboardPage.dashboardPath);

        await dashboardPage.clickSidebarMenu('Admin');

        await viewSystemUsersPage.clickAddBtn();

        await expect(page).toHaveURL(/\/admin\/saveSystemUser$/);

        await expect(saveSystemUsersPage.addUserTitle).toBeVisible();
    });
}); 