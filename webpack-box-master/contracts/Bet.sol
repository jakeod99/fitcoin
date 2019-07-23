pragma solidity >=0.4.21 <0.6.0;

contract Bet {

  uint public id;
  uint public total;
  uint public betAmount;
  bool public active;
  address payable owner;
  mapping (address => bool) public players;
  address payable[] public allPlayers;
  string public name;

  constructor(uint _id, string memory _name, uint _bet) public {
    owner = msg.sender;
    id = _id;
    name = _name;
    betAmount = _bet;
    active = true;
    total = 0;
  }

  function addPlayer(address payable _player) public {
    players[_player] = true;
    total += betAmount;
  }

  function cancelBet() public returns (bool) {
    require(active, "Bet is not running.");
    require(msg.sender == owner, "You are not the owner of this bet.");
    active = false;
    return true;
  }

  function playerExists(address payable _player) view public returns (bool) {
    return players[_player];
  }

  function numPlayers() view public returns (uint) {
    return allPlayers.length;
  }


}
