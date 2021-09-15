import { lazy } from "react";

const Dashboard = lazy(() =>
	import("../components/Pages/Dashboards/Seller/SellerHome")
);

const AddProducts = lazy(() =>
	import("../components/Pages/Dashboards/Seller/SellerAddProduct")
);
const History = lazy(() =>
	import("../components/Pages/Dashboards/Seller/SellerHistory")
);

// const Reports = lazy(() =>
// 	import("../components/Pages/Dashboards/Seller/SellerReports")
// );

const Profile = lazy(() =>
	import("../components/Pages/Dashboards/Seller/SellerProfile")
);

const SellerRoutes = [
	{
		path: "/dashboard",
		component: Dashboard,
	},
	{
		path: "/products",
		component: AddProducts,
	},
	{
		path: "/auctions",
		component: History,
	},
	// {
	// 	path: "/reports",
	// 	component: Reports,
	// },
	{
		path: "/profile",
		component: Profile,
	},
];

export default SellerRoutes;
