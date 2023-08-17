import { Network, Alchemy, Utils, Wallet } from 'alchemy-sdk';
import dotenv from "dotenv";
dotenv.config();
const { API_KEY, PRIVATE_KEY } = process.env;
const wallet = new Wallet(PRIVATE_KEY)

const settings= {
    apiKey:API_KEY,
    network:Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings)

async function main(){
    // const blockNumber = await alchemy.core.getBlockNumber()
    // console.log(blockNumber)
    // //const block = await alchemy.core.getBlock(blockNumber)
    // //console.log(block)
    // const balance = await alchemy.core.getBalance("vitalik.eth")
    // console.log(Utils.formatEther(balance))

    // const gasPrice = await alchemy.core.getGasPrice()
    // console.log(Utils.formatUnits(gasPrice,"gwei"))

    // const shashiAddress='0x40221961F27B624d9F3C0B470A1317054aDf984c';

    // const balance = await alchemy.core.getTokenBalances(shashiAddress)
    // console.log(balance)

    // const nft = await alchemy.nft.getNftsForOwner("vitalik.eth")
    // console.log(nft)

    const transaction = {
        to: "0x8620E8271430680baEA14fe220cFe20049D83CCf",
        value : Utils.parseEther("0.001"),
        gasLimit : "21000",
        maxPriorityFeePerGas: Utils.parseUnits("5","gwei"),
        maxFeePerGas : Utils.parseUnits("20","gwei"),
        nonce:await alchemy.core.getTransactionCount(wallet.getAddress()),
        type:2,
        chainId:5 //Correspnds to ETH_GOERLI
    };

    const rawTransaction = await wallet.signTransaction(transaction);
    const txn = await alchemy.transact.sendTransaction(rawTransaction)
    console.log(txn)
}


main()