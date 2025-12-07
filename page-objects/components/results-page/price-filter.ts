import { Page } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export class PriceFilter extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  getMinimumPriceInput() {
    return this.page.getByRole('textbox', { name: 'Minimum Value' });
  }

  getMaximumPriceInput() {
    return this.page.getByRole('textbox', { name: 'Maximum Value' });
  }

  get submitPriceRangeButton() {
    return this.page.getByRole('button', { name: 'Submit price range' });
  }

  @TestStep
  async setMinimumPriceRange(price: number) {
    const input = this.getMinimumPriceInput();
    await input.waitFor({ state: 'visible' });
    await input.scrollIntoViewIfNeeded();
    await input.fill(String(price));
  }
  
  @TestStep
  async setMaximumPriceRange(price: number) {
    const input = this.getMaximumPriceInput();
    await input.waitFor({ state: 'visible' });
    await input.scrollIntoViewIfNeeded();
    await input.fill(String(price));
  }

  @TestStep
  async clickSubmitPriceRangeButton() {
    await this.submitPriceRangeButton.click();
  }
}

