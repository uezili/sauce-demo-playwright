import { test, expect } from '@playwright/test'
import {LoginPage} from "../pages/loginPage";
import userFixtures from "../fixtures/login.json";
import {InventoryPage} from "../pages/inventoryPage";
import {CartPage} from "../pages/cartPage";
import {CheckoutPage} from "../pages/checkoutPage"
import productFixtures from "../fixtures/products.json";
import {CheckoutFormFactory} from "../utils/helpers";


test.describe('Checkout', () => {
    let loginPage
    let inventoryPage
    let cartPage
    let checkoutPage
    const formData = CheckoutFormFactory.fillCheckoutForm();

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(userFixtures.users.STANDARD_USER, userFixtures.PASSWORD);

        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

    })

    test.afterEach(async ({ page }, testInfo) => {
        console.log(`Finalized "${testInfo.title}" test with status: ${testInfo.status}`);
    });

    test('Should complete checkout with valid customer information', async () => {

        await inventoryPage.addProductToCart(
            [productFixtures.products.BOLT_TSHIRT]
            );

        await cartPage.gotoCartPage();
        await cartPage.clickCheckout();

        await checkoutPage.fillCheckoutFormFields(formData.firstName, formData.lastName, formData.postalCode);
        await checkoutPage.finishCheckout();

        await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
    });

    test('Should allow cancel checkout and return to cart page', async ({page}) => {
        await inventoryPage.addProductToCart(
            [productFixtures.products.BOLT_TSHIRT]
            );
        await cartPage.gotoCartPage();
        await cartPage.clickCheckout();

        await checkoutPage.cancelCheckout();

        await expect(page).toHaveURL('/cart.html');
    })

    test('Should block checkout when form fields are empty', async () => {
        await inventoryPage.addProductToCart(
            [productFixtures.products.BOLT_TSHIRT]
            );
        await cartPage.gotoCartPage();
        await cartPage.clickCheckout();
        await checkoutPage.continueCheckout();
        await expect(checkoutPage.errorMessages).toHaveText('Error: First Name is required');
    })

    test('Should block checkout when last name is empty', async () => {

        await inventoryPage.addProductToCart(
            [productFixtures.products.BOLT_TSHIRT]
            );

        await cartPage.gotoCartPage();
        await cartPage.clickCheckout();

        await checkoutPage.fillCheckoutFormFields(formData.firstName, "", formData.postalCode);
        await checkoutPage.continueCheckout();

        await expect(checkoutPage.errorMessages).toHaveText('Error: Last Name is required');
    })

    test('Should block checkout when postal code is empty', async () => {

        await inventoryPage.addProductToCart(
            [productFixtures.products.BOLT_TSHIRT]
        );

        await cartPage.gotoCartPage();
        await cartPage.clickCheckout();

        await checkoutPage.fillCheckoutFormFields(formData.firstName, formData.lastName, "");
        await checkoutPage.continueCheckout();

        await expect(checkoutPage.errorMessages).toHaveText('Error: Postal Code is required');
    })

    test('Should calculate total price including tax correctly ', async () => {

        await inventoryPage.addProductToCart([
            productFixtures.products.BOLT_TSHIRT,
            productFixtures.products.BIKE_LIGHT,]
        );

        await cartPage.gotoCartPage();
        const price = await cartPage.getProductsListItemsPriceInCart()
        const sumPrice = price.reduce((a, b) => a + b, 0);
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutFormFields(formData.firstName, formData.lastName, formData.postalCode);
        const tax = await checkoutPage.getProductItemsTax();
        const total = await checkoutPage.getProductItemsTotalPrice();

        await expect(await checkoutPage.getProductItemsTotalPrice()).toEqual((sumPrice + tax).toFixed(2));
    })
})