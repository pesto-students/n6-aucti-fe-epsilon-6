import React from "react";
import { connect } from "react-redux";
import { resetAlertAction } from "../../redux/actions/alertActions";

const Alert = (props) => {
	const { text, text_color, bg_color } = props.alert;

	setTimeout(() => props.dispatch(resetAlertAction()), 3000);

	if (text === "") {
		return <></>;
	}
	return (
		<div
			className={`px-4 py-3 w-10/12 leading-normal ${text_color} ${bg_color} rounded-lg`}
			role="alert"
		>
			<p>{text}</p>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		alert: state.alert,
	};
};

export default connect(mapStateToProps)(Alert);
