[uniswap-sniper-v2](../README.md) / [Modules](../modules.md) / [tradeParams](../modules/tradeParams.md) / TradeParams

# Class: TradeParams

[tradeParams](../modules/tradeParams.md).TradeParams

Trade Parameted For Execution

## Table of contents

### Constructors

- [constructor](tradeParams.TradeParams.md#constructor)

### Properties

- [AmountInETH](tradeParams.TradeParams.md#amountineth)
- [BuyCustomGas](tradeParams.TradeParams.md#buycustomgas)
- [BuyCustomGasWei](tradeParams.TradeParams.md#buycustomgaswei)
- [BuyGasLimit](tradeParams.TradeParams.md#buygaslimit)
- [BuySlippage](tradeParams.TradeParams.md#buyslippage)
- [SellCustomGas](tradeParams.TradeParams.md#sellcustomgas)
- [SellCustomGasWei](tradeParams.TradeParams.md#sellcustomgaswei)
- [SellGasLimit](tradeParams.TradeParams.md#sellgaslimit)
- [SellSlippage](tradeParams.TradeParams.md#sellslippage)
- [TimeToSellMs](tradeParams.TradeParams.md#timetosellms)
- [TokenToSnipe](tradeParams.TradeParams.md#tokentosnipe)

## Constructors

### constructor

• **new TradeParams**()

## Properties

### AmountInETH

• **AmountInETH**: `string` = `'0.0'`

Amount of ether for trade sniping

#### Defined in

tradeParams.ts:22

___

### BuyCustomGas

• **BuyCustomGas**: `boolean` = `false`

Use Custom Gas to snipe if false the gas is calculate automatic using provider API

#### Defined in

tradeParams.ts:11

___

### BuyCustomGasWei

• **BuyCustomGasWei**: `string` = `''`

Custom Gas Price in Wei for snipe transaction

#### Defined in

tradeParams.ts:13

___

### BuyGasLimit

• **BuyGasLimit**: `number` = `0`

Gas limit for Snipe Transaction

#### Defined in

tradeParams.ts:15

___

### BuySlippage

• **BuySlippage**: `string` = `'12'`

Slippage percente for snipe  token (integer betwen 1 and 100)

#### Defined in

tradeParams.ts:17

___

### SellCustomGas

• **SellCustomGas**: `boolean` = `false`

Use Custom Gas to sell if false the gas is calculate automatic using provider API

#### Defined in

tradeParams.ts:25

___

### SellCustomGasWei

• **SellCustomGasWei**: `string` = `''`

Custom Gas Price in Wei

#### Defined in

tradeParams.ts:27

___

### SellGasLimit

• **SellGasLimit**: `number` = `0`

Gas limit for Sell Transaction

#### Defined in

tradeParams.ts:29

___

### SellSlippage

• **SellSlippage**: `string` = `'1'`

Slippage  percent for sell transaction (integer betwen 1 and 100)

#### Defined in

tradeParams.ts:31

___

### TimeToSellMs

• **TimeToSellMs**: `number` = `0`

Time to Sell in ms

#### Defined in

tradeParams.ts:20

___

### TokenToSnipe

• **TokenToSnipe**: `string` = `""`

The token to Snipe

#### Defined in

tradeParams.ts:8
