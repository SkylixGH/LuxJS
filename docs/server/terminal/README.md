# Terminal: `module`

This module contains methods for logging formatted messages into the console.

## Method: `setBulletMode`

Enable or disable using bullet points for message prefixes.

-   Parameters
    -   mode: `boolean` Should bullet points be used instead of tag prefixes.

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

-   Parameters
    -   mode: `boolean` Should timestamps points be used instead of tag prefixes.

**Example**

```ts
// TypeScript
terminal.setTimeStampMode(true);
```

```js
// JavaScript
terminal.setTimeStampMode(false);
```

# Method: `info`

Log an info message into the terminal.

-   Parameters
    -   `message`: `string` The message to log into the terminal.

**Example**

```ts
// TypeScript
terminal.info("Hello, world");
```

```js
// JavaScript
terminal.info("Hello, world");
```

# Method: `error`

Log an error message into the terminal.

-   Parameters
    -   `message`: `string` The message to log into the terminal.

**Example**

```ts
// TypeScript
terminal.error("Hello, world");
```

```js
// JavaScript
terminal.error("Hello, world");
```

# Method: `warning`

Log a warning message into the terminal.

-   Parameters
    -   `message`: `string` The message to log into the terminal.

**Example**

```ts
// TypeScript
terminal.warning("Hello, world");
```

```js
// JavaScript
terminal.warning("Hello, world");
```

# Method: `success`

Log a success message into the terminal.

-   Parameters
    -   `message`: `string` The message to log into the terminal.

**Example**

```ts
// TypeScript
terminal.success("Hello, world");
```

```js
// JavaScript
terminal.success("Hello, world");
```
