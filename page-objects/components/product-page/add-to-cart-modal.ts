import { Page } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export class AddToCartModal extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get addedToCartConfirmation() {
    return this.page.getByText('Added to cart');
  }

  get seeInCartButton() {
    return this.page.getByRole('link', { name: 'See in cart' });
  }

  @TestStep
  async clickSeeInCartButton() {
    await Promise.all([
      this.page.waitForURL(/cart\.ebay\.com/),
      this.seeInCartButton.click()
    ]);
    return this.page;
  }
}

