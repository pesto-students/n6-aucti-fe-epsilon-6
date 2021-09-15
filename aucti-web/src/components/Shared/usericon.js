import React, { useRef, useState, useEffect } from "react";
import Person from "./Person";

const Usericon = () => {
	const popupref = useRef();
	const show_notification = false;
	const show_profile = false;

	const [notification, setnotification] = useState(show_notification);
	const [profile, setprofile] = useState(show_profile);

	// const handlenot = () => {
	// 	if (profile) setprofile(false);
	// 	setnotification(!notification);
	// };
	const handlepro = () => {
		if (notification) setnotification(false);
		setprofile(!profile);
	};

	const handleClick = (event) => {
		if (popupref && !popupref.current.contains(event.target)) {
			setnotification(false);
			setprofile(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);

	return (
		<>
			<div data-testid="usericon" className="flex justify-end p-4" ref={popupref}>
				{/* <div onClick={handlenot}><Notification show={notification}/></div> */}
				<div onClick={handlepro}>
					<Person show={profile} />
				</div>
			</div>
		</>
	);
};

export default Usericon;
