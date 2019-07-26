(function() {
    // import moment from 'moment';
    // const moment = require('moment');
    // moment().format();
  const betManager = {
    pendingBets:  {},
    acceptedBets: {},
    ongoingBets: {},
    recentBets: {},
    web3: null,
    currBetId: '',
    //get betId
    // betManager() {
    // //   const moment = require('moment');
    // //   moment().format();
    // //   console.log('yup');
    // },
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
    createCompetition: async function() {
      const amount = web3.toWei(parseInt(document.getElementById("form")[1].value), "ether");
      const receiver = document.getElementById("form")[0].value;
  
      const {
        createCompetition, getLastBet
      } = this.fitcoin.methods;
      await createCompetition(amount, receiver).send({
        from: this.account,
        value: amount,
      });
      const id = await getLastBet().call();
      betManager.currBetId = id;
      return id;
      // this.setStatus('The ID for your bet is ' + id);
    },
    makeBet: async function(participants, wager, startDate) {
      //participants is an array of all participants
      const betId = await betManager.createCompetition();
      betManager.pendingBets[betId] = {participants: participants, wager: wager, startDate: startDate};
      console.log(betManager.pendingBets);
    },
    acceptBetSol: async function() {
      const amount = web3.toWei(parseInt(document.getElementById("form")[1].value), "ether");
      const id = document.getElementById("form")[0].value;
  
      const {
        acceptBet
      } = this.fitcoin.methods;
      await acceptBet(id).send({
        from: this.account,
        value: amount,
      });
      betManager.currBetId = id;
      return id;
    },
    acceptBet() {
      betId = betManager.acceptBetSol();
      Object.keys(betManager.pendingBets).forEach(bet => {
        if (bet === betId) {
          betManager.acceptedBets[betId] = betManager.pendingBets[betId];
        }
      });
    },
    checkIfStarted() {
      Object.values(betManager.acceptedBets).forEach(bet => {
        if (bet.startDate.isToday()) {
          betManager.ongoingBets[betManager.currBetId] = bet;
          bet.participants.forEach(participant => {
            betManager.ongoingBets[betManager.currBetId][steps][participant] = participant.steps; //get from the fitbit api
          });
          betManager.ongoingBets[betManager.currBetId][ttg] = moment().toNow(
            bet.startDate.add(1, "d")
          );
        }
      });
    },
    checkIfRecent(betId) {
      //check if any ongoingBets have finished, if so, remove it and add it to recentBets
      Object.values(betManager.ongoingBets).forEach(bet => {
        if (bet.startDate.add(1, "d").isAfter(moment())) {
          betManager.recentBets[betId][participants] = bet.participants;
          betManager.recentBets[betId][wager] = bet.wager;
          betManager.recentBets[betId][startDate] = bet.startDate;
          delete betManager.ongoingBets[betId];
          //calculate winner and add that to the object
        }
      });
      //check if any recentBets started more than 48 hours ago, if so, remove it from recentBets
      Object.values(betManager.recentBets).forEach(bet => {
        if (bet.startDate.add(2, "d").isBefore(moment())) {
          delete betManager.recentBets[betId];
        }
      });
    }
  };
  window.betManager = betManager;
})();
$('#competitions').ready(window.betManager.checkIfRecent);
$('#competitions').ready(window.betManager.checkIfStarted);
