import { Page } from '@playwright/test';
import { PageObject } from '../page-object';
import { TestStep } from '../../utils/test-step';
import { AddToCartModal } from '../components/product-page/add-to-cart-modal';

export interface ProductOption {
  label?: string;
  value: string;
  type?: 'select' | 'dropdown' | 'radio';
}

export class ProductPage extends PageObject {
  readonly addToCartModal: AddToCartModal;

  constructor(page: Page) {
    super(page);
    this.addToCartModal = new AddToCartModal(page);
  }

  get productTitleText() {
    return this.page.locator('[data-testid="x-item-title"]');
  }

  get productPrice() {
    return this.page.locator('[data-testid="x-price-primary"]');
  }

  get productImage() {
    return this.page.locator('img[data-zoom-src]').first();
  }

  get addToCartButton() {
    return this.page.getByTestId('x-atc-action').getByTestId('ux-call-to-action');
  }

  @TestStep
  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }
} 