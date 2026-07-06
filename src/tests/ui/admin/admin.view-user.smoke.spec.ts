import { expect, test } from '../../../fixtures/HooksFixture';

test.describe('View System User Smoke Test', () => {

    test.beforeEach(async ({ page, dashboardPage, viewSystemUsersPage }) => {
        await dashboardPage.goto(dashboardPage.dashboardPath);

        await dashboardPage.clickSidebarMenu('Admin');

        await expect(page).toHaveURL(/\/admin\/viewSystemUsers$/);

        await expect(viewSystemUsersPage.systemUsersTitle).toBeVisible();
    });

    test('Should navigate to View System Users page when clicking Admin menu',
        {
            tag: ['@smoke', '@admin']
        },
        async ({ page }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C89'
        });

        await expect(page).toHaveURL(/\/admin\/viewSystemUsers$/);

    });

    test("Should return matching users when searching with valid search criteria",
    {
        tag: ['@smoke', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C90'
        });

        await viewSystemUsersPage.enterUsername('Admin');

        await viewSystemUsersPage.selectUserRole('Admin');

        await viewSystemUsersPage.selectStatus('Enabled');

        await viewSystemUsersPage.clickSearchBtn();

        await viewSystemUsersPage.expectSearchResults();

        await viewSystemUsersPage.verifyAllRowsMatch({
            username: 'Admin',
            role: 'Admin',
            status: 'Enabled'
        });
    });

    test("Should navigate to Save System User page when clicking on the Add Button",
    {
        tag: ['@smoke', '@admin']
    },
    async ({ page, viewSystemUsersPage, saveSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C94'
        });

        await viewSystemUsersPage.clickAddBtn();

        await expect(page).toHaveURL(/\/admin\/saveSystemUser$/);

        await expect(saveSystemUsersPage.addUserTitle).toBeVisible();
    });

    test("Should navigate to Edit User page when clicking the Edit icon",
    {
        tag: ['@smoke', '@admin']
    },
    async ({ page, viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C95'
        });

        await expect(viewSystemUsersPage.adminEditIcon).toBeEnabled();
        await viewSystemUsersPage.clickAdminEditIcon();

        await expect(page).toHaveURL(/\/admin\/saveSystemUser\/\d+$/);
    });
});