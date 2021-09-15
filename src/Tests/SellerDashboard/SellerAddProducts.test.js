import React from "react";
import {
	act,
	fireEvent,
	getAllByRole,
	getAllByTestId,
	getByAltText,
	getByLabelText,
	getByRole,
	getByTestId,
	getByText,
	render,
	render as rtlRender,
	screen,
	wait,
	within,
} from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../../redux/reducers/rootReducer";
import { MemoryRouter } from "react-router-dom";
import SellerAddProduct from "../../components/Pages/Dashboards/Seller/SellerAddProduct";
import userEvent from "@testing-library/user-event";
import Loader from "../../components/Shared/Loader";

describe("Seller Add Product", () => {
	const renderWithState = (ui, { initialState, ...renderOptions } = {}) => {
		const store = createStore(reducer, initialState);
		const Wrapper = ({ children }) => (
			<Provider store={store}>{children}</Provider>
		);

		return render(ui, { wrapper: Wrapper, ...renderOptions });
	};
	const initialState = {
		user: {
			uid: "sYSInLGYvIVdFAot052DbNaZFQJ3",
			displayName: "Kirushan Balakrishnan",
		},
	};

	beforeEach(() => {
		renderWithState(
			<MemoryRouter>
				<SellerAddProduct />
			</MemoryRouter>,
			{ initialState }
		);
	});

	test("Seller add product form renders and input product name", async () => {
		const inputNode1 = screen.getByLabelText("Product Name");
		fireEvent.change(inputNode1, { target: { value: "Old coins" } });
		expect(inputNode1.value).toBe("Old coins");
	});
	test(" Input product name as empty string", async () => {
		const inputNode1 = screen.getByLabelText("Product Name");
		fireEvent.change(inputNode1, { target: { value: "" } });
		expect(inputNode1.value).toBe("");
		const addButton = screen.getByRole("button", {
			name: /Add Product/i,
		});
		await act(async () => {
			userEvent.click(addButton);
		});
		expect(screen.getByTestId("titleErr").textContent).toBe(
			"Title cannot be blank"
		);
	});

	test("Select Product category", async () => {
		fireEvent.change(screen.getByTestId("select-category"), {
			target: { value: "antiques_vintages" },
		});
		let options = screen.getAllByTestId("select-option");
		expect(options[0].selected).toBeFalsy();
		expect(options[1].selected).toBeTruthy();
		expect(options[2].selected).toBeFalsy();
		expect(options[3].selected).toBeFalsy();
		expect(options[4].selected).toBeFalsy();
	});

	test("Select Product category", async () => {
		fireEvent.change(screen.getByTestId("select-category"), {
			target: { value: "" },
		});
		let options = screen.getAllByTestId("select-option");
		expect(options[0].selected).toBeTruthy();
		expect(options[1].selected).toBeFalsy();
		expect(options[2].selected).toBeFalsy();
		expect(options[3].selected).toBeFalsy();
		expect(options[4].selected).toBeFalsy();
		const inputNode1 = screen.getByLabelText("Product Name");
		fireEvent.change(inputNode1, { target: { value: "Old coins" } });
		const addButton = screen.getByRole("button", {
			name: /Add Product/i,
		});
		await act(async () => {
			userEvent.click(addButton);
		});
		expect(screen.getByTestId("titleErr").textContent).toBe(
			"Description cannot be blank"
		);
	});

	test("Input product description", async () => {
		const inputNode2 = screen.getByTestId("product-description");
		fireEvent.change(inputNode2, { target: { value: "1850 coins" } });
		expect(inputNode2.value).toBe("1850 coins");
	});

	test(" Input product description as empty string", async () => {
		const inputNode2 = screen.getByTestId("product-description");
		await fireEvent.change(inputNode2, { target: { value: "" } });
		expect(inputNode2.value).toBe("");
		const inputNode1 = screen.getByLabelText("Product Name");
		await fireEvent.change(inputNode1, { target: { value: "Old coins" } });
		await fireEvent.change(screen.getByTestId("select-category"), {
			target: { value: "antiques_vintages" },
		});
		const addButton = screen.getByRole("button", {
			name: /Add Product/i,
		});
		await act(async () => {
			userEvent.click(addButton);
		});
		expect(screen.getByTestId("titleErr").textContent).toBe(
			"Description cannot be blank"
		);
	});

	test("Input product base price", async () => {
		const inputNode3 = screen.getByTestId("product_base_price");
		fireEvent.change(inputNode3, { target: { value: 65000 } });
		expect(inputNode3.value).toBe("65000");
	});

	test("Product base price should not allow letters to be inputted", () => {
		const inputNode3 = screen.getByTestId("product_base_price");
		expect(inputNode3.value).toBe("");
		fireEvent.change(inputNode3, { target: { value: "Good Day" } });
		expect(inputNode3.value).toBe("");
	});

	test("Product base price cannot empty", async () => {
		const inputNode3 = screen.getByTestId("product_base_price");
		expect(inputNode3.value).toBe("");
		const inputNode1 = screen.getByLabelText("Product Name");
		await fireEvent.change(inputNode1, { target: { value: "Old coins" } });
		await fireEvent.change(screen.getByTestId("select-category"), {
			target: { value: "antiques_vintages" },
		});
		const inputNode2 = screen.getByTestId("product-description");
		fireEvent.change(inputNode2, { target: { value: "1850 coins" } });
		const addButton = screen.getByRole("button", {
			name: /Add Product/i,
		});
		await act(async () => {
			userEvent.click(addButton);
		});
		expect(screen.getByTestId("titleErr").textContent).toBe(
			"Base Price cannot be blank"
		);
	});

	test("Product base price should not allow letters to be inputted", () => {
		const inputNode3 = screen.getByTestId("product_base_price");
		expect(inputNode3.value).toBe("");
		fireEvent.change(inputNode3, { target: { value: "Good Day" } });
		expect(inputNode3.value).toBe("");
	});

	test("Product image upload", async () => {
		const file = new File(["(⌐□_□)"], "chucknorris.png", {
			type: "image/png",
			lastModifiedDate: new Date(),
		});
		const imageInput = screen.getByLabelText("Upload a file");
		await fireEvent.change(imageInput, { target: { files: [file] } });
		expect(screen.getByText(/File Name: chucknorris.png/i));
	});

	test("Product image cannot empty", async () => {
		const imageInput = screen.getByLabelText("Upload a file");
		await fireEvent.change(imageInput, { target: { files: "" } });
		const inputNode1 = screen.getByLabelText("Product Name");
		await fireEvent.change(inputNode1, { target: { value: "Old coins" } });
		await fireEvent.change(screen.getByTestId("select-category"), {
			target: { value: "antiques_vintages" },
		});
		const inputNode2 = screen.getByTestId("product-description");
		fireEvent.change(inputNode2, { target: { value: "1850 coins" } });
		const inputNode3 = screen.getByTestId("product_base_price");
		fireEvent.change(inputNode3, { target: { value: 65000 } });
		const addButton = screen.getByRole("button", {
			name: /Add Product/i,
		});
		await act(async () => {
			userEvent.click(addButton);
		});
		expect(screen.getByTestId("titleErr").textContent).toBe(
			"Product picture cannot be blank"
		);
	});

	test("Add product", async () => {
		jest.mock("../../components/Shared/Loader");

		const inputNode1 = screen.getByLabelText("Product Name");
		await fireEvent.change(inputNode1, { target: { value: "Old coins" } });
		await fireEvent.change(screen.getByTestId("select-category"), {
			target: { value: "antiques_vintages" },
		});
		const inputNode2 = screen.getByTestId("product-description");
		fireEvent.change(inputNode2, { target: { value: "1850 coins" } });
		const inputNode3 = screen.getByTestId("product_base_price");
		fireEvent.change(inputNode3, { target: { value: 65000 } });
		const file = new File(["(⌐□_□)"], "chucknorris.png", {
			type: "image/png",
			lastModifiedDate: new Date(),
		});
		const imageInput = screen.getByLabelText("Upload a file");
		await fireEvent.change(imageInput, { target: { files: [file] } });
		const addButton = screen.getByRole("button", {
			name: /Add Product/i,
		});
		await act(async () => {
			userEvent.click(addButton);
		});
		expect(<Loader />);
	});
});
