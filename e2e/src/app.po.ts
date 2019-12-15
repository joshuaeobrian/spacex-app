import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .table_title')).getText() as Promise<string>;
  }

  clickNext() {
    return element(by.css('.table_pagination_btn.next')).click();
  }
  clickPrev() {
    return element(by.css('.table_pagination_btn.prev')).click();
  }

  getPageLocation() {
    return element(by.css('.table_pagination .table_pagination_summary')).getText() as Promise<string>;
  }
}
