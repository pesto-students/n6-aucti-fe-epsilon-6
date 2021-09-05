import React from "react";
import { Router, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/main.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import history from "./routes/history";

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route component={App} />
		</Router>
	</Provider>,
	document.getElementById("root")
);
