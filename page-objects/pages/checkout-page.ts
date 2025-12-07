import { Page } from '@playwright/test';
import { PageObject } from '../page-object';
import { TestStep } from '../../utils/test-step';
import { ShippingForm } from '../components/checkout-page/shipping-form';
import { ReviewOrder } from '../components/checkout-page/review-order';
import { Payment } from '../components/checkout-page/payment';
import { OrderSummary } from '../components/checkout-page/order-summary';

export class CheckoutPage extends PageObject {
  readonly shippingForm: ShippingForm;
  readonly reviewOrder: ReviewOrder;
  readonly payment: Payment;
  readonly orderSummary: OrderSummary;

  constructor(page: Page) {
    super(page);
    this.shippingForm = new ShippingForm(page);
    this.reviewOrder = new ReviewOrder(page);
    this.payment = new Payment(page);
    this.orderSummary = new OrderSummary(page);
  }
}

