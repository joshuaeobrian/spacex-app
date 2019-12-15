import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('spaceX-app e2e', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display table with Title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('SpaceX Launches');
  });
  it('should navigate through the pages', () => {
    page.navigateTo();
    page.clickNext();
    expect(page.getPageLocation()).toContain('Page 2 of');
    page.clickNext();
    expect(page.getPageLocation()).toContain('Page 3 of');
    page.clickPrev();
    page.clickPrev();
    expect(page.getPageLocation()).toContain('Page 1 of');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
