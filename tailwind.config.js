module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Montserrat", "Helvetica", "sans-serif"],
    },
    extend: {
      colors: {
        theme: {
          black: "#2A2E30",
          orange: "#FF9E7A",
          red: "#ec2c22",
          "red-dark": "#dc1d13",
          blue: {
            dark: "#345C72",
            light: "#D4EDF4",
          },
          white: "#FFFFFF",
        },
      },
      width: {
        "960px": "960px",
        "600px": "600px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
