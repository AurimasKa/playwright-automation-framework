import { Page } from '@playwright/test';
import { PageObject } from '../page-object';
import { TestStep } from '../../utils/test-step';

export class HomePage extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get searchInputField() {
    return this.page.getByRole('combobox', { name: 'Search for anything' });
  }

  get cookieBanner() {
    return this.page.locator('#gdpr-banner');
  }

  get cookieAcceptButton() {
    return this.page.locator('#gdpr-banner-accept');
  }

  get cookieDeclineButton() {
    return this.page.locator('#gdpr-banner-decline');
  }

  @TestStep
  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.acceptCookieBanner();
  }

  @TestStep
  async acceptCookieBanner() {
    try {
      await this.cookieBanner.waitFor({ state: 'visible'}).catch(() => {});
      
      const isVisible = await this.cookieAcceptButton.isVisible().catch(() => false);
      if (isVisible) {
        await this.cookieAcceptButton.click();
        await this.cookieBanner.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
      }
    } catch (error) {
    }
  }

  @TestStep
  async search(searchQuery: string) {
    await this.searchInputField.fill(searchQuery);
    await this.searchInputField.press('Enter');
  }
}

