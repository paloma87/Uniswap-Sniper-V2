/**
 * Questa classe contiene i parametri di configurazione del trade
 *
 */
export class TradeParams {
  public BuyCustomGas: boolean = false;
  public BuyCustomGasWei: string = '';
  public TimeToSellMs: number = 0;
  public AmountInETH: String = '0.0';
  public SellCustomGas: boolean = false;
  public CustomGasWei: string = '';
}
