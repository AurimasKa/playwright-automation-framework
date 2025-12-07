import { Page, expect } from '@playwright/test';
import { PageObject } from '../page-object';
import { TestStep } from '../../utils/test-step';
import { PriceFilter } from '../components/results-page/price-filter';
import { BrandFilter } from '../components/results-page/brand-filter';
import { parsePriceFromText, isPriceInRange } from '../../utils/price';

export class SearchResultsPage extends PageObject {
  readonly priceFilter: PriceFilter;
  readonly brandFilter: BrandFilter;

  constructor(page: Page) {
    super(page);
    this.priceFilter = new PriceFilter(page);
    this.brandFilter = new BrandFilter(page);
  }

  get searchResultsList() {
    return this.page.locator('#srp-river-results');
  }

  get searchResultsHeading() {
    return this.page.locator('h1.srp-controls__count-heading');
  }

  get productItems() {
    return this.searchResultsList.locator('li[data-view]');
  }

  getProductLink(index: number) {
    return this.productItems.nth(index).locator('a').first();
  }

  getProductTitle(index: number) {
    return this.productItems.nth(index).locator('.s-card__title .su-styled-text');
  }

  getProductPrice(index: number) {
    return this.productItems.nth(index).locator('.s-card__price');
  }

  @TestStep
  async selectProductFromResultsList(index: number) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page').catch(() => null),
      this.getProductLink(index).click(),
    ]);
    return newPage || this.page;
  }

  @TestStep
  async getVisibleProductItemsCount() {
    return await this.productItems.count();
  }

  @TestStep
  async verifyProductItemsMatchCriteria(brandName: string, minPrice: number, maxPrice: number) {
    const count = await this.getVisibleProductItemsCount();
    let matchingCount = 0;

    for (let i = 0; i < count; i++) {
      const title = await this.getProductTitle(i).textContent();
      const priceText = await this.getProductPrice(i).textContent();
      const price = parsePriceFromText(priceText);

      if (title && title.toLowerCase().includes(brandName.toLowerCase()) && isPriceInRange(price, minPrice, maxPrice)) {
        matchingCount++;
      }
    }

    return matchingCount;
  }
}

