import { test } from '../Pages/fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const swaglabdata = JSON.parse(JSON.stringify(require('../swagData/swagLabsData.json'))); //Initialize json data

const firstname = faker.person.firstName(); //Generate random name using faker 
const lastname = faker.person.lastName();
const zipcode = faker.number.int({ min: 1000, max: 8000 });

test.describe('Sauce Demo Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.baseURL!);
        await expect(page).toHaveTitle(swaglabdata.pageTitle);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    })

    test('Sauce Demo - Shopping Products', async ({ loginPage, products, checkout }) => {
        await loginPage.sauceDemoLogin(process.env.user_Name!, process.env.password!, swaglabdata.errorMessage); //Login with valid credentials
        await products.shoppingProducts(process.env.baseURL!); //Select Products      
        await checkout.yourCartDetails(process.env.baseURL!); //Verify Your Cart Details
        await checkout.checkOutCart(process.env.baseURL!, firstname, lastname, zipcode); //Checkout Cart
        await checkout.finishShopping(process.env.baseURL!, swaglabdata.itemTotal, swaglabdata.tax, swaglabdata.total); //Finish Shopping      
    })

    test('Sauce Demo - Login with invalid credentials', async ({ page, loginPage }) => {
        await loginPage.sauceDemoLogin(process.env.user_Name!, process.env.password_invalid!, swaglabdata.errorMessage); //Login with invlaid credentials       
    })

    test('Sauce Demo - Cancel Shopping product - Logout', async ({ loginPage, products, checkout }) => {
        await loginPage.sauceDemoLogin(process.env.user_Name!, process.env.password!, swaglabdata.errorMessage); //Login
        await products.productSortSelect(process.env.baseURL!); //Sort products      
        await checkout.cancelShopping(process.env.baseURL!); //Cancel Shopping product
    })
})

