import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { BotConfiguration } from './botConfiguration';
import { ConsoleLogger, ILogger } from './botLogger';
import { TradeManager } from './tradeManager';
import { TradeParams } from './tradeParams';

/**
 * Class for handling lifecycle of bot 
 */
export class SniperBot
{ 

  /** Configuration of bot */
  private botConfig: BotConfiguration;
  private logger?: ILogger;
  constructor(botConfig: BotConfiguration,logger?: ILogger)
  {
    this.botConfig = botConfig;
    this.logger = logger;
  }

 /**
  * Snipe a Token
  * @param tradeParams 
  * @returns Eth value gain in wei units
  */
 async  SnipeToken(tradeParams:TradeParams): Promise<BigNumber>
 {
    let calculatedGain: BigNumber = BigNumber.from(0);
    let amountOutETH: BigNumber = BigNumber.from(0);
    try
    {
      this.logger?.LogInfo('Sniping Token: Inizialed' + tradeParams.TokenToSnipe+ ' ethers: ' + tradeParams.AmountInETH);

      const provider = new TradeManager(tradeParams,this.botConfig,this.logger);

      const amountOut: BigNumber = await this.Snipe(provider, tradeParams.TokenToSnipe, this.logger, tradeParams.AmountInETH);

      amountOutETH = await this.Sell(this.logger, tradeParams.TimeToSellMs, tradeParams.TokenToSnipe, amountOut, provider);

      calculatedGain = this.CalculateGain(ethers.utils.parseEther(tradeParams.AmountInETH), amountOutETH);

      this.logger?.LogInfo('Operation complete gain:' + ethers.utils.formatEther(calculatedGain).toString());
    }
    catch (Error: any) {
      this.logger?.LogError(Error);
    }
    return calculatedGain;
  }

  private async Sell(
    logger: ILogger | undefined,
    timeBeforeSell: number,
    tokenAdressToSnipe: string,
    amountIn: BigNumber,
    provider: TradeManager,
  ) {
    let amountOutETH: BigNumber = BigNumber.from(0);
    logger?.LogInfo('Waiting Selling Time(ms):' + timeBeforeSell);
    setTimeout(async () => {
      logger?.LogInfo(
        'Selling Token: started' + tokenAdressToSnipe + ' amount: ' + ethers.utils.formatUnits(amountIn, '18'),
      );
      amountOutETH = await provider.MakeMoney(tokenAdressToSnipe, amountIn);
    }, timeBeforeSell);
    logger?.LogInfo('Selling Token end:' + tokenAdressToSnipe + ' ethers: ' + amountOutETH);
    return amountOutETH;
  }

  private async Snipe(
    provider: TradeManager,
    tokenAdressToSnipe: string,
    logger: ILogger | undefined,
    amountInETH: string,
  ) {
    const approvePromise = provider.ApproveTokenUniswap(tokenAdressToSnipe);
    logger?.LogInfo('Sniping Token: started');
    const amountOut: BigNumber = await provider.Snipe(tokenAdressToSnipe, amountInETH);
    logger?.LogInfo('Sniping Token: end');
    await approvePromise;
    return amountOut;
  }

  /**
   * Calculete the gein in ether
   * @param amountInETH 
   * @param amountOutETH 
   * @returns 
   */
  private CalculateGain(amountInETH: BigNumber, amountOutETH: BigNumber): BigNumber {
    return amountOutETH.sub(amountInETH);
  }

}