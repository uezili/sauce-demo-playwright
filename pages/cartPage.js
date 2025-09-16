export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.cartQty = page.locator('div[data-test="item-quantity"]');
        this.continueShoppingBtn = page.locator('button[data-test="continue-shopping"]');
        this.checkoutBtn = page.locator('button[data-test="checkout"]');
        this.removeButtons = page.locator('button[data-test="remove-sauce-labs-backpack"]');

        this.listLabelsProducts = this.page.locator('div[data-test="inventory-item-name"]');
    }

    async gotoCartPage() {
        await this.page.goto('/cart.html');
    }

    async getListProductsInCart() {
        return await this.listLabelsProducts.allTextContents();
    }
}