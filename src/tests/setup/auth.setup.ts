import { expect, test } from '../../fixtures/PagesFixture';
import { ENV } from '../../config/env';

test('C110 Should login and save authenticated session',
    {
        tag: ['@auth', '@smoke']
    },  
    async ({
        page,
        browserName,
        loginPage
    }) => {
        await loginPage.login(
            ENV.ADMIN_USERNAME,
            ENV.ADMIN_PASSWORD
        );

        await expect(page).toHaveURL(/.*dashboard/);

        await page.waitForLoadState('networkidle');

        await page.context().storageState({ path: `playwright/.auth/${browserName}.json` });
});