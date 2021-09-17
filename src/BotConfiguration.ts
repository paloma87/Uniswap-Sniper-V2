import { ChainId } from '@uniswap/sdk';

/**
 * Working Config of Bot
 */
export class BotConfiguration {
  /** Ethereum Adress of wallete */
  public walletAddress: string = '';

  /** Wallet Private Key */
  public walletPrivateKey: string = '';

  /** Ethereum Adresso of Router */
  public uniswapV2Router: string = '';

  /** Etherum Network */
  public chainID: ChainId = ChainId.ROPSTEN;

  /** Provide access of Blockchain Etherum(tested whit Infuria) */
  public providerUrl: string = '';

  /** Etheruem Trasaction Scanner Url (use for Log Only) */
  public etherScanTransactio: string = 'https://ropsten.etherscan.io/tx/';

  public static swaprouterABi: string[] = [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
    'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external  returns (uint[] memory amounts) ',
  ];
}
