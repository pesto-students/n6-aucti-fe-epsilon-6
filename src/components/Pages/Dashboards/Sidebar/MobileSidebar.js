import React from "react";
import { Transition, Backdrop } from "@windmill/react-ui";
import SidebarContent from "./SidebarContent";
import { connect } from "react-redux";
import { toggleSidebarAction } from "../../../../redux/actions/userActions";

function MobileSidebar(props) {
	const { sideBar } = props;
	const closeSidebar = () => {
		props.dispatch(toggleSidebarAction());
	};

	return (
		<>
			<Transition show={sideBar}>
				<>
					<Transition
						enter="transition ease-in-out duration-150"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition ease-in-out duration-150"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Backdrop onClick={closeSidebar} />
					</Transition>

					<Transition
						enter="transition ease-in-out duration-150"
						enterFrom="opacity-0 transform -translate-x-20"
						enterTo="opacity-100"
						leave="transition ease-in-out duration-150"
						leaveFrom="opacity-100"
						leaveTo="opacity-0 transform -translate-x-20"
					>
						<aside className="fixed inset-y-0 z-40 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-aucti dark:bg-gray-800 lg:hidden">
							<SidebarContent />
						</aside>
					</Transition>
				</>
			</Transition>
		</>
	);
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		sideBar: state.sideBar,
	};
};

export default connect(mapStateToProps)(MobileSidebar);
