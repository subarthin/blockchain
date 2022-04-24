//import { contractAbi } from "./contractABI.js";
const myMod = require('./contractABI.js');
const express = require('express');
var Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const contractAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "accountsByAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "accountId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isPaymentDone",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "amountPaid",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "planExpiresAt",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "company",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isAccountPresent",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "ownersById",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "ownerId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "suppliersById",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "supplierId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_ownerId",
                "type": "uint256"
            }
        ],
        "name": "addOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_ownerId",
                "type": "uint256"
            }
        ],
        "name": "getNoProduct",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_ownerId",
                "type": "uint256"
            }
        ],
        "name": "getProductGeneralDetails1",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "productId",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct SupplyChain.ProductDetails[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_ownerId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_productId",
                "type": "uint256"
            }
        ],
        "name": "getProductStatusDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "productId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "publisherId",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct SupplyChain.ProductStatusDeails[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_ownerId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_supplierId",
                "type": "uint256"
            }
        ],
        "name": "addSupplier",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_supplierId",
                "type": "uint256"
            }
        ],
        "name": "getNoProduct2",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_supplierId",
                "type": "uint256"
            }
        ],
        "name": "getProductGeneralDetails2",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "productId",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct SupplyChain.ProductDetails[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_supplierId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_message",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_productId",
                "type": "uint256"
            }
        ],
        "name": "addProductStaus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            }
        ],
        "name": "checkIfAccountPresent",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            }
        ],
        "name": "createAccount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            }
        ],
        "name": "checkIfPaymentDone",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amountPaid",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_planExpiresAt",
                "type": "uint256"
            }
        ],
        "name": "selectPlan",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            }
        ],
        "name": "checkIfPlanExpired",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
];


const app = express();
const port = 8000;

app.listen(process.env.PORT || 8000, () => {
    console.log('listen port 8000');
})

const contractAddress = "0xfb3b6D7B30149cFAE0CdeDF1A5e1D1DE1C3048b0";
const companyAddress = "0x55E428bfE81f3bF994CE1E3E5f09df49FA38ECee";

const privateKey1 = Buffer.from('295d52683df9a4d36edadef7428b81278ee6aa821128c4fec95b8409c1af5160', 'hex');

const web3 = new Web3("https://rinkeby.infura.io/v3/6d17d1d302fd468a9ccc16233e5ff1b8");

web3.eth.defaultAccount = companyAddress;

var myContract = new web3.eth.Contract(contractAbi, contractAddress);


app.get('/create_account', async (req, res) => {
    const query = await myContract.methods.createAccount("0x1aaA0600e8Be6196f933FD21085bfE6Aa935345d").encodeABI();

    web3.eth.getTransactionCount(companyAddress, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
            data: query
        }
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey1);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        // Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log(tx)
        });

        res.send(tx);
    })
})

app.get('/check_created_account', async (req, res) => {
    var isPresent = false;
    isPresent = await myContract.methods.checkIfAccountPresent("0x1aaA0600e8Be6196f933FD21085bfE6Aa935345d").call({
        from: companyAddress,
    });
    console.log(isPresent);
    res.send(isPresent);
})


