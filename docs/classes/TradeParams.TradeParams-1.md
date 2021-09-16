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

[TradeParams.ts:22](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L22)

___

### BuyCustomGas

• **BuyCustomGas**: `boolean` = `false`

Use Custom Gas to snipe if false the gas is calculate automatic using provider API

#### Defined in

[TradeParams.ts:11](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L11)

___

### BuyCustomGasWei

• **BuyCustomGasWei**: `string` = `''`

Custom Gas Price in Wei for snipe transaction

#### Defined in

[TradeParams.ts:13](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L13)

___

### BuyGasLimit

• **BuyGasLimit**: `number` = `0`

Gas limit for Snipe Transaction

#### Defined in

[TradeParams.ts:15](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L15)

___

### BuySlippage

• **BuySlippage**: `string` = `'12'`

Slippage percente for snipe  token (integer betwen 1 and 100)

#### Defined in

[TradeParams.ts:17](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L17)

___

### SellCustomGas

• **SellCustomGas**: `boolean` = `false`

Use Custom Gas to sell if false the gas is calculate automatic using provider API

#### Defined in

[TradeParams.ts:25](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L25)

___

### SellCustomGasWei

• **SellCustomGasWei**: `string` = `''`

Custom Gas Price in Wei

#### Defined in

[TradeParams.ts:27](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L27)

___

### SellGasLimit

• **SellGasLimit**: `number` = `0`

Gas limit for Sell Transaction

#### Defined in

[TradeParams.ts:29](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L29)

___

### SellSlippage

• **SellSlippage**: `string` = `'1'`

Slippage  percent for sell transaction (integer betwen 1 and 100)

#### Defined in

[TradeParams.ts:31](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L31)

___

### TimeToSellMs

• **TimeToSellMs**: `number` = `0`

Time to Sell in ms

#### Defined in

[TradeParams.ts:20](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L20)

___

### TokenToSnipe

• **TokenToSnipe**: `string` = `""`

The token to Snipe

#### Defined in

[TradeParams.ts:8](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeParams.ts#L8)
