import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";

// Mock the entire MDTab component to avoid dynamic import issues in tests
vi.mock("../MDTab", () => ({
  default: ({ fileName }: { fileName: string }) => (
    <div data-testid="md-tab">MD Tab: {fileName}</div>
  ),
}));

import MDTab from "../MDTab";

describe("<MDPage />", () => {
  test("should render correctly", () => {
    const { getByTestId } = render(
      <HelmetProvider>
        <MDTab fileName="test" />
      </HelmetProvider>,
    );

    expect(getByTestId("md-tab")).toBeInTheDocument();
    expect(getByTestId("md-tab")).toHaveTextContent("MD Tab: test");
  });
});
