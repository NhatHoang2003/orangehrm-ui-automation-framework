// import { test } from '@playwright/test';

// import { LoginPage } from '../../../pages/LoginPage';
// import { HomePage } from '../../../pages/DashboardPage';

// import { ENV } from '../../../config/env';

// import { UserListPage } from '../../../pages/admin/UserListPage';
// import { UserFormPage } from '../../../pages/admin/UserFormPage';

// test.describe('Save System User Tests', () => {

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

//         await userListPage.clickAddBtn();

//         userFormPage = new UserFormPage(page);
//     });

//     const errorLocatorMap = {
//         userRole: () => userFormPage.userRoleError,

//         employeeName: () =>
//             userFormPage.employeeNameError,

//         status: () =>
//             userFormPage.statusError,

//         username: () =>
//             userFormPage.usernameError,

//         password: () =>
//             userFormPage.passwordError,

//         confirmPassword: () =>
//             userFormPage.confirmPasswordError,
//     };

// });