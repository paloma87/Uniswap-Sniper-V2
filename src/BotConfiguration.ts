import { ChainId } from '@uniswap/sdk';

/**
 * Questa classe contiene le configurazioni di funzionamento del bot esempio
 * Indirizzi dei provider
 * Wallet di esecuzione del bot
 *
 */
export class BotConfiguration {
  public walletAddress: string = '';

  public walletPrivateKey: string = '';

  public uniswapV2Router: string = '';

  public chainID: ChainId = ChainId.ROPSTEN;

  public providerUrl: string = '';

  public swaprouterABi: string[] = [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
    'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external  returns (uint[] memory amounts) ',
  ];

  public EtherScanTransactio: string = 'https://ropsten.etherscan.io/tx/';
}
