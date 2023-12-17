class Debugger {
    breakpoints: Set<number> = new Set();
    activeBreakpoint: number | null = null;

    constructor() {
        this.setupEditor();
    }

    setupEditor() {
        const codeElement = document.getElementById('code');
        codeElement?.addEventListener('click', this.handleCodeClick.bind(this));
    }

    handleCodeClick(event: MouseEvent) {
        const codeElement = event.currentTarget as HTMLElement;
        const lineNumber = this.getLineNumber(codeElement, event);

        if (lineNumber !== null) {
            this.toggleBreakpoint(lineNumber);
            this.updateVisuals();
        }
    }

    toggleBreakpoint(lineNumber: number) {
        if (this.breakpoints.has(lineNumber)) {
            this.breakpoints.delete(lineNumber);
        } else {
            this.breakpoints.add(lineNumber);
        }
    }

    updateVisuals() {
        const codeElement = document.getElementById('code');
        codeElement?.querySelectorAll('.breakpoint').forEach((dot) => {
            const lineNumber = parseInt(dot.getAttribute('data-line') || '0', 10);
            if (this.breakpoints.has(lineNumber)) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    getLineNumber(codeElement: HTMLElement, event: MouseEvent): number | null {
        const lineHeight = parseFloat(getComputedStyle(codeElement).lineHeight || '0');
        const lineNumber = Math.floor(event.clientY / lineHeight) + 1;

        return lineNumber;
    }
}

const debuggerInstance = new Debugger();
