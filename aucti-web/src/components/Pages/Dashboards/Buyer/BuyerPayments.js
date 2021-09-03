import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Alert from "../../../Shared/Alert";
import Header from "../Header";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	"pk_test_51JUO6nSGSWD0FkJijv4aSTENWBsp0gnzIzTaBlFXVV0FlkudYRtwr8ICWWmegHFGJbhQsIWN5dGcHBvKHFJqX1do006QyiVbPN"
);

const ELEMENTS_OPTIONS = {
	fonts: [
		{
			cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
		},
	],
};

const BuyerPayments = (props) => {
	return (
		<>
			<Header />
			<Alert />
			<div className="bg-auctiLight pb-44">
				<Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
					<CheckoutForm bid_id={props.match.params.bid_id} />
				</Elements>
			</div>
		</>
	);
};

export default BuyerPayments;
