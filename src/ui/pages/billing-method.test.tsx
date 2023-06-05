import { BillingMethodPage } from "./billing-method";
import { setupIntegrationTest } from "@app/test";
import { render, screen } from "@testing-library/react";

describe("Billing Method page", () => {
  it("the billing method page should render", async () => {
    const { TestProvider } = setupIntegrationTest();
    render(
      <TestProvider>
        <BillingMethodPage />
      </TestProvider>,
    );
    const el = await screen.findByRole("button");
    expect(el.textContent).toEqual("Save & Finish");
  });
});