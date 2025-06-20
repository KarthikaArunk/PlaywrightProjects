import { test as base } from '@playwright/test';
import { LoginSauceDemo } from './loginSauceDemo';
import { Products } from './products';
import { CheckOut } from './checkOut';

export const test = base.extend<{ loginPage: LoginSauceDemo, products: Products, checkout: CheckOut }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginSauceDemo(page);
        await use(loginPage);
    },

    products: async ({ page }, use) => {
        const products = new Products(page);
        await use(products);
    },

    checkout: async ({ page }, use) => {
        const checkout = new CheckOut(page);
        await use(checkout);
    }
})

