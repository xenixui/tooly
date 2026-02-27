class Dropdown extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this._isOpen = false;
        }

        async render() {
            const response = await fetch('dropdown.html');
            const htmlContent = await response.text();

            this.shadowRoot.innerHTML = htmlContent;
        }

        openDrodown(trigger) {
            const dropdown = this.shadowRoot.querySelector('.dropdown');

            const position = this.calcPosition();

            dropdown.style.top = `${position.top}px`;
            dropdown.style.left = `${position.left}px`;

            this._isOpen = true;
            dropdown.classList.add('active');
        }

        closeDropdown(trigger) {
            const dropdown = this.shadowRoot.querySelector('.dropdown');

            this._isOpen = false;
            dropdown.classList.remove('active');
        }

        calcPosition() {
            const triggerData = trigger.getBoundingClientRect();

            const topPosition = 0;
            const leftPosition = 0;

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

customElements.define('my-dropdown', Dropdown);
