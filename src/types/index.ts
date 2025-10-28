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
}

export type ToastPosition = ToastOptions['position'];
export type ToastType = ToastOptions['type'];