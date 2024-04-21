import { AppPage } from "./app.po";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    expect(page.getWelcomeMessage()).toEqual("Mindex Coding Challenge");
  });

  it("should display correct employee id", async () => {
    page.navigateTo();
    expect(await page.getEmployeeId()).toEqual("1");
  });

  it("should display correct total reports", async () => {
    page.navigateTo();
    expect(await page.getTotalReports()).toEqual("6");
  });

  it("should display correct compensation", async () => {
    page.navigateTo();
    expect(await page.getCompensation()).toEqual("2");
  });
});
