import React, { useState } from "react";

import SidebarContent from "./SidebarContent";
// import { Transition, Backdrop } from '@windmill/react-ui'

import { SidebarContext } from "../Sidebar";

function MobileSidebar() {
	const { isSidebarOpen, closeSidebar } = useState(false);

	return (
		<transition show={isSidebarOpen}>
			<>
				<transition
					enter="transition ease-in-out duration-150"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition ease-in-out duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<button onClick={closeSidebar} />
				</transition>

				<transition
					enter="transition ease-in-out duration-150"
					enterFrom="opacity-0 transform -translate-x-20"
					enterTo="opacity-100"
					leave="transition ease-in-out duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0 transform -translate-x-20"
				>
					<aside className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden">
						<SidebarContent />
					</aside>
				</transition>
			</>
		</transition>
	);
}

export default MobileSidebar;
