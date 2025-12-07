import { Page } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export interface ShippingAddressData {
  firstName: string;
  lastName: string;
  streetAddress: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
}

export class ShippingForm extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get firstNameInput() {
    return this.page.locator('#firstName');
  }

  get lastNameInput() {
    return this.page.locator('#lastName');
  }

  get streetAddressInput() {
    return this.page.locator('#addressLine1');
  }

  get addressLine2Input() {
    return this.page.locator('#addressLine2');
  }

  get cityInput() {
    return this.page.locator('#city');
  }

  get stateInput() {
    return this.page.locator('#stateOrProvince');
  }

  get zipCodeInput() {
    return this.page.locator('#postalCode');
  }

  get emailInput() {
    return this.page.locator('#email');
  }

  get confirmEmailInput() {
    return this.page.locator('#emailConfirm');
  }

  get phoneNumberInput() {
    return this.page.locator('#phoneNumber');
  }

  get doneButton() {
    return this.page.getByRole('button', { name: 'Done' });
  }

  @TestStep
  async fillShippingAddressForm(data: ShippingAddressData) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.streetAddressInput.fill(data.streetAddress);
    if (data.addressLine2) {
      await this.addressLine2Input.fill(data.addressLine2);
    }
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipCodeInput.fill(data.zipCode);
    await this.emailInput.fill(data.email);
    await this.confirmEmailInput.fill(data.email);
    await this.phoneNumberInput.fill(data.phoneNumber);
  }

  @TestStep
  async clickDoneButton() {
    await this.doneButton.click();
  }
}

