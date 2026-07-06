import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { ENV } from '../config/env';

export class LoginPage extends BasePage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    readonly loginError: Locator;
    readonly usernameError: Locator;
    readonly passwordError: Locator;

    readonly loginPath = '/web/index.php/auth/login';

    constructor(page: Page) {
        super(page);

        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');

        this.loginButton = page.getByRole('button', { name: 'Login' });

        this.loginError = page.locator(
            '.oxd-alert-content--error .oxd-alert-content-text'
        );

        this.usernameError = page.locator(
            '.oxd-input-group:has(input[name="username"]) .oxd-input-field-error-message'
        );

        this.passwordError = page.locator(
            '.oxd-input-group:has(input[name="password"]) .oxd-input-field-error-message'
        );
    }

    async gotoLoginPage(): Promise<void> {
        await this.goto(this.loginPath);

        await expect(this.page).toHaveURL(`${ENV.BASE_URL}${this.loginPath}`);
    }

    async fillUsername(username: string): Promise<void> {
        await this.fill(this.usernameInput, username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.fill(this.passwordInput, password);
    }

    async clickLogin(): Promise<void> {
        await expect(this.loginButton).toBeVisible();
        await expect(this.loginButton).toBeEnabled();
        
        await this.loginButton.press('Enter');
    }

    async submitLogin(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async login(username: string, password: string, navigate = true): Promise<void> {
        if (navigate) {
            await this.gotoLoginPage();
        }

        await this.submitLogin(username, password);
    }

    async expectOnLoginPage(): Promise<void> {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async expectLoginError(message: string): Promise<void> {
        await expect(this.loginError).toHaveText(message);
    }

    async expectUsernameError(message: string): Promise<void> {
        await expect(this.usernameError).toHaveText(message);
    }

    async expectPasswordError(message: string): Promise<void> {
        await expect(this.passwordError).toHaveText(message);
    }
}

