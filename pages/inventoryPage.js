import {expect} from "@playwright/test";

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.productsList = this.page.locator('div[data-test="inventory-list"]');
        this.productsListItemsName = this.page.locator('div[data-test="inventory-item-name"]');
        this.price = this.page.locator('div[data-test="inventory-item-price"]');
        this.cartBadge = this.page.locator('span[data-test="shopping-cart-badge"]');
        this.cartLink = this.page.locator('a[data-test="shopping-cart-link"]');
        this.addButtons = {
            backpack: page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]'),
            bikeLight: page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]'),
            boltTShirt: page.locator('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'),
            fleeceJacket: page.locator('button[data-test="add-to-cart-sauce-labs-fleece-jacket"]'),
            onesie: page.locator('button[data-test="add-to-cart-sauce-labs-onesie"]'),
            tshirtRed: page.locator('button[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'),
        };
        this.removeButtons = {
            backpack: page.locator('button[data-test="remove-sauce-labs-backpack"]'),
            bikeLight: page.locator('button[data-test="remove-sauce-labs-bike-light"]'),
            boltTShirt: page.locator('button[data-test="remove-sauce-labs-bolt-t-shirt"]'),
            fleeceJacket: page.locator('button[data-test="remove-sauce-labs-fleece-jacket"]'),
            onesie: page.locator('button[data-test="remove-sauce-labs-onesie"]'),
            tshirtRed: page.locator('button[data-test="remove-test.allthethings()-t-shirt-(red)"]'),
        };
    }

    async addProductToCart(products = []) {
        if (products.length === 0) {
            throw new Error("Need to pass at least one product to add to cart!");
        }
        for (const product of products) {
            if (this.addButtons[product]) {
                await this.addButtons[product].click();
            } else {
                throw new Error(`Product "${product}" not found!`);
            }
        }
    }

    async removeProductFromCart(products = []) {
        if (products.length === 0) {
            throw new Error("Need to pass at least one product to add to cart!");
        }
        for (const product of products) {
            if (this.removeButtons[product]) {
                await this.removeButtons[product].click();
            } else {
                throw new Error(`Product "${product}" not found!`);
            }
        }
    }

    async validateCartBadge(expectedCount) {
        if (expectedCount === 0) {
            await expect(this.cartBadge).toHaveCount(0);
        } else {
            await expect(this.cartBadge).toHaveText(String(expectedCount));
        }
    }

    async getProductsListItemsName() {
        return await this.productsListItemsName.allTextContents();
    }

    async getProductsListItemsPrice() {
        const prices = await this.price.allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    async openCart() {
        await this.cartLink.click();
    }

    async selectSortOption(option) {
        await this.page.selectOption('select[data-test="product-sort-container"]', option.toString());
        await this.page.waitForTimeout(500);
    }
}