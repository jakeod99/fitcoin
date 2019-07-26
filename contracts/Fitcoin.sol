pragma solidity >=0.4.21 <0.6.0;
import './Bet.sol';

contract Fitcoin {

  event createdCompetition(uint betSize, address payable indexed _from, address payable indexed player, uint id);

  mapping (uint => Bet) public bets;
  uint[] allBets;
  uint public id;

  constructor() public {
    id = 0;
  }

  function createCompetition(uint _betSize, address payable _player) public payable returns (uint){
    id++;
    Bet newBet = new Bet(id, msg.sender, _player, _betSize);
    bets[id] = newBet;
    newBet.addPlayer();
    allBets.push(id);
  }


  function acceptBet(uint _id) public payable {
    require(_id >= 1 && _id <= id, "Bet does not exist!");
    require(msg.value == bets[id].betAmount(), "Incorrect Ethereum value for bet.");
    require(bets[id].player() == msg.sender, "You are not in this competition.");
    bets[_id].addPlayer();
  }

  function cancelBet(uint _id) public {
    require(_id >= 1 && _id <= id, "Bet does not exist!");
    /* require(msg.sender == bets[_id].owner()); */
    /* bool cancelled = bets[_id].cancel(); */
    /* if (cancelled) {
      bets[_id].owner().transfer(bets[_id].betAmount());
    } */
    /* address payable wallet = address(uint160(msg.sender));
    wallet.transfer(1*10**18); */
    bets[_id].owner().transfer(bets[_id].betAmount());
  }

  function payoutBet(uint _id, address payable winner) public {
    /* require(_id >= 1 && _id < id, "Bet does not exist!"); */
    /* require(bets[id].player() == msg.sender, "You are not in this competition."); */
    /* require(bets[_id].players(winner) == true, "Player does not exist!"); */
    /* require(bets[_id].active() == true, "Bet is not running.") */
    bool cancelled = bets[_id].cancel();
    if (cancelled) {
      winner.transfer(bets[_id].total());
    }
  }

  function getLastBet() view public returns (uint) {
    return allBets[allBets.length - 1];
  }

    /* function foo() view public returns(uint) {
      return 4;
    } */

    function getOwner(uint _id) view public returns(address) {
      return bets[_id].owner();
    }

    function betAmount(uint _id) view public returns(uint) {
      return bets[_id].betAmount();
    }

    function getPlayer(uint _id) view public returns(address) {
      return bets[_id].player();
    }


}
