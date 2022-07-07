# m-it

![m-it logo](https://github.com/LeRedditBro/m-it/blob/main/images/m-it.svg)

<p>
<img src="https://img.shields.io/badge/-No%20Dependencies%20%F0%9F%8D%83-brightgreen"/><img src="https://img.shields.io/bundlephobia/min/m-it"/>
</p>

A Minimal javascript event emitter, simple with no bloat

## Installation

**npm:**

```bash
npm install m-it
```

**yarn:**

```bash
yarn add m-it
```

**pnpm:**

```bash
pnpm add m-it
```

## Usage

usage is very simple, and meant to be used for very simple events.
there are no event names, the semantics of the event are tied to its variable name.

```js
import EventEmitter from 'm-it';
// also accessible via destructure (complies better with vscode autocomplete)
import { EventEmitter } from 'm-it';

const obj = { onClick: new EventEmitter() };

obj.onClick.sub(() => {
	/*...*/
});

obj.onClick.emit();
```

**Subscribing:**

```js
obj.onClick.subscribe(() => {
	/*...*/
});
// or the alias
obj.onClick.sub(() => {
	/*...*/
});
```

**Unsubscribing:**

```js
obj.onClick.unsubscribe(handler);
// or the alias
obj.onClick.unsub(handler);

// unsubscribe all
obj.onClick.clear();
```

you can also utilize the cleanup function returned via the subscription functions

```js
const cleanup = obj.onClick.sub(() => {
	/*...*/
});

// unsubscribe
cleanup();
```
