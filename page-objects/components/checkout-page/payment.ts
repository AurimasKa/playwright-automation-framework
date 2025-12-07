import { Page } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export class Payment extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  getPaymentMethodRadio(paymentMethodId: string) {
    return this.page.locator(`input[type="radio"][name="radio-group-paymentMethod"][value="${paymentMethodId}"]`);
  }

  @TestStep
  async selectPaymentMethod(paymentMethodId: string) {
    await this.getPaymentMethodRadio(paymentMethodId).waitFor({ state: 'visible' });
    await this.getPaymentMethodRadio(paymentMethodId).click();
  }
}

