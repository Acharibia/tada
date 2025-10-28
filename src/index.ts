import './styles/toast.css';
import type { ToastOptions } from './types';

class TadaToast {
    private defaultOptions: Required<Omit<ToastOptions, 'animation'>> & { animation?: ToastOptions['animation'] };
    private toasts: HTMLElement[];
    private containers: Map<string, HTMLElement>;

    constructor(options: ToastOptions = {}) {
        this.defaultOptions = {
            duration: 3000,
            position: 'top-right',
            type: 'default',
            closeButton: true,
            maxToasts: 0,
            ...options
        };

        this.toasts = [];
        this.containers = new Map();
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
                container.setAttribute('role', 'region');
                container.setAttribute('aria-label', 'Notifications');
                document.body.appendChild(container);
                this.containers.set(position!, container);
            } else {
                const existing = document.querySelector(`.tada-container-${position}`) as HTMLElement;
                this.containers.set(position!, existing);
            }
        });
    }

    private enforceMaxToasts(position: string, maxToasts: number): void {
        if (maxToasts <= 0) return;

        const container = this.containers.get(position);
        if (!container) return;

        const toastsInContainer = Array.from(container.children) as HTMLElement[];
        // Remove oldest toasts if we're at or above the limit
        while (toastsInContainer.length >= maxToasts) {
            const oldestToast = toastsInContainer.shift();
            if (oldestToast && oldestToast.parentNode) {
                oldestToast.parentNode.removeChild(oldestToast);
                const index = this.toasts.indexOf(oldestToast);
                if (index > -1) {
                    this.toasts.splice(index, 1);
                }
            }
        }
    }

    show(message: string, options: ToastOptions = {}): HTMLElement {
        const config = { ...this.defaultOptions, ...options };
        const container = document.querySelector(`.tada-container-${config.position}`);

        if (!container) {
            throw new Error(`Container for position ${config.position} not found`);
        }

        // Enforce max toasts limit
        if (config.maxToasts && config.maxToasts > 0) {
            this.enforceMaxToasts(config.position!, config.maxToasts);
        }

        const toast = document.createElement('div');
        toast.className = `tada-toast tada-toast-${config.type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', config.type === 'error' ? 'assertive' : 'polite');
        toast.setAttribute('aria-atomic', 'true');
        toast.setAttribute('tabindex', '0');

        // Apply custom animations if provided
        if (config.animation) {
            if (config.animation.enter) {
                toast.style.setProperty('--tada-enter-animation', config.animation.enter);
            }
            if (config.animation.exit) {
                toast.style.setProperty('--tada-exit-animation', config.animation.exit);
            }
            if (config.animation.duration) {
                toast.style.setProperty('--tada-animation-duration', `${config.animation.duration}ms`);
            }
        }

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'tada-content';
        contentWrapper.textContent = message;
        toast.appendChild(contentWrapper);

        if (config.closeButton) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'tada-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close notification');
            closeBtn.onclick = () => this.remove(toast);

            // Keyboard support for close button
            closeBtn.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.remove(toast);
                }
            };

            toast.appendChild(closeBtn);
        }

        // Keyboard support for toast dismissal
        toast.onkeydown = (e) => {
            if (e.key === 'Escape') {
                this.remove(toast);
            }
        };

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

    destroy(): void {
        // Clean up all toasts
        this.clear();

        // Remove all containers from DOM
        this.containers.forEach(container => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        });

        // Clear references
        this.containers.clear();
        this.toasts = [];
    }
}

const tada = new TadaToast();

export default tada;
export { TadaToast };
export type { ToastOptions } from './types';