[uniswap-sniper-v2](../README.md) / [Exports](../modules.md) / [sniperBot](../modules/sniperBot.md) / SniperBot

# Class: SniperBot

[sniperBot](../modules/sniperBot.md).SniperBot

Class for handling lifecycle of bot

## Table of contents

### Constructors

- [constructor](sniperBot.SniperBot.md#constructor)

### Properties

- [botConfig](sniperBot.SniperBot.md#botconfig)
- [logger](sniperBot.SniperBot.md#logger)

### Methods

- [CalculateGain](sniperBot.SniperBot.md#calculategain)
- [Sell](sniperBot.SniperBot.md#sell)
- [Snipe](sniperBot.SniperBot.md#snipe)
- [SnipeToken](sniperBot.SniperBot.md#snipetoken)

## Constructors

### constructor

• **new SniperBot**(`botConfig`, `logger?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `botConfig` | [`BotConfiguration`](BotConfiguration.BotConfiguration-1.md) |
| `logger?` | [`ILogger`](../interfaces/BotLogger.ILogger.md) |

#### Defined in

[sniperBot.ts:15](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/sniperBot.ts#L15)

## Properties

### botConfig

• `Private` **botConfig**: [`BotConfiguration`](BotConfiguration.BotConfiguration-1.md)

Configuration of bot

#### Defined in

[sniperBot.ts:13](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/sniperBot.ts#L13)

___

### logger

• `Private` `Optional` **logger**: [`ILogger`](../interfaces/BotLogger.ILogger.md)

#### Defined in

[sniperBot.ts:14](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/sniperBot.ts#L14)

## Methods

### CalculateGain

▸ `Private` **CalculateGain**(`amountInETH`, `amountOutETH`): `BigNumber`

Calculete the gein in ether

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountInETH` | `BigNumber` |
| `amountOutETH` | `BigNumber` |

#### Returns

`BigNumber`

#### Defined in

[sniperBot.ts:103](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/sniperBot.ts#L103)

___

### Sell

▸ `Private` **Sell**(`logger`, `timeBeforeSell`, `tokenAdressToSnipe`, `amountIn`, `provider`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | `undefined` \| [`ILogger`](../interfaces/BotLogger.ILogger.md) |
| `timeBeforeSell` | `number` |
| `tokenAdressToSnipe` | `string` |
| `amountIn` | `BigNumber` |
| `provider` | [`TradeManager`](TradeManager.TradeManager-1.md) |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[sniperBot.ts:59](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/sniperBot.ts#L59)

___

### Snipe

▸ `Private` **Snipe**(`provider`, `tokenAdressToSnipe`, `logger`, `amountInETH`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`TradeManager`](TradeManager.TradeManager-1.md) |
| `tokenAdressToSnipe` | `string` |
| `logger` | `undefined` \| [`ILogger`](../interfaces/BotLogger.ILogger.md) |
| `amountInETH` | `string` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[sniperBot.ts:83](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/sniperBot.ts#L83)

___

### SnipeToken

▸ **SnipeToken**(`tradeParams`): `Promise`<`BigNumber`\>

Snipe a Token

#### Parameters

| Name | Type |
| :------ | :------ |
| `tradeParams` | [`TradeParams`](TradeParams.TradeParams-1.md) |

#### Returns

`Promise`<`BigNumber`\>

Eth value gain in wei units

#### Defined in

[sniperBot.ts:25](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/sniperBot.ts#L25)
