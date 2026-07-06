import { loginRegressionData } from '../../../data/login/login.data';
import { expect, test } from '../../../fixtures/HooksFixture';

test.describe('Login Regression Tests - Data Driven',
    {
        tag: ['@regression', '@login']
    },
    () => {

    for (const data of loginRegressionData) {

        test(data.testName, async ({ loginPage }) => {

            const errorLocatorMap = {
                username: loginPage.usernameError,
                password: loginPage.passwordError,
                login: loginPage.loginError,
            };

            await loginPage.login(
                data.username,
                data.password
            );

            for (const error of data.expectedErrors!) {
                await expect(
                    errorLocatorMap[error.field]
                ).toHaveText(error.text);
            }
        });
    }
});