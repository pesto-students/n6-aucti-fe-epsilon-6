import { connectNumericMenu } from "react-instantsearch-dom";

const CustomNumericMenu = ({ items, refine, createURL }) => (
	<ul>
		{items.map((item) => (
			<li key={item.value}>
				<input
					type="checkbox"
					name="checked-demo"
					className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
					// checked={props.checked.includes(n.id)}
					// disabled={!props.checked.includes(n.id) && props.checked.length > 0}
					// onChange={() => props.handleSelectBid(n.id)}
				/>
				<span className="text-gray-700 dark:text-white font-normal">
					Select Bid
				</span>
				<a
					href={createURL(item.value)}
					style={{ fontWeight: item.isRefined ? "bold" : "" }}
					onClick={(event) => {
						event.preventDefault();
						refine(item.value);
					}}
				>
					{item.label}
				</a>
			</li>
		))}
	</ul>
);

export default connectNumericMenu(CustomNumericMenu);
