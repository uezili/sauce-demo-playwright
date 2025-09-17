import { LoginPage } from '../pages/loginPage';
import {test, expect} from '@playwright/test';
import usersFixtures from '../fixtures/login.json';

test.describe('Login', () => {
    let loginPage
    test.beforeEach( async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        console.log(`Finalized "${testInfo.title}" test with status: ${testInfo.status}`);
        if (testInfo.status === 'failed') {
            await page.screenshot({ path: `screenshots/failed-${testInfo.title}.png` });
        }
    });

    test('Should login successfully with valid credentials', async () => {

        await loginPage.gotoLoginPage();
        await loginPage.login(usersFixtures.users.STANDARD_USER, usersFixtures.PASSWORD);

        await expect(loginPage.swagLabsLogo).toHaveText('Swag Labs');
        await expect(loginPage.swagLabsLogo).toBeVisible();
    });

    test('Should not login with invalid credentials and display error message', async () => {

        await loginPage.gotoLoginPage();
        await loginPage.login("invalidUser", 'invalidPassword');

        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

});