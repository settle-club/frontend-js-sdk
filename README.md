# Settle Frontend SDK

The Settle Frontend SDK allows merchants to integrate a seamless popup into their websites for handling transactions. The SDK provides functions to open and close the checkout popup and supports callbacks for success and failure scenarios, including error handling.

## Table of Contents

- [Installation](#installation)
- [API Reference](#api-reference)
  - [Settle.open](#settleopen)
  - [Settle.close](#settleclose)
- [Usage Example](#usage-example)

## Installation

1. Include the SDK in your HTML file:

   ```bash
   npm install git+https://github.com/settle-club/frontend-js-sdk.git
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
  "<redirectUrl obtained after calling Create Order>",
  function onSuccess(transaction) {
    console.log("Transaction Successful!");
  },
  function onFailure(error) {
    console.error("Transaction Failed:", error);
  }
);
```

#### Schema of `transaction` is

```javascript
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["SUCCESS", "FAILED", "CANCELLED"]
    },
    "order": {
      "type": "object",
      "properties": {
        "valueInPaise": {
          "type": "number"
        },
        "uid": {
          "type": "string"
        }
      },
      "required": ["valueInPaise", "uid"],
    },
    "customer": {
      "type": "object",
      "properties": {
        "mobile": {
          "type": "string"
        },
        "countryCode": {
          "type": "string"
        },
        "uid": {
          "type": "string"
        }
      },
      "required": ["mobile", "countryCode"],
    },
    "transactionId": {
      "type": ["string", "null"]
    }
  },
  "required": ["status", "order", "customer", "transactionId"]
}
```

##### Description of `transaction` schema is

| Field          | Type            | Description                                                             |
|----------------|-----------------|-------------------------------------------------------------------------|
| `status`       | `string`        | The status of the transaction. Possible values are: `SUCCESS`, `FAILED`, `CANCELLED`. |
| `order`        | `object`        | Details of the order. Can be an empty object for  `FAILED`, `CANCELLED`.                           |
| `order.valueInPaise` | `number`  | The total value of the order in paise.                 |
| `order.uid`    | `string`        | The unique identifier for the order.                    |
| `customer`     | `object`        | Details of the customer. Can be an empty object for  `FAILED`, `CANCELLED`.                         |
| `customer.mobile`      | `string` | The mobile number of the customer.                      |
| `customer.countryCode` | `string` | The country code of the customer's mobile number.       |
| `customer.uid`         | `string` | The unique identifier for the customer. Optional field.                 |
| `transactionId`        | `string \ null` | The unique identifier for the transaction. Can be null for failed or cancelled transactions.           |




------------

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
      document.getElementById("openIframeButton").onclick = function () {
        Settle.open(
          "<redirectUrl obtained after calling Create Order>",
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

### Next.js Application

1. Add "use client" at the top of your component file.

2. Import the package into your application.

3. Implement the button and callback functions.

```javascript
"use client";

import styles from "./page.module.css";
import "frontend-js-sdk";

export default function Home() {
  const openIframe = () => {
    Settle.open(
      "<redirectUrl obtained after calling Create Order>",
      function onSuccess(transaction) {
        console.log("Transaction Successful!");
      },
      function onFailure(error) {
        console.error("Transaction Failed:", error);
      }
    );
  };

  return (
    <main className={styles.main}>
      <button onClick={openIframe}>Open Iframe</button>
    </main>
  );
}
```
