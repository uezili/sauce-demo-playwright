export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationMessage = page.locator('[data-test="complete-header"]');
        this.errorMessages = page.locator('[data-test="error"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.total = page.locator('[data-test="total-label"]');
    }

    async gotoCheckoutPage() {
        await this.page.goto('/checkout-step-one.html');
    }

    async fillCheckoutFormFields(firstName, lastName, postalCode) {

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
    }

    async continueCheckout() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    // async goToCheckoutWithProduct(product, inventoryPage, cartPage) {
    //     await inventoryPage.addProductToCart([product]);
    //     await cartPage.gotoCartPage();
    //     await cartPage.clickCheckout();
    // }


    async getProductItemsTax() {
        const taxs = await this.tax.first().textContent();
        return parseFloat(taxs.replace('Tax: $', '').trim());
    }

    async getProductItemsTotalPrice() {
        const total = await this.total.first().textContent();
        return total.replace('Total: $', '').trim();
    }
}