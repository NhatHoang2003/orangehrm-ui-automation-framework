// import { test ,expect } from "@playwright/test";

// import { LoginPage } from "../../../pages/LoginPage";
// import { HomePage } from "../../../pages/DashboardPage";
// import { UserListPage } from "../../../pages/admin/UserListPage";
// import { UserFormPage } from "../../../pages/admin/UserFormPage";

// import { ENV } from "../../../config/env";
// import { DataFactory } from "../../../utils/dataFactory";

// test.describe('End to End Admin full flow', () => {

//     let loginPage: LoginPage;
//     let homePage: HomePage;
//     let userListPage: UserListPage;
//     let userFormPage: UserFormPage;

//     test.beforeEach(async ({ page }) => {

//         loginPage = new LoginPage(page);

//         await loginPage.login(
//             ENV.ADMIN_USERNAME,
//             ENV.ADMIN_PASSWORD
//         );

//         homePage = new HomePage(page);
//         await homePage.clickSidebarMenuName('Admin');

//         userListPage = new UserListPage(page);
//     });

//     test('Create and verify a new user', async ({ page }) => {

//         await userListPage.clickAddBtn();

//         userFormPage = new UserFormPage(page);

//         const employeeName = 'Charles Carter';
//         const password = 'hoang123';
//         const username = DataFactory.generateUsername();

//         await userFormPage.selectUserRole('ESS');

//         const employeeSelected = await userFormPage.selectEmployeeName(employeeName);
//         expect(employeeSelected).toBeTruthy();

//         await userFormPage.selectStatus('Enabled');

//         await userFormPage.enterUsername(username);
//         await userFormPage.enterPassword(password);
//         await userFormPage.enterConfirmPassword(password);

//         await userFormPage.clickSaveBtn();
//         await userFormPage.waitForSuccessToast();

//         await expect(page).toHaveURL(
//             `${ENV.BASE_URL}${userListPage.adminViewSystemUsersPath}`
//         );

//         await userListPage.enterUsername(username);
//         await userListPage.selectUserRole('ESS');
//         await userListPage.enterEmployeeName(employeeName);
//         await userListPage.selectStatus('Enabled');

//         await userListPage.clickSearchBtn();

//         const count = await userListPage.verfifySearchResultCount();
//         expect(count).toBeGreaterThan(0);

//         // const texts = await userListPage.getSearchResultTexts();
//         // expect(texts.join(' ')).toContain(username);
//     }); 
// });