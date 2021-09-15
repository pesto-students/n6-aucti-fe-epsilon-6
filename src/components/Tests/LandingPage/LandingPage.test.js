import React from "react";
import { render } from "@testing-library/react";
import Card from "../../Shared/card";

test("renders card component", () => {
  const { getByTestId } = render(<Card />);
  const card = getByTestId("card");
  expect(card).toBeDefined();
});


