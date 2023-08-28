module.exports = {
  content: ['./client/**/*.{html,jsx,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        'red-600': '#ef4444',
        'red-700': '#dc2626',
        'green-500': '#38a169', 
        'green-700': '#2f855a', 
        'purple-700': '#9B99FF',
      },
      padding: {
        '100px': '100px',
      },
      width: {
        '128': '128px', 
      },
    },
  },
  plugins: [],
}
