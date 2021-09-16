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
import { ILogger } from './botLogger';
import { TradeParams } from './tradeParams';
import { BotConfiguration } from './botConfiguration';

/**
 * Handle the trade operation 
 */
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

  /**
   * Call a token smart contract to approve uniswap to use the sniped token
   * This operation is preparatory to the sale of the sniped token
   * @param tokenAdressToSnipe 
   * @returns 
   */
  public async ApproveTokenUniswap(tokenAdressToSnipe: string) {
    const wallet = this.GetSigner();
    const contract = new ethers.Contract(tokenAdressToSnipe, genericErc20Abi, wallet);
    return contract.approve(this.botConfig.uniswapV2Router, String(ethers.constants.MaxInt256));
  }
/**
 * Use uniswap Sdk to calculate the parameter operation 
 * for the trade of sale sniped token and call operation
 * @param TokenAdressToSell 
 * @param amountToken 
 * @returns 
 */
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
  /*
   * Use uniswap Sdk to calculate the parameter operation 
   * for the trade of buy sniped token and call operation
   * @param tokenAdressToSnipe 
   * @param amountInETH 
   * @returns 
   */
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

  /**
   * Retrive the current balance of token into wallet configured
   * @param tokenAdress Token
   * @returns 
   */
  private async BalanceOf(tokenAdress: string): Promise<BigNumber> {
    const contract = new ethers.Contract(tokenAdress, genericErc20Abi, this.provider);
    const balance: BigNumber = await contract.balanceOf(this.botConfig.walletAddress);
    return balance;
  }

  /**
   * Return gaas_price for snipe trade
   * @returns Gas price in wei 
   */
  private async GetBuyGasPrice(): Promise<ethers.BigNumber> {
    if (this.tradeParams.BuyCustomGas) return ethers.utils.parseUnits(String(this.tradeParams.BuyCustomGasWei), 'gwei');
    else return await this.provider.getGasPrice();
  }

  /**
   * Return gas_price for sell trade
   * @returns Gas price in wei
   */
  private async GetSellGasPrice(): Promise<ethers.BigNumber> {
    if (this.tradeParams.SellCustomGas) return ethers.utils.parseUnits(String(this.tradeParams.SellCustomGasWei), 'gwei');
    else return await this.provider.getGasPrice();
  }
  /**
   * Retrive the signer for transaction
   * @returns Signer connected to provider
   */
  private GetSigner(): ethers.Wallet {
    const signer = new ethers.Wallet(this.botConfig.walletPrivateKey);
    return signer.connect(this.provider);
  }

  /**
   * Execute the snipe operation
   * @param amountIn ethers in input
   * @param amountOutMin amount minium out accepted for the trade
   * @param path adress route token
   * @returns 
   */
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

  /**
   * Execute the sell trade 
   * @param amountIn sniped token amount 
   * @param amountOutMin ether amount minium accepted for the trade
   * @param path 
   * @returns 
   */
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
        gasPrice,
      },
    );

    await this.WaitTransactionComplete(tx);
    const Balnce: BigNumber = await this.BalanceOf(path[1]);
    this.logger?.LogInfo('balance of sniped token ' + +ethers.utils.formatUnits(String(Balnce), '18'));
    return Balnce;
  }

  /**
   * Wait transaction and check if status ok else throw an exception
   * @param tx Transaction pending
   */ 
  async WaitTransactionComplete(tx: any)  {
    this.logger?.LogInfo('Transaction pending');
    this.logger?.LogInfo(this.botConfig.etherScanTransactio + tx.hash);
    const result = await tx.wait();
    if (result.status === 1) {
      this.logger?.LogInfo('Transaction confirmed');
    } else {
      throw Error('Transaction Error:' + tx);
    }
  }
}
