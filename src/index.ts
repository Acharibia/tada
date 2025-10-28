import './styles/toast.css';
import type { ToastOptions } from './types';

class TadaToast {
    private defaultOptions: Required<ToastOptions>;
    private toasts: HTMLElement[];

    constructor(options: ToastOptions = {}) {
        this.defaultOptions = {
            duration: 3000,
            position: 'top-right',
            type: 'default',
            closeButton: true,
            ...options
        };

        this.toasts = [];
        this.createContainers();
    }

    private createContainers(): void {
        const positions: ToastOptions['position'][] = [
            'top-left', 'top-right', 'top-center',
            'bottom-left', 'bottom-right', 'bottom-center'
        ];

        positions.forEach(position => {
            if (!document.querySelector(`.tada-container-${position}`)) {
                const container = document.createElement('div');
                container.className = `tada-container tada-container-${position}`;
                document.body.appendChild(container);
            }
        });
    }

    show(message: string, options: ToastOptions = {}): HTMLElement {
        const config = { ...this.defaultOptions, ...options };
        const container = document.querySelector(`.tada-container-${config.position}`);

        if (!container) {
            throw new Error(`Container for position ${config.position} not found`);
        }

        const toast = document.createElement('div');
        toast.className = `tada-toast tada-toast-${config.type}`;

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'tada-content';
        contentWrapper.textContent = message;
        toast.appendChild(contentWrapper);

        if (config.closeButton) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'tada-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = () => this.remove(toast);
            toast.appendChild(closeBtn);
        }

        container.appendChild(toast);
        this.toasts.push(toast);

        setTimeout(() => toast.classList.add('tada-show'), 10);

        if (config.duration > 0) {
            setTimeout(() => this.remove(toast), config.duration);
        }

        return toast;
    }

    success(message: string, options: ToastOptions = {}): HTMLElement {
        return this.show(message, { ...options, type: 'success' });
    }

    error(message: string, options: ToastOptions = {}): HTMLElement {
        return this.show(message, { ...options, type: 'error' });
    }

    warning(message: string, options: ToastOptions = {}): HTMLElement {
        return this.show(message, { ...options, type: 'warning' });
    }

    info(message: string, options: ToastOptions = {}): HTMLElement {
        return this.show(message, { ...options, type: 'info' });
    }

    remove(toast: HTMLElement): void {
        toast.classList.remove('tada-show');
        toast.classList.add('tada-hide');

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            const index = this.toasts.indexOf(toast);
            if (index > -1) {
                this.toasts.splice(index, 1);
            }
        }, 300);
    }

    clear(): void {
        this.toasts.forEach(toast => this.remove(toast));
    }
}

const tada = new TadaToast();

export default tada;
export { TadaToast };
export type { ToastOptions } from './types';