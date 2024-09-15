class ThemeSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('form').addEventListener('submit', this.handleSubmit.bind(this));
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                form {
                    display: flex;
                    flex-direction: column;
                }
                select {
                    margin-bottom: 16px;
                }
            </style>
            <form>
                <label for="theme">Select Theme:</label>
                <select id="theme" name="theme">
                    <option value="day">Day</option>
                    <option value="night">Night</option>
                </select>
                <button type="submit">Apply</button>
            </form>
        `;
    }

    handleSubmit(event) {
        event.preventDefault();
        const theme = this.shadowRoot.querySelector('#theme').value;
        document.documentElement.setAttribute('data-theme', theme);
        // Apply additional theme settings here
    }
}

customElements.define('theme-selector', ThemeSelector);
