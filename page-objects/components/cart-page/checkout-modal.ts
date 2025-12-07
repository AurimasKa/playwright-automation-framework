import { Page } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export class CheckoutModal extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get continueAsGuestButton() {
    return this.page.getByRole('button', { name: 'Continue as guest' });
  }

  @TestStep
  async clickContinueAsGuestButton() {
    await Promise.all([
      this.page.waitForURL(/pay\.ebay\.com/),
      this.continueAsGuestButton.click()
    ]);
    return this.page;
  }
}

