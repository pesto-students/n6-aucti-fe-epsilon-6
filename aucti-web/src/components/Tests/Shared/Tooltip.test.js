import { render, screen, fireEvent } from "@testing-library/react";
import Tooltip from "../../Shared/Tooltip";

describe("render tooltip", () => {
  render(<Tooltip />);

  test("multiple paragraphs load", () => {
    const btn = screen.queryAllByRole("paragraph")
    expect(btn).toBeInTheDocument;
  });
});
