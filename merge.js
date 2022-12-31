const contractFile = require('./compile');
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const infuraId = process.env.INFURA_ID

const Web3 = require('web3');
const web3 = new Web3('https://goerli.infura.io/v3/' + infuraId);
// const web3 = new Web3('https://sepolia.infura.io/v3/' + infuraId);
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const deploy = async() => {
    const contract = new web3.eth.Contract(abi);
    const deployTx = contract.deploy({
        data: bytecode,
        arguments: [10], // 构造函数 initNum 的参数
    });
    const transaction = await web3.eth.accounts.signTransaction(
        {
            data: deployTx.encodeABI(), // 交易内容
            gas: 30000000,
        },
        account.privateKey // 使用钱包私钥签名
    );
    const receipt = await web3.eth.sendSignedTransaction(
        transaction.rawTransaction
    );
    console.log(`Contract address: ${receipt.contractAddress}`); // 获取合约地址

    // const result = await new web3.eth.Contract(JSON.parse(interface))
    //             .deploy({data: bytecode})
    //             .send({
    //             from:accounts[0],
    //             gas:'5000000'
    //             })
    //             .on("error", function (error) {
    //             console.log("error", error);
    //             })
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })