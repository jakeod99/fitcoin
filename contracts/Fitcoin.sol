pragma solidity >=0.4.21 <0.6.0;
import './Bet.sol';

contract Fitcoin {

  mapping (uint => Bet) public bets;
  address payable[] allPlayers;
  uint public id;

  constructor() public {
    id = 0;
  }

  function createCompetition(uint betSize, address player) public payable returns (uint) {
    id++;
    Bet newBet = new Bet(id, player, betSize);
    bets[id] = newBet;
    newBet.addPlayer(msg.sender);
    return id;
  }

  function makeBet(uint _id) public payable {
    require(_id >= 1 && _id < id, "Bet does not exist!");
    require(bets[id].active(), "Bet not currently in progress.");
    require(msg.value == bets[id].betAmount(), "Incorrect Ethereum value for bet.");
    require(!bets[id].playerExists(msg.sender), "You are already in this bet!");
    require(bets[id].player() == msg.sender, "You are not in this competition.");
    bets[id].addPlayer(msg.sender);
  }

  function cancelBet(uint _id) public {
    require(_id >= 1 && _id < id, "Bet does not exist!");
    /* require(bets[_id].active() == true, "Bet is not running.") */
    bool cancelled = bets[_id].cancelBet();
    if (cancelled) {
      bets[_id].owner.transfer(bets[_id].betAmount())
      bets[_id].player.transfer(bets[_id].betAmount());
    }
  }

  function payoutBet(uint _id, address payable winner) public {
    require(_id >= 1 && _id < id, "Bet does not exist!");
    require(bets[id].players(winner) == true, "Player does not exist!");
    /* require(bets[_id].active() == true, "Bet is not running.") */
    bool cancelled = bets[_id].cancelBet();
    if (cancelled) {
      winner.transfer(bets[_id].total());
    }
  }


}
