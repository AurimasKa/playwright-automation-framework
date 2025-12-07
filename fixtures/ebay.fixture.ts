import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/pages/home-page';
import { SearchResultsPage } from '../page-objects/pages/search-results-page';
import { ProductPage } from '../page-objects/pages/product-page';
import { CartPage } from '../page-objects/pages/cart-page';

export const test = base.extend<{
  homePage: HomePage;
  resultsPage: SearchResultsPage;
  productPage: ProductPage;
  cartPage: CartPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  resultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export const expect = test.expect;
