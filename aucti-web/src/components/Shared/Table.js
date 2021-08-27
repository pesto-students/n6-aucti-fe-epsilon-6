import React from "react";

const Table = (props) => {
	return (
		<>
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-900">
					<tr>
						{props.columns.map((n) => (
							<th
								key={n.title}
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
							>
								{n.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{props.children}
				</tbody>
			</table>
		</>
	);
};

export default Table;
