import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Alert from "../../../Shared/Alert";
import Header from "../Header";
import { connect } from "react-redux";
import { loadBidProductDetailsAction } from "../../../../redux/actions/buyerActions";
import Loader from "../../../Shared/Loader";
import history from "../../../../routes/history";

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
	const { bidproduct } = props;
	// const [loading, setloading] = useState(true);
	useEffect(() => {
		props.loadBidproductDetails(props.match.params.bid_id);
	}, []);
	useEffect(() => {
		if (bidproduct.payment_status === "PAID") {
			history.push("/buyer/dashboard");
		}
	}, [bidproduct]);
	if (!bidproduct) {
		return <Loader></Loader>;
	}
	return (
		<>
			<Header />
			<Alert />
			<div className="payment pb-56">
				<Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
					<CheckoutForm
						bid_id={props.match.params.bid_id}
						bidproduct={bidproduct}
					/>
				</Elements>
			</div>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state.user,
		bidproduct: state.bidproduct,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadBidproductDetails: (id) => dispatch(loadBidProductDetailsAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerPayments);
