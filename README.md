# Ceramic bundle


This packages the five functions below as a global module for ease of use with
an `<script>`.

```js
/// Initializes a Ceramic client.
function initializeClient(): CeramicClient;

/// Authenticates using an Ethereum address.
function authenticateEthAddress(CeramicClient, String): void;

/// Returns the object saved at the document described by DocOptions.
function readDocument(CeramicClient, DocOptions): Object;

/// Writes a new object to the document described by DocOptions.
function writeDocument(CeramicClient, Object, DocOptions): void;

/// Writes an empty (`{}`) object to the document described by DocOptions.
function clearDocument(CeramicClient, DocOptions): void;
```
