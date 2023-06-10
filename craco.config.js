/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
