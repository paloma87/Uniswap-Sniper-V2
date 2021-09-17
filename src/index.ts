import { ChainId } from '@uniswap/sdk';
import { ethers } from 'ethers';
import { SniperBot } from './sniperBot';
import { BotConfiguration } from './botConfiguration';
import { ConsoleLogger } from './botLogger';
import { TradeParams } from './tradeParams';

function main() {
  const botConfig = new BotConfiguration();
  botConfig.walletAddress = '0x4Db14aC2E4648f5294F5B13a8Dd2AB3D728ffb12';
  botConfig.uniswapV2Router = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  botConfig.providerUrl = 'https://ropsten.infura.io/v3/9e4b802d4ef5426ca365eca832be2466';
  botConfig.walletPrivateKey = 'c016e5db8729f3854ff75656664e70682934b31b238dc75321c01db280335bce';
  botConfig.chainID = ChainId.ROPSTEN;
  botConfig.etherScanTransactio = 'https://ropsten.etherscan.io/tx/';

  const bot = new SniperBot(botConfig, new ConsoleLogger());

  const trade = new TradeParams();
  trade.AmountInETH = '0.01';
  trade.TokenToSnipe = '0x31F42841c2db5173425b5223809CF3A38FEde360';
  trade.BuyCustomGas = true;
  trade.BuyCustomGasWei = '15.00';
  trade.BuyGasLimit = 150000;
  trade.BuySlippage = '15';
  trade.TimeToSellMs = 2000;
  trade.SellCustomGas = true;
  trade.SellCustomGasWei = '10.00';
  trade.SellGasLimit = 150000;
  trade.SellSlippage = '1';

  Promise.resolve(bot.SnipeToken(trade)).then((num) => {
    console.log(ethers.utils.formatUnits(String(num), '18'));
  });
}

main();
// {{token_addr}}@{{amount_in}}@{{gas_price}}@{{gas_limit}}@{{sleepage}}@{{time_to_sell}}
