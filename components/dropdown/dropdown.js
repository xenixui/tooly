'use strict';

export class Dropdown extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this._isOpen = false;
        this._ready = null;
        this._reposition = this._reposition.bind(this);
        this._outsideClickClose = this._outsideClickClose.bind(this);
        }

        connectedCallback() {
            this._ready = this._render();
        }

        async _render() {
            const response = await fetch('/components/dropdown/dropdown.html');
            
            if (!response.ok) {
                alert('No se pudo cargar dropdown.html');
                return;
            }

            const htmlContent = await response.text();

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/components/dropdown/dropdown.css';

            const div = document.createElement('div');
            div.innerHTML = htmlContent;

            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(link);
            this.shadowRoot.append(div);

        }

        _reposition() {
            if (!this._isOpen || !this._triggerEl) return;

            const dropdown = this.shadowRoot.querySelector('.dropdown');
            if (!dropdown) return;
        
            const pos = this.calcPosition(this._triggerEl);
            dropdown.style.top  = `${pos.top}px`;
            dropdown.style.left = `${pos.left}px`;
        }

        _outsideClickClose(e) {
            const clickedInsideHost  = e.composedPath().includes(this);
            const clickedInsideTrigger = this._triggerEl && e.composedPath().includes(this._triggerEl);

            if (!clickedInsideHost && !clickedInsideTrigger) {
                this.closeDropdown();
            }
        }

        async openDropdown(trigger, content) {
            await this._ready;

            this._triggerEl = trigger;

            if (!this._triggerEl) {
                this.closeDropdown();
                return;
            }

            const dropdown = this.shadowRoot.querySelector('.dropdown');
            if (!dropdown) return;

            const pos = this.calcPosition(this._triggerEl);
            dropdown.style.top  = `${pos.top}px`;
            dropdown.style.left = `${pos.left}px`;

            this._isOpen = true;
            dropdown.classList.add('dropdown--active');
    
            dropdown.innerHTML = '';
            if (content instanceof HTMLElement) {
                dropdown.appendChild(content);
            } else {
                dropdown.innerHTML = content;
            }

            this._triggerObserver = new IntersectionObserver(([entry]) => {
                if (!entry.isIntersecting) this.closeDropdown();
                    }, { threshold: 0 });
                    this._triggerObserver.observe(this._triggerEl);
            

            window.addEventListener('resize', this._reposition, { passive: true });
            document.addEventListener('scroll', this._reposition, { passive: true, capture: true });

            setTimeout(() => {
                document.addEventListener('pointerdown', this._outsideClickClose);
            }, 0);
        }

       async closeDropdown() {
            await this._ready;

            const dropdown = this.shadowRoot.querySelector('.dropdown');
            this._isOpen = false;
            dropdown.classList.remove('dropdown--active');

            if (this._triggerObserver) {
                this._triggerObserver.disconnect();
                this._triggerObserver = null;
            }

            document.removeEventListener('pointerdown', this._outsideClickClose);
            window.removeEventListener('resize', this._reposition);
            document.removeEventListener('scroll', this._reposition, { capture: true });
        }

        calcPosition(trigger) {
            const r = trigger.getBoundingClientRect();
            const dropdown = this.shadowRoot.querySelector('.dropdown');
            const dropdownWidth = parseFloat(getComputedStyle(dropdown).minWidth) || 160;
            const dropdownHeight = dropdown.offsetHeight || 100;
            const margin = 8;
            
            const leftAligned = r.left;
            const rightAligned = r.right - dropdownWidth;
            const fitsRight = r.left + dropdownWidth + margin <= window.innerWidth;
            const left = fitsRight ? leftAligned : Math.max(margin, rightAligned);

            const fitsBelow = r.bottom + dropdownHeight + margin <= window.innerHeight;
            const top = fitsBelow ? r.bottom + 4 : r.top - dropdownHeight - 4;

            return { top, left };
        }
        
}

window.customElements.define('my-dropdown', Dropdown);
