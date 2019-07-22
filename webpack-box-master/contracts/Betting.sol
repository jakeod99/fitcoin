pragma solidity >=0.4.21 <0.6.0;

/* import 'openzeppelin-solidity/contracts/ownership/Ownable.sol'; */
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Betting {
  using SafeMath for uint;

  string public name;
  address payable bettor;
  uint currBet;
  address payable owner;
  /* uint public balance; */

  /* event Deposit(uint amount); */
  /* event Bet(uint amount, address bettor); */
  /* event CancelBet() */
  /* event WinBet() */

  constructor(string memory _name) public {
    owner = msg.sender;
    name = _name;
  }

  // payable automatically adds the msg.value
  // some one else calls our requestBet
  function requestBet() public payable {
    /* require(balance > msg.value, "Not enough ethereum in balance."); */
    require(msg.value > 0, "Invalid bet amount.");
    require(currBet != 0, "Bet already in progress.");
    require(msg.sender != owner, "Cannot bet against yourself.");
    bettor = msg.sender;
    // msg.sender is always the person who calls the function
    currBet = msg.value;
  }

  // can be used to decline a bet and when a bet is lost
  function endBet() public {
    require(currBet > 0, "No bet currently in progress");
    bettor.transfer(currBet);
    currBet = 0;
  }

  function winBet() public {
    require(currBet > 0, "No bet currently in progress");
    owner.transfer(currBet);
    currBet = 0;
  }


}
