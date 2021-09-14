import { BigNumber } from '@ethersproject/bignumber';
import { BigintIsh } from '@uniswap/sdk';
import { ethers } from 'ethers';
import { ConsoleLogger, ILogger } from './BotLogger';
import { TradeManager } from './TradeManager';

/**
 * Funzione per effettuare lo snipe del token
 * @param tokenAdressToSnipe indirizzo del token
 * @param amountInETH        ammontare in ether dell'opera<zione
 * @param timeBeforeSell     tempo in ms per il quale si tiene il token
 * @returns ritorna il delta tra AmountInETH e il valore di rivendita del token
 */
export async function SnipeToken(
  tokenAdressToSnipe: string,
  amountInETH: string,
  timeBeforeSell: number,
  logger?: ILogger,
): Promise<BigNumber> {
  const gain: BigNumber = BigNumber.from(0);
  let amountOutETH: BigNumber = BigNumber.from(0);
  try {
    logger?.LogInfo('Sniping Token: Inizialed' + tokenAdressToSnipe + ' ethers: ' + amountInETH);

    const provider = new TradeManager(logger);

    const amountOut: BigNumber = await Snipe(provider, tokenAdressToSnipe, logger, amountInETH);

    amountOutETH = Sell(logger, timeBeforeSell, tokenAdressToSnipe, amountOut, provider);

    const gain = CalculateGain(ethers.utils.parseEther(amountInETH), amountOutETH);

    logger?.LogInfo('Operazione completata Gain:' + ethers.utils.formatEther(gain).toString());
  } catch (Error: any) {
    logger?.LogError(Error);
  }
  return gain;
}

function Sell(
  logger: ILogger | undefined,
  timeBeforeSell: number,
  tokenAdressToSnipe: string,
  amountIn: BigNumber,
  provider: TradeManager,
) {
  let amountOutETH: BigNumber = BigNumber.from(0);
  logger?.LogInfo('Waiting Selling Time(ms):' + timeBeforeSell);
  setTimeout(async function () {
    logger?.LogInfo(
      'Selling Token: started' + tokenAdressToSnipe + ' amount: ' + ethers.utils.formatUnits(amountIn, '18'),
    );
    amountOutETH = await provider.MakeMoney(tokenAdressToSnipe, amountIn);
  }, timeBeforeSell);
  logger?.LogInfo('Selling Token end:' + tokenAdressToSnipe + ' ethers: ' + amountOutETH);
  return amountOutETH;
}

async function Snipe(
  provider: TradeManager,
  tokenAdressToSnipe: string,
  logger: ILogger | undefined,
  amountInETH: string,
) {
  let approve_promise = provider.ApproveTokenUniswap(tokenAdressToSnipe);
  logger?.LogInfo('Sniping Token: started');
  const amountOut: BigNumber = await provider.Snipe(tokenAdressToSnipe, amountInETH);
  logger?.LogInfo('Sniping Token: end');
  await approve_promise;
  return amountOut;
}

function CalculateGain(amountInETH: BigNumber, amountOutETH: BigNumber): BigNumber {
  return amountOutETH.sub(amountInETH);
}

function main() {
  Promise.resolve(SnipeToken('0x31F42841c2db5173425b5223809CF3A38FEde360', '0.01', 2000, new ConsoleLogger())).then(
    (num) => {
      console.log(ethers.utils.formatUnits(String(num), '18'));
    },
  );
}

main();
//{{token_addr}}@{{amount_in}}@{{gas_price}}@{{gas_limit}}@{{sleepage}}@{{time_to_sell}}
