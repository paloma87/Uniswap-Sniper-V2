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
import { ethers } from 'ethers';
import config from '../config.json';
export const Greeter = (name: string) => `Hello ${name}`;

const chainID: ChainId = ChainId[config.chainID as keyof typeof ChainId];

const provider = new ethers.providers.JsonRpcProvider(config.providerUrl);

async function SwapETHForToken(amountIn: CurrencyAmount,amountOutMin: CurrencyAmount, path: string[]) {
  /** Timestamp unix nella quale la transazione viene rigettata */
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  const wallet = getSigner();

  const swapContract = new ethers.Contract(config.uniswapV2Router, config.swaprouterABi, wallet);

  const gasPrice = await provider.getGasPrice();

  const tx = await swapContract.swapExactETHForTokens(amountOutMin.raw.toString(), path, config.walletAddress, deadline, {
    gasLimit: config.gasLimit,
    gasPrice: gasPrice,
    value: amountIn.raw.toString(),
  });

  console.log('https://ropsten.etherscan.io/tx/' + tx.hash);

  await tx.wait();
}

function getSigner(): ethers.Wallet {
  
   const signer = new ethers.Wallet("56a7413102be35b5d0b54b16074fbb3b45b9e194ef63632aed39902ece5c5020"); 
   return signer.connect(provider);
}

async function isTransactionMined (transactionHash: string) {
  while(true)
  {
    const txReceipt = await provider.getTransactionReceipt(transactionHash);
   console.log(txReceipt);
    if (txReceipt && txReceipt.blockNumber) {
        return true;
    }
  }
}
 

async function Snipe(TokenAdressToSnipe: string, amountInETH: string) {
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
  const tokenAmountOut = await SwapETHForToken(trade.inputAmount,amountOut, path);

  return tokenAmountOut;
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

function main() {
  // Test di uno snipe
    Snipe('0x31F42841c2db5173425b5223809CF3A38FEde360', '0.01');

   console.log('log');
}

main();
