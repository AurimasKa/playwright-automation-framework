import { Page } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export class BrandFilter extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  getBrandLink(brandName: string) {
    return this.page.locator('li[name="Brand"]').getByRole('link').filter({ hasText: brandName });
  }

  getFilterCarouselItem(brandName: string) {
    return this.page.locator('.srp-multi-aspect__item--applied').filter({ hasText: brandName });
  }

  @TestStep
  async filterByBrand(brandName: string) {
    await this.getBrandLink(brandName).click();
  }
}

