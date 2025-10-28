# 🎉 Tada

[![npm version](https://img.shields.io/npm/v/@achabs/tada.svg)](https://www.npmjs.com/package/@achabs/tada)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@achabs/tada)](https://bundlephobia.com/package/@achabs/tada)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, customizable toast notification library written in TypeScript.

## Features

- ✅ **Zero dependencies** - Lightweight and fast
- ♿ **Accessible** - Full ARIA support and keyboard navigation
- 🎨 **Customizable** - Custom animations, positions, and styling
- 📦 **TypeScript** - Fully typed with excellent IDE support
- 📱 **Responsive** - Works on all screen sizes
- 🚀 **Performance** - Memory leak prevention and cleanup utilities

## Installation

```bash
npm install @achabs/tada
```

## Quick Start

```javascript
import tada from "@achabs/tada";
import "@achabs/tada/dist/index.css"; // Don't forget to import the CSS!

// Show notifications
tada.success("Operation successful!");
tada.error("Something went wrong!");
tada.warning("Be careful!");
tada.info("Did you know?");
```

## Usage

### Basic Toast

```javascript
tada.show("Hello World!");
```

### Toast Types

```javascript
tada.success("Profile updated!");
tada.error("Failed to save");
tada.warning("Session expiring soon");
tada.info("New features available");
```

### Custom Options

```javascript
tada.show("Custom message", {
  duration: 5000, // Duration in ms (0 = no auto-close)
  position: "bottom-right", // Position on screen
  type: "success", // Type of toast
  closeButton: true, // Show close button
});
```

### Available Positions

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

### Advanced Options

```javascript
// Limit maximum toasts shown at once
tada.show("Message", { maxToasts: 3 });

// Custom animations
tada.show("Message", {
  animation: {
    enter: "scale(0)",
    exit: "scale(0)",
    duration: 500
  }
});
```

### Methods

```javascript
// Manually remove a toast
const toast = tada.show("Message");
tada.remove(toast);

// Clear all toasts
tada.clear();

// Cleanup (removes all toasts and containers)
tada.destroy();
```

### Accessibility

Tada is built with accessibility in mind:

- Full ARIA support (`role="alert"`, `aria-live`, `aria-atomic`)
- Keyboard navigation (Press `Escape` to dismiss)
- Keyboard support for close buttons (`Enter` or `Space`)
- Screen reader friendly
- Focus management

## TypeScript

Fully typed with TypeScript support out of the box!

```typescript
import tada, { TadaToast, ToastOptions } from "@achabs/tada";

const options: ToastOptions = {
  duration: 3000,
  position: "top-right",
};

tada.success("Typed!", options);
```

## Demo

Check out the [demo page](./demo/index.html) for live examples of all features!

## Browser Support

Tada works in all modern browsers that support ES2015.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
