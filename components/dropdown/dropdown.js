export class Dropdown extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this._isOpen = false;
        }

        connectedCallback() {
            this._ready = this._render();
        }

        async _render() {
            const response = await fetch('./dropdown.html');
            
            if (!response.ok) {
                console.error('No se pudo cargar dropdown.html:', response.status);
                return;
            }
            const htmlContent = await response.text();
            this.shadowRoot.innerHTML = htmlContent;
        }

        async openDropdown(trigger) {
            await this._ready;

            const dropdown = this.shadowRoot.querySelector('.dropdown');
            const position = this.calcPosition(trigger);

            dropdown.style.top = `${position.top}px`;
            dropdown.style.left = `${position.left}px`;

            this._isOpen = true;
            dropdown.classList.add('dropdown--active');
        }

       async closeDropdown() {
            await this._ready;

            const dropdown = this.shadowRoot.querySelector('.dropdown');
            this._isOpen = false;
            dropdown.classList.remove('dropdown--active');
        }

        calcPosition(trigger) {
            const triggerData = trigger.getBoundingClientRect();

            let topPosition = 0;
            let leftPosition = 0;

            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            if (triggerData.top >= viewportHeight/2) {
                topPosition = triggerData.bottom + triggerData.height;
            } else {
                topPosition = triggerData.top + triggerData.height;
            }

            if (triggerData.left >= viewportWidth/2) {
                leftPosition = triggerData.right + triggerData.width;
            } else {
                leftPosition = triggerData.left;
            }
            
            return {
                top: topPosition,
                left: leftPosition
            };
        }
}

window.customElements.define('my-dropdown', Dropdown);
