import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/loginPage";
import userFixtures from "../fixtures/login.json";
import productFixtures from "../fixtures/products.json";
import {InventoryPage} from "../pages/inventoryPage";
import {CartPage} from "../pages/cartPage";

test.describe('Inventory', () => {
    test.beforeEach( async ({ page }) => {
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

    test('Should display product list correctly', async ({ page }) => {
        const inventory = new InventoryPage(page);

        const productsCount = await inventory.productsList.count();
        expect(productsCount).toBeGreaterThan(0);

        const productNames = await inventory.getProductsListItemsName();
        expect(productNames).toContain('Sauce Labs Backpack');
    });

    test('Should add multiple products to the cart and validate them', async ({page}) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addProductToCart([
            productFixtures.products.BACKPACK,
            productFixtures.products.ONESIE,
            productFixtures.products.BIKE_LIGHT
        ]);

        await test.step('Expect items in cart', async () => {
            await inventoryPage.validateCartBadge('3');
        })

        const cartPage = new CartPage(page)
        await cartPage.gotoCartPage();
        await expect(cartPage.listLabelsProducts).toHaveCount(3);
    })

    test('Should remove products from the cart and validate cart is empty', async ({page}) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addProductToCart([
            productFixtures.products.FLEECE_JACKET
        ]);

        await inventoryPage.removeProductFromCart([
            productFixtures.products.FLEECE_JACKET
        ]);

        await inventoryPage.openCart();

        const cartPage = new CartPage(page)
        await expect(cartPage.listLabelsProducts).toHaveCount(0);
    })

    test('Should sort products from A to Z', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.selectSortOption('az');

        const productNames = await inventoryPage.getProductsListItemsName();
        const sorted = [...productNames].sort();
        expect(productNames).toEqual(sorted);
    });

    test('Should sort products from Z to A', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.selectSortOption('za');

        const productNames = await inventoryPage.getProductsListItemsName();
        const sorted = [...productNames].sort().reverse();
        expect(productNames).toEqual(sorted);
    });

    test('Should sort products from low to high', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.selectSortOption('lohi');

        const productPrices = await inventoryPage.getProductsListItemsPrice();
        const sorted = [...productPrices].sort((a, b) => a - b);
        expect(productPrices).toEqual(sorted);
    })


    test('Should sort products from high to low', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.selectSortOption('hilo');

        const productPrices = await inventoryPage.getProductsListItemsPrice();
        const sorted = [...productPrices].sort((a, b) => b - a);
        expect(productPrices).toEqual(sorted);
    })
})