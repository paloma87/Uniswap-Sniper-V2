import {
  ChainId,
  Token,
  Fetcher,
  WETH,
  TokenAmount,
  CurrencyAmount,
  Pair,
  Route,
  Trade,
  TradeType,
  Percent,
} from '@uniswap/sdk';
import { BigNumber, ethers } from 'ethers';
import config from '../config.json';
import genericErc20Abi from '../erc20Abi.json';
export const Greeter = (name: string) => `Hello ${name}`;

const chainID: ChainId = ChainId[config.chainID as keyof typeof ChainId];

const provider = new ethers.providers.JsonRpcProvider(config.providerUrl);

async function GetGasPrice(): Promise<ethers.BigNumber> {
  if (config.gasByConfig) return ethers.utils.parseUnits(String(config.customGasGwei), 'gwei');
  else return await provider.getGasPrice();
}

/**
 * la funzione approva la spesa da uniswap del token sul proprio wallet
 * @param tokenAdressToSnipe token da approvare
 */
async function approveTokenUniswap(tokenAdressToSnipe: string) {
  const wallet = getSigner();
  const contract = new ethers.Contract(tokenAdressToSnipe, genericErc20Abi, wallet);
  await contract.approve(config.uniswapV2Router, String(ethers.constants.MaxInt256));
}

async function swapExactTokensForETH(
  amountIn: CurrencyAmount,
  amountOutMin: CurrencyAmount,
  path: string[],
): ethers.BigNumber {
  /** Timestamp unix nella quale la transazione viene rigettata */
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  const wallet = getSigner();

  const swapContract = new ethers.Contract(config.uniswapV2Router, config.swaprouterABi, wallet);

  const gasPrice = await GetGasPrice();

  const tx = await swapContract.swapExactTokensForETH(
    amountOutMin.raw.toString(),
    path,
    config.walletAddress,
    deadline,
    {
      gasLimit: config.gasLimit,
      gasPrice: gasPrice,
      value: amountIn.raw.toString(),
    },
  );

  console.log(tx);
  console.log('https://ropsten.etherscan.io/tx/' + tx.hash);
  const result = await tx.wait();
  console.log(result);
  if (result.confirmations == 1 && result.status == 1) {
    console.log('Transaction Mined');
    /** Recupera il bilancio del token comprato */
    const balance = await balanceOf(path[1]);
    console.log('Il bilancio del token sul wallet è: ' + ethers.utils.formatUnits(String(balance), '18'));
    return balance;
  } else {
    console.log('Qualcosa è andato storto');
  }
  return ethers.constants.Zero;
}

async function swapETHForToken(
  amountIn: CurrencyAmount,
  amountOutMin: CurrencyAmount,
  path: string[],
): ethers.BigNumber {
  /** Timestamp unix nella quale la transazione viene rigettata */
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  const wallet = getSigner();

  const swapContract = new ethers.Contract(config.uniswapV2Router, config.swaprouterABi, wallet);

  const gasPrice = await GetGasPrice();

  const tx = await swapContract.swapExactETHForTokens(
    amountOutMin.raw.toString(),
    path,
    config.walletAddress,
    deadline,
    {
      gasLimit: config.gasLimit,
      gasPrice: gasPrice,
      value: amountIn.raw.toString(),
    },
  );

  console.log(tx);
  console.log('https://ropsten.etherscan.io/tx/' + tx.hash);
  const result = await tx.wait();
  console.log(result);
  if (result.confirmations == 1 && result.status == 1) {
    console.log('Transaction Mined');
    /** Recupera il bilancio del token comprato */
    const balance = await balanceOf(path[1]);
    console.log('Il bilancio del token sul wallet è: ' + ethers.utils.formatUnits(String(balance), '18'));
    return balance;
  } else {
    console.log('Qualcosa è andato storto');
  }
  return ethers.constants.Zero;
}

async function balanceOf(tokenAdress: string): Promise<BigNumber> {
  const contract = new ethers.Contract(tokenAdress, genericErc20Abi, provider);
  const balance = (await contract.balanceOf(config.walletAddress)).toString();
  return balance;
}

function getSigner(): ethers.Wallet {
  const signer = new ethers.Wallet('c016e5db8729f3854ff75656664e70682934b31b238dc75321c01db280335bce');
  return signer.connect(provider);
}

