import React from "react";
import { render } from "@testing-library/react";
import Container from "../Container";

describe("<Container />", () => {
  test("should render correctly", () => {
    const { asFragment } = render(
      <Container
        seo={{
          title: "Test SEO Title",
          description: "Test SEO Description",
        }}
      >
        <div>Test Content</div>
      </Container>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
