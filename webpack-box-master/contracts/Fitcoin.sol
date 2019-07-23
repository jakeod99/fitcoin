pragma solidity >=0.4.21 <0.6.0;
import './Bet.sol';

contract Fitcoin {

  mapping (uint => Bet) public bets;
  address payable[] allPlayers;
  uint public id;

  constructor() public {
    id = 0;
  }

  function createBet(string memory _name, uint betSize) public returns (uint) {
    id++;
    Bet newBet = new Bet(id, _name, betSize);
    bets[id] = newBet;
    return id;
  }

  function makeBet(uint _id) public payable {
    require(_id >= 1 && _id < id, "Bet does not exist!");
    require(bets[id].active(), "Bet not currently in progress.");
    require(msg.value == bets[id].betAmount(), "Incorrect Ethereum value for bet.");
    require(!bets[id].playerExists(msg.sender), "You are already in this bet!");
    bets[id].addPlayer(msg.sender);
  }

  function cancelBet(uint _id) public {
    require(_id >= 1 && _id < id, "Bet does not exist!");
    /* require(bets[_id].active() == true, "Bet is not running.") */
    bool cancelled = bets[_id].cancelBet();
    if (cancelled) {
      for (uint i = 0; i < bets[_id].numPlayers(); i++) {
        bets[_id].allPlayers(i).transfer(bets[_id].betAmount());
      }
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
