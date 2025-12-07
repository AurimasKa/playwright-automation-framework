import { Page } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export class OrderSummary extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get orderTotal() {
    return this.page.locator('[data-test-id="TOTAL"] .amount .text-display');
  }

  getPayWithButton(paymentMethod: string) {
    return this.page.getByRole('button', { name: `Pay with ${paymentMethod}` });
  }

  @TestStep
  async clickPayWithButton(paymentMethod: string) {
    await this.getPayWithButton(paymentMethod).waitFor({ state: 'visible' });
    await this.getPayWithButton(paymentMethod).click();
  }
}

