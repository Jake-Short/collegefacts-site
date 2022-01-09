export type ThemeType = typeof light; // This is the type definition for my theme object.

export const light = {
	primary: "#000000",
	secondary: "rgba(0, 0, 0, 0.7)",
	tertiary: "rgba(0, 0, 0, 0.3)",
	quaternary: "rgba(0, 0, 0, 0.2)",

	accent: "rgba(83, 82, 237, 1)",

	primaryBackground: "#ffffff",

	controlBackground: "rgba(255, 255, 255, 1)",

	hoverBackground: "rgba(0, 0, 0, 0.05)",

	tableCellPrimary: "rgba(255, 255, 255, 1)",
	tableCellSecondary: "rgba(0, 0, 0, 0.07)"
};

export const dark = {
	primary: "#ffffff",
	secondary: "rgba(255, 255, 255, 0.7)",
	tertiary: "rgba(255, 255, 255, 0.3)",
	quaternary: "rgba(255, 255, 255, 0.2)",

	accent: "rgba(83, 82, 237, 1)",

	primaryBackground: "#111111",

	controlBackground: "#111111",

	hoverBackground: "rgba(255, 255, 255, 0.05)",

	tableCellPrimary: "#111111",
	tableCellSecondary: "rgba(255, 255, 255, 0.07)"
};

const theme = light; // set the light theme as the default.
export default theme;
