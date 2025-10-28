# 🎉 Tada

A lightweight, customizable toast notification library written in TypeScript.

## Installation

```bash
npm install tada
```

## Quick Start

```javascript
import tada from "tada";
import "tada/dist/index.css"; // Don't forget to import the CSS!

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

### Methods

```javascript
// Manually remove a toast
const toast = tada.show("Message");
tada.remove(toast);

// Clear all toasts
tada.clear();
```

## TypeScript

Fully typed with TypeScript support out of the box!

```typescript
import tada, { TadaToast, ToastOptions } from "tada";

const options: ToastOptions = {
  duration: 3000,
  position: "top-right",
};

tada.success("Typed!", options);
```

## License

MIT
