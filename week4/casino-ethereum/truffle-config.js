require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },

    rinkeby: {  // testnet
      host: "127.0.0.1",
      port: 8547,
      network_id: 4
    },

    goerli: {  // testnet
      host: "127.0.0.1",
      port: 8547,
      network_id: 5
    },

    mainnet: {
      host: "127.0.0.1",
      port: 8549,
      network_id: 1,
      gasPrice: 10 * 1e9
    }
  },
  compilers: {
    solc: {
      version: "^0.4.24",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

