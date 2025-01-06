export const content = [
  "./src/**/*.{js,ts,jsx,tsx}", // Include all your React files
  "./pages/**/*.{js,ts,jsx,tsx}", // Include pages directory
  "./components/**/*.{js,ts,jsx,tsx}", // Include components directory
];
export const theme = {
  extend: {
    colors: {
      primary: {
        600: "#4F46E5", // Example: Customize your primary color
      },
    },
    boxShadow: {
      soft: "0 2px 4px rgba(0, 0, 0, 0.1)", // Example: Customize soft shadow
    },
  },
};
export const plugins = [];
