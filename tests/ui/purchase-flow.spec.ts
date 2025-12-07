import { test, expect } from '../../fixtures/ebay.fixture';
import { ProductPage } from '../../page-objects/pages/product-page';
import { CartPage } from '../../page-objects/pages/cart-page';
import { CheckoutPage } from '../../page-objects/pages/checkout-page';
import { HomePage } from '../../page-objects/pages/home-page';
import { SearchResultsPage } from '../../page-objects/pages/search-results-page';
import { parsePriceFromText } from '../../utils/price';
import { readCSV } from '../../utils/csv-reader';
import { shippingData } from '../../test-data/shipping-data';

test.describe('eBay shopping flow', () => {
  test('should search for product and verify search results are displayed correctly', async ({ homePage, resultsPage}) => {
    await homePage.navigate();
    await homePage.search('Headphones');

    await expect(resultsPage.searchResultsHeading).toContainText('Headphones', { ignoreCase: true });
    await expect(await resultsPage.getVisibleProductItemsCount()).toBeGreaterThanOrEqual(60);
  });

  test('should filter products by brand and price range', async ({ homePage, resultsPage }) => {
    await searchAndFilterProducts(homePage, resultsPage, 'Sony', 50, 200);
    
    const totalItemsCount = await resultsPage.getVisibleProductItemsCount();
    const matchingItemsCount = await resultsPage.verifyProductItemsMatchCriteria('Sony', 50, 200);
    await expect(matchingItemsCount).toEqual(totalItemsCount);
  });

  test('should select product and verify product details', async ({ homePage, resultsPage }) => {
    const testData = readCSV('test-data/product-details.csv');
    const data = testData[0]; 
    
    await homePage.navigate();
    await homePage.search(data.searchQuery);
    await resultsPage.searchResultsList.waitFor({ state: 'visible' });
    
    await resultsPage.brandFilter.filterByBrand(data.brand);
    await resultsPage.priceFilter.setMinimumPriceRange(data.minPrice);
    await resultsPage.priceFilter.setMaximumPriceRange(data.maxPrice);
    await resultsPage.priceFilter.clickSubmitPriceRangeButton();
    
    const newPage = await resultsPage.selectProductFromResultsList(data.productIndex);
    const productPage = new ProductPage(newPage);

    await expect(productPage.productTitleText).toContainText(data.brand, { ignoreCase: true });
    
    const price = parsePriceFromText(await productPage.productPrice.textContent());
    await expect(price).toBeGreaterThanOrEqual(data.minPrice);
    await expect(price).toBeLessThanOrEqual(data.maxPrice);
  });

  test('should add product to cart and remove from cart', async ({ homePage, resultsPage }) => {
    await searchAndFilterProducts(homePage, resultsPage, 'Sony', 50, 200);
    
    const newPage = await resultsPage.selectProductFromResultsList(2);
    const productPage = new ProductPage(newPage);

    await productPage.clickAddToCartButton();
    await expect(productPage.addToCartModal.addedToCartConfirmation).toBeVisible();
   
    const cartPage = new CartPage(await productPage.addToCartModal.clickSeeInCartButton());
    await cartPage.clickRemoveButton();
    await expect(cartPage.emptyCartMessage).toContainText('You don\'t have any items in your cart.');
  });

  test('should complete checkout flow', async ({ homePage, resultsPage }) => {
    await searchAndFilterProducts(homePage, resultsPage, 'Sony', 50, 200);
    
    const newPage = await resultsPage.selectProductFromResultsList(2);
    const productPage = new ProductPage(newPage);

    await productPage.clickAddToCartButton();
    await productPage.addToCartModal.addedToCartConfirmation.waitFor({ state: 'visible' });
    
    const cartPageOpened = await productPage.addToCartModal.clickSeeInCartButton();
    const cartPage = new CartPage(cartPageOpened);
    await cartPage.clickGoToCheckoutButton();

    const checkoutPage = new CheckoutPage(await cartPage.checkoutModal.clickContinueAsGuestButton());

    await expect(checkoutPage.reviewOrder.productTitle).toContainText('Sony', { ignoreCase: true });

    await checkoutPage.shippingForm.fillShippingAddressForm(shippingData.shipping);
    await checkoutPage.shippingForm.clickDoneButton();

    await checkoutPage.payment.selectPaymentMethod('PAYPAL');
    await checkoutPage.orderSummary.clickPayWithButton('PayPal');
  });
});

test.describe('ebay shopping negative scenarios', () => {
  test('should handle no results when filtering with invalid price range', async ({ homePage, resultsPage }) => {
    await homePage.navigate();
    await homePage.search('Headphones');
    await resultsPage.searchResultsList.waitFor({ state: 'visible' });
    
    await resultsPage.priceFilter.setMinimumPriceRange(10000000);
    await resultsPage.priceFilter.setMaximumPriceRange(2000000000);
    await resultsPage.priceFilter.clickSubmitPriceRangeButton();    
    
    await expect(await resultsPage.getVisibleProductItemsCount()).toBeLessThanOrEqual(0);
  });
});

async function searchAndFilterProducts(homePage: HomePage, resultsPage: SearchResultsPage, brand: string, minPrice: number, maxPrice: number) {
  await homePage.navigate();
  await homePage.search('Headphones');
  await resultsPage.searchResultsList.waitFor({ state: 'visible' });
  
  await resultsPage.brandFilter.filterByBrand(brand);
  await resultsPage.priceFilter.setMinimumPriceRange(minPrice);
  await resultsPage.priceFilter.setMaximumPriceRange(maxPrice);
  await resultsPage.priceFilter.clickSubmitPriceRangeButton();
}