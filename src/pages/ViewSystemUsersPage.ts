import { expect, Locator, Page } from '@playwright/test';

import { BasePage } from '../core/BasePage';

export class ViewSystemUsersPage extends BasePage {

    readonly systemUsersTitle: Locator;

    readonly usernameInput: Locator;

    readonly userRoleDropdown: Locator;
    readonly userRoleOptions: Locator;

    readonly employeeNameInput: Locator;
    readonly employeeNameSearchingResult: Locator;

    readonly statusDropdown: Locator;
    readonly statusOptions: Locator;

    readonly searchBtn: Locator;
    readonly resetBtn: Locator;

    readonly addBtn: Locator;

    readonly employeeNameError: Locator;

    readonly tableRows: Locator;

    readonly loaderTableRow: Locator;

    readonly noRecordsToast: Locator;
    readonly failureDeleteToast: Locator;

    readonly deletableCheckboxInputs: Locator;
    readonly deletableCheckboxBoxes: Locator;
    readonly deleteSelectedBtn: Locator;
    readonly successDeleteToast: Locator;
    readonly cancelDeleteBtn: Locator;
    readonly confirmDeleteBtn: Locator;

    readonly protectedAdminRow: Locator;
    readonly protectedAdminDeleteIcon: Locator;

    readonly adminEditIcon: Locator;
    readonly deletableUserRows: Locator;
    readonly firstDeletableUserDeleteIcon: Locator;

