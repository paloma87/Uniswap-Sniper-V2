import { BigNumber } from '@ethersproject/bignumber';
import { BigintIsh } from '@uniswap/sdk';
import { ethers } from 'ethers';
import { ProviderManager } from './ProviderManager';

export enum BotMessageType
{
   Info =0,
   Errore =1,
   Trace =2
}
/**
 * Funzione per effettuare lo snipe del token
 * @param tokenAdressToSnipe indirizzo del token
 * @param amountInETH        ammontare in ether dell'opera<zione
 * @param timeBeforeSell     tempo in ms per il quale si tiene il token
 * @returns ritorna il delta tra AmountInETH e il valore di rivendita del token
 */
export async function SnipeToken(tokenAdressToSnipe: string,amountInETH: string,timeBeforeSell: number): Promise<BigNumber> {
  const provider = new ProviderManager();

  let approve_promise = provider.ApproveTokenUniswap(tokenAdressToSnipe);

  const amountOut: BigNumber = await provider.Snipe(tokenAdressToSnipe, amountInETH);

  await approve_promise;
  let amountOutETH: BigNumber = BigNumber.from(0);

  setTimeout(async function () {
    amountOutETH = await provider.MakeMoney(tokenAdressToSnipe, amountOut);
  }, timeBeforeSell);

  return CalculateGain(ethers.utils.parseEther(amountInETH), amountOutETH);
}

function CalculateGain(amountInETH: BigNumber, amountOutETH: BigNumber): BigNumber {
  return amountOutETH.sub(amountInETH);
}

function ParseData(dateTime: Date): string {
  return (
    dateTime.getUTCFullYear() +
    '/' +
    ('0' + (dateTime.getUTCMonth() + 1)).slice(-2) +
    '/' +
    ('0' + dateTime.getUTCDate()).slice(-2) +
    ' ' +
    ('0' + dateTime.getUTCHours()).slice(-2) +
    ':' +
    ('0' + dateTime.getUTCMinutes()).slice(-2) +
    ':' +
    ('0' + dateTime.getUTCSeconds()).slice(-2)
  );
}

function main(){
  Promise.resolve(SnipeToken('0x31F42841c2db5173425b5223809CF3A38FEde360', '0.01', 2000)).then(num =>{
    console.log(ethers.utils.formatUnits(String(num), '18'));
  });
}

function EventCallBack(type:BotMessageType, msg:string)
{

  console.log('d0:d1',[type, msg])
}


main();
//{{token_addr}}@{{amount_in}}@{{gas_price}}@{{gas_limit}}@{{sleepage}}@{{time_to_sell}}
