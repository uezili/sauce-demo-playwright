import { LoginPage } from '../pages/loginPage';
import {test, expect} from '@playwright/test';
import usersFixtures from '../fixtures/login.json';

test.describe('Login', () => {

    test.beforeEach( async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
    })

    test.afterEach(async ({ page }, testInfo) => {
        console.log(`Finalized "${testInfo.title}" test with status: ${testInfo.status}`);
        if (testInfo.status === 'failed') {
            await page.screenshot({ path: `screenshots/failed-${testInfo.title}.png` });
        }
    });

    test('should login ', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.gotoLoginPage();
        await loginPage.login(usersFixtures.users.standard_user, usersFixtures.password);

        await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
        await expect(page.locator('.app_logo')).toBeVisible();
    });

    test('should login with invalid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.gotoLoginPage();
        await loginPage.login("invalidUser", 'invalidPassword');

        await expect(page.locator(loginPage.errorMessage())).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

});