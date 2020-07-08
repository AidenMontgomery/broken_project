describe('Example', () => {
  beforeEach(async () => {
    // await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Loading...'))).toBeVisible();
  });

  it('should show Learn More', async () => {
    await expect(element(by.text('Learn More'))).toBeVisible();
  });
});
