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
export const Greeter = (name: string) => `Hello ${name}`;

const walletAddress: string = '0x31F42841c2db5173425b5223809CF3A38FEde360';
const uniswapV2Router: string = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const chainID: ChainId = ChainId.ROPSTEN;
const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/9e4b802d4ef5426ca365eca832be2466');
const swaprouterABi = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
];
const gasLimit = 150000;

async function SwapETHForToken(inputAmount: CurrencyAmount, path: string[]) {
  //** Data nella quale la transazione viene rifiutata per timeout UNIX Timestamp */
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  const wallet = getSigner();

  const swapContract = new ethers.Contract(uniswapV2Router, swaprouterABi, wallet);

  const gasPrice = await provider.getGasPrice();

  const tx = await swapContract.swapExactETHForTokens(inputAmount.raw, path, walletAddress, deadline, {
    gasLimit: gasLimit,
    gasPrice: gasPrice,
    value: inputAmount.raw.toString(),
  });

  console.log('https://ropsten.etherscan.io/tx/' + tx.hash);

  await tx.wait();
}

function getSigner(): ethers.Wallet {
  const signer: ethers.Wallet = new ethers.Wallet('PER ORA Private key ma poi metamask');
  return signer.connect(provider);
}

async function Snipe(TokenAdressToSnipe: string, amountInETH: string) {
  const tokenToSnipe: Token = await Fetcher.fetchTokenData(chainID, TokenAdressToSnipe, provider);
  const coppiaDiToken: Pair = await Fetcher.fetchPairData(tokenToSnipe, WETH[tokenToSnipe.chainId], provider);
  /** Definisce la rotta del trading  ovvero da ETH verso tokenToSnipe */
  const route = new Route([coppiaDiToken], WETH[tokenToSnipe.chainId]);
  /** Calocla la qta di ether */
  const amountIn = ethers.utils.parseUnits(amountInETH, 'ether');
  //** Calcolo il trade */
  const trade = new Trade(
    route,
    new TokenAmount(WETH[tokenToSnipe.chainId], amountIn.toBigInt()),
    TradeType.EXACT_INPUT
  );
  /** Calcola lo slippage per il  prezzo di uscita del tokensnipe */
  const slippageTolerancehigh = new Percent('20', '100'); // 20.0%

  /** Calcolo il minumo di tokensniper che sono disposto a ricevere  considerato lo slippage */
  const amountOut = trade.minimumAmountOut(slippageTolerancehigh); // needs to be converted to e.g. hex
  //** Path di trasferimento  */
  const path = [WETH[tokenToSnipe.chainId].address, tokenToSnipe.address];

  const tokenAmountOut = await SwapETHForToken(trade.inputAmount, path);

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
}
