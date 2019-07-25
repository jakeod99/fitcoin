pragma solidity >=0.4.21 <0.6.0;

contract Bet {

  uint public id;
  uint public total;
  uint public betAmount;
  bool public active;
  address payable public owner;
  address payable public player;
  /* mapping (address => bool) public players;
  address payable[] public allPlayers;
  string public name; */

  constructor(uint _id, address payable _player, uint _bet) public {
    owner = msg.sender;
    id = _id;
    player = _player;
    betAmount = _bet;
    active = false;
    total = betAmount;
  }

  function addPlayer() public {
    /* require(msg.sender != owner, "You already bet!"); */
    /* players[_player] = true; */
    if(msg.sender == player) {
      active = true;
    }
    total += betAmount;
  }

  function cancelBet() public returns (bool) {
    require(active, "Bet is not running.");
    require(msg.sender == owner, "You are not the owner of this bet.");
    active = false;
    return true;
  }

  /* function playerExists(address payable _player) view public returns (bool) {
    return players[_player];
  } */

  /* function numPlayers() view public returns (uint) {
    return allPlayers.length;
  } */


}
