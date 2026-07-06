import { expect, Locator, Page } from '@playwright/test';

import { BasePage } from '../core/BasePage';

export class SaveSystemUsersPage extends BasePage {

    readonly addUserTitle: Locator;

    readonly userRoleDropdown: Locator;

    readonly userRoleOptions: Locator;

    readonly statusDropdown: Locator;

    readonly statusOptions: Locator;

    readonly employeeNameInput: Locator;

    readonly employeeNameSearchingResult: Locator;

    readonly usernameInput: Locator;

    readonly passwordInput: Locator;

    readonly confirmPasswordInput: Locator;

    readonly cancelBtn: Locator;

    readonly saveBtn: Locator;

    readonly successToast: Locator;

    readonly userRoleError: Locator;

    readonly employeeNameError: Locator;

    readonly statusError: Locator;

    readonly usernameError: Locator;

    readonly passwordError: Locator;

    readonly confirmPasswordError: Locator;

    constructor(page: Page) {

        super(page);

        this.addUserTitle = page.getByRole('heading', {
            name: 'Add User'
        });

        this.userRoleDropdown = page
            .locator('.oxd-input-group')
            .filter({
                hasText: 'User Role'
            })
            .locator('.oxd-select-text');

        this.userRoleOptions = page.locator(
            '.oxd-select-dropdown .oxd-select-option'
        );

        this.statusDropdown = page
            .locator('.oxd-input-group')
            .filter({
                hasText: 'Status'
            })
            .locator('.oxd-select-text');

        this.statusOptions = page.locator(
            '.oxd-select-dropdown .oxd-select-option'
        );

        this.employeeNameInput = page
            .locator('.oxd-input-group')
            .filter({
                hasText: 'Employee Name'
            })
            .locator('input');

        this.employeeNameSearchingResult =
            page.locator(
                'div[role="listbox"] .oxd-autocomplete-option'
            );

        this.usernameInput = page
            .locator('.oxd-input-group')
            .filter({
                hasText: 'Username'
            })
            .locator('input');

        this.passwordInput = page
            .locator('input[type="password"]')
            .first();

        this.confirmPasswordInput = page
            .locator('input[type="password"]')
            .nth(1);

        this.cancelBtn = page.getByRole(
            'button',
            {
                name: 'Cancel'
            }
        );

        this.saveBtn = page.locator(
            'button[type="submit"]'
        );

        this.successToast = page.locator(
            '.oxd-toast--success'
        );

        this.userRoleError = page
            .locator('.oxd-input-group')
            .filter({
                hasText: 'User Role'
            })
            .locator(
                '.oxd-input-field-error-message'
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

        this.statusError = page
            .locator('.oxd-input-group')
            .filter({
                hasText: 'Status'
            })
            .locator(
                '.oxd-input-field-error-message'
            );

        this.usernameError = page
            .locator('.oxd-input-group')
            .filter({
                hasText: 'Username'
            })
            .locator(
                '.oxd-input-field-error-message'
            );

        this.passwordError = page
            .locator('.oxd-input-group')
            .filter({
                hasText: 'Password'
            })
            .filter({
                hasNotText: 'Confirm Password'
            })
            .locator(
                '.oxd-input-field-error-message'
            );

        this.confirmPasswordError = page
            .locator('.oxd-input-group')
            .filter({
                hasText: 'Confirm Password'
            })
            .locator(
                '.oxd-input-field-error-message'
            );
    }

    async selectDropdownOption(
        dropdown: Locator,
        options: Locator,
        value: string
    ): Promise<void> {

        await dropdown.click();

        await options
            .filter({
                hasText: value
            })
            .first()
            .click();
    }

    async selectUserRole(role: string): Promise<void> {

        await this.selectDropdownOption(
            this.userRoleDropdown,
            this.userRoleOptions,
            role
        );
    }

    async selectStatus(status: string): Promise<void> {

        await this.selectDropdownOption(
            this.statusDropdown,
            this.statusOptions,
            status
        );
    }

    async selectEmployeeName(employeeName: string): Promise<boolean> {

        await this.employeeNameInput.fill(employeeName);

        const firstResult = this.employeeNameSearchingResult.first();

        await expect(firstResult).not.toHaveText('Searching....', { timeout: 5000 });

        const actualText = await firstResult.textContent();

        if (actualText?.includes('No Records Found')) {

            await expect(firstResult).toHaveText('No Records Found');

            await firstResult.click();
            return false;
        }

        await expect(firstResult).toHaveText(employeeName);

        await firstResult.click();

        return true;
    }

    async enterUsername(username: string): Promise<void> {

        await this.usernameInput.fill(
            username
        );
    }

    async enterPassword(password: string): Promise<void> {

        await this.passwordInput.fill(
            password
        );
    }

    async enterConfirmPassword(confirmPassword: string): Promise<void> {

        await this.confirmPasswordInput.fill(
            confirmPassword
        );
    }

    async clickCancelBtn(): Promise<void> {

        await this.cancelBtn.click();
    }

    async clickSaveBtn(): Promise<void> {

        await this.saveBtn.click();
    }

    async verifyForSuccessToast(): Promise<void> {
        await this.successToast.waitFor({ state: 'visible' });
    }
}
