import { expect, test } from '../../../fixtures/HooksFixture';

test.describe('Admin Management Regression Tests', () => {

    test.beforeEach(async ({ dashboardPage, viewSystemUsersPage }) => {
        await dashboardPage.goto(dashboardPage.dashboardPath);

        await dashboardPage.clickSidebarMenu('Admin');
    });

    test('Should return matching users when searching with a valid username',
        {
            tag: ['@regression', '@admin']
        },
        async ({ viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C91'
        });

        await viewSystemUsersPage.enterUsername('Admin');

        await expect(viewSystemUsersPage.usernameInput).toHaveValue('Admin');

        await viewSystemUsersPage.clickSearchBtn();

        await viewSystemUsersPage.expectSearchResults();

        await viewSystemUsersPage.verifyAllRowsMatch({ username: 'Admin' });
    });

    test('Should return matching users when searching with Admin role',
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C92'
        });

        await viewSystemUsersPage.selectUserRole('Admin');

        await expect(viewSystemUsersPage.userRoleDropdown).toContainText('Admin');

        await viewSystemUsersPage.clickSearchBtn();

        await viewSystemUsersPage.expectSearchResults();

        await viewSystemUsersPage.verifyAllRowsMatch({ role: 'Admin' });
    });

    // test("Should display valid employee name option when entered",
    // {
    //     tag: ['@smoke', '@admin']
    // },
    // async ({ viewSystemUsersPage }, testInfo) => {
    //     testInfo.annotations.push({
    //         type: 'testrail_case_id',
    //         description: 'C505'
    //     });

    //     await viewSystemUsersPage.enterEmployeeName('Charles Carter');

    //     await expect(viewSystemUsersPage.employeeNameInput).toHaveValue('Charles  Carter');
    // });

    test('Should return matching users when searching with Enabled status',
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C93'
        });

        await viewSystemUsersPage.selectStatus('Enabled');

        await expect(viewSystemUsersPage.statusDropdown).toContainText('Enabled');

        await viewSystemUsersPage.clickSearchBtn();

        await viewSystemUsersPage.expectSearchResults();

        await viewSystemUsersPage.verifyAllRowsMatch({ status: 'Enabled' });
    });

    test("Should display 'No Records Found' when searching with an invalid username",
        {
            tag: ['@regression', '@admin']
        },
        async ({ viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C96'
        });

        await viewSystemUsersPage.enterUsername('InvalidUser');

        await expect(viewSystemUsersPage.usernameInput).toHaveValue('InvalidUser');

        await viewSystemUsersPage.clickSearchBtn();

        await viewSystemUsersPage.verifyNoRecordsFound();

        await expect(viewSystemUsersPage.tableRows).toHaveCount(0);
    });

    test('Should display all available User Role options',
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C97'
        });

        await viewSystemUsersPage.userRoleDropdown.click();

        await expect(viewSystemUsersPage.userRoleOptions).toHaveText([
            '-- Select --',
            'Admin',
            'ESS'
        ]);
    });

    test('Should display all available Status options',
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C109'
        });

        await viewSystemUsersPage.statusDropdown.click();

        await expect(viewSystemUsersPage.statusOptions).toHaveText([
            '-- Select --',
            'Enabled',
            'Disabled'
        ]);
    });

    test("Should display 'No Records Found' when entering non-existent employee name",
        {
            tag: ['@regression', '@admin']
        },
        async ({ viewSystemUsersPage }, testInfo) => {

            testInfo.annotations.push({
                type: 'testrail_case_id',
                description: 'C98'
            });

            await viewSystemUsersPage.enterEmployeeName('Zzznonexistent');

            await viewSystemUsersPage.expectNoEmployeeFound();
        }
    );

    test("Should display the 'Invalid' validation message for an invalid employee name",
        {
            tag: ['@regression', '@admin']
        },
        async ({ viewSystemUsersPage }, testInfo) => {

            testInfo.annotations.push({
                type: 'testrail_case_id',
                description: 'C99'
            });

            await viewSystemUsersPage.enterEmployeeName('....');

            await viewSystemUsersPage.clickSearchBtn();

            await expect(viewSystemUsersPage.employeeNameError).toHaveText('Invalid');
        }
    );

    test("Should clear all search filters when clicking the Reset button",
        {
            tag: ['@regression', '@admin']
        },
        async ({ viewSystemUsersPage }, testInfo) => {
            testInfo.annotations.push({
                type: 'testrail_case_id',
                description: 'C100'
            });

            await viewSystemUsersPage.enterUsername('Admin');

            await viewSystemUsersPage.selectUserRole('Admin');

            await viewSystemUsersPage.selectStatus('Enabled');

            await viewSystemUsersPage.clickSearchBtn();

            await viewSystemUsersPage.expectSearchResults();

            await expect(viewSystemUsersPage.resetBtn).toBeEnabled();

            await viewSystemUsersPage.clickResetBtn();

            await expect(viewSystemUsersPage.usernameInput).toHaveValue('');
            await expect(viewSystemUsersPage.userRoleDropdown).toHaveText('-- Select --');
            await expect(viewSystemUsersPage.statusDropdown).toHaveText('-- Select --');
        }
    );

    test("Should delete a user successfully when confirming deletion from the Delete icon",
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C101'
        });

        await expect(viewSystemUsersPage.firstDeletableUserDeleteIcon).toBeVisible();

        await expect(viewSystemUsersPage.firstDeletableUserDeleteIcon).toBeEnabled();

        await viewSystemUsersPage.clickFirstDeletableUserDeleteIcon();

        await viewSystemUsersPage.clickConfirmDeleteBtn();

        await expect(viewSystemUsersPage.successDeleteToast).toBeVisible();
    });

    test('Should delete selected users successfully when confirming deletion',
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {

        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C102'
        });

        await viewSystemUsersPage.selectFirstDeletableUser();

        await expect(viewSystemUsersPage.deletableCheckboxInputs.first()).toBeChecked();

        await expect(viewSystemUsersPage.deleteSelectedBtn).toBeEnabled();

        await viewSystemUsersPage.clickDeleteSelectedBtn();

        await expect(viewSystemUsersPage.confirmDeleteBtn).toBeVisible();

        await viewSystemUsersPage.clickConfirmDeleteBtn();

        await expect(viewSystemUsersPage.successDeleteToast).toBeVisible();
    });

    test("Should display alert and prevent deletion when clicking delete icon of a protected admin user",
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C103'
        });

        await viewSystemUsersPage.clickProtectedAdminDeleteIcon();

        await expect(viewSystemUsersPage.protectedAdminDeleteIcon).toBeEnabled();

        await expect(viewSystemUsersPage.failureDeleteToast).toBeVisible();
    });

    test("Should keep the user when cancelling deletion from the Delete icon",
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C104'
        });

        await viewSystemUsersPage.selectFirstDeletableUser();

        await expect(viewSystemUsersPage.deletableCheckboxInputs.first()).toBeChecked();

        await expect(viewSystemUsersPage.deleteSelectedBtn).toBeEnabled();

        await viewSystemUsersPage.clickDeleteSelectedBtn();

        await expect(viewSystemUsersPage.confirmDeleteBtn).toBeVisible();

        await viewSystemUsersPage.clickCancelDeleteBtn();

        await expect(viewSystemUsersPage.successDeleteToast).not.toBeVisible();
    });

    test("Should return matching users when searching with username and status",
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C105'
        });

        await viewSystemUsersPage.enterUsername('Admin');

        await viewSystemUsersPage.selectStatus('Enabled');

        await viewSystemUsersPage.clickSearchBtn();

        await viewSystemUsersPage.expectSearchResults();

        await viewSystemUsersPage.verifyAllRowsMatch({
            username: 'Admin',
            status: 'Enabled'
        });

        await expect(viewSystemUsersPage.resetBtn).toBeEnabled();
    });

    test("Should return matching users when searching with username and role",
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C106'
        });

        await viewSystemUsersPage.enterUsername('Admin');

        await viewSystemUsersPage.selectUserRole('Admin');

        await viewSystemUsersPage.clickSearchBtn();

        await viewSystemUsersPage.expectSearchResults();

        await viewSystemUsersPage.verifyAllRowsMatch({
            username: 'Admin',
            role: 'Admin'
        });

        await expect(viewSystemUsersPage.resetBtn).toBeEnabled();
    });

    test("Should return matching users when searching with role and status",
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C107'
        });

        await viewSystemUsersPage.selectUserRole('Admin');
        await viewSystemUsersPage.selectStatus('Enabled');

        await viewSystemUsersPage.clickSearchBtn();

        await viewSystemUsersPage.expectSearchResults();

        await viewSystemUsersPage.verifyAllRowsMatch({
            role: 'Admin',
            status: 'Enabled'
        });
    });

    test("Should display all users after resetting the search filters",
    {
        tag: ['@regression', '@admin']
    },
    async ({ viewSystemUsersPage }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_case_id',
            description: 'C108'
        });

        await viewSystemUsersPage.enterUsername('Admin');
        await viewSystemUsersPage.selectUserRole('Admin');
        await viewSystemUsersPage.selectStatus('Enabled');

        await viewSystemUsersPage.clickSearchBtn();

        await viewSystemUsersPage.expectSearchResults();

        const filteredCount = await viewSystemUsersPage.tableRows.count();

        await viewSystemUsersPage.clickResetBtn();

        const defaultCount = await viewSystemUsersPage.tableRows.count();

        expect(defaultCount).toBeGreaterThan(filteredCount);
    });

});