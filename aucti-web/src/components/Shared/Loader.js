const Loader = () => {
	let circleCommonClasses = "h-5 w-5 bg-aucti rounded-full";

	return (
		<div className="flex justify-center items-center h-full w-full p-32">
			<div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
			<div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
			<div className={`${circleCommonClasses} animate-bounce400`}></div>
		</div>
	);
};

export default Loader;
