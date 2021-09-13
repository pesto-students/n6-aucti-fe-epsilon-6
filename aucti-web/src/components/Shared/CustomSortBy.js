import { connectSortBy } from "react-instantsearch-dom";

const CustomSortBy = ({ items, refine }) => (
	<select
		className="mt-1 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500  focus:border-aucti sm:text-sm"
		onChange={(event) => {
			event.preventDefault();
			refine(event.target.value);
		}}
	>
		{items.map((item) => (
			<option
				className="hover:bg-auctiHover"
				key={item.value}
				value={item.value}
			>
				{item.label}
			</option>
		))}
	</select>
);

export default connectSortBy(CustomSortBy);
