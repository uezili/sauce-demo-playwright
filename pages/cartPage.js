export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item_label');
        this.continueShoppingBtn = page.locator('button[data-test="continue-shopping"]');
        this.checkoutBtn = page.locator('button[data-test="checkout"]');
        this.removeButtons = page.locator('button[data-test="remove-sauce-labs-backpack"]');
        this.cartItemsPrice = this.page.locator('[data-test="inventory-item-price"]');

        this.listLabelsProducts = this.page.locator('div[data-test="inventory-item-name"]');
    }

    async gotoCartPage() {
        await this.page.goto('/cart.html');
    }

    async clickCheckout(){
        await this.checkoutBtn.click();
    };

    async clickContinueShopping(){
        await this.continueShoppingBtn.click();
    };

    async getCartItemsCount(){
        return await this.cartItems.count();
    };

    async removeProductFromCart(){
        await this.removeButtons.click();
    }

    async getProductsListItemsPriceInCart(){
        const prices = await this.cartItemsPrice.allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));

    }

}