import { Locator, Page } from '@playwright/test';
import { join } from 'node:path';

import { BasePage } from '../core/BasePage';

export class MyInfoPage extends BasePage {

    readonly avatarWrapper: Locator;
    readonly uploadBtn: Locator;
    readonly fileInput: Locator;

    readonly myInfoPath = '/web/index.php/pim/viewPersonalDetails/empNumber/7';

    constructor(page: Page) {
        super(page);

        this.avatarWrapper = page.locator('.orangehrm-edit-employee-image');

        this.uploadBtn = page.locator(
            'button.employee-image-action'
        );

        this.fileInput = page.locator(
            "input[type='file']"
        );
    }

    async clickAvatarWrapper(): Promise<void> {
        await this.avatarWrapper.click();
    }

    async clickUploadBtn(): Promise<void> {
        await this.uploadBtn.click();
    }

    async uploadAvatarImage(fileName: string): Promise<void> {

        const filePath = join(
            __dirname,
            '..',
            'data',
            'assets',
            fileName
        );

        await this.fileInput.setInputFiles(filePath);
    }
}