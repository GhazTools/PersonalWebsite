import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import Container from "../Container";

describe("<Container />", () => {
  test("should render correctly", () => {
    const { asFragment } = render(
      <HelmetProvider>
        <Container
          seo={{
            title: "Test SEO Title",
            description: "Test SEO Description",
          }}
        >
          <div>Test Content</div>
        </Container>
      </HelmetProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
