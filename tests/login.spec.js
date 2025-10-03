import { LoginPage } from '../pages/loginPage';
import { test, expect } from '@playwright/test';
import usersFixtures from '../fixtures/login.json';

test.describe('Login', () => {
	test.use({ storageState: { cookies: [], origins: [] } });

	let loginPage;
	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
	});

	test('Should login successfully with valid credentials', async () => {
		await loginPage.gotoLoginPage();
		await loginPage.login(
			usersFixtures.users.STANDARD_USER,
			usersFixtures.PASSWORD
		);

		await expect(loginPage.swagLabsLogo).toHaveText('Swag Labs');
		await expect(loginPage.swagLabsLogo).toBeVisible();
	});

	test('Should not login with invalid credentials and display error message', async () => {
		await loginPage.gotoLoginPage();
		await loginPage.login(
			usersFixtures.users.INVALID_USER,
			usersFixtures.INVALID_PASSWORD
		);

		await expect(loginPage.errorMessage).toHaveText(
			usersFixtures.ERROR_MESSAGES.INVALID_CREDENTIALS
		);
	});
});
