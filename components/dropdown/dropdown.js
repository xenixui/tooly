export class Dropdown extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this._isOpen = false;
        this._ready = null;
        this._reposition = this._reposition.bind(this);
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


            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(link);
            this.shadowRoot.innerHTML += htmlContent;

        }

        _reposition() {
            if (!this._isOpen || !this._triggerEl) return;

            const dropdown = this.shadowRoot.querySelector('.dropdown');
            if (!dropdown) return;
        
            const pos = this.calcPosition(this._triggerEl);
            dropdown.style.top  = `${pos.top}px`;
            dropdown.style.left = `${pos.left}px`;
        }

        async openDropdown(trigger) {
            await this._ready;

            this._triggerEl = trigger;

            const dropdown = this.shadowRoot.querySelector('.dropdown');
            if (!dropdown) return;

            const pos = this.calcPosition(this._triggerEl);
            dropdown.style.top  = `${pos.top}px`;
            dropdown.style.left = `${pos.left}px`;

            this._isOpen = true;
            dropdown.classList.add('dropdown--active');

            window.addEventListener('resize', this._reposition, { passive: true });
            document.addEventListener('scroll', this._reposition, { passive: true, capture: true });
        }

       async closeDropdown() {
            await this._ready;

            const dropdown = this.shadowRoot.querySelector('.dropdown');
            this._isOpen = false;
            dropdown.classList.remove('dropdown--active');
        }

        calcPosition(trigger) {
            const r = trigger.getBoundingClientRect();
        
            return {
                top: r.bottom + 4,
                left: r.left
            };
        }
        
}

window.customElements.define('my-dropdown', Dropdown);
