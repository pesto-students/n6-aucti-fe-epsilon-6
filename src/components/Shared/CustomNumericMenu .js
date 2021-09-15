import { connectNumericMenu } from "react-instantsearch-dom";

const CustomNumericMenu = ({ items, refine }) => {
	const handleChange = (item) => {
		// event.preventDefault();
		item.isRefined = true;
		refine(item.value);
	};

	return (
		<ul>
			{items.map((item) => (
				<li key={item.value}>
					<div className="flex flex-row ml-2">
						<input
							type="checkbox"
							name="checked-demo"
							className="form-tick mb-6 appearance-none bg-white bg-check h-4 w-4 border border-gray-300 rounded-md checked:bg-gray-800 checked:border-transparent focus:outline-none"
							checked={item.isRefined}
							onChange={() => {
								handleChange(item);
							}}
						/>
						<span
							className={`ml-4  text-gray-900 dark:text-white ${
								item.isRefined ? "font-bold" : "font-semibold"
							}`}
						>
							{item.label}
						</span>
					</div>
				</li>
			))}
		</ul>
	);
};
export default connectNumericMenu(CustomNumericMenu);
