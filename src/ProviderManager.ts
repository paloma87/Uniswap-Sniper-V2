import { BigNumber, ethers } from 'ethers';
import config from '../config.json';
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
import genericErc20Abi from '../erc20Abi.json';

export class ProviderManager {
  private chainID: ChainId = ChainId[config.chainID as keyof typeof ChainId];
  private provider: any;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(config.providerUrl);
  }

  public async ApproveTokenUniswap(tokenAdressToSnipe: string) {
    const wallet = this.GetSigner();
    const contract = new ethers.Contract(tokenAdressToSnipe, genericErc20Abi, wallet);
    return contract.approve(config.uniswapV2Router, String(ethers.constants.MaxInt256));
  }

  public async MakeMoney(TokenAdressToSell: string, amountToken: ethers.BigNumber): Promise<ethers.BigNumber> {
    const tokenToSnipe: Token = await Fetcher.fetchTokenData(this.chainID, TokenAdressToSell, this.provider);
    const coppiaDiToken: Pair = await Fetcher.fetchPairData(tokenToSnipe, WETH[tokenToSnipe.chainId], this.provider);
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
    const tokenAmountOut = await this.swapExactTokensForETH(trade.inputAmount, amountOut, path);

    return tokenAmountOut;
  }

  public async Snipe(TokenAdressToSnipe: string, amountInETH: string): Promise<ethers.BigNumber> {
    const tokenToSnipe: Token = await Fetcher.fetchTokenData(this.chainID, TokenAdressToSnipe, this.provider);
    const coppiaDiToken: Pair = await Fetcher.fetchPairData(tokenToSnipe, WETH[tokenToSnipe.chainId], this.provider);
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
    const tokenAmountOut = await this.SwapETHForToken(trade.inputAmount, amountOut, path);

    return tokenAmountOut;
  }

  private async BalanceOf(tokenAdress: string): Promise<BigNumber> {
    const contract = new ethers.Contract(tokenAdress, genericErc20Abi, this.provider);
    const balance: BigNumber = await contract.balanceOf(config.walletAddress);
    return balance;
  }

  private async GetGasPrice(): Promise<ethers.BigNumber> {
    if (config.gasByConfig) return ethers.utils.parseUnits(String(config.customGasGwei), 'gwei');
    else return await this.provider.getGasPrice();
  }

  private GetSigner(): ethers.Wallet {
    const signer = new ethers.Wallet(config.walletPrivateKey);
    return signer.connect(this.provider);
  }

  private async SwapETHForToken( amountIn: CurrencyAmount, amountOutMin: CurrencyAmount,path: string[], ): Promise<ethers.BigNumber> {
    /** Timestamp unix nella quale la transazione viene rigettata */
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    const wallet = this.GetSigner();

    const swapContract = new ethers.Contract(config.uniswapV2Router, config.swaprouterABi, wallet);

    const gasPrice = await this.GetGasPrice();

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

    console.log('https://ropsten.etherscan.io/tx/' + tx.hash);
    const result = await tx.wait();
    if (result.status ===1) {
      console.log('BUY Transaction Mined');
      /** Recupera il bilancio del token comprato */
      const balance = await this.BalanceOf(path[1]);
      console.log('balance of sniped token : ' + ethers.utils.formatUnits(String(balance), '18'));
      return balance;
    } else {
      console.log('Qualcosa è andato storto');
    }
    return ethers.constants.Zero;
  }

  private async swapExactTokensForETH(amountIn: CurrencyAmount,amountOutMin: CurrencyAmount, path: string[] ): Promise<ethers.BigNumber> {
    /** Timestamp unix nella quale la transazione viene rigettata */

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    const wallet = this.GetSigner();

    const swapContract = new ethers.Contract(config.uniswapV2Router, config.swaprouterABi, wallet);

    const gasPrice = await this.GetGasPrice();

    const tx = await swapContract.swapExactTokensForETH(
      amountIn.raw.toString(),
      amountOutMin.raw.toString(),
      path,
      config.walletAddress,
      deadline,
      {
        gasLimit: config.gasLimit,
        gasPrice: gasPrice,
      },
    );

    console.log('https://ropsten.etherscan.io/tx/' + tx.hash);
    const result = await tx.wait();
    if (result.status === 1) {
      console.log('SELL Transaction Mined');
      /** Recupera il bilancio del token comprato */
      const balance = await this.BalanceOf(path[1]);
      console.log('balance of sniped token : ' + ethers.utils.formatUnits(String(balance), '18'));
      return balance;
    } else {
      console.log('Qualcosa è andato storto');
    }
    return ethers.constants.Zero;
  }
}
