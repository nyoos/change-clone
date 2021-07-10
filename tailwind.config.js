module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Helvetica", "sans-serif"],
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
        "768px": "768px",
        "600px": "600px",
        "142px": "142px",
        "1024px": "1024px",
      },
      height: {
        "142px": "142px",
      },
      margin: {
        "-3px": "-3px",
      },
      gridTemplateColumns: {
        cardLeftPhoto: "70% 30%",
      },
      screens: {
        lg: "960px",
        xl: "1024px",
      },
      transitionProperty: {
        height: "height",
      },
      animation: {
        "expand-fast": "expand 0.1s ease",
      },
      keyframes: {
        expand: {
          "0%": { transform: "scale(0.7)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
