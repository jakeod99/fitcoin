import moment from 'moment';

class betManager {
constructor() {
    this.pendingBets = {};
    this.acceptedBets = {};
    this.ongoingBets = {};
    this.recentBets = {};
}

makeBet = (betId, participants, wager, startDate) => { //participants is an array of all participants
    this.pendingBets[betId] = {participants: participants, wager: wager, startDate: startDate};
}
acceptBet = (betId) => {
    Object.keys(this.pendingBets).forEach((bet) => {
        if (bet === betId) {
            this.acceptedBets[betId] = this.pendingBets[betId];
        };
    });
}
checkIfStarted = (betId) => {
    Object.values(this.acceptedBets).forEach((bet) => {
        if (bet.startDate.isToday()) {
            this.ongoingBets[betId] = bet;
            bet.participants.forEach((participant) => {
                this.ongoingBets[betId][steps][participant] = participant.steps; //get from the fitbit api
            });
            this.ongoingBets[betId][ttg] = moment().toNow(bet.startDate.add(1,'d'));
        }
    });
}
// checkIfRecent = (betId) => {
//     Object.values(this.ongoingBets).forEach((bet) => {
//         if ()
//     })
// }
}