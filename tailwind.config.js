/** @type {import("tailwindcss").Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#6366f1",
				accent: "#c7d2fe",
				standard_black: "#262626",

				majorAC: "#93c5fd",
				majorBC: "#f97316",
				majorCG: "#f97316",
				majorFL: "#dc2626",
				majorHT: "#1e40af",
				majorIT: "#7c3aed",
				majorMK: "#93c5fd",
				majorTS: "#1e40af"
			},
		},
	},
	daisyui: {
		themes: [
			{
				licht: {
					"primary": "#6366f1",
					"accent": "#c7d2fe",
					"neutral": "#262626",
					"base-100": "#f3f2f8",
					"success": "#22c55e",
					"warning": "#eab308",
					"error": "#ef4444",
				},
			}
		]
	},
	plugins: [require("daisyui")],
};