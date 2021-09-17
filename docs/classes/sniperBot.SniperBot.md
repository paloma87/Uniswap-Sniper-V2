[uniswap-sniper-v2](../README.md) / [Modules](../modules.md) / [sniperBot](../modules/sniperBot.md) / SniperBot

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
| `botConfig` | [`BotConfiguration`](botConfiguration.BotConfiguration.md) |
| `logger?` | [`ILogger`](../interfaces/botLogger.ILogger.md) |

#### Defined in

[sniperBot.ts:17](https://github.com/paloma87/Uniswap-Sniper-V2/blob/dbb3c0e/src/sniperBot.ts#L17)

## Properties

### botConfig

• `Private` **botConfig**: [`BotConfiguration`](botConfiguration.BotConfiguration.md)

Configuration of bot

#### Defined in

[sniperBot.ts:15](https://github.com/paloma87/Uniswap-Sniper-V2/blob/dbb3c0e/src/sniperBot.ts#L15)

___

### logger

• `Private` `Optional` **logger**: [`ILogger`](../interfaces/botLogger.ILogger.md)

#### Defined in

[sniperBot.ts:16](https://github.com/paloma87/Uniswap-Sniper-V2/blob/dbb3c0e/src/sniperBot.ts#L16)

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

[sniperBot.ts:91](https://github.com/paloma87/Uniswap-Sniper-V2/blob/dbb3c0e/src/sniperBot.ts#L91)

___

### Sell

▸ `Private` **Sell**(`logger`, `timeBeforeSell`, `tokenAdressToSnipe`, `amountIn`, `provider`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | `undefined` \| [`ILogger`](../interfaces/botLogger.ILogger.md) |
| `timeBeforeSell` | `number` |
| `tokenAdressToSnipe` | `string` |
| `amountIn` | `BigNumber` |
| `provider` | [`TradeManager`](tradeManager.TradeManager.md) |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[sniperBot.ts:52](https://github.com/paloma87/Uniswap-Sniper-V2/blob/dbb3c0e/src/sniperBot.ts#L52)

___

### Snipe

▸ `Private` **Snipe**(`provider`, `tokenAdressToSnipe`, `logger`, `amountInETH`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`TradeManager`](tradeManager.TradeManager.md) |
| `tokenAdressToSnipe` | `string` |
| `logger` | `undefined` \| [`ILogger`](../interfaces/botLogger.ILogger.md) |
| `amountInETH` | `string` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[sniperBot.ts:71](https://github.com/paloma87/Uniswap-Sniper-V2/blob/dbb3c0e/src/sniperBot.ts#L71)

___

### SnipeToken

▸ **SnipeToken**(`tradeParams`): `Promise`<`BigNumber`\>

Snipe a Token

#### Parameters

| Name | Type |
| :------ | :------ |
| `tradeParams` | [`TradeParams`](tradeParams.TradeParams.md) |

#### Returns

`Promise`<`BigNumber`\>

Eth value gain in wei units

#### Defined in

[sniperBot.ts:28](https://github.com/paloma87/Uniswap-Sniper-V2/blob/dbb3c0e/src/sniperBot.ts#L28)
