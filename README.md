# 🎉 Tada

[![npm version](https://img.shields.io/npm/v/@achabs/tada.svg)](https://www.npmjs.com/package/@achabs/tada)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@achabs/tada)](https://bundlephobia.com/package/@achabs/tada)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, customizable toast notification library written in TypeScript.

## Features

- ✅ **Zero dependencies** - Lightweight and fast
- ♿ **Accessible** - Full ARIA support and keyboard navigation
- 🎨 **Customizable** - Custom animations, positions, colors, and styling
- 🖼️ **Icons & Images** - Add SVG icons or avatar images to toasts
- 📊 **Progress Bar** - Visual countdown indicator for timed toasts
- 🎯 **Border Radius** - Customize rounded corners (pill, square, or custom)
- 🌈 **Custom Colors** - Set your own background and text colors
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

// Show progress bar
tada.show("Uploading...", {
  showProgress: true,
  duration: 5000
});

// Add icon (SVG or HTML string)
tada.success("Done!", {
  icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
});

// Add image
tada.info("New message from John", {
  image: "https://example.com/avatar.jpg"
});

// Custom border radius
tada.success("Pill shape!", {
  borderRadius: "50px"
});

tada.info("Square corners", {
  borderRadius: "0"
});

// Custom colors
tada.show("Dark mode!", {
  backgroundColor: "#1f2937",
  color: "#f3f4f6"
});

tada.success("Neon vibes!", {
  backgroundColor: "#000",
  color: "#0ff"
});

// Custom animations
tada.show("Message", {
  animation: {
    enter: "scale(0)",
    exit: "scale(0)",
    duration: 500,
  },
});

// Combine multiple features!
tada.success("Payment received!", {
  icon: '<svg>...</svg>',
  showProgress: true,
  duration: 4000,
  borderRadius: "50px",
  backgroundColor: "rgba(34, 197, 94, 0.95)",
  color: "#fff"
});
```

## API Reference

### ToastOptions

All toast methods accept an optional `ToastOptions` object:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | `number` | `3000` | Duration in milliseconds (0 = no auto-close) |
| `position` | `string` | `'top-right'` | Position on screen (see positions below) |
| `type` | `string` | `'default'` | Toast type: `'default'`, `'success'`, `'error'`, `'warning'`, `'info'` |
| `closeButton` | `boolean` | `true` | Show close button |
| `maxToasts` | `number` | `0` | Maximum toasts shown at once (0 = unlimited) |
| `showProgress` | `boolean` | `false` | Show progress bar countdown |
| `icon` | `string` | `undefined` | SVG or HTML string for icon (left side) |
| `image` | `string` | `undefined` | Image URL for avatar (left side, circular) |
| `borderRadius` | `string` | `undefined` | Custom border radius (e.g., `'50px'`, `'0'`, `'8px'`) |
| `backgroundColor` | `string` | `undefined` | Custom background color (any CSS color) |
| `color` | `string` | `undefined` | Custom text color (any CSS color) |
| `animation` | `object` | `undefined` | Custom animation object (see below) |

#### Animation Object

```typescript
{
  enter?: string;    // CSS transform for enter animation
  exit?: string;     // CSS transform for exit animation
  duration?: number; // Animation duration in ms
}
```

### Methods

#### `tada.show(message, options?)`
Shows a default toast notification.
```javascript
const toast = tada.show("Hello World!");
```

#### `tada.success(message, options?)`
Shows a success toast (green).
```javascript
tada.success("Profile updated!");
```

#### `tada.error(message, options?)`
Shows an error toast (red).
```javascript
tada.error("Something went wrong!");
```

#### `tada.warning(message, options?)`
Shows a warning toast (yellow).
```javascript
tada.warning("Session expiring soon");
```

#### `tada.info(message, options?)`
Shows an info toast (blue).
```javascript
tada.info("New features available");
```

#### `tada.remove(toast)`
Manually removes a specific toast.
```javascript
const toast = tada.show("Message");
tada.remove(toast);
```

#### `tada.clear()`
Removes all active toasts.
```javascript
tada.clear();
```

#### `tada.destroy()`
Cleanup method that removes all toasts and containers.
```javascript
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
