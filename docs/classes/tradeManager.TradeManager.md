[uniswap-sniper-v2](../README.md) / [Modules](../modules.md) / [tradeManager](../modules/tradeManager.md) / TradeManager

# Class: TradeManager

[tradeManager](../modules/tradeManager.md).TradeManager

Handle the trade operation

## Table of contents

### Constructors

- [constructor](tradeManager.TradeManager.md#constructor)

### Properties

- [botConfig](tradeManager.TradeManager.md#botconfig)
- [logger](tradeManager.TradeManager.md#logger)
- [provider](tradeManager.TradeManager.md#provider)
- [tradeParams](tradeManager.TradeManager.md#tradeparams)

### Methods

- [ApproveTokenUniswap](tradeManager.TradeManager.md#approvetokenuniswap)
- [BalanceOf](tradeManager.TradeManager.md#balanceof)
- [GetBuyGasPrice](tradeManager.TradeManager.md#getbuygasprice)
- [GetSellGasPrice](tradeManager.TradeManager.md#getsellgasprice)
- [GetSigner](tradeManager.TradeManager.md#getsigner)
- [MakeMoney](tradeManager.TradeManager.md#makemoney)
- [Snipe](tradeManager.TradeManager.md#snipe)
- [SwapETHForToken](tradeManager.TradeManager.md#swapethfortoken)
- [SwapExactTokensForETH](tradeManager.TradeManager.md#swapexacttokensforeth)
- [WaitTransactionComplete](tradeManager.TradeManager.md#waittransactioncomplete)

## Constructors

### constructor

• **new TradeManager**(`tradeParams`, `botConfig`, `logger?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tradeParams` | [`TradeParams`](tradeParams.TradeParams.md) |
| `botConfig` | [`BotConfiguration`](botConfiguration.BotConfiguration.md) |
| `logger?` | [`ILogger`](../interfaces/botLogger.ILogger.md) |

#### Defined in

tradeManager.ts:29

## Properties

### botConfig

• `Private` **botConfig**: [`BotConfiguration`](botConfiguration.BotConfiguration.md)

#### Defined in

tradeManager.ts:28

___

### logger

• `Private` `Optional` **logger**: [`ILogger`](../interfaces/botLogger.ILogger.md)

#### Defined in

tradeManager.ts:26

___

### provider

• `Private` **provider**: `any`

#### Defined in

tradeManager.ts:25

___

### tradeParams

• `Private` **tradeParams**: [`TradeParams`](tradeParams.TradeParams.md)

#### Defined in

tradeManager.ts:27

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

tradeManager.ts:42

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

tradeManager.ts:129

___

### GetBuyGasPrice

▸ `Private` **GetBuyGasPrice**(): `Promise`<`BigNumber`\>

Return gaas_price for snipe trade

#### Returns

`Promise`<`BigNumber`\>

Gas price in wei

#### Defined in

tradeManager.ts:139

___

### GetSellGasPrice

▸ `Private` **GetSellGasPrice**(): `Promise`<`BigNumber`\>

Return gas_price for sell trade

#### Returns

`Promise`<`BigNumber`\>

Gas price in wei

#### Defined in

tradeManager.ts:148

___

### GetSigner

▸ `Private` **GetSigner**(): `Wallet`

Retrive the signer for transaction

#### Returns

`Wallet`

Signer connected to provider

#### Defined in

tradeManager.ts:156

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

tradeManager.ts:54

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

tradeManager.ts:91

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

tradeManager.ts:168

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

tradeManager.ts:206

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

tradeManager.ts:243
