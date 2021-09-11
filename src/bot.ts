import { ProviderManager } from './ProviderManager';


var args = process.argv.slice(2);

let main = async (token_addr: string, amaunt_in: string) => {

  let provider = new ProviderManager();

  let approve_promise = provider.ApproveTokenUniswap(token_addr);

  const amountOut = await provider.Snipe(token_addr, amaunt_in);

  await approve_promise;

  //const amountETH = await provider.MakeMoney('0x31F42841c2db5173425b5223809CF3A38FEde360', amountOut);
}

main("0x31F42841c2db5173425b5223809CF3A38FEde360", "0.01");

//{{token_addr}}@{{amount_in}}@{{gas_price}}@{{gas_limit}}@{{sleepage}}@{{time_to_sell}}