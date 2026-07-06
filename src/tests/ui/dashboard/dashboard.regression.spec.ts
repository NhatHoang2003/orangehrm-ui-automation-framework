import { SIDEBAR_SEARCH_TEST_CASES, SIDEBAR_CLICK_TEST_CASES } from '../../../data/dashboard/dashboard.data';
import { expect, test } from '../../../fixtures/HooksFixture';

test.describe("Dashboard Page Tests", () => {

    test.beforeEach(async ({ dashboardPage }) => {
        await dashboardPage.goto(dashboardPage.dashboardPath);

        await expect(dashboardPage.clientBrandBanner).toBeVisible();
    })

    SIDEBAR_SEARCH_TEST_CASES.forEach((testCase) => {
        test(testCase.title,
            {
                tag: ['@regression', '@dashboard']
            },
            async ({ dashboardPage }, testInfo) => {
                
                testInfo.annotations.push({ type: 'testrail_case_id', description: testCase.caseId });
                
                const searchResults = await dashboardPage.searchSidebarMenu(testCase.menu);
                
                await expect(searchResults.first()).toBeVisible();
                await expect(searchResults.first()).toHaveText(testCase.menu);
                
                console.log(`Searched for "${testCase.menu}" and found:`, await searchResults.allInnerTexts());
        })
    })  

    SIDEBAR_CLICK_TEST_CASES.forEach((testCase) => {
        test(testCase.title,
            {
                tag: ['@regression', '@dashboard']
            },
            async ({ dashboardPage, page }, testInfo) => {
                testInfo.annotations.push({ type: 'testrail_case_id', description: testCase.caseId });

                await dashboardPage.clickSidebarMenu(testCase.menu);
                await expect(page).toHaveURL(testCase.expectedUrl);
                console.log(`Clicked on "${testCase.menu}" and navigated to:`, page.url());
        })
    })
})