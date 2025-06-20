import { Page, Locator, expect } from '@playwright/test';

export class CheckOut {
  page: Page;
  yourCartText: Locator;
  qtyText: Locator;
  descriptionText: Locator;
  continueShoppingButton: Locator;
  checkOutButton: Locator;
  bikeLightRemoveButton: Locator;
  openMenuButton: Locator;
  logOutOption: Locator;
  checkOutYourInformationTitle: Locator;
  shoppingCartLink: Locator;
  firstName: Locator;
  lastName: Locator;
  zipCode: Locator;
  continueButton: Locator;
  itemBackpack: Locator;
  checkoutOverviewTitle: Locator;
  paymentInformationText: Locator;
  shippingInformation: Locator;
  itemTotal: Locator;
  tax: Locator;
  totalPrice: Locator;
  finishButton: Locator;
  confirmMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yourCartText = page.locator('//span[text()="Your Cart"]');
    this.qtyText = page.locator('//div[text()="QTY"]');
    this.descriptionText = page.locator('//div[text()="Description"]');
    this.continueShoppingButton = page.locator('button', { hasText: "Continue Shopping" });
    this.shoppingCartLink = page.locator('//div/a[@class="shopping_cart_link"]');
    this.checkOutButton = page.locator('button', { hasText: "Checkout" });
    this.bikeLightRemoveButton = page.locator('button[id="remove-sauce-labs-bike-light"]');
    this.checkOutYourInformationTitle = page.locator('//span[text()="Checkout: Your Information"]');
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.zipCode = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.locator('input[id="continue"]');
    this.itemBackpack = page.locator('//div[text()="Sauce Labs Backpack"]')
    this.checkoutOverviewTitle = page.locator('//span[text()="Checkout: Overview"]');
    this.paymentInformationText = page.locator('//div[text()="SauceCard #31337"]');
    this.shippingInformation = page.locator('//div[text()="Free Pony Express Delivery!"]');
    this.itemTotal = page.locator('//div[@class="summary_subtotal_label"]');
    this.tax = page.locator('//div[@class="summary_tax_label"]');
    this.totalPrice = page.locator('//div[@class="summary_total_label"]');
    this.finishButton = page.locator('button', { hasText: "Finish" });
    this.confirmMessage = page.locator('//h2[text()="Thank you for your order!"]');
    this.openMenuButton = page.locator('//div[@class="bm-burger-button"]');
    this.logOutOption = page.locator('//a[text()="Logout"]');
  }

  async yourCartDetails(baseurl: string) {
    try {
      await expect(this.page).toHaveURL(`${baseurl}/cart.html`);
      await expect(this.yourCartText).toBeVisible();
      await expect(this.qtyText).toBeVisible();
      await expect(this.descriptionText).toBeVisible();
      await expect(this.shoppingCartLink).toBeVisible();
      await (this.checkOutButton).waitFor({ state: "visible" });
      await expect(this.checkOutButton).toBeVisible();
      await this.checkOutButton.click();
    } catch (error) {
      console.error('Details are not displayed', error);
    }
  }

  async checkOutCart(baseurl: string, first_name: string, last_name: string, zipcode: number) {
    try {
      await expect(this.page).toHaveURL(`${baseurl}/checkout-step-one.html`);
      await expect(this.shoppingCartLink).toBeVisible();
      await (this.firstName).waitFor({ state: "visible" });
      await this.firstName.click();
      await this.firstName.fill(first_name);
      await (this.lastName).waitFor({ state: "visible" });
      await this.lastName.click();
      await this.lastName.fill(last_name);
      await (this.zipCode).waitFor({ state: "visible" });
      await this.zipCode.click();
      await this.zipCode.fill(zipcode.toString());
      await (this.continueButton).waitFor({ state: "visible" });
      await this.continueButton.click();
    } catch (error) {
      console.error('Customer details are not correct', error);
    }
  }

  async finishShopping(baseurl: string, itemtotal: string, tax: string, totalprice: string) {
    try {
      await expect(this.page).toHaveURL(`${baseurl}/checkout-step-two.html`);
      await expect(this.shoppingCartLink).toBeVisible();
      await expect(this.checkoutOverviewTitle).toBeVisible();
      await expect(this.paymentInformationText).toBeVisible();
      await expect(this.shippingInformation).toBeVisible();
      await expect(this.itemTotal).toBeVisible();
      await expect(this.itemTotal).toContainText(`${itemtotal}`);
      await expect(this.tax).toBeVisible();
      await expect(this.tax).toContainText(`${tax}`);
      await expect(this.totalPrice).toBeVisible();
      await expect(this.totalPrice).toContainText(`${totalprice}`);
      await expect(this.finishButton).toBeVisible();
      await (this.finishButton).waitFor({ state: "visible" });
      await this.finishButton.click();
      await expect(this.page).toHaveURL(`${baseurl}/checkout-complete.html`);
      await (this.confirmMessage).waitFor({ state: "visible" });
      await expect(this.confirmMessage).toBeVisible();
    } catch (error) {
      console.error('Shopping checkout is not working', error);
    }
  }

  async cancelShopping(baseurl: string) {
    try {
      await expect(this.bikeLightRemoveButton).toBeVisible();
      await this.bikeLightRemoveButton.click();
      await expect(this.shoppingCartLink).toBeVisible();
      await expect(this.shoppingCartLink).toBeEmpty();
      await (this.openMenuButton).waitFor({ state: "visible" });
      await expect(this.openMenuButton).toBeVisible();
      await this.openMenuButton.click();
      await (this.logOutOption).waitFor({ state: "visible" });
      await expect(this.logOutOption).toBeVisible();
      await this.logOutOption.click();
      await expect(this.page).toHaveURL(`${baseurl}`);
    } catch (error) {
      console.error('Shopping item is not cancelled', error);
    }
  }
}