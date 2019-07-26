(function() {
    // import moment from 'moment';
    // const moment = require('moment');
    // moment().format();
    console.log('yup');
  const betManager = {
    pendingBets:  {},
    acceptedBets: {},
    ongoingBets: {},
    recentBets: {},
    //get betId
    // betManager() {
    // //   const moment = require('moment');
    // //   moment().format();
    // //   console.log('yup');
    // },

    makeBet(participants, wager, startDate, betId) {
      //participants is an array of all participants
    console.log(participants, wager, startDate, betId);
    console.log(betManager.pendingBets);
      betManager.pendingBets[betId] = {participants: participants, wager: wager, startDate: startDate};
    },
    acceptBet(betId) {
        console.log('accepting');
      Object.keys(betManager.pendingBets).forEach(bet => {
        if (bet === betId) {
          betManager.acceptedBets[betId] = betManager.pendingBets[betId];
        }
      });
    },
    checkIfStarted(betId) {
        console.log('checking');
      Object.values(betManager.acceptedBets).forEach(bet => {
        if (bet.startDate.isToday()) {
          betManager.ongoingBets[betId] = bet;
          bet.participants.forEach(participant => {
            betManager.ongoingBets[betId][steps][participant] = participant.steps; //get from the fitbit api
          });
          betManager.ongoingBets[betId][ttg] = moment().toNow(
            bet.startDate.add(1, "d")
          );
        }
      });
    },
    checkIfRecent(betId) {
        console.log('recent');
      //check if any ongoingBets have finished, if so, remove it and add it to recentBets
      console.log(betManager.ongoingBets);
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