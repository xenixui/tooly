export class Menu extends HTMLElement {
constructor () {
    super();
}

async _render() {
    const response = await fetch('/components/menu/menu.html');
    
    if (!response.ok) {
        alert('No se pudo cargar menu.html');
        return;
    }

    const htmlContent = await response.text();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/components/menu/menu.css';

    }

}

window.customElements.define('my-menu', Dropdown);