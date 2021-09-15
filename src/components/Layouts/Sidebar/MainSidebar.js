import React from "react";
import DesktopSidebar from "./MainDesktopSidebar";
import MobileSidebar from "./MainMobileSidebar";

function MainSidebar() {
	return (
		<>
			<DesktopSidebar />
			<MobileSidebar />
		</>
	);
}

export default MainSidebar;
