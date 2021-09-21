[uniswap-sniper-v2](../README.md) / [Exports](../modules.md) / [TradeManager](../modules/TradeManager.md) / TradeManager

# Class: TradeManager

[TradeManager](../modules/TradeManager.md).TradeManager

Handle the trade operation

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

[TradeManager.ts:28](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L28)

## Properties

### botConfig

• `Private` **botConfig**: [`BotConfiguration`](BotConfiguration.BotConfiguration-1.md)

#### Defined in

[TradeManager.ts:27](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L27)

___

### logger

• `Private` `Optional` **logger**: [`ILogger`](../interfaces/BotLogger.ILogger.md)

#### Defined in

[TradeManager.ts:25](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L25)

___

### provider

• `Private` **provider**: `any`

#### Defined in

[TradeManager.ts:24](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L24)

___

### tradeParams

• `Private` **tradeParams**: [`TradeParams`](TradeParams.TradeParams-1.md)

#### Defined in

[TradeManager.ts:26](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L26)

## Methods

### ApproveTokenUniswap

▸ **ApproveTokenUniswap**(`tokenAdressToSnipe`): `Promise`<`any`\>

Call a token smart contract to approve uniswap to use the sniped token
This operation is preparatory to the sale of the sniped token

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAdressToSnipe` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[TradeManager.ts:41](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L41)

___

### BalanceOf

▸ `Private` **BalanceOf**(`tokenAdress`): `Promise`<`BigNumber`\>

Retrive the current balance of token into wallet configured

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenAdress` | `string` | Token |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:126](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L126)

___

### GetBuyGasPrice

▸ `Private` **GetBuyGasPrice**(): `Promise`<`BigNumber`\>

Return gaas_price for snipe trade

#### Returns

`Promise`<`BigNumber`\>

Gas price in wei

#### Defined in

[TradeManager.ts:136](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L136)

___

### GetSellGasPrice

▸ `Private` **GetSellGasPrice**(): `Promise`<`BigNumber`\>

Return gas_price for sell trade

#### Returns

`Promise`<`BigNumber`\>

Gas price in wei

#### Defined in

[TradeManager.ts:145](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L145)

___

### GetSigner

▸ `Private` **GetSigner**(): `Wallet`

Retrive the signer for transaction

#### Returns

`Wallet`

Signer connected to provider

#### Defined in

[TradeManager.ts:154](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L154)

___

### MakeMoney

▸ **MakeMoney**(`TokenAdressToSell`, `amountToken`): `Promise`<`BigNumber`\>

Use uniswap Sdk to calculate the parameter operation
for the trade of sale sniped token and call operation

#### Parameters

| Name | Type |
| :------ | :------ |
| `TokenAdressToSell` | `string` |
| `amountToken` | `BigNumber` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:53](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L53)

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

[TradeManager.ts:89](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L89)

___

### SwapETHForToken

▸ `Private` **SwapETHForToken**(`amountIn`, `amountOutMin`, `path`): `Promise`<`BigNumber`\>

Execute the snipe operation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountIn` | `CurrencyAmount` | ethers in input |
| `amountOutMin` | `CurrencyAmount` | amount minium out accepted for the trade |
| `path` | `string`[] | adress route token |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:166](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L166)

___

### SwapExactTokensForETH

▸ `Private` **SwapExactTokensForETH**(`amountIn`, `amountOutMin`, `path`): `Promise`<`BigNumber`\>

Execute the sell trade

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountIn` | `CurrencyAmount` | sniped token amount |
| `amountOutMin` | `CurrencyAmount` | ether amount minium accepted for the trade |
| `path` | `string`[] |  |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[TradeManager.ts:204](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L204)

___

### WaitTransactionComplete

▸ **WaitTransactionComplete**(`tx`): `Promise`<`void`\>

Wait transaction and check if status ok else throw an exception

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `any` | Transaction pending |

#### Returns

`Promise`<`void`\>

#### Defined in

[TradeManager.ts:241](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/TradeManager.ts#L241)
