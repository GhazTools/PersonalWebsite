import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import Diploma from "../Diploma";
import sweData from "../../data/json/swe.json";
import { vi } from "vitest";

// Workaround for react-tooltip's randomly generated UUIDs.
// https://github.com/wwayne/react-tooltip/issues/562
vi.mock("crypto", () => ({
  randomBytes: (num: number) => new Array(num).fill(0),
}));

describe("<Diploma />", () => {
  test("should render correctly", () => {
    const { asFragment } = render(
      <HelmetProvider>
        <Diploma diplomaData={sweData} />
      </HelmetProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
