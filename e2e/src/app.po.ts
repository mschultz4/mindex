import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo() {
    return browser.get("/");
  }

  getWelcomeMessage(): Promise<string> {
    return element(by.css(".page-title")).getText() as Promise<string>;
  }

  getEmployeeId(): Promise<string> {
    return element(
      by.css(".employee-data-item dd.employee-data-value")
    ).getText() as Promise<string>;
  }

  getTotalReports(): Promise<string> {
    return element
      .all(by.css(".employee-data-item dd.employee-data-value"))
      .get(1)
      .getText() as Promise<string>;
  }

  getCompensation(): Promise<string> {
    return element
      .all(by.css(".employee-data-item dd.employee-data-value"))
      .get(2)
      .getText() as Promise<string>;
  }
}
