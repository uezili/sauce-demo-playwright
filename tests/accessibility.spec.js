import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import { LoginPage } from '../pages/loginPage';
import usersFixtures from '../fixtures/login.json';

test.describe('Accessibility (a11y)', () => {
  test('Login page should have no critical a11y violations', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();

    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
      includedImpacts: ['critical']
    });
  });

  test('Inventory page should have no critical a11y violations after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(usersFixtures.users.STANDARD_USER, usersFixtures.PASSWORD);

    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
      includedImpacts: ['critical']
    });
  });
});


