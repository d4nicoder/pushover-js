**[pushover-js](../README.md)**

> [Globals](../globals.md) / ["src/pushover"](../modules/_src_pushover_.md) / Pushover

# Class: Pushover

## Hierarchy

* **Pushover**

## Index

### Constructors

* [constructor](_src_pushover_.pushover.md#constructor)

### Properties

* [\_hostname](_src_pushover_.pushover.md#_hostname)
* [\_path](_src_pushover_.pushover.md#_path)

### Methods

* [send](_src_pushover_.pushover.md#send)
* [setAttachment](_src_pushover_.pushover.md#setattachment)
* [setDevice](_src_pushover_.pushover.md#setdevice)
* [setHtml](_src_pushover_.pushover.md#sethtml)
* [setMessage](_src_pushover_.pushover.md#setmessage)
* [setPriority](_src_pushover_.pushover.md#setpriority)
* [setSound](_src_pushover_.pushover.md#setsound)
* [setTimestamp](_src_pushover_.pushover.md#settimestamp)
* [setTitle](_src_pushover_.pushover.md#settitle)
* [setUrl](_src_pushover_.pushover.md#seturl)

### Object literals

* [\_notification](_src_pushover_.pushover.md#_notification)

## Constructors

### constructor

\+ **new Pushover**(`user`: string, `token`: string): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:64](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L64)*

#### Parameters:

Name | Type |
------ | ------ |
`user` | string |
`token` | string |

**Returns:** [Pushover](_src_pushover_.pushover.md)

## Properties

### \_hostname

• `Private` **\_hostname**: string = "api.pushover.net"

*Defined in [src/pushover.ts:52](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L52)*

___

### \_path

• `Private` **\_path**: string = "/1/messages.json"

*Defined in [src/pushover.ts:53](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L53)*

## Methods

### send

▸ **send**(`title?`: undefined \| string, `message?`: undefined \| string): Promise\<[IResponse](../interfaces/_src_request_.iresponse.md)>

*Defined in [src/pushover.ts:131](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L131)*

#### Parameters:

Name | Type |
------ | ------ |
`title?` | undefined \| string |
`message?` | undefined \| string |

**Returns:** Promise\<[IResponse](../interfaces/_src_request_.iresponse.md)>

___

### setAttachment

▸ **setAttachment**(`name`: string, `filePath`: string): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:96](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L96)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`filePath` | string |

**Returns:** [Pushover](_src_pushover_.pushover.md)

___

### setDevice

▸ **setDevice**(`device`: string): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:71](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L71)*

#### Parameters:

Name | Type |
------ | ------ |
`device` | string |

**Returns:** [Pushover](_src_pushover_.pushover.md)

___

### setHtml

▸ **setHtml**(): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:76](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L76)*

**Returns:** [Pushover](_src_pushover_.pushover.md)

___

### setMessage

▸ **setMessage**(`message`: string): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:86](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L86)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** [Pushover](_src_pushover_.pushover.md)

___

### setPriority

▸ **setPriority**(`priority`: [Priority](../modules/_src_pushover_.md#priority), `expire?`: undefined \| number, `retry?`: undefined \| number): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:104](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L104)*

#### Parameters:

Name | Type |
------ | ------ |
`priority` | [Priority](../modules/_src_pushover_.md#priority) |
`expire?` | undefined \| number |
`retry?` | undefined \| number |

**Returns:** [Pushover](_src_pushover_.pushover.md)

___

### setSound

▸ **setSound**(`sound`: [Sound](../modules/_src_pushover_.md#sound)): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:91](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L91)*

#### Parameters:

Name | Type |
------ | ------ |
`sound` | [Sound](../modules/_src_pushover_.md#sound) |

**Returns:** [Pushover](_src_pushover_.pushover.md)

___

### setTimestamp

▸ **setTimestamp**(`timestamp`: number): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:126](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L126)*

#### Parameters:

Name | Type |
------ | ------ |
`timestamp` | number |

**Returns:** [Pushover](_src_pushover_.pushover.md)

___

### setTitle

▸ **setTitle**(`title`: string): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:81](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L81)*

#### Parameters:

Name | Type |
------ | ------ |
`title` | string |

**Returns:** [Pushover](_src_pushover_.pushover.md)

___

### setUrl

▸ **setUrl**(`url`: string, `title?`: undefined \| string): [Pushover](_src_pushover_.pushover.md)

*Defined in [src/pushover.ts:118](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L118)*

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`title?` | undefined \| string |

**Returns:** [Pushover](_src_pushover_.pushover.md)

## Object literals

### \_notification

▪ `Private` **\_notification**: object

*Defined in [src/pushover.ts:55](https://github.com/danitetus/pushover-js/blob/9d4963a/src/pushover.ts#L55)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`expire` | number | 0 |
`message` | string | "" |
`priority` | number | 0 |
`retry` | number | 0 |
`sound` | \"pushover\" | "pushover" |
`title` | string | "" |
`token` | string | "" |
`user` | string | "" |
