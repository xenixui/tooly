class App {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('App incicializada'); 
        })
    }
}

new App(); 