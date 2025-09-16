import {CartPage} from "../pages/cartPage";
import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/loginPage";
import userFixtures from "../fixtures/login.json";
import productFixtures from "../fixtures/products.json";
import {InventoryPage} from "../pages/inventoryPage";

test.describe('Cart', () => {
    let cartPage
    let inventoryPage

    test.beforeEach( async ({ page }) => {
        cartPage = new CartPage(page);
        inventoryPage = new InventoryPage(page);

        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(userFixtures.users.STANDARD_USER, userFixtures.PASSWORD);
    })

    test.afterEach(async ({ page }, testInfo) => {
        console.log(`Finalized "${testInfo.title}" test with status: ${testInfo.status}`);
        if (testInfo.status === 'failed') {
            await page.screenshot({ path: `screenshots/failed-${testInfo.title}.png` });
        }
    });

    test('Should display empty cart message correctly', async ({ page }) => {
        await cartPage.gotoCartPage();
        expect(await cartPage.getCartItemsCount()).toBe(0);
    });

    test('Should allow user to continue shopping', async ({ page }) => {

        await cartPage.gotoCartPage();
        await cartPage.clickContinueShopping();
        await expect(page).toHaveURL("/inventory.html");
    });

    test('Should allow user to proceed to checkout', async ({ page }) => {
        await inventoryPage.addProductToCart(
            [productFixtures.products.BOLT_TSHIRT]
        );
        await cartPage.gotoCartPage();
        await cartPage.clickCheckout();
        await expect(page).toHaveURL("/checkout-step-one.html");
    });

    test('Should keep products in cart after navigation', async ({ page }) => {
        await inventoryPage.addProductToCart(
            [productFixtures.products.BOLT_TSHIRT]
        );
        await cartPage.open();
        await cartPage.clickContinueShopping();
        await cartPage.open();
        expect(await cartPage.getProductsListItemsName()).toBeGreaterThan(0);
    });


    test('Should remove product from the cart', async ({ page }) => {
        await inventoryPage.addProductToCart([
            productFixtures.products.BACKPACK,
        ]);
        await cartPage.gotoCartPage();
        await cartPage.removeProductFromCart();
        expect(await cartPage.getCartItemsCount()).toBe(0);
    });
})
