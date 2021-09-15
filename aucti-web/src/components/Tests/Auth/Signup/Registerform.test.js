import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterForm from "../../../Pages/Auth/Signup/RegisterForm";

test("form labels render", async() => {
  render(<RegisterForm />);
  const firstname = screen.queryByText("First name")
  expect(firstname).toBeInTheDocument();
});
