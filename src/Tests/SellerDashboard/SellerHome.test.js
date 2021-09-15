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
import SellerHome from "../../components/Pages/Dashboards/Seller/SellerHome";
import { MemoryRouter } from "react-router-dom";

describe("SellerHome", () => {
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
		sellerProducts: {
			data: [
				{
					product: {
						product_transaction_status: "pending",
						highest_bid: 0,
						product_picture:
							"https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2Fundefined?alt=media&token=3fff9fd8-3a6f-4459-b5e4-923f5738071a",
						product_category: "digital_art",
						auction_status: "live",
						description: "Multi color art",
						createdAt: {
							_nanoseconds: 969000000,
							_seconds: 1631263499,
						},
						id: "rlfLKqTBtU8901Rchccr",
						seller_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
						base_price: "50000",
						title: "Piccaso art",
						picture: "15ae0408fbb54809a4e70ca2f1c6183c.png",
					},
					bids: [],
				},
				{
					product: {
						picture: "81pHbegLcDL._AC_SL1500_.jpg",
						seller_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
						createdAt: {
							_seconds: 1630610004,
							_nanoseconds: 652000000,
						},
						auction_status: "live",
						title: "Vintage Look Film Camera ",
						id: "eIxFbioIyEyUkDroVwsd",
						product_category: "antiques_vintages",
						product_transaction_status: "pending",
						highest_bid: 60000,
						base_price: "53000",
						product_picture:
							"https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F81pHbegLcDL._AC_SL1500_.jpg?alt=media&token=d09881ad-3020-4314-8e5d-8a7871af7636",
						description:
							'Size:6"X6"X7" inches, Height:22\'\' inches, Weight:1.200 GM - Classical handmade Vintage design Decorative cameras portable\nColor:Brown, Style:Small desktop Decorative , Material Used:Aluminium / Wood / Glass\nUsage;Home Office Gift , Classical woody decor, Wedding anniversary housewarming gift ideas\nPacking:Packed in single Parcels, Corrugated Export packing - bubble wrapped ( Easy assembly two parts )',
					},
					bids: [
						{
							id: "gPHMi012C3KgY4qTp5dg",
							bid_status: "pending",
							user_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
							bid_price: "60000",
							product_id: "eIxFbioIyEyUkDroVwsd",
							createdAt: {
								_seconds: 1630941456,
								_nanoseconds: 499000000,
							},
						},
						{
							createdAt: {
								_seconds: 1630919362,
								_nanoseconds: 567000000,
							},
							bid_status: "pending",
							id: "9eObdIzATuqoIzKaDimY",
							product_id: "eIxFbioIyEyUkDroVwsd",
							bid_price: "58000",
							user_id: "xzhZQNkWW8fGsj44xE4DpY47dOJ2",
						},
					],
				},
				{
					product: {
						product_transaction_status: "pending",
						product_category: "digital_art",
						description:
							"Travel Money Club (“TMC”) is acollection of 300 cool and stylish monkey NFTs. Thesemonkeys love comics and movies so much that they dream of travelling to these worldsevery day. Each monkey is unique and has different traits. Travel Monkey owners are privileged to enter the TMCmetaverse and participate in various exclusive activities.\n\nTraits:\nBackground: Slate Grey\nExpression: Smile\nFur Color: Green\nHair Color: Beige\nPower Level: 82",
						product_picture:
							"https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F9e3c3dd653c447328120993578f234bf.jpeg?alt=media&token=825fca78-27ca-4c8e-b9f2-74545eaf998a",
						picture: "9e3c3dd653c447328120993578f234bf.jpeg",
						seller_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
						base_price: "15000",
						title: "Travel Monkey Club #19",
						highest_bid: 17000,
						createdAt: {
							_nanoseconds: 175000000,
							_seconds: 1630609809,
						},
						id: "MAhlE9NdlYznl0jS83t1",
						auction_status: "live",
					},
					bids: [
						{
							user_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
							bid_status: "pending",
							product_id: "MAhlE9NdlYznl0jS83t1",
							id: "GaiU3K4KiBjem3Ffau0P",
							createdAt: {
								_seconds: 1631038026,
								_nanoseconds: 706000000,
							},
							bid_price: "17000",
						},
					],
				},
				{
					product: {
						product_picture:
							"https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F91UpTY6zyDL._AC_SL1500_.jpg?alt=media&token=d690e4fa-b2c3-49ad-95dc-38edf55d58ef",
						createdAt: {
							_seconds: 1630610051,
							_nanoseconds: 100000000,
						},
						product_transaction_status: "pending",
						auction_status: "live",
						title: "A Table Décor",
						seller_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
						id: "dJMUEZwfmPLCIPAN9nMU",
						product_category: "antiques_vintages",
						base_price: "58997",
						picture: "91UpTY6zyDL._AC_SL1500_.jpg",
						description:
							'Magnification : 15X , Tube Length : 9" inches , Height : 18"inches , Diameter : 8"inches , Weight : 1.85 Kg\nColor : Brass and red leather , Material Used : Brass & wooden box ,\nUsage : Trekking, Bird Watching, Navy gift, Collectible etc\nPacking:Packed in single parcels, corrugated export packing',
						highest_bid: 10008,
					},
					bids: [
						{
							bid_status: "pending",
							user_id: "Y5GKMqOHnoSEmEpwtCJBLXcN2sB3",
							createdAt: {
								_seconds: 1631030880,
								_nanoseconds: 541000000,
							},
							bid_price: "10008",
							product_id: "dJMUEZwfmPLCIPAN9nMU",
							id: "RsqZR8PeFFF13BvBaB2q",
						},
						{
							product_id: "dJMUEZwfmPLCIPAN9nMU",
							user_id: "xzhZQNkWW8fGsj44xE4DpY47dOJ2",
							bid_price: "10007",
							createdAt: {
								_seconds: 1630697865,
								_nanoseconds: 517000000,
							},
							id: "QM2xzrXT0J9OjL7WtRdy",
						},
					],
				},
				{
					product: {
						createdAt: {
							_seconds: 1630607302,
							_nanoseconds: 642000000,
						},
						base_price: "18000",
						description:
							"Leonardo da Vinci, The Madonna and Child\nDigital copy 2/2\nThe other copy and original artwork are stored in the Hermitage.\nBuyer will get an airdrop of NFT video with Mikhail Piotrovsky, General Director of the State Hermitage Museum showing how he certifies copies of the artworks by signing them and indicating the exact time of each signature.\nThe owner can demonstrate NFT in digital for any purposes .(commercial / non commercial)",
						title: "The Madonna and Child",
						product_picture:
							"https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F763e75fb99254817a9618c04533df4ac.png?alt=media&token=aaf5e256-c083-4afd-beb9-fa0b2a99762f",
						auction_status: "draft",
						seller_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
						picture: "763e75fb99254817a9618c04533df4ac.png",
						product_category: "digital_art",
						product_transaction_status: "pending",
						id: "00pGEQquaj22cOCRBMP0",
						highest_bid: 19000,
					},
					bids: [
						{
							createdAt: {
								_seconds: 1631113671,
								_nanoseconds: 188000000,
							},
							bid_status: "pending",
							product_id: "00pGEQquaj22cOCRBMP0",
							user_id: "sYSInLGYvIVdFAot052DbNaZFQJ3",
							bid_price: "19000",
							id: "TlauyF46MgKLqA7CCaSW",
						},
					],
				},
			],
			length: 5,
		},
		sellerInsights: {
			total_products: 10,
			total_sales: 0,
		},
	};

	beforeEach(() => {
		renderWithState(
			<MemoryRouter>
				<SellerHome />
			</MemoryRouter>,
			{ initialState }
		);
	});

	test("Seller home intitialization & Seller Insights", async () => {
		const heading = screen.getByTestId("heading");

		expect(heading.textContent).toBe("Welcome, Kirushan Balakrishnan");

		const seller_total_products = screen.getByTestId("seller_total_products");
		expect(seller_total_products.textContent).toBe("10");
	});

	test("Seller Live products, product titles render", async () => {
		const listItems = screen.getAllByTestId("product_title");
		expect(listItems).toHaveLength(initialState.sellerProducts.length);

		listItems.forEach((item, index) => {
			const { queryByText } = within(item);
			expect(
				queryByText(initialState.sellerProducts.data[index].product.title)
			);
		});
	});
	test("Seller Live products, product base price render", async () => {
		const listItems = screen.getAllByTestId("base_price");
		expect(listItems).toHaveLength(initialState.sellerProducts.length);

		listItems.forEach((item, index) => {
			const { queryByText } = within(item);
			expect(
				queryByText(initialState.sellerProducts.data[index].product.base_price)
			);
		});
	});
	test("Seller Live products, product highest bid render", async () => {
		const listItems = screen.getAllByTestId("highest_bid");
		expect(listItems).toHaveLength(initialState.sellerProducts.length);

		listItems.forEach((item, index) => {
			const { queryByText } = within(item);
			expect(
				queryByText(initialState.sellerProducts.data[index].product.highest_bid)
			);
		});
	});
	test("Seller Live products, product auction status render", async () => {
		const listItems = screen.getAllByTestId("auction_status");
		expect(listItems).toHaveLength(initialState.sellerProducts.length);

		listItems.forEach((item, index) => {
			const { queryByText } = within(item);
			expect(
				queryByText(
					initialState.sellerProducts.data[index].product.auction_status
				)
			);
		});
	});
});
