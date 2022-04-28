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
        "type": "function"
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
        "name": "isAccountPresent",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
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
        "name": "getNoProductOwner",
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
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_ownerId",
                "type": "uint256"
            }
        ],
        "name": "getProductGeneralDetailsOwner",
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
            },
            {
                "internalType": "uint256",
                "name": "_productId",
                "type": "uint256"
            }
        ],
        "name": "getProductStatusDetailsOwner",
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
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addProductOwner",
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
        "name": "getNoProductSupplier",
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
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_supplierId",
                "type": "uint256"
            }
        ],
        "name": "getProductGeneralDetailsSupplier",
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
        "name": "addProductStausSupplier",
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
        "name": "checkIfPlanExpired",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];


const app = express();
const port = 8000;

app.listen(port, () => {
    console.log('listen port 8000');
})

const contractAddress = "0x860Ce059120F2AecfE69331067Fe231c3DDd32EB";
const companyAddress = "0x55E428bfE81f3bF994CE1E3E5f09df49FA38ECee";

const privateKey = Buffer.from('... private key ...', 'hex');

const web3 = new Web3("https://rinkeby.infura.io/v3/6d17d1d302fd468a9ccc16233e5ff1b8");

web3.eth.defaultAccount = companyAddress;

var myContract = new web3.eth.Contract(contractAbi, contractAddress);

// The company 

// C-1 
app.get('/check_created_account', async function (req, res) {
    const address = req.query.accountaddress;
    var value = await myContract.methods.checkIfAccountPresent(address).call({
        from: companyAddress,
    });
    res.send({ 'isAccountPresent': value });
})


// C-2
app.get('/create_account', async (req, res) => {
    const address = req.query.accountaddress;
    const query = await myContract.methods.createAccount(address).encodeABI();

    web3.eth.getTransactionCount(companyAddress, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('60', 'gwei')),
            data: query
        }
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        //Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log(tx)
        });

        res.send(tx);
    })
})


// C-3
app.get('/check_payment_done', async function (req, res) {
    const address = req.query.accountaddress;
    var value = await myContract.methods.checkIfPaymentDone(address).call({
        from: companyAddress,
    });
    res.send({ 'isPaymentDone': value });
})

// C-4
app.get('/select_plan', async (req, res) => {
    const address = req.query.accountaddress;
    const amount = req.query.amountpaid;
    const expiresAt = req.query.planexpiresat;
    const query = await myContract.methods.selectPlan(address, amount, expiresAt).encodeABI();

    web3.eth.getTransactionCount(companyAddress, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('60', 'gwei')),
            data: query
        }
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        // Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log(tx)
        });

        res.send(tx);
    })
})


// C-5
app.get('/check_plan_expired', async function (req, res) {
    const address = req.query.accountaddress;
    var value = await myContract.methods.checkIfPlanExpired(address).call({
        from: companyAddress,
    });
    res.send({ 'isplanExpired': value });
})


// The Owner

// OA-1
app.get('/add_owner', async (req, res) => {
    const address = req.query.accountaddress;
    const ownerName = req.query.name;
    const ownerId = req.query.ownerId;
    const query = await myContract.methods.addOwner(address, ownerName, ownerId).encodeABI();

    web3.eth.getTransactionCount(companyAddress, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('60', 'gwei')),
            data: query
        }
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        // Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log(tx)
        });

        res.send(tx);
    })
})

// OA-2
app.get('/get_no_product_owner', async function (req, res) {
    const address = req.query.accountaddress;
    const ownerId = req.query.ownerId;
    var value = await myContract.methods.getNoProductOwner(address, ownerId).call({
        from: companyAddress,
    });
    res.send({ 'noOfProducts': value });
})

// OA-3
app.get('/get_product_general_details_owner', async function (req, res) {
    const address = req.query.accountaddress;
    const ownerId = req.query.ownerId;
    var value = await myContract.methods.getProductGeneralDetailsOwner(address, ownerId).call({
        from: companyAddress,
    });
    res.send({ 'productDetails': value });
})

// OA-4
app.get('/get_product_status_details_owner', async function (req, res) {
    const address = req.query.accountaddress;
    const ownerId = req.query.ownerId;
    const productId = req.query.productId;
    var value = await myContract.methods.getProductStatusDetailsOwner(address, ownerId, productId).call({
        from: companyAddress,
    });
    res.send({ 'productStatus': value });
})

// OA-5
app.get('/add_product_owner', async (req, res) => {
    const address = req.query.accountaddress;
    const ownerId = req.query.ownerId;
    const productName = req.query.name;
    const query = await myContract.methods.addProductOwner(address, ownerId, productName).encodeABI();

    web3.eth.getTransactionCount(companyAddress, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('60', 'gwei')),
            data: query
        }
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        // Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log(tx)
        });

        res.send(tx);
    })
})

// The Supplier

// SP-1
app.get('/add_supplier', async (req, res) => {
    const address = req.query.accountaddress;
    const supplierName = req.query.name;
    const supplierId = req.query.supplierId;
    const query = await myContract.methods.addSupplier(address, supplierName, supplierId).encodeABI();

    web3.eth.getTransactionCount(companyAddress, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('60', 'gwei')),
            data: query
        }
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        // Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log(tx)
        });

        res.send(tx);
    })
})

// SP-2
app.get('/get_no_product_supplier', async function (req, res) {
    const address = req.query.accountaddress;
    const supplierId = req.query.supplierId;
    var value = await myContract.methods.getNoProductSupplier(address, supplierId).call({
        from: companyAddress,
    });
    res.send({ 'noOfProducts': value });
})

// SP-3
app.get('/get_product_general_details_supplier', async function (req, res) {
    const address = req.query.accountaddress;
    const supplierId = req.query.supplierId;
    var value = await myContract.methods.getProductGeneralDetailsSupplier(address, supplierId).call({
        from: companyAddress,
    });
    res.send({ 'productDetails': value });
})

// SP-4
app.get('/add_product_staus_supplier', async (req, res) => {
    const address = req.query.accountaddress;
    const supplierId = req.query.supplierId;
    const message = req.query.message;
    const productId = req.query.productId;
    const query = await myContract.methods.addProductStausSupplier(address, supplierId, message, productId).encodeABI();

    web3.eth.getTransactionCount(companyAddress, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('60', 'gwei')),
            data: query
        }
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        // Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log(tx)
        });

        res.send(tx);
    })
})