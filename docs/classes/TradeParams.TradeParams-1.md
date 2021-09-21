[uniswap-sniper-v2](../README.md) / [Exports](../modules.md) / [TradeParams](../modules/TradeParams.md) / TradeParams

# Class: TradeParams

[TradeParams](../modules/TradeParams.md).TradeParams

Trade Parameted For Execution

## Table of contents

### Constructors

- [constructor](TradeParams.TradeParams-1.md#constructor)

### Properties

- [AmountInETH](TradeParams.TradeParams-1.md#amountineth)
- [BuyCustomGas](TradeParams.TradeParams-1.md#buycustomgas)
- [BuyCustomGasWei](TradeParams.TradeParams-1.md#buycustomgaswei)
- [BuyGasLimit](TradeParams.TradeParams-1.md#buygaslimit)
- [BuySlippage](TradeParams.TradeParams-1.md#buyslippage)
- [EnableSell](TradeParams.TradeParams-1.md#enablesell)
- [SellCustomGas](TradeParams.TradeParams-1.md#sellcustomgas)
- [SellCustomGasWei](TradeParams.TradeParams-1.md#sellcustomgaswei)
- [SellGasLimit](TradeParams.TradeParams-1.md#sellgaslimit)
- [SellSlippage](TradeParams.TradeParams-1.md#sellslippage)
- [TimeToSellMs](TradeParams.TradeParams-1.md#timetosellms)
- [TokenToSnipe](TradeParams.TradeParams-1.md#tokentosnipe)

## Constructors

### constructor

• **new TradeParams**()

## Properties

### AmountInETH

• **AmountInETH**: `string` = `'0.0'`

Amount of ether for trade sniping

#### Defined in

tradeParams.ts:23

___

### BuyCustomGas

• **BuyCustomGas**: `boolean` = `false`

Use Custom Gas to snipe if false the gas is calculate automatic using provider API

#### Defined in

tradeParams.ts:9

___

### BuyCustomGasWei

• **BuyCustomGasWei**: `string` = `''`

Custom Gas Price in Wei for snipe transaction

#### Defined in

tradeParams.ts:11

___

### BuyGasLimit

• **BuyGasLimit**: `number` = `0`

Gas limit for Snipe Transaction

#### Defined in

tradeParams.ts:13

___

### BuySlippage

• **BuySlippage**: `string` = `'12'`

Slippage percente for snipe  token (integer betwen 1 and 100)

#### Defined in

tradeParams.ts:15

___

### EnableSell

• **EnableSell**: `boolean` = `false`

Enable Sell After Snipe

#### Defined in

tradeParams.ts:18

___

### SellCustomGas

• **SellCustomGas**: `boolean` = `false`

Use Custom Gas to sell if false the gas is calculate automatic using provider API

#### Defined in

tradeParams.ts:26

___

### SellCustomGasWei

• **SellCustomGasWei**: `string` = `''`

Custom Gas Price in Wei

#### Defined in

tradeParams.ts:28

___

### SellGasLimit

• **SellGasLimit**: `number` = `0`

Gas limit for Sell Transaction

#### Defined in

tradeParams.ts:30

___

### SellSlippage

• **SellSlippage**: `string` = `'1'`

Slippage  percent for sell transaction (integer betwen 1 and 100)

#### Defined in

tradeParams.ts:32

___

### TimeToSellMs

• **TimeToSellMs**: `number` = `0`

Time to Sell in ms

#### Defined in

tradeParams.ts:21

___

### TokenToSnipe

• **TokenToSnipe**: `string` = `''`

The token to Snipe

#### Defined in

tradeParams.ts:6
