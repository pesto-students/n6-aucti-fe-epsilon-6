import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className={`bg-gray-900 dark:bg-gray-800 w-full py-8 bottom-0`}>
			<div className="max-w-screen-xl mx-auto px-4">
				<ul className="max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-between">
					<li className="my-2">
						<Link
							className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
							to="/home/special/hot_auctions"
						>
							Hot Auctions
						</Link>
					</li>
					<li className="my-2">
						<Link
							className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
							to="/home/special/trending"
						>
							Trending
						</Link>
					</li>
					<li className="my-2">
						<Link
							className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
							to="/home/special/latest"
						>
							Latest
						</Link>
					</li>
					<li className="my-2">
						<Link
							className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
							to="/home/search"
						>
							Products
						</Link>
					</li>
				</ul>
				<div className="pt-8 flex max-w-xs mx-auto items-center justify-between">
					<a
						href="https://www.facebook.com/"
						className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
					>
						<svg
							width="20"
							height="20"
							fill="currentColor"
							className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
							viewBox="0 0 1792 1792"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
						</svg>
					</a>
					<a
						href="https://twitter.com/"
						className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
					>
						<svg
							width="20"
							height="20"
							fill="currentColor"
							className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
							viewBox="0 0 1792 1792"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path>
						</svg>
					</a>
					<a
						href="https://www.instagram.com/"
						className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
					>
						<svg
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 64 64"
							width="24"
							height="24"
						>
							<path d="M 21.580078 7 C 13.541078 7 7 13.544938 7 21.585938 L 7 42.417969 C 7 50.457969 13.544938 57 21.585938 57 L 42.417969 57 C 50.457969 57 57 50.455062 57 42.414062 L 57 21.580078 C 57 13.541078 50.455062 7 42.414062 7 L 21.580078 7 z M 47 15 C 48.104 15 49 15.896 49 17 C 49 18.104 48.104 19 47 19 C 45.896 19 45 18.104 45 17 C 45 15.896 45.896 15 47 15 z M 32 19 C 39.17 19 45 24.83 45 32 C 45 39.17 39.169 45 32 45 C 24.83 45 19 39.169 19 32 C 19 24.831 24.83 19 32 19 z M 32 23 C 27.029 23 23 27.029 23 32 C 23 36.971 27.029 41 32 41 C 36.971 41 41 36.971 41 32 C 41 27.029 36.971 23 32 23 z" />
						</svg>
					</a>
				</div>
				<div className="text-center text-gray-500 dark:text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
					Created by Aucti Team
				</div>
			</div>
		</footer>
	);
};

export default Footer;
