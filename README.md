# Settle SDK

The Settle SDK allows merchants to integrate a seamless iframe popup into their websites for handling transactions. The SDK provides functions to open and close the iframe and supports callbacks for success and failure scenarios, including error handling.

## Table of Contents

- [Installation](#installation)
- [API Reference](#api-reference)
  - [`SettleSdk.openIframe`](#settlesdkopeniframe)
  - [`SettleSdk.closeIframe`](#settlesdkcloseiframe)
- [Usage Example](#usage-example)
- [Styling](#styling)

## Installation

Include the SDK in your HTML file:

```bash
npm install git+https://github.com/settle-club/frontend-js-sdk.git
```

## API Reference

### `SettleSdk.openIframe`

Opens an iframe popup with the specified URL and monitors for success or failure messages.

#### Parameters:

- `url` (string): The URL to be loaded in the iframe.
- `onSuccess` (function): Callback function to be executed when the transaction is successful.
- `onFailure` (function): Callback function to be executed when the transaction fails. Receives an `error` parameter with the error message.

#### Example:

```javascript
SettleSdk.openIframe(
    "https://www.settle.club",
    function onSuccess() {
        console.log("Transaction Successful!");
    },
    function onFailure(error) {
        console.error("Transaction Failed:", error);
    }
);
```

### `SettleSdk.closeIframe`

Closes the iframe popup if it is open.

#### Example:

```javascript
SettleSdk.closeIframe();
```

## Usage Example

### HTML

Create a button to open the iframe and handle transactions:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Merchant Page</title>
    <script src="dist/sdk.bundle.js"></script>
</head>
<body>
    <button id="openIframeButton">Open Iframe</button>

    <script>
        document.getElementById('openIframeButton').onclick = function() {
            SettleSdk.openIframe(
                "https://www.settle.club",
                function onSuccess() {
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
