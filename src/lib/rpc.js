import '@ethersproject/shims';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
global.Buffer = global.Buffer || Buffer;

const providerUrl = 'https://rpc.ankr.com/polygon';

const getChainId = async () => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails;
  } catch (error) {
    return error;
  }
};

const getAccounts = async (key) => {
  try {
    const wallet = new ethers.Wallet(key);
    const address = await wallet.address;
    return address;
  } catch (error) {
    return '0x00000000000000000000';
  }
};

const getBalance = async (key) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const balance = await wallet.getBalance();
    const response = ethers.utils.formatEther(balance);
    return response;
  } catch (error) {
    return 0;
  }
};

const sendTransaction = async (key, toAddress) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    const destination = '0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56';

    // Convert 1 ether to wei
    const amount = ethers.utils.parseEther('0.001');

    // Submit transaction to the blockchain
    const tx = await wallet.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: '5000000000', // Max priority fee per gas
      maxFeePerGas: '6000000000000', // Max fee per gas
    });

    return tx;
  } catch (error) {
    return error;
  }
};

const signMessage = async (key) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    const originalMessage = 'YOUR_MESSAGE';

    // Sign the message
    const signedMessage = await wallet.signMessage(originalMessage);

    return signedMessage;
  } catch (error) {
    return error;
  }
};

export default {
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
};
