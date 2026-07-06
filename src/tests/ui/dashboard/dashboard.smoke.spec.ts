import { SIDEBAR } from '../../../constants/sidebar.constants';
import { expect, test } from '../../../fixtures/HooksFixture';

test.describe("Dashboard Page Tests", () => {

    test.beforeEach(async ({ dashboardPage }) => {
        await dashboardPage.goto(dashboardPage.dashboardPath);

        await expect(dashboardPage.clientBrandBanner).toBeVisible();
    })

    test("Should open Dashboard successfully",
        {
            tag: ['@smoke', '@dashboard']
        },
        async ({ page }, testInfo) => {

            testInfo.annotations.push({ type: 'testrail_case_id', description: 'C62' });

            await expect(page).toHaveURL(/.*dashboard/);
        }
    );
    
    test("Should display sidebar menu", 
        {
            tag: ['@smoke', '@dashboard']
        },
        async ({ dashboardPage }, testInfo) => {

            testInfo.annotations.push({ type: 'testrail_case_id', description: 'C63' });

            const actualMenus =
                await dashboardPage.getSideBarMenuNames();
            
            expect(actualMenus)
                .toEqual(Object.values(SIDEBAR));
            
            console.log(
                "Verify sidebar menus:",
                actualMenus
            );
        }
    );

    test("Should logout successfully",
        {
            tag: ['@smoke', '@dashboard']
        },
        async ({ dashboardPage, page}, testInfo) => {

            testInfo.annotations.push({ type: 'testrail_case_id', description: 'C88' });

            await dashboardPage.logout();
            await expect(page).toHaveURL(/.*login/);
        }
    );
}); 