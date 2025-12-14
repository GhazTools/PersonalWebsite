import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import Greeter from "../Greeter";
import staticData from "../../data/json/static.json";
import contactData from "../../data/json/contact.json";
import pkg from "../../../package.json";

describe("<Greeter />", () => {
  test("should render correctly", () => {
    const { asFragment } = render(
      <HelmetProvider>
        <Greeter
          staticData={staticData}
          contactData={contactData}
          repoUrl={pkg.repository.url}
        />
      </HelmetProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
