import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { BotConfiguration } from './BotConfiguration';
import { ConsoleLogger, ILogger } from './BotLogger';
import { TradeManager } from './TradeManager';
import { TradeParams } from './TradeParams';


export class SniperBot
{ 

  /** Configuration */
  private botConfig: BotConfiguration;
  private logger?: ILogger;
  constructor(botConfig: BotConfiguration,logger?: ILogger)
  {
    this.botConfig = botConfig;
    this.logger = logger;
  }

 /**
  * 
  * @param tradeParams 
  * @returns 
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

  private CalculateGain(amountInETH: BigNumber, amountOutETH: BigNumber): BigNumber {
    return amountOutETH.sub(amountInETH);
  }

}
// function main() {
//   Promise.resolve(SnipeToken('0x31F42841c2db5173425b5223809CF3A38FEde360', '0.01', 2000, new ConsoleLogger())).then(
//     (num) => {
//       console.log(ethers.utils.formatUnits(String(num), '18'));
//     },
//   );
// }

// main();
// {{token_addr}}@{{amount_in}}@{{gas_price}}@{{gas_limit}}@{{sleepage}}@{{time_to_sell}}