    constructor(page: Page) {

        super(page);

        this.systemUsersTitle = page.getByRole('heading', {
            name: 'System Users'
        });

        this.usernameInput = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Username' })
            .locator('input');

        this.employeeNameInput = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Name' })
            .locator('input');

        this.employeeNameSearchingResult = page.locator('div[role="listbox"] .oxd-autocomplete-option');

        this.userRoleDropdown = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'User Role' })
            .locator('.oxd-select-text');

        this.userRoleOptions = page.locator('.oxd-select-dropdown .oxd-select-option');

        this.statusDropdown = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Status' })
            .locator('.oxd-select-text');

        this.statusOptions = page.locator('.oxd-select-dropdown .oxd-select-option');

        this.searchBtn = page
            .locator('.oxd-form-actions')
            .filter({ hasText: 'Search' })
            .locator('button[type="submit"]');

        this.resetBtn = page
            .locator('.oxd-form-actions')
            .filter({ hasText: 'Reset' })
            .locator('button[type="button"]');

        this.addBtn = page.getByRole(
            'button',
            {
                name: 'Add'
            }
        );

        this.employeeNameError = page
            .locator('.oxd-input-group')
            .filter({
                has: page.getByText(
                    'Employee Name'
                )
            })
            .locator(
                '.oxd-input-field-error-message'
            );

        this.tableRows = page.locator('.oxd-table-body .oxd-table-row');

        this.loaderTableRow = page.locator('.oxd-table-loader');

        this.noRecordsToast = page.locator('.oxd-toast')
            .filter({ hasText: 'No Records Found' });

        this.deletableCheckboxInputs = this.page.locator(
            '.oxd-table-body .oxd-table-row input[type="checkbox"][value]'
        );

        this.deletableCheckboxBoxes = this.page.locator(
          '.oxd-table-body .oxd-table-row:has(input[type="checkbox"][value]) .oxd-checkbox-input'
        );

        this.deleteSelectedBtn = page.getByRole('button', {
            name: 'Delete Selected'
        });

        this.confirmDeleteBtn = page.getByRole('button', {
            name: 'Yes, Delete'
        });

        this.cancelDeleteBtn = page.getByRole('button', {
            name: 'No, Cancel'
        });

        this.successDeleteToast = page
            .locator('.oxd-toast')
            .filter({ hasText: 'Successfully Deleted' });

        this.failureDeleteToast = page
            .locator('.oxd-toast')
            .filter({ hasText: 'Cannot be deleted' });

        this.protectedAdminRow = page
            .locator('.oxd-table-card')
            .filter({ has: page.locator('.oxd-table-card-cell-hidden') });

        this.protectedAdminDeleteIcon = this.protectedAdminRow.locator(
            'button:has(i.bi-trash)'
        );

        this.adminEditIcon = this.protectedAdminRow.locator(
            'button:has(i.bi-pencil-fill)'
        );

        this.deletableUserRows = page
            .locator('.oxd-table-card')
            .filter({
                has: page.locator('input[type="checkbox"][value]')
        });

        this.firstDeletableUserDeleteIcon = this.deletableUserRows
            .first()
            .locator('button:has(i.bi-trash)');

    }

    async enterUsername(username: string): Promise<void> {

        await this.fill(this.usernameInput, username);
    }

    async selectUserRole(role: string): Promise<void> {
        await this.click(this.userRoleDropdown);
        await this.click(this.userRoleOptions.filter({ hasText: role }));
    }

    async enterEmployeeName(name: string) {
        await this.employeeNameInput.fill(name);
    }

    async selectEmployee(name: string) {
        await this.employeeNameSearchingResult
            .filter({ hasText: name })
            .click();
    }

    async expectNoEmployeeFound() {
        await expect(this.page.getByText('No Records Found')).toBeVisible();
    }

    async selectStatus(status: string): Promise<void> {

        await this.click(this.statusDropdown);
        await this.click(this.statusOptions.filter({ hasText: status }));
    }

    async clickSearchBtn(): Promise<void> {
        await this.searchBtn.click();
        await this.loaderTableRow.waitFor({ state: 'hidden' });
    }

    async expectSearchResults(): Promise<void> {
        await expect(this.tableRows.first()).toBeVisible();
    }

    async clickResetBtn(): Promise<void> {
        await this.resetBtn.click();
        await this.loaderTableRow.waitFor({ state: 'hidden' });

    }

    async clickAddBtn(): Promise<void> {

        await this.addBtn.click();
    }

    async getSearchResultCount(): Promise<number> {
        return await this.tableRows.count();
    }

    async verifyNoRecordsFound(): Promise<void> {
        await this.noRecordsToast.waitFor({ state: 'visible' });
    }

    async verifyCannotDeleteUser(): Promise<void> {
        await this.failureDeleteToast.waitFor({ state: 'visible' });
    }

    getRowByUsername(username: string): Locator {
        return this.tableRows.filter({ hasText: username });
    }

    getCheckboxInputByUsername(username: string): Locator {
        return this.getRowByUsername(username)
            .locator('input[type="checkbox"]');
    }

    getCheckboxByUsername(username: string): Locator {
        return this.getRowByUsername(username)
            .locator('.oxd-checkbox-input');
    }

    async selectFirstDeletableUser(): Promise<void> {
        await this.deletableCheckboxBoxes.first().click();
    }

    async clickDeleteSelectedBtn(): Promise<void> {
        await this.deleteSelectedBtn.click();
    }

    async clickConfirmDeleteBtn(): Promise<void> {
        await this.confirmDeleteBtn.click();
    }

    async clickCancelDeleteBtn(): Promise<void> {
        await this.cancelDeleteBtn.click();
    }

    async clickProtectedAdminDeleteIcon(): Promise<void> {
        await this.protectedAdminDeleteIcon.click();
    }

    async clickFirstDeletableUserDeleteIcon(): Promise<void> {
        await this.firstDeletableUserDeleteIcon.click();
    }

    async clickAdminEditIcon(): Promise<void> {
        await this.adminEditIcon.click();
    }

    private async verifyRow(
        username: string,
        role: string,
        // employee: string,
        status: string
    ): Promise<void> {

        const row = this.getRowByUsername(username);

        await expect(row).toBeVisible();

        await expect(row).toContainText(role);
        // await expect(row).toContainText(employee);
        await expect(row).toContainText(status);
    }

    async verifyUserRow(
        username: string,
        role: string,
        // employee: string,
        status: string
    ) {
        await this.verifyRow(username, role, status);
    }

    async verifyAllRowsMatch({
        username,
        role,
        // employee,
        status
    }: {
        username?: string;
        role?: string;
        // employee?: string;
        status?: string;
    }): Promise<void> {

        await expect(this.page.locator('.orangehrm-horizontal-padding').getByText(/Record.*Found/)).toBeVisible();

        await expect(this.tableRows.first()).toBeVisible();

        const count = await this.tableRows.count();
        expect(count).toBeGreaterThan(0);
    
        if (username) {
            const targetRow = this.tableRows.filter({ hasText: username });

            await expect(targetRow.first()).toBeVisible();

            if (role) await expect(targetRow).toContainText(role);
            // if (employee) await expect(targetRow).toContainText(employee);
            if (status) await expect(targetRow).toContainText(status);
        } else {
            const count = await this.tableRows.count();
            
            for (let i = 0; i < count; i++) {
                const row = this.tableRows.nth(i);
                if (role) await expect(row).toContainText(role);
                // if (employee) await expect(row).toContainText(employee);
                if (status) await expect(row).toContainText(status);
            }
        }
    }
}