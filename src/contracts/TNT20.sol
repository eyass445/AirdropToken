/**
 *Submitted for verification at thetatoken.org on 2021-02-08
 */
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


library SafeMath {

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return payable(msg.sender);
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

interface ITNT20 {
    
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Token is Context, ITNT20  {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    address private _admin;
    //address private _airdrop;
    //address private _freeToken;
    uint256 public time;
    address to = 0x69761F962D7E4a142DC882B98C331B5b80005249;

    bool private _mintable;

    uint256 private _totalSupply;
    
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor (string memory name_, string memory symbol_, uint8 decimals_, uint256 initialSupply_, bool mintable_ )  {
        require(msg.sender != address(0x0), "cannot deploy the token from address 0x0");
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        _admin = msg.sender;
        _mintable = mintable_;
        //_airdrop = airDrop;
        //_freeToken = freeToken;
        time = block.timestamp;
        _mint(_admin, initialSupply_);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }
    
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "TNT20: transfer amount exceeds allowance"));
        return true;
    }
    
    function mintable() public view returns (bool) {
        return _mintable;
    }
    
    function mint(uint256 amount) public returns (bool) {
        require(_mintable, "the token is not mintable");
        require(msg.sender == _admin, "only admin can mint new tokens");
        _mint(_admin, amount);
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "TNT20: transfer from the zero address");
        require(recipient != address(0), "TNT20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount, "TNT20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    function _mint(address account,  uint256 amount) internal virtual {
        require(account != address(0), "TNT20: mint to the zero address");

         _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);

        //_totalSupply = _totalSupply.add(amount);
        //uint256 _tTotransfer = _totalSupply;
        
        //  uint256 airDrop = (_totalSupply.mul(10)).div(100);
        //  _tTotransfer = _tTotransfer.sub((_totalSupply.mul(10)).div(100));

        //  uint256 freeToken = (_totalSupply.mul(40)).div(100);
        //  _tTotransfer = _tTotransfer.sub((_totalSupply.mul(40)).div(100));


        //_balances[account] = _balances[account].add(_tTotransfer);
        // _balances[_airdrop] = _balances[_airdrop].add(airDrop);
        // _balances[_freeToken] = _balances[_freeToken].add(freeToken);

        //emit Transfer(address(0), account, _tTotransfer);
        // emit Transfer(address(0) , _airdrop , airDrop);
        // emit Transfer(address(0) , _freeToken , freeToken);
    }

    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "TNT20: approve from the zero address");
        require(spender != address(0), "TNT20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

        
}
