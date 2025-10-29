export class BasePage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Wait for an element to be present in the DOM
     * @param {string} selector - The selector to wait for
     * @param {Object} options - Options for waiting
     * @param {number} options.timeout - Maximum time to wait in milliseconds
     * @returns {Promise<void>}
     */
    async waitForElement(selector, { timeout = 10000 } = {}) {
        await this.page.waitForSelector(selector, { timeout });
    }

    /**
     * Wait for navigation to complete
     * @param {string} url - URL to wait for
     * @returns {Promise<void>}
     */
    async waitForURL(url) {
        await this.page.waitForURL(url);
    }

    /**
     * Get text content of an element
     * @param {string} selector - The selector to get text from
     * @returns {Promise<string>}
     */
    async getElementText(selector) {
        return await this.page.locator(selector).innerText();
    }

    /**
     * Check if an element is visible
     * @param {string} selector - The selector to check
     * @returns {Promise<boolean>}
     */
    async isElementVisible(selector) {
        return await this.page.locator(selector).isVisible();
    }

    /**
     * Take a screenshot of the current page
     * @param {string} name - Name of the screenshot file
     * @returns {Promise<void>}
     */
    async takeScreenshot(name) {
        await this.page.screenshot({
            path: `./screenshots/${name}.png`,
            fullPage: true
        });
    }

    /**
     * Fill an input field
     * @param {string} selector - The selector of the input
     * @param {string} value - The value to fill
     * @returns {Promise<void>}
     */
    async fillInput(selector, value) {
        await this.page.locator(selector).fill(value);
    }

    /**
     * Click an element
     * @param {string} selector - The selector to click
     * @returns {Promise<void>}
     */
    async clickElement(selector) {
        await this.page.locator(selector).click();
    }

    /**
     * Get element attribute
     * @param {string} selector - The selector
     * @param {string} attributeName - The attribute name
     * @returns {Promise<string>}
     */
    async getAttribute(selector, attributeName) {
        return await this.page.locator(selector).getAttribute(attributeName);
    }

    /**
     * Check if element exists in DOM
     * @param {string} selector - The selector to check
     * @returns {Promise<boolean>}
     */
    async elementExists(selector) {
        return await this.page.locator(selector).count() > 0;
    }

    /**
     * Get current page URL
     * @returns {Promise<string>}
     */
    async getCurrentURL() {
        return this.page.url();
    }
}