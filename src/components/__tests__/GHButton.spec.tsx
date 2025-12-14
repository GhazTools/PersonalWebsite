import React from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import GHButton from "../GHButton";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

describe("<GHButton />", () => {
  test("should render correctly", () => {
    const { asFragment } = render(
      <GHButton
        resource={{
          endpoint: "https://api.github.com/users/GhazanfarShahbaz",
          attr: "followers",
        }}
        href="https://github.com/GhazanfarShahbaz"
        title="Follow @GhazanfarShahbaz on GitHub"
        text="Follow @GhazanfarShahbaz on GitHub"
        icon={{
          prefix: "fab",
          iconName: "github",
        }}
        size="lg"
        showCount={true}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
