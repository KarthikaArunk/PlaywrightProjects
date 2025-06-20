import { Page, Locator, expect } from '@playwright/test';

export class LoginSauceDemo {
    page: Page;
    userName: Locator;
    passWord: Locator;
    loginButton: Locator;
    errorMessageDisplay: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.getByPlaceholder('Username');
        this.passWord = page.getByPlaceholder('Password');
        this.loginButton = page.locator('input[id="login-button"]');
        this.errorMessageDisplay = page.locator('h3[data-test="error"]');
    }

    async sauceDemoLogin(username: string, password: string, error_message: string) {
        try {
            await expect(this.userName).toBeVisible();
            await (this.userName).waitFor({ state: 'visible' });
            await this.userName.click();
            await this.userName.fill(username);
            await expect(this.passWord).toBeVisible();
            await (this.passWord).waitFor({ state: 'visible' });
            await this.passWord.click();
            await this.passWord.fill(password);
            await (this.loginButton).waitFor({ state: 'visible' });
            await this.loginButton.click();
            if ((username !== "standard_user") || (password !== "secret_sauce")) {
                await expect(this.errorMessageDisplay).toBeVisible();
                await expect(this.errorMessageDisplay).toHaveText(error_message);
            }
        } catch (error) {
            console.error('Login credentials are incorrect', error);
        }
    }
}