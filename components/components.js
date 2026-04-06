import {Dropdown} from "./dropdown/dropdown.js";
import { Menu } from "./menu/menu.js";
import { Header } from "./header/header.js";
import { Hero } from "./hero/hero.js";

if (!customElements.get('my-dropdown')) {
    customElements.define('my-dropdown', Dropdown);
}
if (!customElements.get('my-menu')) {
    customElements.define('my-menu', Menu);
}
if (!customElements.get('my-header')) {
    customElements.define('my-header', Header);
}
if (!customElements.get('my-hero')) {
    customElements.define('my-hero', Hero);
}
