import React from "react";

import SidebarContent from "./MainSidebarContent";

function MainDesktopSidebar() {
	return (
		<aside className="z-30 bg-aucti flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
			<SidebarContent />
		</aside>
	);
}

export default MainDesktopSidebar;
