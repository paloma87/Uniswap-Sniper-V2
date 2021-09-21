uniswap-sniper-v2 / [Code Documentation](docs/modules.md)

# Uniswap-Sniper-V2

Questo bot è stato pensato per uno swap da ETH--> TOKEN_SNIPED aspettare un tempo prestabilito e rivendere TOKEN_SNIPED-->ETH 

### Dipendenze

* ethers.js per connettersi ai nodi etherum 
* UniswapSdk per calcolare i parametri di trading  

### Prima dell uso 
* E necessario avere un account su provider di servizi  gateway per la blochain(ad esempio https://infura.io/)
* E necessario essere in possesso di un wallet(indirizzo e chiave privata) con liquidita in ETH 
* Devono essere decisi alcuni paramteri di trading:
  * Il tempo in ms prima di rivendere il token acquistato
  * Slippage tra il 10 e 15 per lo snipe e al massimo1 per la vendita)
  * Costo del gas
  * Limite del gas (si ricorda che costo gas* limitegas = massimo costo transazione) 
  

### Usage
La prima cosa da fare è istanziare l'oggetto  ```BotConfiguration``` incapsula la configurazione generale del bot  come ad esempio il provider,il network eterum ,il wallet di appoggio ecc.
* Vedi la relativa Docs  [BotConfiguration](docs/classes/botConfiguration.BotConfiguration-1.md)

Istanziare la classe ```SniperBot``` (è possibile passare una classe che implementa l'interfaccia ILogger di default è stato implementaoto un log su console).
Adesso il bot è pronto per l'uso!!

Per avviare l'operazione costruire l'oggetto ```TradeParams```  impostare i dati necessari e chiamare il metodo ```SnipeToken.(TradeParams)```  del bot.
* Vedi la relativa Docs  [TradeParams](docs/classes/tradeParams.TradeParams-1.md)

#### TypeScript or ES6
```typescript
    
    const botConfig =new BotConfiguration( );
    botConfig.walletAddress='YOUR WALLET ADDRESS';
    botConfig.uniswapV2Router='0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
    botConfig.providerUrl='https://ropsten.infura.io/v3/your_key';
    botConfig.walletPrivateKey='YOUR WALLET PRIVATE KEY';
    botConfig.chainID=ChainId.ROPSTEN;//TEST NETWORK
    botConfig.etherScanTransactio='https://ropsten.etherscan.io/tx/';//TEST NETWORK EXPLORE


    //Istanziate the bot
    //E possibile passare un logger che fornisce un log di quello che sta succedendo e dei possibili errori
    const bot = new SniperBot(botConfig,new ConsoleLogger());
    
    //Inizializza i parametri del trade
    const trade = new TradeParams();
    trade.AmountInETH='0.01';
    trade.TokenToSnipe='TOKEN_ADRESS';
    trade.BuyCustomGas =true;
    trade.BuyCustomGasWei="70.00";
    trade.BuyGasLimit=150000;
    trade.BuySlippage = '15';
    trade.EnableSell= false;
    trade.TimeToSellMs = 10000;// 10 sec
    trade.SellCustomGas =true;
    trade.SellCustomGasWei='70.00';
    trade.SellGasLimit=150000;
    trade.SellSlippage ='1';

    //Lancia l'operazione di snipe
    bot.SnipeToken(trade)

```