const contractFile = require('./compile');
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const infuraId = process.env.INFURA_ID
const contractAddress = process.env.CONTRACT_ADDRESS

const Web3 = require('web3');
const web3 = new Web3('https://goerli.infura.io/v3/' + infuraId);
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const trans = async() => {
    // add
    const contract = new web3.eth.Contract(abi, contractAddress);
    const add = contract.methods.add(10);
    const transaction = await web3.eth.accounts.signTransaction(
        {
            data: add.encodeABI(),
            gas: 8000000,
            to: contractAddress
        },
        account.privateKey
    );  // 签署交易
    const receipt = await web3.eth.sendSignedTransaction(
        transaction.rawTransaction
    );  // 广播交易
    console.log(`Transaction receipt: ${receipt.transactionHash}`)

    const num = await contract.methods.get().call()
    console.log(`Number stored: ${num}`)
}

trans()
    .then(() => process.exit(0))
    .catch((error) =>{
        console.error(error);
        process.exit(1);
    })