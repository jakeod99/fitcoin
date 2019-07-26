import Web3 from "web3";
import {default as contract} from 'truffle-contract'
import fitcoinArtifact from "../../../build/contracts/Fitcoin.json";

let Fitcoin = contract(fitcoinArtifact);

const App = {
  web3: null,
  account: null,
  fitcoin: null,

  start: async function() {
    const {
      web3
    } = this;

    Fitcoin.setProvider(web3.currentProvider);

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = fitcoinArtifact.networks[networkId];

      this.fitcoin = new web3.eth.Contract(
        fitcoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.log(error);
      console.error("Could not connect to contract or chain.");
    }
  },

  getLastBet: async function() {
    const {
      getLastBet
    } = this.fitcoin.methods;
    const a = await getLastBet().call();
    console.log(a);
  },

  createCompetition: async function() {
    const amount = web3.toWei(parseInt(document.getElementById("amount").value), "ether");
    const receiver = document.getElementById("receiver").value;

    const {
      createCompetition, getLastBet
    } = this.fitcoin.methods;
    await createCompetition(amount, receiver).send({
      from: this.account,
      value: amount,
    });
    const id = await getLastBet().call();
    console.log(id);
    this.setStatus('The ID for your bet is ' + id);
  },

  getStuff: async function() {
    const {
      getOwner,
      betAmount,
      getPlayer
    } = this.fitcoin.methods;
    const owner = await getOwner(1).call();
    console.log('owner', owner);
    const amnt = await betAmount(1).call();
    console.log('bet amount', amnt);
    const player = await getPlayer(1).call();
    console.log('player', player);
  },

  acceptBet: async function() {
    const amount = web3.toWei(parseInt(document.getElementById("amount").value), "ether");
    const id = document.getElementById("receiver").value;

    const {
      acceptBet
    } = this.fitcoin.methods;
    await acceptBet(id).send({
      from: this.account,
      value: amount,
    });
  },

  cancelBet: async function() {
    const id = document.getElementById("receiver").value;

    web3.eth.getAccounts(function(error, accounts) {
      if (accounts && accounts.length > 0) {
        // we reload the contract instance
        Fitcoin.deployed().then(function(instance) {
          // we call the close function, specifying a gas amount that corresponds to an estimation
          // of the cost of this operation. Note that if there are too many supporters to pay back
          // this operation may fail
          return instance.cancelBet(id, {
            from: accounts[0],
            gas: 500000
          });
        }).then(function(result) {
          // given that certain node implementations don't throw an exception when a transaction fail
          // we check the status of the transaction receipt
          if (parseInt(result.receipt.status) === 1) {
            console.log('Transaction success!')
          } else {
            console.error("Transaction didn't succeed");
          }
        }).catch(function(error) {
          console.error(error);
        })
      }
    });

    // console.log('here!');
    // const {
    //   cancelBet
    // } = this.fitcoin.methods;
    // await cancelBet(1).call({
    //   from: this.account,
    //   gas: 500000
    // });
    // return instance.close({from: accounts[0], gas: 500000});
  },

  // payoutBet: async function() {
  //   const amount = parseInt(document.getElementById("amount").value);
  //   const receiver = document.getElementById("receiver").value;
  //
  //   this.setStatus("Initiating transaction... (please wait)");
  //
  //   const { payoutBet } = this.fitcoin.methods;
  //   await payoutBet(amount, receiver).call();
  //
  //   this.setStatus("Transaction complete!");
  // },
  //
  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  profilePage: async function() {
    console.log(document.location.href);
    document.location.href = "http://localhost:8080/profile.html";
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
    );
  }

  $(document).ready(function() {
    $(".nav-tabs a").click(function() {
      $(this).tab('show');
    });
  });

  App.start();
});
