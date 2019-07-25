import Web3 from "web3";
import fitcoinArtifact from "../../../build/contracts/Fitcoin.json";

const App = {
  web3: null,
  account: null,
  fitcoin: null,

  start: async function() {
    const { web3 } = this;

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

  createCompetition: async function() {
    const amount = parseInt(document.getElementById("amount").value);
    const receiver = document.getElementById("receiver").value;

    const { createCompetition } = this.fitcoin.methods;
    const id = await createCompetition(amount, receiver).send({ from: this.account, value: amount*10**18 });
    // .then(function (x) {
    //   console.log('id: ', x);
    // });

  },

  // makeBet: async function() {
  //   const id = parseInt(document.getElementById("amount").value);
  //
  //   const { makeBet } = this.fitcoin.methods;
  //   await makeBet(id).call({ from: this.account });
  //
  // },

  // cancelBet: async function() {
  //   const id = parseInt(document.getElementById("amount").value);
  //
  //   const { cancelBet } = this.fitcoin.methods;
  //   await cancelBet(id).call({ from: this.account });
  //
  // },

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

  $(document).ready(function(){
    $(".nav-tabs a").click(function(){
      $(this).tab('show');
    });
  });

  App.start();
});
