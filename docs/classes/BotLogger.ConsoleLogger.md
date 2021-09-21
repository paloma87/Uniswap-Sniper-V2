[uniswap-sniper-v2](../README.md) / [Exports](../modules.md) / [BotLogger](../modules/BotLogger.md) / ConsoleLogger

# Class: ConsoleLogger

[BotLogger](../modules/BotLogger.md).ConsoleLogger

## Implements

- [`ILogger`](../interfaces/BotLogger.ILogger.md)

## Table of contents

### Constructors

- [constructor](BotLogger.ConsoleLogger.md#constructor)

### Properties

- [error](BotLogger.ConsoleLogger.md#error)
- [logDebug](BotLogger.ConsoleLogger.md#logdebug)
- [logInfo](BotLogger.ConsoleLogger.md#loginfo)

### Methods

- [LogDebug](BotLogger.ConsoleLogger.md#logdebug)
- [LogError](BotLogger.ConsoleLogger.md#logerror)
- [LogInfo](BotLogger.ConsoleLogger.md#loginfo)
- [ParseData](BotLogger.ConsoleLogger.md#parsedata)

## Constructors

### constructor

• **new ConsoleLogger**()

## Properties

### error

• **error**: `boolean` = `true`

#### Defined in

[BotLogger.ts:12](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/BotLogger.ts#L12)

___

### logDebug

• **logDebug**: `boolean` = `true`

#### Defined in

[BotLogger.ts:11](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/BotLogger.ts#L11)

___

### logInfo

• **logInfo**: `boolean` = `true`

#### Defined in

[BotLogger.ts:10](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/BotLogger.ts#L10)

## Methods

### LogDebug

▸ **LogDebug**(`msg`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ILogger](../interfaces/BotLogger.ILogger.md).[LogDebug](../interfaces/BotLogger.ILogger.md#logdebug)

#### Defined in

[BotLogger.ts:19](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/BotLogger.ts#L19)

___

### LogError

▸ **LogError**(`msg`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ILogger](../interfaces/BotLogger.ILogger.md).[LogError](../interfaces/BotLogger.ILogger.md#logerror)

#### Defined in

[BotLogger.ts:24](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/BotLogger.ts#L24)

___

### LogInfo

▸ **LogInfo**(`msg`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ILogger](../interfaces/BotLogger.ILogger.md).[LogInfo](../interfaces/BotLogger.ILogger.md#loginfo)

#### Defined in

[BotLogger.ts:14](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/BotLogger.ts#L14)

___

### ParseData

▸ `Private` **ParseData**(`dateTime`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateTime` | `Date` |

#### Returns

`string`

#### Defined in

[BotLogger.ts:29](https://github.com/paloma87/Uniswap-Sniper-V2/blob/bdfc316/src/BotLogger.ts#L29)
