[uniswap-sniper-v2](../README.md) / [Exports](../modules.md) / [bot](../modules/bot.md) / SniperBot

# Class: SniperBot

[bot](../modules/bot.md).SniperBot

## Table of contents

### Constructors

- [constructor](bot.SniperBot.md#constructor)

### Properties

- [botConfig](bot.SniperBot.md#botconfig)
- [logger](bot.SniperBot.md#logger)

### Methods

- [CalculateGain](bot.SniperBot.md#calculategain)
- [Sell](bot.SniperBot.md#sell)
- [Snipe](bot.SniperBot.md#snipe)
- [SnipeToken](bot.SniperBot.md#snipetoken)

## Constructors

### constructor

• **new SniperBot**(`botConfig`, `logger?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `botConfig` | [`BotConfiguration`](BotConfiguration.BotConfiguration-1.md) |
| `logger?` | [`ILogger`](../interfaces/BotLogger.ILogger.md) |

#### Defined in

[bot.ts:15](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/bot.ts#L15)

## Properties

### botConfig

• `Private` **botConfig**: [`BotConfiguration`](BotConfiguration.BotConfiguration-1.md)

Configuration

#### Defined in

[bot.ts:13](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/bot.ts#L13)

___

### logger

• `Private` `Optional` **logger**: [`ILogger`](../interfaces/BotLogger.ILogger.md)

#### Defined in

[bot.ts:14](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/bot.ts#L14)

## Methods

### CalculateGain

▸ `Private` **CalculateGain**(`amountInETH`, `amountOutETH`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountInETH` | `BigNumber` |
| `amountOutETH` | `BigNumber` |

#### Returns

`BigNumber`

#### Defined in

[bot.ts:83](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/bot.ts#L83)

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

[bot.ts:50](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/bot.ts#L50)

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

[bot.ts:69](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/bot.ts#L69)

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

[bot.ts:26](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/bot.ts#L26)
