[uniswap-sniper-v2](../README.md) / [Exports](../modules.md) / [TradeManager](../modules/TradeManager.md) / TradeManager

# Class: TradeManager

[TradeManager](../modules/TradeManager.md).TradeManager

## Table of contents

### Constructors

- [constructor](TradeManager.TradeManager-1.md#constructor)

### Properties

- [botConfig](TradeManager.TradeManager-1.md#botconfig)
- [logger](TradeManager.TradeManager-1.md#logger)
- [provider](TradeManager.TradeManager-1.md#provider)
- [tradeParams](TradeManager.TradeManager-1.md#tradeparams)

### Methods

- [ApproveTokenUniswap](TradeManager.TradeManager-1.md#approvetokenuniswap)
- [BalanceOf](TradeManager.TradeManager-1.md#balanceof)
- [GetBuyGasPrice](TradeManager.TradeManager-1.md#getbuygasprice)
- [GetSellGasPrice](TradeManager.TradeManager-1.md#getsellgasprice)
- [GetSigner](TradeManager.TradeManager-1.md#getsigner)
- [MakeMoney](TradeManager.TradeManager-1.md#makemoney)
- [Snipe](TradeManager.TradeManager-1.md#snipe)
- [SwapETHForToken](TradeManager.TradeManager-1.md#swapethfortoken)
- [SwapExactTokensForETH](TradeManager.TradeManager-1.md#swapexacttokensforeth)
- [WaitTransactionComplete](TradeManager.TradeManager-1.md#waittransactioncomplete)

## Constructors

### constructor

• **new TradeManager**(`tradeParams`, `botConfig`, `logger?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tradeParams` | [`TradeParams`](TradeParams.TradeParams-1.md) |
| `botConfig` | [`BotConfiguration`](BotConfiguration.BotConfiguration-1.md) |
| `logger?` | [`ILogger`](../interfaces/BotLogger.ILogger.md) |

#### Defined in

[TradeManager.ts:26](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L26)

## Properties

### botConfig

• `Private` **botConfig**: [`BotConfiguration`](BotConfiguration.BotConfiguration-1.md)

#### Defined in

[TradeManager.ts:25](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L25)

___

### logger

• `Private` `Optional` **logger**: [`ILogger`](../interfaces/BotLogger.ILogger.md)

#### Defined in

[TradeManager.ts:23](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L23)

___

### provider

• `Private` **provider**: `any`

#### Defined in

[TradeManager.ts:22](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L22)

___

### tradeParams

• `Private` **tradeParams**: [`TradeParams`](TradeParams.TradeParams-1.md)

#### Defined in

[TradeManager.ts:24](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L24)

## Methods

### ApproveTokenUniswap

▸ **ApproveTokenUniswap**(`tokenAdressToSnipe`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAdressToSnipe` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[TradeManager.ts:33](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L33)

___

### BalanceOf

▸ `Private` **BalanceOf**(`tokenAdress`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAdress` | `string` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:103](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L103)

___

### GetBuyGasPrice

▸ `Private` **GetBuyGasPrice**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:109](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L109)

___

### GetSellGasPrice

▸ `Private` **GetSellGasPrice**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:114](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L114)

___

### GetSigner

▸ `Private` **GetSigner**(): `Wallet`

#### Returns

`Wallet`

#### Defined in

[TradeManager.ts:118](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L118)

___

### MakeMoney

▸ **MakeMoney**(`TokenAdressToSell`, `amountToken`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `TokenAdressToSell` | `string` |
| `amountToken` | `BigNumber` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:39](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L39)

___

### Snipe

▸ **Snipe**(`tokenAdressToSnipe`, `amountInETH`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAdressToSnipe` | `string` |
| `amountInETH` | `string` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:70](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L70)

___

### SwapETHForToken

▸ `Private` **SwapETHForToken**(`amountIn`, `amountOutMin`, `path`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountIn` | `CurrencyAmount` |
| `amountOutMin` | `CurrencyAmount` |
| `path` | `string`[] |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:123](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L123)

___

### SwapExactTokensForETH

▸ `Private` **SwapExactTokensForETH**(`amountIn`, `amountOutMin`, `path`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountIn` | `CurrencyAmount` |
| `amountOutMin` | `CurrencyAmount` |
| `path` | `string`[] |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:154](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L154)

___

### WaitTransactionComplete

▸ **WaitTransactionComplete**(`tx`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[TradeManager.ts:187](https://github.com/paloma87/Uniswap-Sniper-V2/blob/92bb6b1/src/TradeManager.ts#L187)
