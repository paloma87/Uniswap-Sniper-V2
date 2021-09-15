import { BigNumber, ethers } from 'ethers';
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
import { ILogger } from './BotLogger';
import { TradeParams } from './TradeParams';
import { BotConfiguration } from './BotConfiguration';

export class TradeManager {
  
  private provider: any;
  private logger?: ILogger;
  private tradeParams:TradeParams;
  private botConfig: BotConfiguration;
  constructor(tradeParams: TradeParams,botConfig: BotConfiguration,logger?: ILogger) {
    this.provider = new ethers.providers.JsonRpcProvider(botConfig.providerUrl);
    this.logger = logger;
    this.tradeParams = tradeParams;
    this.botConfig= botConfig;
  }

  public async ApproveTokenUniswap(tokenAdressToSnipe: string) {
    const wallet = this.GetSigner();
    const contract = new ethers.Contract(tokenAdressToSnipe, genericErc20Abi, wallet);
    return contract.approve(this.botConfig.uniswapV2Router, String(ethers.constants.MaxInt256));
  }

  public async MakeMoney(TokenAdressToSell: string, amountToken: ethers.BigNumber): Promise<ethers.BigNumber> {
    const tokenToSnipe: Token = await Fetcher.fetchTokenData(this.botConfig.chainID, TokenAdressToSell, this.provider);
    const coppiaDiToken: Pair = await Fetcher.fetchPairData(tokenToSnipe, WETH[tokenToSnipe.chainId], this.provider);
    this.logger?.LogDebug('Dati per lo swap  DI VENDITArecuperati');
    /** Definisce la rotta del trading  ovvero da ETH verso tokenToSnipe */
    const route = new Route([coppiaDiToken], WETH[tokenToSnipe.chainId]);
    /** Calcolo il trade */
    const trade = new Trade(
      route,
      new TokenAmount(WETH[tokenToSnipe.chainId], amountToken.toBigInt()),
      TradeType.EXACT_INPUT,
    );

    const slippageToleranceLow = new Percent(this.tradeParams.SellSlippage, '100'); 

    /** Calcolo il minumo di tokensniper che sono disposto a ricevere  considerato lo slippage */
    const amountOut = trade.minimumAmountOut(slippageToleranceLow); // needs to be converted to e.g. hex
    this.logger?.LogInfo('Execution price:' + trade.executionPrice);
    this.logger?.LogInfo(
      'ETH quantity min whit slippage :' +
        ethers.utils.formatUnits(BigNumber.from(amountOut.quotient), WETH[tokenToSnipe.chainId].decimals),
    );

    const path = [tokenToSnipe.address, WETH[tokenToSnipe.chainId].address];

    /** Lancia e attende lo swap */
    const tokenAmountOut = await this.SwapExactTokensForETH(trade.inputAmount, amountOut, path);

    return tokenAmountOut;
  }

  public async Snipe(tokenAdressToSnipe: string, amountInETH: string): Promise<ethers.BigNumber> {
    const tokenToSnipe: Token = await Fetcher.fetchTokenData(this.botConfig.chainID, tokenAdressToSnipe, this.provider);
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
    const slippageTolerancehigh = new Percent(this.tradeParams.BuySlippage, '100'); 

    /** Calcolo il minumo di tokensniper che sono disposto a ricevere  considerato lo slippage */
    const amountOut = trade.minimumAmountOut(slippageTolerancehigh); // needs to be converted to e.g. hex
    this.logger?.LogInfo('Execution snipe price:' + trade.executionPrice);
    this.logger?.LogInfo(
      'Token snipe quantity min whit slippage :' +
        ethers.utils.formatUnits(BigNumber.from(amountOut.quotient), tokenToSnipe.decimals),
    );

    /** Path di trasferimento  */
    const path = [WETH[tokenToSnipe.chainId].address, tokenToSnipe.address];

    /** Lancia e attende lo swap */
    const tokenAmountOut = await this.SwapETHForToken(trade.inputAmount, amountOut, path);

    return tokenAmountOut;
  }

  private async BalanceOf(tokenAdress: string): Promise<BigNumber> {
    const contract = new ethers.Contract(tokenAdress, genericErc20Abi, this.provider);
    const balance: BigNumber = await contract.balanceOf(this.botConfig.walletAddress);
    return balance;
  }

  private async GetBuyGasPrice(): Promise<ethers.BigNumber> {
    if (this.tradeParams.BuyCustomGas) return ethers.utils.parseUnits(String(this.tradeParams.BuyCustomGasWei), 'gwei');
    else return await this.provider.getGasPrice();
  }

  private async GetSellGasPrice(): Promise<ethers.BigNumber> {
    if (this.tradeParams.SellCustomGas) return ethers.utils.parseUnits(String(this.tradeParams.SellCustomGasWei), 'gwei');
    else return await this.provider.getGasPrice();
  }
  private GetSigner(): ethers.Wallet {
    const signer = new ethers.Wallet(this.botConfig.walletPrivateKey);
    return signer.connect(this.provider);
  }

  private async SwapETHForToken(
    amountIn: CurrencyAmount,
    amountOutMin: CurrencyAmount,
    path: string[],
  ): Promise<ethers.BigNumber> {
    /** Timestamp unix nella quale la transazione viene rigettata */
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    const wallet = this.GetSigner();

    const swapContract = new ethers.Contract(this.botConfig.uniswapV2Router, BotConfiguration.swaprouterABi, wallet);

    const gasPrice = await this.GetBuyGasPrice();

    const tx = await swapContract.swapExactETHForTokens(
      amountOutMin.raw.toString(),
      path,
      this.botConfig.walletAddress,
      deadline,
      {
        gasLimit: this.tradeParams.BuyGasLimit,
        gasPrice,
        value: amountIn.raw.toString(),
      },
    );
    await this.WaitTransactionComplete(tx);
    const Balnce: BigNumber = await this.BalanceOf(path[1]);
    this.logger?.LogInfo('balance of sniped token ' + +ethers.utils.formatUnits(String(Balnce), '18'));
    return Balnce;
  }

  private async SwapExactTokensForETH(
    amountIn: CurrencyAmount,
    amountOutMin: CurrencyAmount,
    path: string[],
  ): Promise<ethers.BigNumber> {
    /** Timestamp unix nella quale la transazione viene rigettata */

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    const wallet = this.GetSigner();

    const swapContract = new ethers.Contract(this.botConfig.uniswapV2Router, BotConfiguration.swaprouterABi, wallet);

    const gasPrice = await this.GetSellGasPrice();

    const tx = await swapContract.swapExactTokensForETH(
      amountIn.raw.toString(),
      amountOutMin.raw.toString(),
      path,
      this.botConfig.walletAddress,
      deadline,
      {
        gasLimit: this.tradeParams.SellGasLimit,
        gasPrice: gasPrice,
      },
    );

    await this.WaitTransactionComplete(tx);
    const Balnce: BigNumber = await this.BalanceOf(path[1]);
    this.logger?.LogInfo('balance of sniped token ' + +ethers.utils.formatUnits(String(Balnce), '18'));
    return Balnce;
  }

  async WaitTransactionComplete(tx: any) {
    this.logger?.LogInfo('Transaction pending');
    this.logger?.LogInfo(this.botConfig.EtherScanTransactio + tx.hash);
    const result = await tx.wait();
    if (result.status === 1) {
      this.logger?.LogInfo('Transaction confirmed');
    } else {
      throw Error('Transaction Error:' + tx);
    }
  }
}
