var host = require("network-address")();

export default {
  defaults: {
    host: host
  },

  staging: {
    port: 80
  },

  production: {
    port: 80
  },

  development: {
    port: 3000,
    host: "localhost"
  }

};
