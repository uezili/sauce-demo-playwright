export class CartPage {
    constructor(page) {
        this.page = page;
        this.listLabelsProducts = this.page.locator('div[data-test="inventory-item-name"]');
    }

    async gotoCartPage() {
        await this.page.goto('/cart.html');
    }

    async getListProductsInCart() {
        await this.listLabelsProducts.allTextContents();
    }
}