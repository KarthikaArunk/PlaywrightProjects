import { Locator, Page, expect } from '@playwright/test';

export class Products {
    page: Page;
    shoppingCartLink: Locator;
    itemTitleBackpack: Locator;
    itemTitleFleeceJacket: Locator;
    itemTitleRedTShirt: Locator;
    itemBikeLight: Locator;
    backpackAddToCartButton: Locator;
    fleeceJacketAddToCartButton: Locator;
    redShirtAddToCartButton: Locator;
    bikeLightAddToCartButton: Locator;
    sortOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLink = page.locator('//div/a[@class="shopping_cart_link"]');
        this.itemTitleBackpack = page.locator('//div[text()="Sauce Labs Backpack"]');
        this.itemTitleFleeceJacket = page.locator('//div[text()="Sauce Labs Fleece Jacket"]');
        this.itemTitleRedTShirt = page.locator('//div[text()="Test.allTheThings() T-Shirt (Red)"]');
        this.itemBikeLight = page.locator('//div[text()="Sauce Labs Bike Light"]');
        this.bikeLightAddToCartButton = page.locator('button[id="add-to-cart-sauce-labs-bike-light"]')
        this.backpackAddToCartButton = page.locator('button[id="add-to-cart-sauce-labs-backpack"]');
        this.fleeceJacketAddToCartButton = page.locator('button[id="add-to-cart-sauce-labs-fleece-jacket"]');
        this.redShirtAddToCartButton = page.locator('button[id="add-to-cart-test.allthethings()-t-shirt-(red)"]');
        this.sortOption = page.locator('select[class="product_sort_container"]');
    }

    async cartItemCount() {
        return await this.shoppingCartLink.textContent();
    }

    async shoppingProducts(baseurl: string) {
        try {
            const cartButtons = [
                this.backpackAddToCartButton,
                this.fleeceJacketAddToCartButton,
                this.redShirtAddToCartButton
            ]
            await expect(this.page).toHaveURL(`${baseurl}/inventory.html`);
            await expect(this.shoppingCartLink).toBeVisible();
            await expect(this.shoppingCartLink).toBeEmpty();
            await expect(this.itemTitleBackpack).toBeVisible();
            await expect(this.itemTitleFleeceJacket).toBeVisible();
            await expect(this.itemTitleRedTShirt).toBeVisible();

            for (let i = 0; i < cartButtons.length; i++) {
                await expect(cartButtons[i]).toBeVisible();
                await cartButtons[i].click();
                const itemCount = await this.cartItemCount();
                expect(itemCount).toEqual(`${i + 1}`);
            }
            await (this.shoppingCartLink).waitFor({ state: 'visible' });
            await this.shoppingCartLink.click();
        } catch (error) {
            console.error('Products are not selected', error);
        }
    }

    async productSortSelect(baseurl: string) {
        try {
            await expect(this.page).toHaveURL(`${baseurl}/inventory.html`);
            await expect(this.shoppingCartLink).toBeVisible();
            await expect(this.shoppingCartLink).toBeEmpty();
            await expect(this.sortOption).toBeVisible();
            const sortProducts = 'select.product_sort_container';
            await this.page.selectOption(sortProducts, { label: 'Price (low to high)' });
            await this.itemBikeLight.waitFor({ state: 'visible' });
            await expect(this.itemBikeLight).toBeVisible();
            await this.bikeLightAddToCartButton.waitFor({ state: 'visible' });
            await expect(this.bikeLightAddToCartButton).toBeVisible();
            await this.bikeLightAddToCartButton.click();
            const itemCount = await this.cartItemCount();
            expect(itemCount).toEqual('1');
            await (this.shoppingCartLink).waitFor({ state: 'visible' });
            await this.shoppingCartLink.click();
        } catch (error) {
            console.error('Products are not sorted', error);
        }
    }
}