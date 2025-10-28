import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TadaToast } from '../src/index';

describe('TadaToast', () => {
    let toast: TadaToast;

    beforeEach(() => {
        document.body.innerHTML = '';
        toast = new TadaToast();
    });

    afterEach(() => {
        if (toast) {
            toast.destroy();
        }
    });

    describe('Initialization', () => {
        it('should create containers for all positions', () => {
            const positions = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'];
            positions.forEach(position => {
                const container = document.querySelector(`.tada-container-${position}`);
                expect(container).toBeTruthy();
            });
        });

        it('should set ARIA attributes on containers', () => {
            const container = document.querySelector('.tada-container-top-right');
            expect(container?.getAttribute('role')).toBe('region');
            expect(container?.getAttribute('aria-label')).toBe('Notifications');
        });
    });

    describe('show()', () => {
        it('should create a toast with default options', () => {
            const element = toast.show('Test message');
            expect(element.textContent).toContain('Test message');
            expect(element.classList.contains('tada-toast')).toBe(true);
        });

        it('should set correct ARIA attributes', () => {
            const element = toast.show('Test message');
            expect(element.getAttribute('role')).toBe('alert');
            expect(element.getAttribute('aria-live')).toBe('polite');
            expect(element.getAttribute('aria-atomic')).toBe('true');
        });

        it('should set aria-live to assertive for error toasts', () => {
            const element = toast.error('Error message');
            expect(element.getAttribute('aria-live')).toBe('assertive');
        });

        it('should add close button when closeButton is true', () => {
            const element = toast.show('Test', { closeButton: true });
            const closeBtn = element.querySelector('.tada-close');
            expect(closeBtn).toBeTruthy();
            expect(closeBtn?.getAttribute('aria-label')).toBe('Close notification');
        });

        it('should not add close button when closeButton is false', () => {
            const element = toast.show('Test', { closeButton: false });
            const closeBtn = element.querySelector('.tada-close');
            expect(closeBtn).toBeFalsy();
        });

        it('should apply custom position', () => {
            const element = toast.show('Test', { position: 'bottom-left' });
            const container = element.parentElement;
            expect(container?.classList.contains('tada-container-bottom-left')).toBe(true);
        });
    });

    describe('Toast types', () => {
        it('should create success toast', () => {
            const element = toast.success('Success');
            expect(element.classList.contains('tada-toast-success')).toBe(true);
        });

        it('should create error toast', () => {
            const element = toast.error('Error');
            expect(element.classList.contains('tada-toast-error')).toBe(true);
        });

        it('should create warning toast', () => {
            const element = toast.warning('Warning');
            expect(element.classList.contains('tada-toast-warning')).toBe(true);
        });

        it('should create info toast', () => {
            const element = toast.info('Info');
            expect(element.classList.contains('tada-toast-info')).toBe(true);
        });
    });

    describe('maxToasts', () => {
        it('should limit number of toasts when maxToasts is set', () => {
            const toastInstance = new TadaToast({ maxToasts: 3, position: 'top-right' });

            toastInstance.show('Toast 1', { position: 'top-right' });
            toastInstance.show('Toast 2', { position: 'top-right' });
            toastInstance.show('Toast 3', { position: 'top-right' });
            toastInstance.show('Toast 4', { position: 'top-right' });

            const container = document.querySelector('.tada-container-top-right');
            const toastsInContainer = container?.querySelectorAll('.tada-toast');
            expect(toastsInContainer?.length).toBeLessThanOrEqual(3);

            toastInstance.destroy();
        });
    });

    describe('Custom animations', () => {
        it('should apply custom animation CSS variables', () => {
            const element = toast.show('Test', {
                animation: {
                    enter: 'scale(0)',
                    exit: 'scale(0)',
                    duration: 500
                }
            });

            expect(element.style.getPropertyValue('--tada-enter-animation')).toBe('scale(0)');
            expect(element.style.getPropertyValue('--tada-exit-animation')).toBe('scale(0)');
            expect(element.style.getPropertyValue('--tada-animation-duration')).toBe('500ms');
        });
    });

    describe('remove()', () => {
        it('should remove toast from DOM', async () => {
            const element = toast.show('Test');
            toast.remove(element);

            await new Promise(resolve => setTimeout(resolve, 350));
            expect(document.body.contains(element)).toBe(false);
        });
    });

    describe('clear()', () => {
        it('should remove all toasts', async () => {
            toast.show('Toast 1');
            toast.show('Toast 2');
            toast.show('Toast 3');

            toast.clear();

            await new Promise(resolve => setTimeout(resolve, 350));
            const remainingToasts = document.querySelectorAll('.tada-toast');
            expect(remainingToasts.length).toBe(0);
        });
    });

    describe('destroy()', () => {
        it('should remove all containers and toasts', () => {
            toast.show('Test');
            toast.destroy();

            const containers = document.querySelectorAll('[class^="tada-container"]');
            expect(containers.length).toBe(0);
        });
    });

    describe('Keyboard support', () => {
        it('should close toast on Escape key', () => {
            const element = toast.show('Test');
            const event = new KeyboardEvent('keydown', { key: 'Escape' });
            element.dispatchEvent(event);

            expect(element.classList.contains('tada-hide')).toBe(true);
        });

        it('should close toast on Enter key when close button is focused', () => {
            const element = toast.show('Test', { closeButton: true });
            const closeBtn = element.querySelector('.tada-close') as HTMLElement;
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            closeBtn?.dispatchEvent(event);

            expect(element.classList.contains('tada-hide')).toBe(true);
        });
    });
});
