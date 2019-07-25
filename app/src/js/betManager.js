(function() {
    this.pendingBets = {};
    this.acceptedBets = {};
    this.ongoingBets = {};
    this.recentBets = {};
    // import moment from 'moment';
    // const moment = require('moment');
    // moment().format();
    console.log('yup');
  const betManager = {
    //get betId
    betManager() {
      this.pendingBets = {};
      this.acceptedBets = {};
      this.ongoingBets = {};
      this.recentBets = {};
    //   const moment = require('moment');
    //   moment().format();
    //   console.log('yup');
    },

    makeBet(participants, wager, startDate, betId) {
      //participants is an array of all participants
    console.log(participants, wager, startDate, betId);
    console.log(this.pendingBets);
      this.pendingBets[betId] = {participants: participants, wager: wager, startDate: startDate};
    },
    acceptBet(betId) {
        console.log('accepting');
      Object.keys(this.pendingBets).forEach(bet => {
        if (bet === betId) {
          this.acceptedBets[betId] = this.pendingBets[betId];
        }
      });
    },
    checkIfStarted(betId) {
        console.log('checking');
      Object.values(this.acceptedBets).forEach(bet => {
        if (bet.startDate.isToday()) {
          this.ongoingBets[betId] = bet;
          bet.participants.forEach(participant => {
            this.ongoingBets[betId][steps][participant] = participant.steps; //get from the fitbit api
          });
          this.ongoingBets[betId][ttg] = moment().toNow(
            bet.startDate.add(1, "d")
          );
        }
      });
    },
    checkIfRecent(betId) {
      //check if any ongoingBets have finished, if so, remove it and add it to recentBets
      Object.values(this.ongoingBets).forEach(bet => {
        if (bet.startDate.add(1, "d").isAfter(moment())) {
          this.recentBets[betId][participants] = bet.participants;
          this.recentBets[betId][wager] = bet.wager;
          this.recentBets[betId][startDate] = bet.startDate;
          delete this.ongoingBets[betId];
          //calculate winner and add that to the object
        }
      });
      //check if any recentBets started more than 48 hours ago, if so, remove it from recentBets
      Object.values(this.recentBets).forEach(bet => {
        if (bet.startDate.add(2, "d").isBefore(moment())) {
          delete this.recentBets[betId];
        }
      });
    }
  };

  window.betManager = betManager;
})();

window.betManager.betManager();
