export interface ToastOptions {
    duration?: number;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    type?: 'default' | 'success' | 'error' | 'warning' | 'info';
    closeButton?: boolean;
}

export type ToastPosition = ToastOptions['position'];
export type ToastType = ToastOptions['type'];