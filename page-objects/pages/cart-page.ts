import { Page } from '@playwright/test';
import { PageObject } from '../page-object';
import { TestStep } from '../../utils/test-step';
import { CheckoutModal } from '../components/cart-page/checkout-modal';

export class CartPage extends PageObject {
  readonly checkoutModal: CheckoutModal;

  constructor(page: Page) {
    super(page);
    this.checkoutModal = new CheckoutModal(page);
  }

  get removeButton() {
    return this.page.getByRole('button', { name: /^Remove/ });
  }

  get emptyCartMessage() {
    return this.page.getByText('You don\'t have any items in your cart.');
  }

  get startShoppingButton() {
    return this.page.getByRole('link', { name: 'Start shopping' });
  }

  get signInButton() {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  get goToCheckoutButton() {
    return this.page.getByRole('button', { name: 'Go to checkout' });
  }

  @TestStep
  async clickRemoveButton() {
    await this.removeButton.click();
  }

  @TestStep
  async clickGoToCheckoutButton() {
    await this.goToCheckoutButton.click();
  }
}

