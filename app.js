const express = require('express');
const app = express();
const port = 8000;

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

const contractAddress = "0x4690Ce09430c6D98bA0BB975c06a4A4C89196c8c";
const companyAddress = "0x68e4017052A5709E3782703a538eB364F726F1D3";
const accountAddress = "0xCC2808a9c407A562f954a6646472835B06f042df";


app.listen(port, () => {
    console.log('listen port 8000');
})

const web3 = new Web3("http://127.0.0.1:7545");

var myContract = new web3.eth.Contract(contractAbi, contractAddress, {
    from: accountAddress,
});

app.get('/one', async (req, res) => {
    // var myContract = new web3.eth.Contract(contractAbi, contractAddress, {
    //     from: accountAddress,
    // });
    const create = await myContract.methods.selectPlan("0x1aaA0600e8Be6196f933FD21085bfE6Aa935345d", 123, 285412347658758).call({
        from: companyAddress
    });
    console.log(create);
    res.send(create);
})

app.get('/two', async (req, res) => {
    // var myContract = new web3.eth.Contract(contractAbi, contractAddress, {
    //     from: accountAddress,
    // });
    var isPresent = false;
    isPresent = await myContract.methods.checkIfPlanExpired("0x1aaA0600e8Be6196f933FD21085bfE6Aa935345d").call({
        from: companyAddress,
    });
    console.log(isPresent);
    res.send(isPresent);

})


