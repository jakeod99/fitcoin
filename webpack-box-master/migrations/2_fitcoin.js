const Fitcoin = artifacts.require("./Fitcoin.sol");

module.exports = function(deployer) {
  deployer.deploy(Fitcoin);
};
