[uniswap-sniper-v2](../README.md) / [Modules](../modules.md) / [botLogger](../modules/botLogger.md) / ConsoleLogger

# Class: ConsoleLogger

[botLogger](../modules/botLogger.md).ConsoleLogger

## Implements

- [`ILogger`](../interfaces/botLogger.ILogger.md)

## Table of contents

### Constructors

- [constructor](botLogger.ConsoleLogger.md#constructor)

### Properties

- [error](botLogger.ConsoleLogger.md#error)
- [logDebug](botLogger.ConsoleLogger.md#logdebug)
- [logInfo](botLogger.ConsoleLogger.md#loginfo)

### Methods

- [LogDebug](botLogger.ConsoleLogger.md#logdebug)
- [LogError](botLogger.ConsoleLogger.md#logerror)
- [LogInfo](botLogger.ConsoleLogger.md#loginfo)
- [ParseData](botLogger.ConsoleLogger.md#parsedata)

## Constructors

### constructor

• **new ConsoleLogger**()

## Properties

### error

• **error**: `boolean` = `true`

#### Defined in

botLogger.ts:12

___

### logDebug

• **logDebug**: `boolean` = `true`

#### Defined in

botLogger.ts:11

___

### logInfo

• **logInfo**: `boolean` = `false`

#### Defined in

botLogger.ts:10

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

[ILogger](../interfaces/botLogger.ILogger.md).[LogDebug](../interfaces/botLogger.ILogger.md#logdebug)

#### Defined in

botLogger.ts:19

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

[ILogger](../interfaces/botLogger.ILogger.md).[LogError](../interfaces/botLogger.ILogger.md#logerror)

#### Defined in

botLogger.ts:24

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

[ILogger](../interfaces/botLogger.ILogger.md).[LogInfo](../interfaces/botLogger.ILogger.md#loginfo)

#### Defined in

botLogger.ts:14

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

botLogger.ts:29
