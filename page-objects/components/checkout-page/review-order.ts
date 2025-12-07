import { Page } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export class ReviewOrder extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get productTitle() {
    return this.page.locator('.item-title .text-display');
  }

  get productPrice() {
    return this.page.locator('.item-price').first();
  }
}

