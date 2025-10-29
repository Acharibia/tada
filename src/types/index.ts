export interface ToastOptions {
    duration?: number;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    type?: 'default' | 'success' | 'error' | 'warning' | 'info';
    closeButton?: boolean;
    maxToasts?: number;
    animation?: {
        enter?: string;
        exit?: string;
        duration?: number;
    };
    icon?: string; // SVG string or HTML string for icon
    image?: string; // URL for image
    showProgress?: boolean; // Show progress bar
    borderRadius?: string; // Custom border radius (e.g., '8px', '20px', '0')
    backgroundColor?: string; // Custom background color (e.g., '#fff', 'rgba(0,0,0,0.9)')
    color?: string; // Custom text color (e.g., '#000', 'rgb(255,255,255)')
}

export type ToastPosition = ToastOptions['position'];
export type ToastType = ToastOptions['type'];