import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/loginPage";
import userFixtures from "../fixtures/login.json";
import productFixtures from "../fixtures/products.json";
import {InventoryPage} from "../pages/inventoryPage";
import {CartPage} from "../pages/cartPage";

test.describe('Inventory', () => {
    let loginPage
    let inventoryPage
    let cartPage
    test.beforeEach( async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(userFixtures.users.STANDARD_USER, userFixtures.PASSWORD);

        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
    })

    test.afterEach(async ({ page }, testInfo) => {
        console.log(`Finalized "${testInfo.title}" test with status: ${testInfo.status}`);
    });

    test('Should display product list correctly', async () => {

        const productsCount = await inventoryPage.productsList.count();
        expect(productsCount).toBeGreaterThan(0);

        const productNames = await inventoryPage.getProductsListItemsName();
        expect(productNames).toContain('Sauce Labs Backpack');
    });

    test('Should add multiple products to the cart and validate them', async () => {
        await inventoryPage.addProductToCart([
            productFixtures.products.BACKPACK,
            productFixtures.products.ONESIE,
            productFixtures.products.BIKE_LIGHT
        ]);

        await test.step('Expect items in cart', async () => {
            await inventoryPage.validateCartBadge('3');
        })

        await cartPage.gotoCartPage();
        await expect(cartPage.listLabelsProducts).toHaveCount(3);
    })

    test('Should remove products from the cart and validate cart is empty', async () => {
        await inventoryPage.addProductToCart([
            productFixtures.products.FLEECE_JACKET
        ]);

        await inventoryPage.removeProductFromCart([
            productFixtures.products.FLEECE_JACKET
        ]);

        await inventoryPage.openCart();

        await expect(cartPage.listLabelsProducts).toHaveCount(0);
    })

    test('Should sort products from A to Z', async () => {

        await inventoryPage.selectSortOption('az');

        const productNames = await inventoryPage.getProductsListItemsName();
        const sorted = [...productNames].sort();
        expect(productNames).toEqual(sorted);
    });

    test('Should sort products from Z to A', async () => {

        await inventoryPage.selectSortOption('za');

        const productNames = await inventoryPage.getProductsListItemsName();
        const sorted = [...productNames].sort().reverse();
        expect(productNames).toEqual(sorted);
    });

    test('Should sort products from low to high', async () => {
        await inventoryPage.selectSortOption('lohi');

        const productPrices = await inventoryPage.getProductsListItemsPrice();
        const sorted = [...productPrices].sort((a, b) => a - b);
        expect(productPrices).toEqual(sorted);
    })


    test('Should sort products from high to low', async () => {
        await inventoryPage.selectSortOption('hilo');

        const productPrices = await inventoryPage.getProductsListItemsPrice();
        const sorted = [...productPrices].sort((a, b) => b - a);
        expect(productPrices).toEqual(sorted);
    })
})