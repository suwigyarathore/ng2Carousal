import { Ng2CrousalPage } from './app.po';

describe('ng2-crousal App', () => {
  let page: Ng2CrousalPage;

  beforeEach(() => {
    page = new Ng2CrousalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
