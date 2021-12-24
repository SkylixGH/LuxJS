# Terminal: Module
This module contains methods for logging formatted messages into the console.

## Method: `setBulletMode`
Enable or disable using bullet points for message prefixes.

 - Parameters
    - mode: `boolean` Should bullet points be used instead of tag prefixes

**Example**
```ts
// TypeScript
terminal.setBulletMode(true);
```
```js
// JavaScript
terminal.setBulletMode(false);
```

## Method: `setTimeStampMode`
Allows you to display a timestamp before a message.

 - Parameters
    - mode: `boolean` Should timestamps points be used instead of tag prefixes

**Example**
```ts
// TypeScript
terminal.setTimeStampMode(true);
```
```js
// JavaScript
terminal.setTimeStampMode(false);
```
