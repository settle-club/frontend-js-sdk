# Settle SDK

The Settle SDK allows merchants to integrate a seamless iframe popup into their websites for handling transactions. The SDK provides functions to open and close the iframe and supports callbacks for success and failure scenarios, including error handling.

## Table of Contents

- [Installation](#installation)
- [API Reference](#api-reference)
  - [`Settle.open`](#settleopen)
  - [`Settle.close`](#settleclose)
- [Usage Example](#usage-example)
- [Styling](#styling)

## Installation

1. Include the SDK in your HTML file:

   ```bash
   npm install git+https://github.com/settle-club/frontend-js-sdk.git
   ```

### Usage In Next App

1. Add `"use client"` at the top.

2. Import the package into your application.
   ```bash
   import "frontend-js-sdk";
   ```

## API Reference

### `Settle.open`

Opens an iframe popup with the specified URL and monitors for success or failure messages.

#### Parameters:

- `url` (string): The URL to be loaded in the iframe.
- `onSuccess` (function): Callback function to be executed when the transaction is successful.
- `onFailure` (function): Callback function to be executed when the transaction fails. Receives an `error` parameter with the error message.

#### Example:

```javascript
Settle.open(
  "https://www.settle.club",
  function onSuccess(transaction) {
    console.log("Transaction Successful!");
  },
  function onFailure(error) {
    console.error("Transaction Failed:", error);
  }
);
```

### `Settle.close`

Closes the iframe popup if it is open.

#### Example:

```javascript
Settle.close();
```

## Usage Example

### HTML

Create a button to open the iframe and handle transactions:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Merchant Page</title>
    <script src="dist/sdk.bundle.js"></script>
  </head>
  <body>
    <button id="openIframeButton">Open Iframe</button>

    <script>
        document.getElementById('openIframeButton').onclick = function() {
            Settle.open(
                "https://www.settle.club",
                function onSuccess(transaction) {
                    console.log("Transaction Successful!");
                },
                function onFailure(error) {
                    console.error("Transaction Failed:", error);
                }
            );
        };
    </script>
  </body>
</html>
```

### Next App

```javascript
"use client";

import styles from "./page.module.css";
import "frontend-js-sdk";

export default function Home() {
  const openIframe = () => {
    Settle.open(
      "https://account.sit.potleex0.de",
      function onSuccess(transaction) {
        console.log("Transaction Successful!");
      },
      function onFailure(error) {
        console.error("Transaction Failed:", error);
      }
    );
  };

  return (
    window && (
      <main className={styles.main}>
        <button onClick={openIframe}>Open Iframe</button>
      </main>
    )
  );
}
```