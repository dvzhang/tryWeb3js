const contractFile = require('./compile');
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const infuraId = process.env.INFURA_ID
const contractAddress = process.env.CONTRACT_ADDRESS

const { ethers } = require('ethers')
const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/' + infuraId)
const wallet = new ethers.Wallet(privateKey, provider)

const trans = async() => {
    const contract = new ethers.Contract(contractAddress, abi, provider)
    
    const number1 = await contract.get()
    console.log("Number is " + number1)

    const contractWithWallet = contract.connect(wallet)
    const transaction = await contractWithWallet.add(10)
    await transaction.wait()
    console.log(transaction)

    const number2 = await contract.get()
    console.log("Number is " + number2)
}

trans()
    .then(() => process.exit(0))
    .catch((error) =>{
        console.error(error)
        process.exit(1)
    })
