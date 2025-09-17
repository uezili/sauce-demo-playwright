export class LoginPage {
    constructor(page) {
        this.page = page;
        this.passwordInput = this.page.locator('input[data-test="password"]');
        this.usernameInput = this.page.locator('input[data-test="username"]');
        this.loginBnt = this.page.locator('#login-button');
        this.errorMessage = this.page.locator('h3[data-test="error"]');
        this.swagLabsLogo = this.page.locator('.app_logo');
    }

    async gotoLoginPage() {
        await this.page.goto('/');
        await this.page.waitForSelector('input[data-test="username"]');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBnt.click();
    }

    async getErrorMessage() {
        await this.errorMessage.innerText();
    }
}