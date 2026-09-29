"use strict";

// Node 21+ exposes a global `navigator`. lottie-web's UMD bundle treats that as
// a browser and reads `document` while the module loads, which crashes Next.js
// server rendering. Drop the global so Node keeps the pre-21 behavior.
if (typeof globalThis.navigator !== "undefined") {
  delete globalThis.navigator;
}
