// src/fixtures/HooksFixture.ts
import { randomUUID } from 'crypto';
import { test as base, expect } from './PagesFixture';

export const test = base;
export { expect };

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === testInfo.expectedStatus) {
        console.log(`Test "${testInfo.title}" passed as expected.`);
        return;
    }

    console.warn(`Test "${testInfo.title}" failed unexpectedly. Status: ${testInfo.status}`);

    const screenshotPath =
        `screenshots/${testInfo.title.replace(/[^\w-]+/g, '_')}_${randomUUID()}.png`;

    await page.screenshot({
        path: screenshotPath,
        fullPage: true
    });

    await testInfo.attach('screenshot', {
        path: screenshotPath,
        contentType: 'image/png'
    });

    console.log(`Screenshot captured: ${screenshotPath}`);
});