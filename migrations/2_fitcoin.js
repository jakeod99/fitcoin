const Fitcoin = artifacts.require("Fitcoin");

module.exports = function(deployer) {
  deployer.deploy(Fitcoin);
};
