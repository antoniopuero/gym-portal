var host = require("network-address")();

export default {
  defaults: {
    host: host,
    mongoQueryString: "mongodb://pogo:hereIcome@ds041821.mongolab.com:41821/pogo",
    salt: "way to go"
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
