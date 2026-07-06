import { ENV } from '../../../config/env';
import { expect, test } from '../../../fixtures/HooksFixture';

test.describe('Login Smoke Tests', () => {

    test('Should login successfully with valid credentials',
        {
            tag: ['@smoke', '@login']
        }, 
        async ({ loginPage, page }, testInfo) => {

        testInfo.annotations.push({ type: 'testrail_case_id', description: 'C54' });
        
        await loginPage.login(  
            ENV.ADMIN_USERNAME,
            ENV.ADMIN_PASSWORD
        );

        await expect(page).toHaveURL(/.*dashboard/);
    });
});