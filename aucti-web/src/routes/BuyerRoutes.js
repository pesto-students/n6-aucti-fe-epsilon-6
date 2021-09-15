import { lazy } from "react";

const Dashboard = lazy(() =>
	import("../components/Pages/Dashboards/Buyer/BuyerHome")
);
const History = lazy(() =>
	import("../components/Pages/Dashboards/Buyer/BuyerHistory")
);
// const Ratings = lazy(() =>
// 	import("../components/Pages/Dashboards/Buyer/BuyerRating")
// );
// const Notifications = lazy(() =>
// 	import("../components/Pages/Dashboards/Buyer/BuyerNotifications")
// );
const Wishlist = lazy(() =>
	import("../components/Pages/Dashboards/Buyer/BuyerWishlist")
);

const Profile = lazy(() =>
	import("../components/Pages/Dashboards/Buyer/BuyerProfile")
);

const BuyerRoutes = [
	{
		path: "/dashboard",
		component: Dashboard,
	},
	{
		path: "/wishlist",
		component: Wishlist,
	},
	{
		path: "/auctions",
		component: History,
	},
	// {
	// 	path: "/ratings",
	// 	component: Ratings,
	// },
	// {
	// 	path: "/notifications",
	// 	component: Notifications,
	// },
	{
		path: "/profile",
		component: Profile,
	},
];

export default BuyerRoutes;
