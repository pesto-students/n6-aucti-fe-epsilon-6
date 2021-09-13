import React from "react";
import {
	getAllByRole,
	getByRole,
	getByTestId,
	getByText,
	render,
	render as rtlRender,
	screen,
	within,
} from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "../../redux/reducers/rootReducer";
import SellerHistory from "../../components/Pages/Dashboards/Seller/SellerHistory";
import { MemoryRouter } from "react-router-dom";

describe("SellerHistory", () => {
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
		sellerHistory: {
			data: [
				{
					description: "Signed jersey",
					auction_status: "completed",
					selected_bid: "gs0po4Gkf69B1vqCjhJc",
					seller_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
					createdAt: {
						_seconds: 1630610208,
						_nanoseconds: 300000000,
					},
					highest_bid: "45000",
					product_category: "autographed",
					id: "EbUpixFq1jfRqJ45N5wr",
					picture: "b1a1fb27fbf345bdbe871c88f129c914.png",
					title: "1925 Signed Jersey",
					product_picture:
						"https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2Fb1a1fb27fbf345bdbe871c88f129c914.png?alt=media&token=373604e2-5115-4808-a35a-7dd7b245690d",
					product_transaction_status: "pending",
					base_price: "44997",
					user_id: "xzhZQNkWW8fGsj44xE4DpY47dOJ2",
				},
			],
			length: 1,
		},
		sellerCompleted: {
			data: [
				{
					title: "Handmade Gramophone",
					product_transaction_status: "settled",
					product_category: "antiques_vintages",
					id: "LbLZ8mhRBAcWHna8p5Ln",
					product_picture:
						"https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F71fYj%2BYHEaL._AC_SL1500_.jpg?alt=media&token=504dbeb5-c59c-4d27-b75a-35aef503c85b",
					description:
						'Antique Style Handmade Brass Gramophone.\nSizing Detals : Height-8.5" and Base-4" Inch Approx.\nPackage Contents : 1 Decorative Gramophone\nCare Instructions: Wipe the dust with a dry cloth when needed\nPefect gift for your love ones for any special occasion.',
					highest_bid: "24000",
					auction_status: "completed",
					picture: "71fYj+YHEaL._AC_SL1500_.jpg",
					base_price: "23000",
					selected_bid: "M5HTKfguFC2oc9co14K6",
					seller_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
					createdAt: {
						_seconds: 1630610106,
						_nanoseconds: 875000000,
					},
					user_id: "xzhZQNkWW8fGsj44xE4DpY47dOJ2",
				},
				{
					description: "Modern Art",
					product_picture:
						"https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2Fnft_auction_reuters.jpg?alt=media&token=2bf95bab-bae2-49fe-b6cb-0a6dea9aff00",
					selected_bid: "x9hMX4gQY7k5vZDnAQDB",
					id: "TBQ1CBI4L21Uj31sSDQ7",
					seller_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
					createdAt: {
						_nanoseconds: 649000000,
						_seconds: 1630610157,
					},
					highest_bid: "35000",
					base_price: "25000",
					auction_status: "completed",
					product_category: "digital_art",
					picture: "nft_auction_reuters.jpg",
					title: "Digital art color eye",
					product_transaction_status: "dispute",
					user_id: "xzhZQNkWW8fGsj44xE4DpY47dOJ2",
				},
				{
					seller_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
					id: "8F9ZJuTFjH4eEwH9QcS9",
					title: "Ironman Digital Art",
					picture: "458229112f4048e69d2a31afc5b3a36d.jpeg",
					auction_status: "completed",
					base_price: "15000",
					description: "Ironman",
					product_picture:
						"https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F458229112f4048e69d2a31afc5b3a36d.jpeg?alt=media&token=54c4e124-2dcf-48f8-99a9-29f9d5f29b89",
					highest_bid: "19000",
					product_transaction_status: "dispute",
					selected_bid: "xrkmLhIWGRJaM0rZJzxN",
					product_category: "digital_art",
					createdAt: {
						_seconds: 1630610254,
						_nanoseconds: 395000000,
					},
					user_id: "xzhZQNkWW8fGsj44xE4DpY47dOJ2",
				},
			],
			length: 3,
		},
	};

	beforeEach(() => {
		renderWithState(
			<MemoryRouter>
				<SellerHistory />
			</MemoryRouter>,
			{ initialState }
		);
	});

	test("Render Pending auction's titles", async () => {
		const listItems = screen.getAllByTestId("product_title_pending");
		expect(listItems).toHaveLength(initialState.sellerHistory.length);

		listItems.forEach((item, index) => {
			const { queryByText } = within(item);
			expect(queryByText(initialState.sellerHistory.data[index].title));
		});
	});
	test("Render Complteted auction's titles", async () => {
		const listItems = screen.getAllByTestId("product_title_completed");
		expect(listItems).toHaveLength(initialState.sellerCompleted.length);

		listItems.forEach((item, index) => {
			const { queryByText } = within(item);
			expect(queryByText(initialState.sellerCompleted.data[index].title));
		});
		// screen.debug();
	});
	// test("Seller Live products, product base price render", async () => {
	// 	const listItems = screen.getAllByTestId("base_price");
	// 	expect(listItems).toHaveLength(initialState.sellerProducts.length);

	// 	listItems.forEach((item, index) => {
	// 		const { queryByText } = within(item);
	// 		expect(
	// 			queryByText(initialState.sellerProducts.data[index].product.base_price)
	// 		);
	// 	});
	// });
	// test("Seller Live products, product highest bid render", async () => {
	// 	const listItems = screen.getAllByTestId("highest_bid");
	// 	expect(listItems).toHaveLength(initialState.sellerProducts.length);

	// 	listItems.forEach((item, index) => {
	// 		const { queryByText } = within(item);
	// 		expect(
	// 			queryByText(initialState.sellerProducts.data[index].product.highest_bid)
	// 		);
	// 	});
	// });
	// test("Seller Live products, product auction status render", async () => {
	// 	const listItems = screen.getAllByTestId("auction_status");
	// 	expect(listItems).toHaveLength(initialState.sellerProducts.length);

	// 	listItems.forEach((item, index) => {
	// 		const { queryByText } = within(item);
	// 		expect(
	// 			queryByText(
	// 				initialState.sellerProducts.data[index].product.auction_status
	// 			)
	// 		);
	// 	});
	// });
});
