import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPage from "../../Pages/ProductPage/ProductPage";
import {Provider} from  'react-redux'
const store ={}
test("text components render", () => {
  render(<Provider store={store}> <ProductPage /> </Provider>);
  const rupeetext = screen.queryAllByText("₹ ");
  expect(rupeetext).toBeInTheDocument();
});

