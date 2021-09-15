/**
 * Trade Parameted For Execution
 */
export class TradeParams {
 
 
  public TokenToSnipe: string ="";
 
  /** Use Custom Gas to snipe if false the gas is calculate automatic using provider API */
  public BuyCustomGas: boolean = false;
  /** Custom Gas Price in Wei for snipe transaction */
  public BuyCustomGasWei: string = '';
  /**  Gas limit for Snipe Transaction */
  public BuyGasLimit: number = 0; 
  

  /** Time to Sell in ms */
  public TimeToSellMs: number = 0; 
  /** Amount of ether for trade sniping */
  public AmountInETH: string = '0.0';

  /** Use Custom Gas to sell if false the gas is calculate automatic using provider API */
  public SellCustomGas: boolean = false;
  /** Custom Gas Price in Wei */
  public SellCustomGasWei: string = '';
  /**  Gas limit for Sell Transaction */
  public SellGasLimit: number = 0; 
 
}
