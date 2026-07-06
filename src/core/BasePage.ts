import { expect, Locator, Page } from '@playwright/test';

import { ENV } from '../config/env';

export class BasePage {

    constructor(protected readonly page: Page) {}
    
    async goto(path: string): Promise<void> {
    const url = `${ENV.BASE_URL}${path}`;

    if (this.page.url().includes(path)) {
        return;
    }

    await this.page.goto(url, {
        waitUntil: 'domcontentloaded'
    });
}

    async click(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();

        await locator.click();
    }

    async fill(
        locator: Locator,
        value: string
    ): Promise<void> {

        await expect(locator).toBeVisible();

        await locator.fill(value);
    }

    async getText(locator: Locator): Promise<string> {

        return (
            await locator.textContent()
        )?.trim() || '';
    }

    async getTexts(locator: Locator): Promise<string[]> {

        return (
            await locator.allTextContents()
        ).map(text => text.trim());
    }

    async isVisible(locator: Locator): Promise<boolean> {

        return await locator.isVisible();
    }

    async check(locator: Locator): Promise<void> {

        await locator.check();
    }

    async uncheck(locator: Locator): Promise<void> {

        await locator.uncheck();
    }

    async selectByText(
        locator: Locator,
        text: string
    ): Promise<void> {

        await locator.selectOption({
            label: text
        });
    }

    async uploadFile(
        locator: Locator,
        filePath: string
    ): Promise<void> {

        await locator.setInputFiles(filePath);
    }

    async press(
        locator: Locator,
        key: string
    ): Promise<void> {

        await locator.press(key);
    }

    async hover(locator: Locator): Promise<void> {

        await locator.hover();
    }

    async waitForVisible(locator: Locator): Promise<void> {

        await locator.waitFor({
            state: 'visible'
        });
    }
}