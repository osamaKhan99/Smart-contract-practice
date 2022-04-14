require('dotenv').config();
const { ethers } = require('ethers');
const Contract = require("../artifacts/contracts/helloworld.sol/HelloWorld.json")

console.log(JSON.stringify(Contract.abi))

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.DEPLOYED_ADDRESS;

const provider = new ethers.providers.AlchemyProvider(network='ropsten', API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, signer);

async function main(){
    const message = await helloWorldContract.message();
    console.log("The message is: ", message);

    console.log("Updating the message...");
    const tx = await helloWorldContract.update("Hello Osama!");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The new message is: ", newMessage);
}
main()