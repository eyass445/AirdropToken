import './App.css';
import React, {useState, useEffect} from 'react'
import Web3 from "web3";
import Swal from 'sweetalert2'
import jsonData from './json/address.json'; 



const airdropAddriss = "0xC958DA62Eca89fa12a91D0e48e0333f33B89fE89"
const airdropApi = [
	{
		"inputs": [
			{
				"internalType": "contract ITNT20",
				"name": "_token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_addresses",
				"type": "address[]"
			}
		],
		"name": "doAirdrop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pageNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_perPage",
				"type": "uint256"
			}
		],
		"name": "getWinners",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "Winner_",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "totalList_",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "winnerIndex",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "winners",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


const tokenAddriss = "0xdc332055a28C64dDaB99e4D0b61570581fC0823D"
const tokenApi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const web3 = new Web3(window.ethereum)
const contract = new web3.eth.Contract(airdropApi, airdropAddriss);

const tokenContract = new web3.eth.Contract(tokenApi, tokenAddriss);


function Airdrop() {

    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState("Plz Connect Your Wallet");
	const { ethereum } = window;
	const [loading, setLoading] = useState(true);
    const [countButton, setCountButton] = useState([]) 
    const [count, setCount] = useState(120)
    var [winners, setWinners] = useState([]);
    const [countAd, setCountAd] = useState()
    const [balance , setBalance] = useState();



    function isMobileDevice() {
        return "ontouchstart" in window || "onmsgesturechange" in window;
    }



    const connectWallet = async () => {

        if (isMobileDevice() && !ethereum) {
          window.open(
            `https://metamask.app.link/dapp/${
              window.location.origin.split("//")[1]
            }`
          );
        }
    
        if (!ethereum) {
          setErrorMessage("install metamask  /b install metamask");
          window.open("https://metamask.io/download.html", "_blank");
    
          return;
        }
    
        const provider = new Web3(ethereum)

        try {
          setLoading(true);
    
          const result = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const balance = await provider.eth.getBalance(ethereum.selectedAddress)
    
          const account = {
            address: result[0],
            balance: Number(web3.utils.fromWei(balance, 'ether')).toFixed(4),
          };

          // 
          console.log(account)
          setDefaultAccount(result[0])
          setErrorMessage("");
        } catch (error) {
          const errors = {
            "-32002": error.message,
            4001: "You have rejected the request.",
          };
          setErrorMessage(errors[error.code]);
          setLoading(false);
    
          console.log(error);
        }
    };

    const getBalance = () =>{
      tokenContract.methods.balanceOf(airdropAddriss).call({from:defaultAccount}).then(balance => {
        setBalance(balance)
      })
    }


    const convertToJson = () => {

        let menuItems = [];

        for (var i = 0; i < jsonData.length; i += count) {
            menuItems.push(i); 
        } 
        setCountButton(menuItems)

    }

    const getWinners = () => {

      contract.methods.getWinners(0,5000).call({from:defaultAccount}).then(tx => {

        setWinners([])
        tx[0].forEach(element => {
          setWinners(winners => [...winners, element ])
        });

        setCountAd(tx[1])

        console.log(winners.length)


      }).catch(e => { 
        console.log(e+"")
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e+''
        })
        if (e.code === 4001){
          console.log("لم يتم سحب شي ,, لوجود مشكلة")
        } 
      });

    }

    const doAirdrop = async (e, from, to) => {
        e.stopPropagation();
    
        e.target.children[0].classList.remove('sr-only');
    
        let claimerAddress = [];
    
        for (var i = from; i < to; i++) {
          claimerAddress.push(jsonData[i].address);
        }

        console.log(claimerAddress)

        contract.methods.doAirdrop(claimerAddress).send({from:defaultAccount}).then(tx => {
            Swal.fire(
              'تم توزيع العملة',
              '',
              'success'
            )

          }).catch(e => { 
            console.log(e+"")
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e+''
            })
            if (e.code === 4001){
              console.log("لم يتم سحب شي ,, لوجود مشكلة")
            } 
        });
    
      }

    useEffect(() => {
		connectWallet()
        convertToJson()
	}, []);


    return (
        <div className="App">
            <br></br>
            {defaultAccount}
            <br></br>
            <button className='btn-x' onClick={connectWallet} >connect Wallet</button>
            <br></br>
            <hr />
            <div>
            <button className='btn-x' onClick={getBalance} >get Balance</button>
            <h3>IYAS Count : {balance}</h3>
            </div>


            {/* <button className='btn-x' onClick={getWinners} >get Winners</button>
            <br></br> */}

            {/* <br></br> */}

            {
                countButton.map((item, index) => {
                  var to = item + count
                  if (index == countButton.length - 1) {
                    to = jsonData.length
                  }
                  return (<button type="button" onClickCapture={e => doAirdrop(e, item, to)} className="btn btn-success ml-2 mb-2">From {item} To {to}
                    <span className="spinner-border spinner-border-sm sr-only"></span>
                  </button>)
                })

            }


            <br></br>

            <hr />

            <div >
              {/* <input onChange={(e) => {setCountAd(e.target.value);}} placeholder='count address' type="number" /> */}
              <button type="submit" onClick={getWinners}>get Winners</button>
            </div>

            <h3>Number of Airdrop Winners :  {countAd}</h3>

            <br></br>

            <table id="customers" >
            <tbody>
              {winners.map((ape, index) => (
                <tr>
                  <th>{ape}</th>
                </tr>
              ))}
              </tbody>
            </table>
        </div>
    )
}

export default Airdrop;