async function isTransactionMined(transactionHash: string) {
  while (true) {
    const txReceipt = await provider.getTransactionReceipt(transactionHash);
    console.log(txReceipt);
    if (txReceipt && txReceipt.blockNumber) {
      return true;
    }
  }
}

async function snipe(TokenAdressToSnipe: string, amountInETH: string): ethers.BigNumber {
  const tokenToSnipe: Token = await Fetcher.fetchTokenData(chainID, TokenAdressToSnipe, provider);
  const coppiaDiToken: Pair = await Fetcher.fetchPairData(tokenToSnipe, WETH[tokenToSnipe.chainId], provider);
  /** Definisce la rotta del trading  ovvero da ETH verso tokenToSnipe */
  const route = new Route([coppiaDiToken], WETH[tokenToSnipe.chainId]);
  /** Calocla la qta di ether */
  const amountIn = ethers.utils.parseUnits(amountInETH, 'ether');
  /** Calcolo il trade */
  const trade = new Trade(
    route,
    new TokenAmount(WETH[tokenToSnipe.chainId], amountIn.toBigInt()),
    TradeType.EXACT_INPUT,
  );
  /** Calcola lo slippage per il  prezzo di uscita del tokensnipe */
  const slippageTolerancehigh = new Percent('20', '100'); // 20.0%

  /** Calcolo il minumo di tokensniper che sono disposto a ricevere  considerato lo slippage */
  const amountOut = trade.minimumAmountOut(slippageTolerancehigh); // needs to be converted to e.g. hex
  /** Path di trasferimento  */
  const path = [WETH[tokenToSnipe.chainId].address, tokenToSnipe.address];

  /** Lancia e attende lo swap */
  const tokenAmountOut = await swapETHForToken(trade.inputAmount, amountOut, path);

  return tokenAmountOut;
}

/** QUESTA E DA FINIRE E FARE I TEST */
async function makeMoney(TokenAdressToSell: string, amountToken: ethers.BigNumber): Promise<string> {
  const tokenToSnipe: Token = await Fetcher.fetchTokenData(chainID, TokenAdressToSell, provider);
  const coppiaDiToken: Pair = await Fetcher.fetchPairData(tokenToSnipe, WETH[tokenToSnipe.chainId], provider);
  /** Definisce la rotta del trading  ovvero da ETH verso tokenToSnipe */
  const route = new Route([coppiaDiToken], WETH[tokenToSnipe.chainId]);
  /** Calcolo il trade */
  const trade = new Trade(
    route,
    new TokenAmount(WETH[tokenToSnipe.chainId], amountToken.toBigInt()),
    TradeType.EXACT_INPUT,
  );

  const slippageToleranceLow = new Percent('5', '1000'); // 0.5%

  /** Calcolo il minumo di tokensniper che sono disposto a ricevere  considerato lo slippage */
  const amountOut = trade.minimumAmountOut(slippageToleranceLow); // needs to be converted to e.g. hex

  const path = [tokenToSnipe.address, WETH[tokenToSnipe.chainId].address];

  /** Lancia e attende lo swap */
  const tokenAmountOut = await swapExactTokensForETH(trade.inputAmount, amountOut, path);

  return tokenAmountOut.toString();
}

/**
 * Funzione per effettuare lo snipe del token
 * @param tokenAdressToSnipe indirizzo del token
 * @param amountInETH        ammontare in ether dell'opera<zione
 * @param timeBeforeSell     tempo in ms per il quale si tiene il token
 * @returns ritorna il delta tra AmountInETH e il valore di rivendita del token
 */
export function SnipeToken(tokenAdressToSnipe: string, amountInETH: string, timeBeforeSell: number): number {
  setTimeout(() => {
    // TODO
  }, timeBeforeSell);

  return 232;
}

async function main() {
  //Quesat puo girare in parallelo serve per la vendita
  approveTokenUniswap('0x31F42841c2db5173425b5223809CF3A38FEde360');

  // Test di uno snipe
  const amountOut = await snipe('0x31F42841c2db5173425b5223809CF3A38FEde360', '0.01');

  //Questa vende il token
  const amountETH = await makeMoney('0x31F42841c2db5173425b5223809CF3A38FEde360', amountOut);

  console.log('log');
}

main();
